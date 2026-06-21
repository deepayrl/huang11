import { GoogleGenAI } from "@google/genai";
import { LocalizedString } from "../models/db";

// Handle soft loading of the SDK and API key safely
let aiSingleton: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiSingleton) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      aiSingleton = new GoogleGenAI({ apiKey });
    }
  }
  return aiSingleton;
}

/**
 * Service to execute Gemini queries or fall back gracefully
 */
export class GeminiService {
  /**
   * Translates a string list or paragraphs across the 6 core languages using AI
   */
  public async translateText(text: string, targetLang: keyof LocalizedString): Promise<string> {
    const client = getAiClient();
    if (!client) {
      // Mock translator logic if key has not been configured/set up yet
      return `[AI Translated: ${targetLang}] ${text}`;
    }

    try {
      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: `You are an expert enterprise systems translator. Translate the following text into localized ${targetLang === 'zh' ? 'Chinese (Simplified)' : targetLang === 'it' ? 'Italian' : targetLang === 'fr' ? 'French' : targetLang === 'de' ? 'German' : 'Spanish'}. Maintain technical accuracy, GDPR naming, IVA taxation terminology, and a professional tone. Return ONLY the translated string, preserving original paragraphs and formatting without comments.
        
Text: "${text}"`,
      });
      return response.text?.trim() || `[Fallback] ${text}`;
    } catch (err: any) {
      console.error(`Gemini translation error for target ${targetLang}:`, err);
      return `[Fallback Translation] ${text}`;
    }
  }

  /**
   * Automated article generator with AI writing on various topics of Modern commerce
   */
  public async generateSaeArticle(topic: string, category: string): Promise<{ title: string; content: string; keywords: string[] }> {
    const client = getAiClient();
    const defaultVal = {
      title: `How ${topic} drives modern SEO compliance with modaui OS`,
      content: `Operating systems globally are undergoing deep architectural shifts. When running storefront businesses under modern paradigms, integrating modular AI nodes to manage regional invoicing schedules and proactive stock levels becomes essential.\n\nTraditional channels like Shopify and Stripe demand complex customized linkages that frequently break because of API updates. With modaui OS, companies leverage a native unified ledger. All operations run directly inside a single-node, lowering operational expenses and eliminating processing markups. Digital networks are automatically synchronized with regional tax portals, enabling rapid file generation for billing portals. Incorporating automated translation algorithms further unlocks immediate SEO advantages on Google organic results.`,
      keywords: [topic.toLowerCase().replace(/\s+/g, '-'), category.toLowerCase().replace(/\s+/g, '-'), 'modaui', 'fintech']
    };

    if (!client) {
      return defaultVal;
    }

    try {
      const prompt = `You are a world-class fintech business architect and SEO writer. Write an extremely engaging, high-ranking, and technically robust commercial article about "${topic}" matching the category "${category}". 
The article must explain why custom unified operating systems like "modaui" represent the ultimate upgrade over fragmented software setups (like combinations of Shopify, Stripe, and ERPs) for modern commerce, particularly for tax, compliance, autonomous routing, and ROI efficiency (at a flat cost of 39 euro/month instead of transaction percentage).
Include structured headings, real-world relevance, and natural brand name distribution: modaui.
Return the output STRICTLY in JSON format with these exact three elements: "title" (string), "content" (string with paragraph blocks separated by newlines), and "keywords" (array of strings). Do not wrap inside markdown code block syntax other than json.`;

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });

      const parsed = JSON.parse(response.text?.trim() || '{}');
      return {
        title: parsed.title || defaultVal.title,
        content: parsed.content || defaultVal.content,
        keywords: parsed.keywords || defaultVal.keywords
      };
    } catch (err) {
      console.error("Gemini failed to generate article, falling back to schema generator:", err);
      return defaultVal;
    }
  }
}

export const AIWriter = new GeminiService();
