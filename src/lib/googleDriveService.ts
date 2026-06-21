import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signInWithCredential } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Reuse initialized firebase app or create a fresh one safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Use GoogleAuthProvider
export const provider = new GoogleAuthProvider();

// Standard scopes for reading, writing, and searching files across general Google Drive
const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata'
];

SCOPES.forEach(scope => provider.addScope(scope));

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // Since Firebase token listener doesn't automatically store the Google OAuth raw token,
        // we'll require a new login if it wasn't cached in memory during this session.
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve OAuth access token from Google identity.');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Sign-In connection failed:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Logout
export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
};

// Google Drive Interfaces
export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  createdTime?: string;
  modifiedTime?: string;
  thumbnailLink?: string;
  webViewLink?: string;
}

// List files inside Google Drive
export const listDriveFiles = async (token: string, searchName?: string): Promise<DriveFile[]> => {
  let query = "trashed = false";
  if (searchName) {
    query += ` and name contains '${searchName.replace(/'/g, "\\'")}'`;
  }
  
  const url = `https://www.googleapis.com/drive/v3/files?fields=files(id,name,mimeType,size,createdTime,modifiedTime,thumbnailLink,webViewLink)&q=${encodeURIComponent(query)}&orderBy=folder,name`;
  
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Accept': 'application/json'
    }
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Google Drive list failed: ${errText}`);
  }
  
  const data = await res.json();
  return data.files || [];
};

// Create a direct Folder in Google Drive
export const createDriveFolder = async (token: string, folderName: string): Promise<DriveFile> => {
  const url = 'https://www.googleapis.com/drive/v3/files';
  const body = {
    name: folderName,
    mimeType: 'application/vnd.google-apps.folder'
  };
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Folder creation error: ${errText}`);
  }
  
  return await res.json();
};

// Delete a Google Drive File (MUTATING / DESTRUCTIVE - REQUIRES user confirmation dialog in UI!)
export const deleteDriveFile = async (token: string, fileId: string): Promise<boolean> => {
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`File deletion failed: ${errText}`);
  }
  
  return true;
};

// Upload file directly using Google Drive v3 multipart protocol (supports metadata + file stream)
export const uploadDriveFile = async (
  token: string, 
  filename: string, 
  fileType: string, 
  content: string | ArrayBuffer, 
  parentFolderId?: string
): Promise<DriveFile> => {
  const boundary = 'modaui_upload_split_marker_' + Math.random().toString(16).substring(2);
  const url = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart';
  
  const metadata = {
    name: filename,
    mimeType: fileType,
    parents: parentFolderId ? [parentFolderId] : undefined
  };
  
  const textContent = typeof content === 'string' ? content : new TextDecoder().decode(content);
  
  const body = 
    `\r\n--${boundary}\r\n` +
    `Content-Type: application/json; charset=UTF-8\r\n\r\n` +
    `${JSON.stringify(metadata)}\r\n` +
    `--${boundary}\r\n` +
    `Content-Type: ${fileType}\r\n\r\n` +
    `${textContent}\r\n` +
    `--${boundary}--`;
    
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: body
  });
  
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`File upload failed: ${errText}`);
  }
  
  return await res.json();
};

// Backup active system records directly to Google Drive
export const backupSystemDataToDrive = async (token: string, backupData: any, filenamePrefix: string = 'modaui_backup'): Promise<DriveFile> => {
  // Try to find if modaui-commerce-backups already exists, or create a fresh one!
  let backupFolderId = '';
  try {
    const query = "mimeType = 'application/vnd.google-apps.folder' and name = 'modaui-commerce-backups' and trashed = false";
    const lookupUrl = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}`;
    const folderRes = await fetch(lookupUrl, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` }
    });
    if (folderRes.ok) {
      const folders = await folderRes.json();
      if (folders.files && folders.files.length > 0) {
        backupFolderId = folders.files[0].id;
      }
    }
  } catch {
    // Ignore, let's create a new folder
  }
  
  if (!backupFolderId) {
    const folderObj = await createDriveFolder(token, 'modaui-commerce-backups');
    backupFolderId = folderObj.id;
  }
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const filename = `${filenamePrefix}_${timestamp}.json`;
  const fileContent = JSON.stringify(backupData, null, 2);
  
  return await uploadDriveFile(token, filename, 'application/json', fileContent, backupFolderId);
};
