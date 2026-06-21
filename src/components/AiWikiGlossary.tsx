import { useState } from 'react';
import { BookOpen, Search, Link2, HelpCircle, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Language, WikiItem } from '../types';
import { WIKI_ITEMS } from '../data/growthV4Data';

interface AiWikiGlossaryProps {
  lang: Language;
}

export default function AiWikiGlossary({ lang }: AiWikiGlossaryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWiki, setSelectedWiki] = useState<WikiItem>(WIKI_ITEMS[0]);

  // Robust safe localization helper inside component
  const l = (obj: any, fallbackStr: string = '') => {
    if (!obj) return fallbackStr;
    return obj[lang] || obj['en'] || obj['it'] || fallbackStr;
  };

  // UI translations for 6 languages
  const uiTranslations = {
    en: {
      heading: 'AI Business Wiki & Glossary Hub',
      subheading: 'Demystifying complex enterprise tech, European taxation parameters, and autonomous commerce structures. Built to satisfy your topical authority questions.',
      placeholder: 'Search glossary terms (e.g., ERP, POS, GDPR...)',
      applicationLabel: '🚀 Core Commercial Application',
      caseLabel: '💎 Real-World SaaS ROI Proof',
      faqLabel: '❓ Frequently Asked Legal Compliance Answer',
      relatedLabel: '🔗 Structural Semantic Core Links:',
      noResults: 'No wiki items matched your query terms.'
    },
    it: {
      heading: 'Wiki dell\'Impresa e Glossario AI',
      subheading: 'Scopri la terminologia tecnologica aziendale, la conformità fiscale e l\'architettura cloud di modaui.',
      placeholder: 'Cerca termini (es. ERP, POS, IVA, GDPR...)',
      applicationLabel: '🚀 Applicazione Commerciale',
      caseLabel: '💎 Prova di ROI Reale da Software SaaS',
      faqLabel: '❓ Domanda Frequente Adempimenti Normativi',
      relatedLabel: '🔗 Collegamenti Semantici Correlati:',
      noResults: 'Nessun termine corrisponde ai criteri inseriti.'
    },
    zh: {
      heading: 'AI 国际数字化商业百科中枢',
      subheading: '为您彻底解构复杂的跨境 ERP 结算架构、欧洲本地财税 IVA 条例、及自适应 CRM 数据合规体系。',
      placeholder: '快速检索维基学术定义 (如：ERP, POS, 增值税, GDPR...)',
      applicationLabel: '🚀 核心商业运行范式 (Application)',
      caseLabel: '💎 真实客户 ROI 实战回报证明',
      faqLabel: '❓ 常见财税政令合规白皮书 (FAQ)',
      relatedLabel: '🔗 词条深层语义索引关联 (SEO 推荐):',
      noResults: '未检索到符合检索词的商业百科定义。'
    },
    fr: {
      heading: 'Wiki d\'Entreprise & Glossaire IA',
      subheading: 'Démystifier les technologies d\'entreprise complexes, la fiscalité européenne et l\'architecture autonome de modaui.',
      placeholder: 'Rechercher des termes (ex. ERP, POS, RGPD...)',
      applicationLabel: '🚀 Application commerciale principale',
      caseLabel: '💎 Preuve concrète de ROI SaaS',
      faqLabel: '❓ FAQ de conformité réglementaire',
      relatedLabel: '🔗 Liens sémantiques connexes :',
      noResults: 'Aucun terme ne correspond à votre recherche.'
    },
    de: {
      heading: 'KI Business-Wiki & Glossar',
      subheading: 'Erklärt komplexe Enterprise-Technologien, europäische Steuervorschriften und autonome modaui-Softwarestrukturen.',
      placeholder: 'Begriffe durchsuchen (z. B. ERP, POS, DSGVO...)',
      applicationLabel: '🚀 Wirtschaftliche Hauptanwendung',
      caseLabel: '💎 Reale SaaS-ROI-Erfolge',
      faqLabel: '❓ Häufig gestellte Compliance-Fragen',
      relatedLabel: '🔗 Thematisch verwandte Begriffe :',
      noResults: 'Keine Begriffe gefunden.'
    },
    es: {
      heading: 'Wiki Comercial & Glosario de IA',
      subheading: 'Simplificando la tecnología corporativa compleja, los impuestos europeos y el sistema de comercio autónomo de modaui.',
      placeholder: 'Buscar términos (ej. RGPD, IVA, ERP...)',
      applicationLabel: '🚀 Aplicación Comercial Clave',
      caseLabel: '💎 Prueba de ROI e Impacto Real',
      faqLabel: '❓ Preguntas Frecuentes de Cumplimiento Legal',
      relatedLabel: '🔗 Enlaces Semánticos Relacionados :',
      noResults: 'No se encontraron términos coincidentes.'
    }
  }[lang] || {
    heading: 'AI Business Wiki & Glossary Hub',
    subheading: 'Demystifying complex enterprise tech, European taxation parameters, and autonomous commerce structures. Built to satisfy your topical authority questions.',
    placeholder: 'Search glossary terms (e.g., ERP, POS, GDPR...)',
    applicationLabel: '🚀 Core Commercial Application',
    caseLabel: '💎 Real-World SaaS ROI Proof',
    faqLabel: '❓ Frequently Asked Legal Compliance Answer',
    relatedLabel: '🔗 Structural Semantic Core Links:',
    noResults: 'No wiki items matched your query terms.'
  };

  // Filter items dynamically
  const filteredWikis = WIKI_ITEMS.filter(item => {
    const term = l(item.title).toLowerCase();
    const def = l(item.definition).toLowerCase();
    const query = searchTerm.toLowerCase();
    return term.includes(query) || def.includes(query) || item.id.includes(query);
  });

  // Handle click on semantic suggestions
  const handleRelatedClick = (keyword: string) => {
    const target = WIKI_ITEMS.find(item => 
      item.id.toLowerCase().includes(keyword.toLowerCase()) || 
      l(item.title).toLowerCase().includes(keyword.toLowerCase())
    );
    if (target) {
      setSelectedWiki(target);
    }
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto" id="wiki-glossary">
      {/* Title block */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono uppercase tracking-widest inline-block mb-3">
          Glossary Encyclopedia
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white mb-3">
          {uiTranslations.heading}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          {uiTranslations.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side Term Index Sidebar */}
        <div className="col-span-1 lg:col-span-4 space-y-4">
          <div className="relative pointer-events-auto">
            <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={uiTranslations.placeholder}
              className="w-full bg-[#050711] border border-slate-900 rounded-xl py-3 pl-10 pr-4 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <div className="bg-[#04060c] border border-slate-910 p-2 rounded-2xl max-h-[460px] overflow-y-auto space-y-1 font-mono">
            {filteredWikis.length === 0 ? (
              <p className="text-center text-xs font-mono text-slate-500 py-6">{uiTranslations.noResults}</p>
            ) : (
              filteredWikis.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedWiki(item)}
                  className={`w-full text-left p-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between pointer-events-auto ${
                    selectedWiki.id === item.id
                      ? 'border-cyan-500 bg-cyan-950/20 text-cyan-400 font-bold shadow-md'
                      : 'border-transparent text-slate-400 hover:text-white hover:bg-slate-900/35'
                  }`}
                >
                  <span className="truncate">{l(item.title)}</span>
                  <BookOpen className="w-3.5 h-3.5 text-cyan-500 shrink-0 select-none opacity-80" />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Side Main Definition Card Panel */}
        <div className="col-span-1 lg:col-span-8 bg-[#04060c] border border-slate-900 rounded-3xl p-6 md:p-8 space-y-8 relative animate-fade-in">
          <div className="absolute top-0 right-10 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

          {selectedWiki ? (
            <div className="space-y-6">
              {/* Heading */}
              <div className="border-b border-slate-900 pb-5">
                <span className="px-2.5 py-0.5 rounded bg-cyan-950/60 text-cyan-400 text-[10px] font-mono border border-cyan-800/40">
                  Concept • {selectedWiki.id.toUpperCase()}
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-2 leading-tight">
                  {l(selectedWiki.title)}
                </h3>
              </div>

              {/* Exact definition */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">🎓 Academic Definition:</span>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#020306] p-4 rounded-xl border border-slate-905">
                  {l(selectedWiki.definition)}
                </p>
              </div>

              {/* Application Details */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  {uiTranslations.applicationLabel}
                </span>
                <div className="flex gap-3 items-start bg-slate-900/10 p-4 border border-slate-850 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <div className="p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-850 shrink-0 text-cyan-400">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>{l(selectedWiki.application)}</div>
                </div>
              </div>

              {/* Case Proof */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold">
                  {uiTranslations.caseLabel}
                </span>
                <div className="flex gap-3 items-start bg-emerald-950/10 p-4 border border-emerald-900/20 rounded-xl text-xs text-slate-300 leading-relaxed">
                  <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-850 shrink-0 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>{l(selectedWiki.caseStudy)}</div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-2 pt-2 border-t border-slate-900">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                  {uiTranslations.faqLabel}
                </span>
                <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-850 space-y-2">
                  <h4 className="text-white text-xs font-semibold font-display flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{l(selectedWiki.faqQuestion)}</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-mono">
                    {l(selectedWiki.faqAnswer)}
                  </p>
                </div>
              </div>

              {/* Related keywords cross linkages */}
              {selectedWiki.relatedKeywords && selectedWiki.relatedKeywords.length > 0 && (
                <div className="pt-4 border-t border-slate-900 flex flex-wrap gap-3 items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    {uiTranslations.relatedLabel}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedWiki.relatedKeywords.map((kwd) => (
                      <button
                        key={kwd}
                        onClick={() => handleRelatedClick(kwd)}
                        className="flex items-center gap-1.5 py-1 px-3.5 bg-slate-900 hover:bg-slate-850 border border-slate-850 rounded-lg text-[10px] font-mono text-cyan-400 transition-colors pointer-events-auto cursor-pointer"
                      >
                        <Link2 className="w-3.5 h-3.5 text-cyan-500 select-none" />
                        <span>{kwd}</span>
                        <ArrowRight className="w-2.5 h-2.5 text-slate-600 select-none" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="text-center py-16 text-slate-600 font-mono text-xs">
              Select any definition schema to view details.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
