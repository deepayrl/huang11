import { useState } from 'react';
import { Copy, Check, Terminal, Layers, Cpu, Compass } from 'lucide-react';
import { Language, PromptItem } from '../types';
import { PROMPTS } from '../data/growthV4Data';

interface AiPromptsHubProps {
  lang: Language;
}

export default function AiPromptsHub({ lang }: AiPromptsHubProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const l = (obj: any, fallbackStr: string = '') => {
    if (!obj) return fallbackStr;
    return obj[lang] || obj['en'] || obj['it'] || fallbackStr;
  };

  const categories = [
    { id: 'all', label: { en: 'All Categories', it: 'Tutte le categorie', zh: '全部大模型提示词' } },
    { id: 'all-finance', label: { en: 'Audit & Compliance', it: 'Conformità IVA', zh: '财税审计与 VAT' } },
    { id: 'all-marketing', label: { en: 'Growth Marketing', it: 'Marketing Digitale', zh: '程序化流量营销' } }
  ];

  // Translations
  const uiTranslations = {
    en: {
      heading: 'AI High-Performance Prompts Hub',
      subheading: 'Access copyable expert prompting codes calibrated directly for Google Gemini and ChatGPT platforms. Power your accounting audits, metadata generators, and inventory predictions.',
      labelSystem: 'Calibrated System & User Instruction Blueprint:',
      labelUser: 'Typical Operation Context / Application Advice:',
      labelAdvice: '🤖 AI Model Deployment Guidance:',
      badgeCopy: 'Copy Code',
      copied: 'Prompt copied!'
    },
    it: {
      heading: 'Centro Prompt ad Alte Prestazioni',
      subheading: 'Accedi a istruzioni predefinite pronte per essere copiate e usate con Google Gemini o ChatGPT. Ottimizza audit di bilancio e logistica.',
      labelSystem: 'Blocco Istruzioni di Ruolo Calibrato:',
      labelUser: 'Consigli per l\'applicazione pratica:',
      labelAdvice: '🤖 Guida di Rilascio del Modello AI:',
      badgeCopy: 'Copia Prompt',
      copied: 'Prompt copiato!'
    },
    zh: {
      heading: '商用大模型指令集 / 蓝图中心',
      subheading: '由 modaui 财税及供应链专家深度撰写。100% 贴合 Google Gemini 多模态长上下文处理环境。涵盖自动发票审计、程序化 SEO 脚本等高价值场景。',
      labelSystem: 'System 角色提示词与多维语境机制 (System Instructions):',
      labelUser: '生产环境运行上下文及应用范式描述:',
      labelAdvice: '🤖 推荐对接 AI 物理模型执行规则:',
      badgeCopy: '一键抓取指令代码',
      copied: '指令集代码已复制！'
    },
    fr: {
      heading: 'Centre de Prompts IA Haute Performance',
      subheading: 'Accédez à des invites prêtes à copier, calibrées pour Google Gemini et ChatGPT. Optimisez vos audits financiers et votre visibilité SEO.',
      labelSystem: 'Instructions de Rôle Système Calibré :',
      labelUser: 'Modèle de contexte utilisateur et conseils:',
      labelAdvice: '🤖 Guide de déploiement de modèles IA :',
      badgeCopy: 'Copier le Prompt',
      copied: 'Prompt copié !'
    },
    de: {
      heading: 'KI-Schnittstellen & Prompt-Bibliothek',
      subheading: 'Kopierfertige, praxiserprobte System- und Userprompts für Google Gemini und ChatGPT zur Prozessautomatisierung.',
      labelSystem: 'System-Rolle Befehlsblock (Kalibriert):',
      labelUser: 'Praxisbezogene Anwendungs-Richtlinien:',
      labelAdvice: '🤖 KI-Modell Empfehlungen:',
      badgeCopy: 'Prompt kopieren',
      copied: 'Prompt kopiert!'
    },
    es: {
      heading: 'Centro de Prompts IA de Alto Impacto',
      subheading: 'Encuentre códigos de prompts optimizados para Google Gemini y ChatGPT. Dirija auditorías contables y genere tráfico SEO.',
      labelSystem: 'Bloque de Instrucciones del Sistema Calibrado:',
      labelUser: 'Casos y Consejos de Uso Práctico:',
      labelAdvice: '🤖 Sugerencia de Modelo de IA:',
      badgeCopy: 'Copiar Prompt',
      copied: '¡Prompt copiado!'
    }
  }[lang] || {
    heading: 'AI High-Performance Prompts Hub',
    subheading: 'Access copyable expert prompting codes calibrated directly for Google Gemini and ChatGPT platforms. Power your accounting audits, metadata generators, and inventory predictions.',
    labelSystem: 'Calibrated System & User Instruction Blueprint:',
    labelUser: 'Typical Operation Context / Application Advice:',
    labelAdvice: '🤖 AI Model Deployment Guidance:',
    badgeCopy: 'Copy Code',
    copied: 'Prompt copied!'
  };

  const handleCopy = (system: string, user: string, id: string) => {
    const combined = `=== SYSTEM PROMPT ===\n${system}\n\n=== EXPLANATION ===\n${user}`;
    navigator.clipboard.writeText(combined);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto" id="ai-prompts">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-400 text-xs font-mono uppercase tracking-widest inline-block mb-3">
          Prompt Engineering Store
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white mb-3">
          {uiTranslations.heading}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          {uiTranslations.subheading}
        </p>
      </div>

      {/* Prompts Layout lists */}
      <div className="space-y-8">
        {PROMPTS.map((prompt) => (
          <div key={prompt.id} className="bg-[#04060c] border border-slate-900 rounded-3xl p-6 relative flex flex-col justify-between overflow-hidden group hover:border-slate-800 transition-colors animate-fade-in">
            <div className="absolute top-0 right-1/4 w-32 h-32 bg-purple-600/5 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4">
              {/* Top Meta info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 gap-3">
                <div className="space-y-1">
                  <span className="px-2.5 py-0.5 rounded bg-[#100d23] text-purple-400 text-[10px] font-mono border border-purple-900/50 uppercase">
                    {l(prompt.category)} • ID: {prompt.id}
                  </span>
                  <h3 className="text-lg font-bold text-white font-display mt-1">
                    {l(prompt.title)}
                  </h3>
                </div>

                {/* Rating stats */}
                <div className="flex gap-4 font-mono text-[10px] text-slate-500">
                  <div>LLM Context alignment: <strong className="text-slate-200">Excellent</strong></div>
                  <div>Output schema: <strong className="text-slate-200">JSON/Strict</strong></div>
                </div>
              </div>

              {/* Promo Prompt Display Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* System Prompt container */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-purple-500" />
                    <span>{uiTranslations.labelSystem}</span>
                  </span>
                  <pre className="p-4 bg-slate-950 text-purple-300 text-xs font-mono rounded-xl border border-slate-910 overflow-y-auto max-h-[160px] whitespace-pre-wrap leading-relaxed select-all">
                    {l(prompt.promptText)}
                  </pre>
                </div>

                {/* User Prompt container */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-cyan-500" />
                    <span>{uiTranslations.labelUser}</span>
                  </span>
                  <div className="p-4 bg-[#010205] text-slate-300 text-xs font-mono rounded-xl border border-slate-910 overflow-y-auto max-h-[160px] leading-relaxed">
                    {l(prompt.usageContext)}
                  </div>
                </div>
              </div>

              {/* Implementation recommendation */}
              <div className="p-3 bg-[#020306] rounded-xl border border-slate-850/60 text-xs text-slate-400 font-mono mt-2 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-purple-400 shrink-0 select-none" />
                <span>
                  <strong>{uiTranslations.labelAdvice}</strong> Execute with <strong className="text-white font-mono">{prompt.recommendedModel}</strong> for optimal multi-turn reasoning and JSON-LD safe responses.
                </span>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex justify-end pt-4 mt-4 border-t border-slate-900">
              <button
                onClick={() => handleCopy(l(prompt.promptText), l(prompt.usageContext), prompt.id)}
                className="flex items-center gap-1.5 py-2 px-5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:opacity-90 font-semibold text-xs text-white max-w-[180px] pointer-events-auto transition-opacity cursor-pointer"
              >
                {copiedId === prompt.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>{uiTranslations.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-purple-200" />
                    <span>{uiTranslations.badgeCopy}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
