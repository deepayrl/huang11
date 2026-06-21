import { useState } from 'react';
import { LayoutGrid, Download, Star, CheckCircle, ArrowUpRight, Cpu } from 'lucide-react';
import { CommerceTemplate, DownloadKit, Language } from '../types';
import { TEMPLATES, DOWNLOADS_CENTER } from '../data/seoData';

interface TemplatesDownloadProps {
  lang: Language;
}

export default function TemplatesDownload({ lang }: TemplatesDownloadProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<CommerceTemplate | null>(TEMPLATES[0]);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const t = {
    en: {
      sectionTitle: 'Merchant DNA Templates & Hub',
      sectionSubtitle: 'Bypass long development cycles. Load pre-configured operating models customized for physical shops, Michelin-star tables, and high-volume local boutiques.',
      categoryLabel: 'Category:',
      downloadsLabel: 'Installations:',
      ratingLabel: 'User Rating:',
      ctaBtn: 'One-Click Deploy DNA',
      featuresLabel: 'Included System Nodes:',
      downloadCenterHeader: 'Ecosystem Downloads Store',
      downloadSubtitle: 'Useful worksheets, checklist bundles, and direct digital blueprint configs.',
      freeBadge: 'Free Access',
      importAlert: 'Successfully injected DNA blueprint. Config is primed for your modaui account!'
    },
    it: {
      sectionTitle: 'Template di Commercio DNA',
      sectionSubtitle: 'Salva tempo e configurazioni. Carica schemi predefiniti ottimizzati per negozi fisici, bistrot e catene locali.',
      categoryLabel: 'Categoria:',
      downloadsLabel: 'Installazioni:',
      ratingLabel: 'Valutazione:',
      ctaBtn: 'Installa DNA nel mio OS',
      featuresLabel: 'Moduli di Sistema Inclusi:',
      downloadCenterHeader: 'Negozio dei Download gratuiti',
      downloadSubtitle: 'File excel per calcolo marginalità, tabelle scontrini e blueprint pronti.',
      freeBadge: 'Gratis',
      importAlert: 'DNA importato con successo! Configurazione pronta per l\'account modaui.'
    },
    zh: {
      sectionTitle: '商业行业深度“DNA 配置环境库”',
      sectionSubtitle: '免却复杂的调试。拖拽搭载精调的零售与本地运营模型，囊括点位税种、智能营销流、及会员分群规则。',
      categoryLabel: '行业分类:',
      downloadsLabel: '已部署安装次数:',
      ratingLabel: '好评度:',
      ctaBtn: '一键部署 DNA 至我的后台',
      featuresLabel: '内建系统模块及指令集:',
      downloadCenterHeader: '下载中心与运营包',
      downloadSubtitle: '下载财务报税核算沙盒、开业清单以及一键式离线商铺数字模型。',
      freeBadge: '免费提供',
      importAlert: '行业 DNA 属性数据解包并注册成功！已关联至控制台系统。'
    }
  }[lang];

  const handleDeploy = (title: string) => {
    setSuccessMsg(`${t.importAlert} [${title}]`);
    setTimeout(() => {
      setSuccessMsg(null);
    }, 4500);
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto" id="templates">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-950/40 text-purple-400 text-xs uppercase font-mono tracking-widest inline-block mb-3">
          Marketplace Environment
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white">
          {t.sectionTitle}
        </h2>
        <p className="mt-3 text-slate-400 text-sm md:text-base">
          {t.sectionSubtitle}
        </p>
      </div>

      {/* Grid displaying templates lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* Template List selector */}
        <div className="col-span-1 lg:col-span-5 space-y-3">
          {TEMPLATES.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTemplate(item)}
              className={`w-full text-left p-4 rounded-xl border transition-all pointer-events-auto ${
                selectedTemplate?.id === item.id
                  ? 'border-cyan-500 bg-cyan-950/20 shadow-md'
                  : 'border-slate-850 hover:border-slate-700 bg-slate-900/40'
              }`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] uppercase font-mono tracking-wide text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded-md">
                  {item.category}
                </span>
                <div className="flex items-center gap-1 text-amber-400 text-xs font-mono">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{item.rating}</span>
                </div>
              </div>
              <h4 className="text-sm font-semibold text-white mt-2 font-display">
                {item.title[lang]}
              </h4>
            </button>
          ))}
        </div>

        {/* Selected template detailed view */}
        <div className="col-span-1 lg:col-span-7 bg-[#0b0e1e] border border-slate-800 p-6 rounded-2xl glow-card relative">
          {selectedTemplate ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-900 pb-4 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-white font-display">
                    {selectedTemplate.title[lang]}
                  </h3>
                  <div className="flex gap-4 text-xs text-slate-400 mt-1 font-mono">
                    <span>{t.categoryLabel} <strong className="text-slate-200">{selectedTemplate.category}</strong></span>
                    <span>{t.downloadsLabel} <strong className="text-slate-200">{selectedTemplate.downloads} times</strong></span>
                  </div>
                </div>

                <div className="bg-[#070914] px-4 py-2 rounded-xl border border-slate-850 text-right min-w-[120px]">
                  <span className="block text-[9px] uppercase font-mono text-slate-500">
                    {selectedTemplate.metrics.label[lang]}
                  </span>
                  <span className="text-xl font-bold text-glow-blue font-display text-cyan-400">
                    {selectedTemplate.metrics.value}
                  </span>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedTemplate.description[lang]}
              </p>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 tracking-wider">
                  {t.featuresLabel}
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedTemplate.features[lang].map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Status or Alert feedback bar */}
              {successMsg && (
                <div className="p-3 bg-cyan-950/40 border border-cyan-800 text-cyan-300 text-xs font-mono rounded-lg animate-pulse" id="alert-install-success">
                  {successMsg}
                </div>
              )}

              <div className="flex justify-end pt-4 border-t border-slate-900">
                <button
                  onClick={() => handleDeploy(selectedTemplate.title[lang])}
                  className="flex items-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:opacity-90 transition-opacity font-semibold text-xs text-white"
                  id={`btn-deploy-dna-${selectedTemplate.id}`}
                >
                  <Cpu className="w-4 h-4 text-cyan-200" />
                  <span>{t.ctaBtn}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              Select any template configuration and review systems structure.
            </div>
          )}
        </div>
      </div>

      {/* Download Center - Phase 5 / Materials download kits */}
      <h3 className="text-xl font-display font-medium text-white mb-6 pt-4 border-t border-slate-900 flex items-center gap-2">
        <span>{t.downloadCenterHeader}</span>
        <span className="px-2.5 py-0.5 rounded bg-purple-950/60 text-purple-400 text-[10px] font-mono border border-purple-800/40">
          Downloads library
        </span>
      </h3>
      <p className="text-slate-400 text-xs mb-8 max-w-2xl">{t.downloadSubtitle}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DOWNLOADS_CENTER.map((kit) => (
          <div key={kit.id} className="p-5 bg-slate-950/40 border border-slate-850 hover:border-slate-800 rounded-xl flex flex-col justify-between transition-colors">
            <div>
              <div className="flex justify-between items-start">
                <span className="bg-slate-900 text-[9px] font-mono font-medium text-cyan-400 border border-cyan-900/60 px-2 py-0.5 rounded">
                  {kit.fileType} • {kit.fileSize}
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/20 border border-amber-900/30 px-2 py-0.5 rounded">
                  {kit.tag[lang]}
                </span>
              </div>
              <h4 className="text-sm font-semibold text-white mt-3 font-display">
                {kit.name[lang]}
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {kit.description[lang]}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-slate-900/60">
              <span className="text-[10px] font-mono text-slate-500">
                {kit.downloads.toLocaleString()} downloads
              </span>
              <button
                onClick={() => {
                  alert(lang === 'zh'
                    ? `⬇️ 正在为你从安全节点打包并分发模组： [${kit.name[lang]}] 进行离线归档保存。`
                    : `⬇️ Packing and downloading kit [${kit.name[lang]}] directly from secure servers.`);
                }}
                className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 hover:text-white transition-colors py-1 px-3.5 bg-slate-900 border border-slate-850 hover:bg-slate-850 rounded-lg"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.freeBadge}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
