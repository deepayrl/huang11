import { useState } from 'react';
import { ArrowUpRight, CheckCircle2, TrendingUp, Layers, HelpCircle } from 'lucide-react';
import { Language, CaseStudyItem } from '../types';
import { CASE_STUDIES } from '../data/growthV4Data';

interface AiCaseStudiesProps {
  lang: Language;
}

export default function AiCaseStudies({ lang }: AiCaseStudiesProps) {
  const [selectedCase, setSelectedCase] = useState<CaseStudyItem | null>(null);

  const l = (obj: any, fallbackStr: string = '') => {
    if (!obj) return fallbackStr;
    return obj[lang] || obj['en'] || obj['it'] || fallbackStr;
  };

  const lArr = (obj: any): string[] => {
    if (!obj) return [];
    return obj[lang] || obj['en'] || obj['it'] || [];
  };

  // Translations
  const uiTranslations = {
    en: {
      heading: 'ROI & Enterprise Success Cases',
      subheading: 'Audited case studies showing how SMEs scale local margins, bypass high credit swipe commissions, and automate regional tax compliance with modaui OS.',
      labelBefore: 'Legacy Structure (Pain points):',
      labelAfter: 'Post-modaui Digitalization Boost:',
      labelAdopted: 'Active System Nodes Deployed:',
      labelMultiplier: 'Conversion Boost Growth',
      closeBtn: 'Close Case Overview',
      openBtn: 'Inspect Case Architecture'
    },
    it: {
      heading: 'Storie di Successo e Casi Studio ROI',
      subheading: 'Esempi certificati di aziende reali che hanno tagliato ore di lavoro amministrativo e azzerato commissioni di incasso superflue.',
      labelBefore: 'Prima (Struttura manuale precedente):',
      labelAfter: 'Dopo l\'Integrazione modaui:',
      labelAdopted: 'Moduli Commerciali Attivati:',
      labelMultiplier: 'Incremento Conversione',
      closeBtn: 'Chiudi Schermata',
      openBtn: 'Dettagli Architettura'
    },
    zh: {
      heading: '国际商户 ROI 实战成功白皮书',
      subheading: '深度透视欧洲优秀中小商企、连锁餐饮及零售中心，如何连接 modaui 实现收单零抽成、电子账款极速回笼、行政操作秒级闭环。',
      labelBefore: '重构前痛点 (Legacy Setup):',
      labelAfter: '集成 modaui 后的业绩暴涨指标:',
      labelAdopted: '已启用的智能核心组件:',
      labelMultiplier: '转化率净增幅度',
      closeBtn: '收起案例白皮书',
      openBtn: '透视项目拓扑架构'
    },
    fr: {
      heading: 'Cas de Succès & ROI Entreprises',
      subheading: 'Études de cas auditées montrant comment les PME améliorent leurs marges et automatisent leur fiscalité avec modaui OS.',
      labelBefore: 'Ancienne Structure (Pain points) :',
      labelAfter: 'Post-modaui Digitalisation Boost :',
      labelAdopted: 'Nœuds de système actifs déployés :',
      labelMultiplier: 'Hausse de Conversion',
      closeBtn: 'Fermer l\'aperçu',
      openBtn: 'Inspecter l\'architecture'
    },
    de: {
      heading: 'ROI & Praxis-Kundenberichte',
      subheading: 'Zertifizierte Fallbeispiele, wie KMUs mit modaui ihre Verwaltungskosten gesenkt und Steuerprozesse automatisiert haben.',
      labelBefore: 'Alte Struktur (Vormalige Schwachpunkte):',
      labelAfter: 'Nach der modaui-Digitalisierung:',
      labelAdopted: 'Dazu aktivierte Systemmodule:',
      labelMultiplier: 'Konversions-Steigerung',
      closeBtn: 'Schließen',
      openBtn: 'Architektur inspizieren'
    },
    es: {
      heading: 'Casos de Éxito & Retorno de Inversión',
      subheading: 'Estudios certificados sobre cómo las pymes expanden sus márgenes locales y automatizan el cumplimiento fiscal.',
      labelBefore: 'Estructura Anterior (Pain points):',
      labelAfter: 'Impulso Digital Post-modaui:',
      labelAdopted: 'Módulos Activos Desplegados:',
      labelMultiplier: 'Incremento de Conversión',
      closeBtn: 'Cerrar Caso',
      openBtn: 'Examinar Arquitectura'
    }
  }[lang] || {
    heading: 'ROI & Enterprise Success Cases',
    subheading: 'Audited case studies showing how SMEs scale local margins, bypass high credit swipe commissions, and automate regional tax compliance with modaui OS.',
    labelBefore: 'Legacy Structure (Pain points):',
    labelAfter: 'Post-modaui Digitalization Boost:',
    labelAdopted: 'Active System Nodes Deployed:',
    labelMultiplier: 'Conversion Boost Growth',
    closeBtn: 'Close Case Overview',
    openBtn: 'Inspect Case Architecture'
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto" id="case-studies">
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-400 text-xs font-mono uppercase tracking-widest inline-block mb-3">
          SaaS Validated Success
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white mb-3">
          {uiTranslations.heading}
        </h2>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          {uiTranslations.subheading}
        </p>
      </div>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {CASE_STUDIES.map((item) => (
          <div key={item.id} className="p-6 bg-[#04060c] border border-slate-900 rounded-3xl hover:border-slate-800 transition-all flex flex-col justify-between overflow-hidden relative group animate-fade-in">
            <div className="absolute top-0 right-10 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none" />

            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900/30 uppercase">
                    {item.industry}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1.5 font-display">
                    {l(item.title)}
                  </h4>
                </div>

                <div className="bg-[#020306] p-2 rounded-xl text-center border border-slate-910 shrink-0">
                  <span className="block text-[8px] font-mono text-slate-500 uppercase">{uiTranslations.labelMultiplier}</span>
                  <span className="text-emerald-400 font-bold font-display text-xs sm:text-sm">{item.conversionBoost}</span>
                </div>
              </div>

              {/* Incremental data progress */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-900 text-xs">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 block mb-1 font-semibold">Performance Volume:</span>
                  <span className="text-slate-200 block font-mono">{item.visitorCount}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 block mb-1 font-semibold">SaaS Verification:</span>
                  <span className="text-slate-200 block font-mono">modaui-VER-{item.id.toUpperCase()}</span>
                </div>
              </div>

              {/* Before and After items inline description preview */}
              <div className="space-y-2 pt-2 text-xs leading-normal font-sans">
                <p className="text-slate-400"><strong className="text-amber-500">{uiTranslations.labelBefore}</strong> {l(item.challenge)}</p>
                <p className="text-slate-200"><strong className="text-emerald-450">{uiTranslations.labelAfter}</strong> {l(item.solution)}</p>
              </div>
            </div>

            <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-900">
              <span className="text-[10px] font-mono text-slate-500">
                100% Verified ROI Proof
              </span>
              <button
                onClick={() => setSelectedCase(item)}
                className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-white transition-colors py-1 px-4 bg-[#070914] border border-slate-850 hover:bg-slate-800 rounded-lg pointer-events-auto cursor-pointer"
              >
                <span>{uiTranslations.openBtn}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal / Overlay Case Inspector */}
      {selectedCase && (
        <div className="fixed inset-0 bg-[#04060bc0] backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in" id="modal-case-detail">
          <div className="bg-[#070a18] border border-slate-800 rounded-3xl p-6 max-w-2xl w-full space-y-6 relative max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start border-b border-slate-900 pb-4">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-800/30">
                  {selectedCase.industry} • SUCCESS BLUEPRINT DATA
                </span>
                <h3 className="text-xl font-bold text-white font-display mt-2">{l(selectedCase.title)}</h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="text-slate-450 hover:text-white text-lg font-bold p-1 bg-slate-900 rounded-full w-8 h-8 flex items-center justify-center border border-slate-800 pointer-events-auto cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-300 leading-relaxed font-sans">
              <div className="p-4 bg-amber-950/15 border border-amber-900/30 rounded-xl space-y-1.5">
                <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest block font-bold">❌ {uiTranslations.labelBefore}</span>
                <p>{l(selectedCase.challenge)}</p>
              </div>

              <div className="p-4 bg-emerald-950/15 border border-emerald-900/30 rounded-xl space-y-1.5">
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block font-bold">✅ {uiTranslations.labelAfter}</span>
                <p>{l(selectedCase.solution)}</p>
              </div>

              <div className="p-4 bg-purple-950/15 border border-purple-900/30 rounded-xl space-y-1.5">
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block font-bold">📈 AUDITED BOTTOM-LINE EBITDA RESULT:</span>
                <p className="text-white font-semibold font-mono">{l(selectedCase.roi)}</p>
              </div>

              {/* Technologies / System nodes adopt checklist */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                  {uiTranslations.labelAdopted}
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-xs text-slate-300">
                  {lArr(selectedCase.flowSteps).map((step, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 select-none" />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end border-t border-slate-900 pt-4">
              <button
                onClick={() => setSelectedCase(null)}
                className="py-2.5 px-5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 block text-xs font-semibold text-slate-200 transition-colors pointer-events-auto cursor-pointer"
              >
                {uiTranslations.closeBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
