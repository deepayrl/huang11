import React, { useState, useEffect, useRef } from 'react';
import { 
  Cloud, HardDrive, ShieldCheck, LogIn, LogOut, Search, Loader2, Plus, 
  Folder, FileText, Image, FileVideo, Archive, FileCode, File, Trash2, 
  Upload, Database, RefreshCw, CheckCircle, ExternalLink, X, AlertTriangle 
} from 'lucide-react';
import { User } from 'firebase/auth';
import { 
  DriveFile, googleSignIn, logout, initAuth, listDriveFiles, 
  createDriveFolder, deleteDriveFile, uploadDriveFile, backupSystemDataToDrive 
} from '../lib/googleDriveService';

interface DriveWorkspaceProps {
  lang: 'en' | 'it' | 'zh' | 'fr' | 'de' | 'es';
}

export default function DriveWorkspace({ lang }: DriveWorkspaceProps) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<DriveFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom action states
  const [folderName, setFolderName] = useState('');
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [backupStatus, setBackupStatus] = useState<'idle' | 'running' | 'success' | 'failed'>('idle');
  const [backupDetails, setBackupDetails] = useState<any>(null);
  
  // MANDATORY Safe Deletion Confirmation States
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [pendingDeleteName, setPendingDeleteName] = useState<string>('');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize Auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        loadFiles(token);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setFiles([]);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setAccessToken(result.accessToken);
        await loadFiles(result.accessToken);
      }
    } catch (err) {
      console.error("Connection failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setFiles([]);
  };

  const loadFiles = async (token: string, search?: string) => {
    setLoading(true);
    try {
      const driveItems = await listDriveFiles(token, search);
      setFiles(driveItems);
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessToken) {
      loadFiles(accessToken, searchQuery);
    }
  };

  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken || !folderName.trim()) return;
    try {
      setLoading(true);
      await createDriveFolder(accessToken, folderName.trim());
      setFolderName('');
      setShowFolderModal(false);
      loadFiles(accessToken, searchQuery);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Safe Deletion Triggers
  const askDeleteConfirmation = (fileId: string, name: string) => {
    setPendingDeleteId(fileId);
    setPendingDeleteName(name);
    setDeleteConfirmText('');
  };

  const executeSafeDelete = async () => {
    if (!accessToken || !pendingDeleteId) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(accessToken, pendingDeleteId);
      // Clean states
      setPendingDeleteId(null);
      setPendingDeleteName('');
      setDeleteConfirmText('');
      loadFiles(accessToken, searchQuery);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  // File Upload Handlers (Supports Select and Drag-and-Drop)
  const processUpload = async (browserFile: File) => {
    if (!accessToken) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const textContent = e.target?.result as string;
        await uploadDriveFile(accessToken, browserFile.name, browserFile.type, textContent);
        loadFiles(accessToken, searchQuery);
      };
      reader.readAsText(browserFile);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const browserFile = e.target.files?.[0];
    if (browserFile) {
      processUpload(browserFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      processUpload(droppedFile);
    }
  };

  // System Backup Trigger
  const triggerSystemBackup = async () => {
    if (!accessToken) return;
    setBackupStatus('running');
    try {
      // Create interesting data backup configuration based on current ecosystem details
      const backupPayload = {
        meta: {
          app: 'modaui AI Commerce OS Backup Hub',
          environment: 'Production Cloud Cluster',
          backupExecutor: user?.email || 'admin@modaui.com',
          createdTime: new Date().toISOString(),
          systemPlatformVer: 'v4.14.9'
        },
        siteConfigurations: {
          currentSEOKeywordsActive: ['AI POS Italy', 'B2B Open Banking', 'Fattura Elettronica XML'],
          registeredSystemDomains: ['modaui.com', 'app.modaui.com'],
          multilingualRoutingEnabled: ['en', 'it', 'zh', 'fr', 'de', 'es'],
          activeFiscalMOSSGateway: 'IT_MOSS_ACTIVE'
        },
        systemStatistics: {
          totalSitemapPagesCrawled: 345,
          activeAIAgentsOnline: [
            { name: 'Napoli Logistics Assistant', category: 'Fulfillment' },
            { name: 'Milan Studio CRM Specialist', category: 'Marketing' }
          ]
        }
      };
      
      const resFile = await backupSystemDataToDrive(accessToken, backupPayload, 'modaui_commerce_db_backup');
      setBackupDetails(resFile);
      setBackupStatus('success');
      loadFiles(accessToken, searchQuery);
    } catch (err) {
      console.error(err);
      setBackupStatus('failed');
    }
  };

  // Helper to resolve suitable CSS badges for diverse mime types
  const getFileIcon = (mimeType: string) => {
    if (mimeType === 'application/vnd.google-apps.folder') {
      return <Folder className="w-4 h-4 text-amber-400" />;
    } else if (mimeType.includes('pdf') || mimeType.includes('document')) {
      return <FileText className="w-4 h-4 text-blue-400" />;
    } else if (mimeType.includes('image')) {
      return <Image className="w-4 h-4 text-purple-400" />;
    } else if (mimeType.includes('video')) {
      return <FileVideo className="w-4 h-4 text-orange-400" />;
    } else if (mimeType.includes('zip') || mimeType.includes('compressed')) {
      return <Archive className="w-4 h-4 text-amber-600" />;
    } else if (mimeType.includes('json') || mimeType.includes('javascript') || mimeType.includes('typescript')) {
      return <FileCode className="w-4 h-4 text-emerald-400" />;
    }
    return <File className="w-4 h-4 text-slate-400" />;
  };

  const getReadableSize = (bytesStr?: string) => {
    if (!bytesStr) return '—';
    const bytes = parseInt(bytesStr);
    if (isNaN(bytes)) return '—';
    if (bytes < 1024) return `${bytes} B`;
    const kib = bytes / 1024;
    if (kib < 1024) return `${kib.toFixed(1)} KB`;
    const mib = kib / 1024;
    return `${mib.toFixed(2)} MB`;
  };

  const getLocalFormattedDate = (isoStr?: string) => {
    if (!isoStr) return '—';
    const d = new Date(isoStr);
    return `${d.toLocaleDateString()} ${d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const translateText = {
    title: {
      en: 'modaui Google Cloud Drive Workspace',
      zh: 'modaui 谷歌云端存储工作空间',
      it: 'Workspace Google Cloud Drive di modaui'
    },
    subTitle: {
      en: 'Synchronize commerce data, automate document logs, and back up digital backups using direct Workspace OAuth pipelines.',
      zh: '深度对接欧盟数字运营网络：无缝将账目、仓储物流及会员CRM档案，一键归档存储到您个人的 谷歌云盘 (Google Drive) 内。',
      it: 'Sincronizza cartelle, files e backup del POS o l’inventario modaui direttamente sul tuo cloud personale.'
    },
    signInBtn: {
      en: 'Sign in with Google Account',
      zh: '使用谷歌账户安全登录',
      it: 'Accedi con Google Workspace'
    },
    logoutBtn: {
      en: 'Disconnect drive account',
      zh: '断开云存储连接',
      it: 'Sconnetti account'
    },
    backupBtn: {
      en: 'One-Click Live Backup to Cloud',
      zh: '一键自动备份全站财务账目',
      it: 'Backup live su Cloud Drive'
    },
    fileSearchPl: {
      en: 'Search documents by name...',
      zh: '搜索云盘文件名/文件描述...',
      it: 'Cerca file per nome...'
    },
    uploadArea: {
      en: 'Drag & Drop files here, or click to upload',
      zh: '拖拽本地表格/CSV/JSON文件到此处，或 点击选择文件 上传',
      it: 'Trascina i tuoi taccuini qui o clicca per caricare'
    },
    safeDeleteTitle: {
      en: 'Confirm File Deletion',
      zh: '确认彻底删除文件？',
      it: 'Conferma eliminazione file'
    },
    safeDeleteWarning: {
      en: 'This action is destructive and irreversible. The selected cloud file will be permanently deleted from your Google Drive.',
      zh: '注意：该操作属于破坏性、不可逆的高危行动。选中的文件将被从您的 Google Drive 云端硬盘中永久废弃。',
      it: 'Attenzione: operazione distruttiva irreversibile. Il file cloud selezionato per la rimozione verrà eliminato per sempre dal tuo Google Drive.'
    }
  };

  const t = (key: keyof typeof translateText) => {
    return translateText[key][lang === 'zh' ? 'zh' : lang === 'it' ? 'it' : 'en'] || translateText[key]['en'];
  };

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto space-y-8 animate-fade-in">
      
      {/* Header Panel */}
      <div className="bg-[#04060c] border border-slate-900 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2 max-w-2xl text-left">
          <div className="flex items-center gap-2">
            <span className="p-1 px-2.2 text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/35 border border-cyan-800/30 rounded flex items-center gap-1.5 uppercase">
              <Cloud className="w-3 h-3 animate-pulse" />
              Google Workspace OAuth Integration
            </span>
            <span className="p-1 px-2.2 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/35 border border-emerald-800/30 rounded flex items-center gap-1.5 uppercase">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Active SSL
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-tight">
            {t('title')}
          </h2>
          <p className="text-slate-400 text-xs sm:text-xs leading-relaxed font-sans">
            {t('subTitle')}
          </p>
        </div>

        {/* Auth Handler controls */}
        <div className="flex-shrink-0">
          {!user ? (
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="px-5 py-3 h-12 bg-white hover:bg-slate-100 text-slate-900 rounded-xl font-semibold font-sans text-xs transition-colors flex items-center gap-2.5 shadow-lg shadow-white/5 active:scale-[0.98] cursor-pointer"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-slate-800" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              {t('signInBtn')}
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-[#0a0d1e] p-3 rounded-xl border border-slate-900">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="author logo" referrerPolicy="no-referrer" className="w-8 h-8 rounded-full border border-cyan-800" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-cyan-900 border border-cyan-700 font-mono text-cyan-200 flex items-center justify-center text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="text-left">
                  <span className="block text-xs font-semibold text-white leading-none">{user.displayName || 'Authorized User'}</span>
                  <span className="block text-[10px] text-slate-500 font-mono leading-none mt-1">{user.email}</span>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="p-1.5 px-3 rounded-lg bg-red-950/20 hover:bg-red-950/45 text-red-400 border border-red-900/40 text-[10px] font-mono font-medium transition-colors cursor-pointer"
              >
                {t('logoutBtn')}
              </button>
            </div>
          )}
        </div>
      </div>

      {!user ? (
        /* Guest Callout Prompt Screen */
        <div className="bg-[#020306]/60 border border-slate-900 rounded-2xl p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-950 border border-slate-900 flex items-center justify-center mx-auto text-cyan-400">
            <HardDrive className="w-8 h-8 animate-bounce" />
          </div>
          <h3 className="text-white text-base font-semibold font-display">
            {lang === 'zh' ? 'Google Drive 未授信' : lang === 'it' ? 'Drive Google disconnesso' : 'External Storage Offline'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            {lang === 'zh' 
              ? '为了使用本模块，您需要经过授权。点击上方白色的 Google 按钮完成统一数字认证，modaui 将为您开启云端备载通道、实时文件极速预览、以及安全的表格/备份导出功能。您的登录状态完全储存在内存中，安全可靠。'
              : 'Sign in utilizing your official enterprise or personal Google Workspace credentials to enable full file-system read capabilities, directory browsing, drag-and-drop secure uploads, and regular system log export pipelines.'
            }
          </p>
          <button 
            onClick={handleLogin}
            className="mx-auto px-4 py-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 rounded-lg text-xs font-semibold text-white font-mono uppercase tracking-wider transition-colors cursor-pointer"
          >
            {lang === 'zh' ? '立即连接 Google Workspace' : 'Authorize Platform Link'}
          </button>
        </div>
      ) : (
        /* Active Connected Cloud Explorer */
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT Sidebar: Action tools */}
          <div className="space-y-6 lg:col-span-1">
            
            {/* Quick Actions Card */}
            <div className="bg-[#03050a] border border-slate-900 rounded-xl p-5 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-slate-900 pb-3">
                {lang === 'zh' ? '云存储快捷工具' : lang === 'it' ? 'Azioni rapide cloud' : 'Integrations Panel'}
              </h4>

              <div className="space-y-3">
                {/* Create Folder button */}
                <button 
                  onClick={() => setShowFolderModal(true)}
                  className="w-full py-2.5 rounded-lg bg-slate-950 border border-slate-900 hover:bg-slate-900 text-xs font-mono font-medium text-slate-300 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-cyan-400" />
                  {lang === 'zh' ? '新建文件夹' : lang === 'it' ? 'Nuova cartella' : 'Create Cloud Folder'}
                </button>

                {/* Automation Backup block */}
                <button 
                  onClick={triggerSystemBackup}
                  disabled={backupStatus === 'running'}
                  className="w-full py-2.5 rounded-lg bg-gradient-to-r from-emerald-950/60 to-teal-950/60 hover:from-emerald-950/90 hover:to-teal-950/90 border border-emerald-900/60 text-xs font-mono font-semibold text-emerald-400 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Database className="w-4 h-4" />
                  {t('backupBtn')}
                </button>

                {backupStatus === 'running' && (
                  <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500 animate-pulse">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-450" />
                    Packaging spreadsheet tables...
                  </div>
                )}

                {backupStatus === 'success' && backupDetails && (
                  <div className="p-3.5 bg-emerald-950/20 border border-emerald-900/40 rounded-lg text-left space-y-1.5 animate-fade-in">
                    <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold font-mono">
                      <CheckCircle className="w-4 h-4" />
                      Backup Complete!
                    </div>
                    <span className="block text-[9.5px] font-mono text-slate-400 truncate">Saved file: <b className="text-white font-normal">{backupDetails.name}</b></span>
                    <a 
                      href={backupDetails.webViewLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[9px] font-semibold text-emerald-400 underline flex items-center gap-1 font-mono hover:text-white"
                    >
                      Inspect Sheet on Google Drive
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div 
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                dragActive 
                  ? 'border-cyan-500 bg-cyan-950/15' 
                  : 'border-slate-900 bg-[#020306]/35 hover:bg-[#020306]/75 hover:border-slate-800'
              }`}
            >
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden" 
              />
              <Upload className="w-8 h-8 text-slate-500 mx-auto mb-2 animate-pulse" />
              <p className="text-[11px] font-mono text-slate-400 leading-normal">
                {t('uploadArea')}
              </p>
              {uploading && (
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-mono text-cyan-400 mt-2 animate-bounce">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Uploading item stream...
                </div>
              )}
            </div>

          </div>

          {/* RIGHT: Document explorer central listing */}
          <div className="lg:col-span-3 space-y-4 text-left">
            
            {/* Search Header and reload indicators */}
            <div className="bg-[#03050a] border border-slate-900 rounded-xl p-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <form onSubmit={handleSearchSubmit} className="relative w-full sm:max-w-md">
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('fileSearchPl')}
                  className="w-full bg-slate-950 border border-slate-900 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-800 font-mono"
                />
                <Search className="w-4 h-4 text-slate-600 absolute left-3 top-2.5" />
              </form>

              <button 
                onClick={() => loadFiles(accessToken, searchQuery)}
                disabled={loading}
                className="p-2 bg-slate-950 border border-slate-900 hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg flex items-center gap-1.5 text-xs font-mono font-medium transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                {lang === 'zh' ? '刷新项目' : 'Sync Refresh'}
              </button>
            </div>

            {/* List Table items container */}
            <div className="bg-[#03050a] border border-slate-900 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse font-sans">
                  <thead>
                    <tr className="bg-slate-950/70 border-b border-slate-900 font-mono text-[10px] text-slate-500 uppercase tracking-widest leading-loose">
                      <th className="py-3 px-4">Item Name</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">File Size</th>
                      <th className="py-3 px-4">Last Modified</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/65 text-xs text-slate-300">
                    {loading && files.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-slate-500 font-mono">
                          <Loader2 className="w-6 h-6 animate-spin text-cyan-400 mx-auto mb-2" />
                          Mapping secure cloud catalog...
                        </td>
                      </tr>
                    ) : files.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-16 text-center text-slate-500 font-mono">
                          No matching active documents found in workspace.
                        </td>
                      </tr>
                    ) : (
                      files.map((file) => (
                        <tr key={file.id} className="hover:bg-slate-950/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-normal">
                            <div className="flex items-center gap-2.5">
                              {getFileIcon(file.mimeType)}
                              <span className="text-white tracking-tight truncate max-w-[200px] sm:max-w-[340px]" title={file.name}>
                                {file.name}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[9.5px] text-slate-500 uppercase">
                            {file.mimeType === 'application/vnd.google-apps.folder' ? 'Folder' : file.mimeType.split('/').pop()?.split('.').pop() || 'File'}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">
                            {file.mimeType === 'application/vnd.google-apps.folder' ? '—' : getReadableSize(file.size)}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-500 text-[11px]">
                            {getLocalFormattedDate(file.modifiedTime || file.createdTime)}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2 font-mono">
                            {file.webViewLink && (
                              <a 
                                href={file.webViewLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 px-2.2 py-1 bg-slate-950 border border-slate-900 hover:bg-slate-900 text-slate-300 hover:text-white rounded transition-colors text-[10px]"
                              >
                                View
                                <ExternalLink className="w-3 h-3 text-cyan-400" />
                              </a>
                            )}
                            
                            {/* DESTMUTATIVE Action with warning trigger */}
                            <button 
                              onClick={() => askDeleteConfirmation(file.id, file.name)}
                              className="px-2.2 py-1 bg-red-950/10 hover:bg-red-950/30 text-red-500 hover:text-red-400 rounded border border-red-900/35 transition-colors text-[10px] cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* CREATE NEW FOLDER MINI MODAL SCREEN */}
      {showFolderModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[#0b0f1d] border border-slate-800 rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-fade-in">
            <div className="p-4 border-b border-slate-900 flex justify-between items-center text-left">
              <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">New Cloud Folder</span>
              <button onClick={() => setShowFolderModal(false)} className="text-slate-500 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateFolder} className="p-6 space-y-4 text-left">
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-slate-500 uppercase">Folder Name</label>
                <input 
                  type="text" 
                  required
                  value={folderName}
                  onChange={(e) => setFolderName(e.target.value)}
                  placeholder="e.g., invoices_backup"
                  className="w-full bg-[#05070f] border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-600 to-indigo-600 hover:opacity-95 font-semibold font-mono text-xs text-white uppercase"
              >
                Create Folder
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MANDATORY SAFE DELETION WARNING MODAL */}
      {pendingDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[#0b0f1d] border border-red-900/60 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-fade-in text-left">
            <div className="p-4 bg-red-950/20 border-b border-red-900/30 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">{t('safeDeleteTitle')}</span>
              </div>
              <button onClick={() => setPendingDeleteId(null)} className="text-slate-500 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {t('safeDeleteWarning')}
              </p>

              <div className="p-4 bg-slate-950 rounded-lg border border-slate-900 font-mono text-xs">
                <span className="block text-[10px] text-slate-500 uppercase mb-1">Target Object name:</span>
                <strong className="text-white block truncate">{pendingDeleteName}</strong>
                <span className="block text-[9px] text-slate-600 mt-2">ID: {pendingDeleteId}</span>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-mono text-slate-500 uppercase">
                  Type <span className="text-red-400 font-bold">DELETE</span> to confirm permanent destruction of this file:
                </label>
                <input 
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="DELETE"
                  className="w-full bg-[#05070f] border border-red-900/25 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-red-900/60 font-mono"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  onClick={() => setPendingDeleteId(null)}
                  className="flex-1 py-2.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-900 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={executeSafeDelete}
                  disabled={deleteConfirmText !== 'DELETE' || isDeleting}
                  className={`flex-1 py-2.5 rounded-lg font-semibold font-mono text-xs uppercase flex items-center justify-center gap-1.5 ${
                    deleteConfirmText === 'DELETE' 
                      ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20' 
                      : 'bg-red-950/20 text-red-500/50 border border-red-905/10 cursor-not-allowed'
                  }`}
                >
                  {isDeleting ? 'Deleting Object...' : 'Confirm destruction'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
