import { useState } from 'react';
import { 
  FileSpreadsheet, Calculator, Sparkles, QrCode, Plus, Trash2, Download, Check, Copy, 
  TrendingUp, Landmark, ShieldAlert, BadgeInfo, Code, Network, Search, FileCode, CheckCircle, HelpCircle
} from 'lucide-react';
import { Language } from '../types';

interface ToolsCenterProps {
  lang: Language;
}

type ToolCategory = 'finance' | 'diagnostic' | 'seo';

export default function ToolsCenter({ lang }: ToolsCenterProps) {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('finance');
  const [activeTool, setActiveTool] = useState<string>('invoice');
  const [isCopied, setIsCopied] = useState<string | null>(null);

  const triggerCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2000);
  };

  // Translations Map for all 6 languages
  const translations = {
    en: {
      title: 'modaui AI Interactive Commerce Suite',
      subtitle: 'Free premium tools to calculate EBITDA margins, evaluate system health, format tags, and draft schema markups.',
      catFinance: '📊 Financial & Cashflow',
      catDiagnostic: '🧬 Enterprise Scores',
      catSeo: '🌐 SEO Engines',
      btnStart: 'Start with modaui',
      appRedirectLabel: 'Redirecting to full automated client billing dashboard via https://app.modaui.com...'
    },
    it: {
      title: 'Suite di Strumenti Interattivi modaui',
      subtitle: 'Strumenti premium gratuiti per calcolare margini, diagnosticare sistemi fiscali ed esportare tag di markup.',
      catFinance: '📊 Finanza e Flussi di Cassa',
      catDiagnostic: '🧬 Punteggi Aziendali',
      catSeo: '🌐 SEO e Metadati',
      btnStart: 'Inizia con modaui',
      appRedirectLabel: 'Reindirizzamento al pannello di fatturazione clienti via https://app.modaui.com...'
    },
    zh: {
      title: 'modaui 智能交互式多维商业工具箱',
      subtitle: '免费的跨境专家级运营套件：秒级核对欧洲利润税额、检测企业中枢准备度、一键构建规范 JSON-LD 数据图谱。',
      catFinance: '📊 财务精算与现金流',
      catDiagnostic: '🧬 商业系统健康评测',
      catSeo: '🌐 SEO 与元数据生成器',
      btnStart: '免费部署 modaui',
      appRedirectLabel: '即将跳转至 modaui 自动化商户结算看板（系统将在后台保持激活）...'
    },
    fr: {
      title: 'Suite interactive de commerce de modaui',
      subtitle: 'Outils professionnels gratuits pour estimer vos marges, auditer l\'infrastructure et générer du balisage de métadonnées.',
      catFinance: '📊 Finance & Trésorerie',
      catDiagnostic: '🧬 Scores d\'Entreprise',
      catSeo: '🌐 Outils SEO & Métadonnées',
      btnStart: 'Débuter avec modaui',
      appRedirectLabel: 'Redirection vers la console automatisée : https://app.modaui.com...'
    },
    de: {
      title: 'Interaktive modaui Commerce-Tools',
      subtitle: 'Kostenlose Premium-Schnittstellen zur Berechnung von Margen, Systemtests und zur Erstellung von strukturierten JSON-LD-Daten.',
      catFinance: '📊 Finanzen & Cashflow',
      catDiagnostic: '🧬 Systemleistungstests',
      catSeo: '🌐 Suchmaschinen & SEO',
      btnStart: 'Starten mit modaui',
      appRedirectLabel: 'Weiterleitung zur modaui Rechnungs-Plattform...'
    },
    es: {
      title: 'Suite de Herramientas Interactivas modaui',
      subtitle: 'Calcule márgenes de ROI, diagnostique la preparación del ERP y genere esquemas de datos estructurados para Google.',
      catFinance: '📊 Finanzas y Caja',
      catDiagnostic: '🧬 Diagnósticos ERP',
      catSeo: '🌐 SEO y Código Semántico',
      btnStart: 'Probar modaui Gratis',
      appRedirectLabel: 'Redirigiendo a la plataforma central de cobros...'
    }
  }[lang] || {
    title: 'modaui AI Interactive Commerce Suite',
    subtitle: 'Free premium tools to calculate EBITDA margins, evaluate system health, format tags, and draft schema markups.',
    catFinance: '📊 Financial & Cashflow',
    catDiagnostic: '🧬 Enterprise Scores',
    catSeo: '🌐 SEO Engines',
    btnStart: 'Start with modaui',
    appRedirectLabel: 'Redirecting to console...'
  };

  // --- TOOL STATES & COMPOSITIONS ---

  // Tool 1: Invoice Builder
  const [invoiceHeader, setInvoiceHeader] = useState({ company: 'modaui Cafe', client: 'Alpha Corp', date: '2026-06-21', vatPercent: 22 });
  const [invoiceItems, setInvoiceItems] = useState([{ id: '1', name: 'Smart AI POS Setup & Terminals', qty: 1, price: 150.00 }]);
  const sumItemsNet = invoiceItems.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const sumVat = (sumItemsNet * invoiceHeader.vatPercent) / 100;

  // Tool 2: VAT & Margin Calculator
  const [costCost, setCostCost] = useState<number>(45.00);
  const [sellPrice, setSellPrice] = useState<number>(99.00);
  const [vatVal, setVatVal] = useState<number>(22);
  const markupP = costCost > 0 ? ((sellPrice - costCost) / costCost) * 100 : 0;
  const marginP = sellPrice > 0 ? ((sellPrice - costCost) / sellPrice) * 100 : 0;
  
  // Tool 3: ROI Cashflow Calculator
  const [monthlySales, setMonthlySales] = useState<number>(35000);
  const [oldProcessingFee, setOldProcessingFee] = useState<number>(2.4); // 2.4% avg legacy processing
  const [manualHoursCost, setManualHoursCost] = useState<number>(1200); // Admin hours monthly cost
  const calculatedSavings = (monthlySales * (oldProcessingFee - 0.5) / 100) + (manualHoursCost * 0.75); // modaui replaces manual tasks & gets lower pricing

  // Tool 4: POS Setup Cost Costing
  const [registers, setRegisters] = useState<number>(2);
  const [terminals, setTerminals] = useState<number>(2);
  const posSetupSum = (registers * 450) + (terminals * 120);

  // Tool 5: Restaurant Profit Calculator
  const [restoCovers, setRestoCovers] = useState<number>(1800);
  const [averageTicket, setAverageTicket] = useState<number>(35);
  const [foodCostPct, setFoodCostPct] = useState<number>(32);
  const grossProfitMargin = (restoCovers * averageTicket) * (1 - foodCostPct / 100);

  // Tool 6: Retail KPI Slider Demo
  const [conversionRate, setConversionRate] = useState<number>(2.1);
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(15000);
  const [avgRetailBasket, setAvgRetailBasket] = useState<number>(65);
  const projectedMonthlyRevenue = (monthlyVisitors * (conversionRate / 100)) * avgRetailBasket;

  // Tool 7: Business Health score (Enterprise diagnostic quiz)
  const [healthAnswers, setHealthAnswers] = useState<boolean[]>([false, false, false, false]);
  const healthResultScore = healthAnswers.filter(Boolean).length * 25;

  // Tool 8: ERP Integration Readiness Score
  const [erpSelectIndex, setErpSelectIndex] = useState<number>(2); // 1 = API-driven, 2 = CSV exports, 3 = Pure ledger
  const erpScores = [100, 65, 30];

  // Tool 9: AI SEO keyword search Analyzer
  const [analyzerKeyword, setAnalyzerKeyword] = useState<string>('ecommerce POS system Milan');
  const generatedSeoAnalysis = `Scrape Analysis for keyword: "${analyzerKeyword}"
------------------------------------------------------
Google monthly index volume: 2,400 searches
Search Keyword Intent: High-intent Purchase Transactional
CPC estimate value: €2.45
Recommendation: Automatically inject schema.org "Product" with local currency "EUR". Direct link generated is canonicalized to: https://modaui.com/solutions/${analyzerKeyword.toLowerCase().replace(/ /g, '-')}`;

  // Tool 10: JSON-LD Schema.org Builder
  const [schemaCompany, setSchemaCompany] = useState<string>('modaui Global SRL');
  const generatedJsonLdSchema = `{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "${schemaCompany}",
  "url": "https://modaui.com",
  "logo": "https://modaui.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+39-02-modaui",
    "contactType": "customer service"
  }
}`;

  // Tool 11: Open Graph Meta Generator
  const [ogTitle, setOgTitle] = useState<string>('modaui - World-Class Autonomous Retail OS');
  const generatedOgBlock = `<meta property="og:title" content="${ogTitle}" />
<meta property="og:description" content="E-invoicing, digital cashier nodes, and multilingual clients-acquisition dashboards." />
<meta property="og:image" content="https://modaui.com/assets/og-photo.webp" />
<meta property="og:url" content="https://modaui.com/" />
<meta property="og:type" content="website" />`;

  // Tool 12: Sitemap Code Validator
  const [sitemapTestUrl, setSitemapTestUrl] = useState<string>('https://modaui.com/blog/ai-tax-automation');
  const schemaSitemapValidOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${sitemapTestUrl}</loc>
    <priority>0.80</priority>
    <changefreq>weekly</changefreq>
  </url>
</urlset>`;

  // Tool 13: Robots.txt compiler
  const [allowCrawl, setAllowCrawl] = useState<boolean>(true);
  const compiledRobotsTxt = `User-agent: *
${allowCrawl ? 'Allow: /' : 'Disallow: /'}
Disallow: /api/checkout-private/
Sitemap: https://modaui.com/sitemap.xml`;

  // Tool 14: Canonical URI Validator
  const [canonicalUrlInput, setCanonicalUrlInput] = useState<string>('https://modaui.com/solutions/erp-pricing/?ref=social');
  const cleanedCanonical = canonicalUrlInput.split('?')[0];

  return (
    <section className="relative py-16 px-4 bg-[#080b18] border-t border-slate-900 rounded-3xl max-w-6xl mx-auto my-12" id="tools" style={{ contentVisibility: 'auto' }}>
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="px-4 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 text-xs font-mono uppercase tracking-widest inline-block mb-3">
          Free Global Utilities
        </span>
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight text-white">
          {translations.title}
        </h2>
        <p className="mt-3 text-slate-400 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
          {translations.subtitle}
        </p>
      </div>

      {/* Primary Category Selector */}
      <div className="grid grid-cols-3 gap-2 bg-[#04060c] p-1 rounded-2xl border border-slate-900 mb-8 max-w-3xl mx-auto pointer-events-auto">
        <button
          onClick={() => { setActiveCategory('finance'); setActiveTool('invoice'); }}
          className={`py-3 px-2 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all ${
            activeCategory === 'finance' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {translations.catFinance}
        </button>
        <button
          onClick={() => { setActiveCategory('diagnostic'); setActiveTool('health'); }}
          className={`py-3 px-2 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all ${
            activeCategory === 'diagnostic' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {translations.catDiagnostic}
        </button>
        <button
          onClick={() => { setActiveCategory('seo'); setActiveTool('analyzer'); }}
          className={`py-3 px-2 rounded-xl text-xs font-semibold uppercase tracking-wide transition-all ${
            activeCategory === 'seo' ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white' : 'text-slate-400 hover:text-white'
          }`}
        >
          {translations.catSeo}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Sub-Navigator */}
        <div className="col-span-1 lg:col-span-4 bg-[#04060c] p-3 rounded-2xl border border-slate-905 space-y-1 overflow-x-auto min-w-0">
          
          {activeCategory === 'finance' && (
            <>
              {[
                { id: 'invoice', name: 'Invoice Builder', icon: FileSpreadsheet },
                { id: 'vat', name: 'VAT Margin Calculator', icon: Calculator },
                { id: 'roi', name: 'ROI Cashflow Projection', icon: TrendingUp },
                { id: 'pos', name: 'POS Configuration Costs', icon: Landmark },
                { id: 'resto', name: 'Restaurant Profit Calculator', icon: HelpCircle },
                { id: 'kpi', name: 'Retail KPI Impact slider', icon: Sparkles }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTool(t.id)}
                  className={`w-full flex items-center gap-2.5 py-3 px-4 rounded-xl text-xs font-medium text-left transition-all ${
                    activeTool === t.id ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/20' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <t.icon className="w-4 h-4 shrink-0 text-cyan-500" />
                  <span>{t.name}</span>
                </button>
              ))}
            </>
          )}

          {activeCategory === 'diagnostic' && (
            <>
              {[
                { id: 'health', name: 'SME Business Health Score', icon: ShieldAlert },
                { id: 'readiness', name: 'ERP Integration Readiness', icon: Network }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTool(t.id)}
                  className={`w-full flex items-center gap-2.5 py-3 px-4 rounded-xl text-xs font-medium text-left transition-all ${
                    activeTool === t.id ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/20' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <t.icon className="w-4 h-4 shrink-0 text-amber-500" />
                  <span>{t.name}</span>
                </button>
              ))}
            </>
          )}

          {activeCategory === 'seo' && (
            <>
              {[
                { id: 'analyzer', name: 'AI SEO Content Analyzer', icon: Search },
                { id: 'schema', name: 'JSON-LD Schema Builder', icon: Code },
                { id: 'og', name: 'Open Graph Generator', icon: Sparkles },
                { id: 'sitemap_val', name: 'Sitemap Code Formatter', icon: FileCode },
                { id: 'robots', name: 'Robots.txt Compiler', icon: Network },
                { id: 'canonical', name: 'Canonical URI checker', icon: BadgeInfo }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTool(t.id)}
                  className={`w-full flex items-center gap-2.5 py-3 px-4 rounded-xl text-xs font-medium text-left transition-all ${
                    activeTool === t.id ? 'bg-cyan-950/40 text-cyan-400 border border-cyan-800/20' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <t.icon className="w-4 h-4 shrink-0 text-purple-500" />
                  <span>{t.name}</span>
                </button>
              ))}
            </>
          )}

        </div>

        {/* Right Active Tool Desk */}
        <div className="col-span-1 lg:col-span-8 bg-[#04060c] border border-slate-900 rounded-2xl p-6 relative">
          
          {/* TOOL 1: Invoice Builder */}
          {activeTool === 'invoice' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-[#020306] p-4 rounded-xl">
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 mb-1">Business</span>
                  <input type="text" value={invoiceHeader.company} onChange={(e) => setInvoiceHeader({ ...invoiceHeader, company: e.target.value })} className="w-full bg-[#070914] border border-slate-800 rounded px-2.5 py-1 text-xs text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 mb-1">Client name</span>
                  <input type="text" value={invoiceHeader.client} onChange={(e) => setInvoiceHeader({ ...invoiceHeader, client: e.target.value })} className="w-full bg-[#070914] border border-slate-800 rounded px-2.5 py-1 text-xs text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 mb-1">Fiscal Date</span>
                  <input type="date" value={invoiceHeader.date} onChange={(e) => setInvoiceHeader({ ...invoiceHeader, date: e.target.value })} className="w-full bg-[#070914] border border-slate-800 rounded px-2.5 py-1 text-xs text-white" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-slate-500 mb-1">VAT % (Standard)</span>
                  <select value={invoiceHeader.vatPercent} onChange={(e) => setInvoiceHeader({ ...invoiceHeader, vatPercent: Number(e.target.value) })} className="w-full bg-[#070914] border border-slate-800 rounded px-2.5 py-1 text-xs text-white">
                    <option value="22">22% Standard IT</option>
                    <option value="21">21% Spain VAT</option>
                    <option value="19">19% German MwSt</option>
                    <option value="10">10% Reduced IT</option>
                    <option value="0">0% Exempt</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                {invoiceItems.map((item, idx) => (
                  <div key={item.id} className="grid grid-cols-12 gap-2 bg-slate-900/20 p-2.5 rounded-lg border border-slate-850 items-center">
                    <input type="text" value={item.name} onChange={(e) => {
                      const cloned = [...invoiceItems];
                      cloned[idx].name = e.target.value;
                      setInvoiceItems(cloned);
                    }} className="col-span-6 bg-transparent border-0 text-xs text-slate-200 outline-none" />
                    
                    <input type="number" value={item.qty} onChange={(e) => {
                      const cloned = [...invoiceItems];
                      cloned[idx].qty = Number(e.target.value);
                      setInvoiceItems(cloned);
                    }} className="col-span-2 bg-[#05060d] border border-slate-800 text-center rounded text-xs py-0.5 text-white" />
                    
                    <input type="number" value={item.price} onChange={(e) => {
                      const cloned = [...invoiceItems];
                      cloned[idx].price = Number(e.target.value);
                      setInvoiceItems(cloned);
                    }} className="col-span-3 bg-[#05060d] border border-slate-800 text-right rounded text-xs py-0.5 text-white" />

                    <button onClick={() => {
                      setInvoiceItems(invoiceItems.filter(x => x.id !== item.id));
                    }} className="col-span-1 text-red-500 font-bold hover:text-red-400">×</button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center bg-[#020306] p-4 rounded-xl text-xs pr-6">
                <button onClick={() => setInvoiceItems([...invoiceItems, { id: Date.now().toString(), name: 'Extended Item description', qty: 1, price: 50.00 }])} className="text-cyan-400 font-mono">+ Add Custom Item line</button>
                <div className="text-right font-mono space-y-1">
                  <div>Net subtotal: €{sumItemsNet.toFixed(2)}</div>
                  <div className="text-slate-500">VAT Collected: €{sumVat.toFixed(2)}</div>
                  <div className="text-sm font-bold text-white pt-2 border-t border-slate-900">Gross total: <span className="text-cyan-400">€{(sumItemsNet + sumVat).toFixed(2)}</span></div>
                </div>
              </div>

              <div className="flex justify-center">
                <button onClick={() => alert(translations.appRedirectLabel)} className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs font-semibold text-white">{translations.btnStart}</button>
              </div>
            </div>
          )}

          {/* TOOL 2: VAT & Margins */}
          {activeTool === 'vat' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Your Purchase Cost Net (€)</span>
                  <input type="number" value={costCost} onChange={(e) => setCostCost(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Desired Retail Sale Price (€)</span>
                  <input type="number" value={sellPrice} onChange={(e) => setSellPrice(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-slate-900">
                <div className="bg-[#020306] p-3 rounded-xl border border-slate-850">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">Markup %</span>
                  <span className="text-xl font-bold font-display text-white">{markupP.toFixed(1)}%</span>
                </div>
                <div className="bg-[#020306] p-3 rounded-xl border border-slate-850">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">Margin %</span>
                  <span className="text-xl font-bold font-display text-cyan-400">{marginP.toFixed(1)}%</span>
                </div>
                <div className="bg-[#020306] p-3 rounded-xl border border-slate-850">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">VAT / Tax Net</span>
                  <span className="text-xl font-bold font-mono text-slate-300">€{(sellPrice * (vatVal / (100 + vatVal))).toFixed(2)}</span>
                </div>
                <div className="bg-[#020306] p-3 rounded-xl border border-slate-850">
                  <span className="block text-[9px] font-mono text-slate-500 uppercase">EBITDA Net</span>
                  <span className="text-xl font-bold font-mono text-emerald-400">€{(sellPrice - (sellPrice * (vatVal / (100 + vatVal))) - costCost).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 3: ROI Cashflow */}
          {activeTool === 'roi' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Monthly Gross Revenue (€)</span>
                  <input type="number" value={monthlySales} onChange={(e) => setMonthlySales(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Former Bank commission (%)</span>
                  <input type="number" step="0.1" value={oldProcessingFee} onChange={(e) => setOldProcessingFee(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Monthly manual admin tasks (€)</span>
                  <input type="number" value={manualHoursCost} onChange={(e) => setManualHoursCost(Math.max(0, parseFloat(e.target.value) || 0))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div className="p-4 bg-emerald-950/20 border border-emerald-900/50 rounded-xl flex items-center justify-between">
                <div>
                  <span className="block text-xs font-mono text-emerald-400 font-semibold mb-1">Average calculated modaui savings:</span>
                  <span className="text-2xl font-bold font-display text-white">€{calculatedSavings.toFixed(2)} <span className="text-xs font-mono font-normal">/ month</span></span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-mono text-slate-450">Projected Year profits boost:</span>
                  <span className="text-lg font-bold text-[#00f0ff]">€{(calculatedSavings * 12).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 4: POS Setup Costing */}
          {activeTool === 'pos' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Physical Registers Needed (Fiscale RT)</span>
                  <input type="number" value={registers} onChange={(e) => setRegisters(Math.max(0, Number(e.target.value)))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Hand-held Smart Terminals</span>
                  <input type="number" value={terminals} onChange={(e) => setTerminals(Math.max(0, Number(e.target.value)))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div className="p-4 bg-[#020306] rounded-xl flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-400 block font-mono">Simulated modaui Hardware Bundle:</span>
                  <span className="text-xl font-bold font-display text-white">€{posSetupSum.toLocaleString()}</span>
                  <span className="text-slate-500 block text-[10px] mt-1">Replaces upfront proprietary POS integrations costing typically €2,500+</span>
                </div>
                <div className="text-right">
                  <span className="text-emerald-400 font-mono block">Zero swipe commissions</span>
                  <span className="text-[10px] text-slate-500">Only flat SDK micro-fees.</span>
                </div>
              </div>
            </div>
          )}

          {/* TOOL 5: Restaurant profits */}
          {activeTool === 'resto' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Monthly seat covers</span>
                  <input type="number" value={restoCovers} onChange={(e) => setRestoCovers(Math.max(0, Number(e.target.value)))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Average invoice value (€)</span>
                  <input type="number" value={averageTicket} onChange={(e) => setAverageTicket(Math.max(0, Number(e.target.value)))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Food Waste Raw Cost (%)</span>
                  <input type="number" value={foodCostPct} onChange={(e) => setFoodCostPct(Math.max(0, Number(e.target.value)))} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
                </div>
              </div>

              <div className="bg-[#020306] p-5 rounded-xl border border-slate-900">
                <span className="block font-mono text-[10px] text-slate-400">Monthly Gross food margin:</span>
                <span className="text-2xl font-bold font-display text-white">€{grossProfitMargin.toLocaleString()}</span>
                <span className="block text-[10px] text-slate-500 mt-1">Deploying AI wine pairings recommendation boosts secondary sales up to +22% organically.</span>
              </div>
            </div>
          )}

          {/* TOOL 6: Retail KPI Slider */}
          {activeTool === 'kpi' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Monthly Website traffic</span>
                    <span className="text-white font-semibold">{monthlyVisitors.toLocaleString()} views</span>
                  </div>
                  <input type="range" min="1000" max="100000" step="1000" value={monthlyVisitors} onChange={(e) => setMonthlyVisitors(Number(e.target.value))} className="w-full accent-cyan-400" />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Conversion threshold (% index)</span>
                    <span className="text-white font-semibold">{conversionRate.toFixed(1)}%</span>
                  </div>
                  <input type="range" min="0.5" max="15" step="0.1" value={conversionRate} onChange={(e) => setConversionRate(Number(e.target.value))} className="w-full accent-cyan-400" />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
                    <span>Average digital basket ticket (€)</span>
                    <span className="text-white font-semibold">€{avgRetailBasket} EUR</span>
                  </div>
                  <input type="range" min="10" max="350" step="5" value={avgRetailBasket} onChange={(e) => setAvgRetailBasket(Number(e.target.value))} className="w-full accent-cyan-400" />
                </div>
              </div>

              <div className="bg-[#020306] p-4 rounded-xl border border-slate-850">
                <span className="block text-[10px] uppercase font-mono text-slate-500">Projected Monthly net revenue flow:</span>
                <span className="text-2xl font-bold font-display text-[#00f0ff]">€{projectedMonthlyRevenue.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
              </div>
            </div>
          )}

          {/* TOOL 7: Business Health Quiz */}
          {activeTool === 'health' && (
            <div className="space-y-5">
              <span className="block text-xs font-semibold text-slate-300 font-mono">EU Fiscal Compliance and CRM check questions:</span>
              <div className="space-y-3">
                {[
                  'Do physical checkout registers sync with invoice ledgers within seconds?',
                  'Is online and in-store customer purchase memory centralized to fit GDPR schemas?',
                  'Are commercial tax records (VAT / IVA) automatically reported to state databases?',
                  'Does system trigger push campaigns to VIP buyers when stocks drop below 20%?'
                ].map((question, index) => (
                  <label key={index} className="flex gap-3 text-xs text-slate-350 cursor-pointer select-none items-start">
                    <input type="checkbox" checked={healthAnswers[index]} onChange={(e) => {
                      const cloned = [...healthAnswers];
                      cloned[index] = e.target.checked;
                      setHealthAnswers(cloned);
                    }} className="accent-cyan-405 mt-0.5" />
                    <span>{question}</span>
                  </label>
                ))}
              </div>

              <div className="bg-[#020306] p-4 rounded-xl flex justify-between items-center">
                <div>
                  <span className="font-mono text-[10px] text-slate-500 block">Unified Commerce Health Index:</span>
                  <span className={`text-2xl font-bold font-display ${healthResultScore > 75 ? 'text-emerald-400' : healthResultScore > 50 ? 'text-amber-400' : 'text-red-400'}`}>{healthResultScore}%</span>
                </div>
                <div className="text-xs text-slate-400 font-mono max-w-[280px]">
                  {healthResultScore === 100 ? '🎉 Congratulations. Fully modern digital commerce setup!' : '💡 Switch to modaui OS to automate and consolidate these nodes immediately.'}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 8: ERP Integration Score */}
          {activeTool === 'readiness' && (
            <div className="space-y-6">
              <span className="block text-xs text-slate-300 font-mono font-semibold">How is product inventory distributed currently?</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  'Synced dynamically via continuous Web APIs',
                  'Exported or imported manually via daily CSV/Excel lists',
                  'Tracked on physical registers or standalone legacy ledgers'
                ].map((option, idx) => (
                  <button key={idx} onClick={() => setErpSelectIndex(idx)} className={`p-4 rounded-xl text-left border text-xs font-mono transition-all ${
                    erpSelectIndex === idx ? 'border-cyan-500 bg-cyan-950/20 text-cyan-400' : 'border-slate-850 hover:border-slate-800'
                  }`}>
                    <span className="block text-slate-500 text-[10px] uppercase font-mono mb-1">Method {idx + 1}</span>
                    <span>{option}</span>
                  </button>
                ))}
              </div>

              <div className="bg-[#020306] p-4 rounded-xl text-xs flex justify-between items-center font-mono">
                <div>
                  <span>Automation Integrity Rank:</span>
                  <span className="block text-xl font-bold font-display text-white mt-1">{erpScores[erpSelectIndex]}/100</span>
                </div>
                <span className="text-slate-500">
                  {erpSelectIndex === 0 ? 'Excellent. Primed for next-level scales!' : erpSelectIndex === 1 ? 'Medium integration gap. Prone to oversell glitches.' : 'Critical vulnerability. Immediate automation required.'}
                </span>
              </div>
            </div>
          )}

          {/* TOOL 9: AI Keyword search SEO Analyzer */}
          {activeTool === 'analyzer' && (
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-mono text-slate-400 mb-1">Target Commercial Keyphrase / Niche Vertical</span>
                <input type="text" value={analyzerKeyword} onChange={(e) => setAnalyzerKeyword(e.target.value)} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
              </div>
              <pre className="p-4 bg-slate-950 text-cyan-400 text-xs font-mono leading-relaxed rounded-xl border border-slate-900 overflow-x-auto whitespace-pre">
                {generatedSeoAnalysis}
              </pre>
            </div>
          )}

          {/* TOOL 10: JSON-LD Schema Builder */}
          {activeTool === 'schema' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Organization Company Legal Title</span>
                  <input type="text" value={schemaCompany} onChange={(e) => setSchemaCompany(e.target.value)} className="bg-[#05060d] border border-slate-800 rounded px-3 py-1.5 text-xs text-white min-w-[240px]" />
                </div>
                <button onClick={() => triggerCopy(generatedJsonLdSchema, 'schema')} className="text-xs font-mono bg-slate-900 border border-slate-800 hover:bg-slate-800 py-1.5 px-3.5 rounded text-cyan-400 flex items-center gap-1">
                  {isCopied === 'schema' ? 'Copied!' : 'Copy Schema'}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-purple-300 text-xs font-mono leading-relaxed rounded-xl border border-slate-900 overflow-x-auto">
                {generatedJsonLdSchema}
              </pre>
            </div>
          )}

          {/* TOOL 11: OG Tag Builder */}
          {activeTool === 'og' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Social OpenGraph display title</span>
                  <input type="text" value={ogTitle} onChange={(e) => setOgTitle(e.target.value)} className="bg-[#05060d] border border-slate-800 rounded px-3 py-1.5 text-xs text-white min-w-[240px]" />
                </div>
                <button onClick={() => triggerCopy(generatedOgBlock, 'og')} className="text-xs font-mono bg-slate-900 border border-slate-800 hover:bg-slate-800 py-1.5 px-3.5 rounded text-cyan-400">
                  {isCopied === 'og' ? 'Copied' : 'Copy HTML meta tags'}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-amber-300 text-xs font-mono leading-relaxed rounded-xl border border-slate-900 overflow-x-auto">
                {generatedOgBlock}
              </pre>
            </div>
          )}

          {/* TOOL 12: Sitemap Formatter */}
          {activeTool === 'sitemap_val' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <span className="block text-xs font-mono text-slate-400 mb-1">Verify Sitemap node structure URI</span>
                  <input type="text" value={sitemapTestUrl} onChange={(e) => setSitemapTestUrl(e.target.value)} className="bg-[#05060d] border border-slate-800 rounded px-3 py-1.5 text-xs text-white min-w-[240px]" />
                </div>
                <button onClick={() => triggerCopy(schemaSitemapValidOutput, 'sitemap_val')} className="text-xs font-mono bg-slate-900 border border-slate-800 py-1.5 px-3 rounded text-cyan-400">
                  {isCopied === 'sitemap_val' ? 'Copied' : 'Copy Valid XML block'}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-emerald-400 text-xs font-mono leading-relaxed rounded-xl border border-slate-900 overflow-x-auto">
                {schemaSitemapValidOutput}
              </pre>
            </div>
          )}

          {/* TOOL 13: Robots compiler */}
          {activeTool === 'robots' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="flex items-center gap-2 text-xs font-mono text-slate-350 cursor-pointer">
                  <input type="checkbox" checked={allowCrawl} onChange={(e) => setAllowCrawl(e.target.checked)} className="accent-cyan-400" />
                  <span>Allow indexing of root domain folders (User-agent: *)</span>
                </label>
                <button onClick={() => triggerCopy(compiledRobotsTxt, 'robots')} className="text-xs font-mono bg-slate-900 border border-slate-800 py-1 px-3 rounded text-cyan-400">
                  {isCopied === 'robots' ? 'Copied' : 'Copy Robots.txt'}
                </button>
              </div>
              <pre className="p-4 bg-slate-950 text-cyan-300 text-xs font-mono leading-relaxed rounded-xl border border-slate-900 overflow-x-auto whitespace-pre">
                {compiledRobotsTxt}
              </pre>
            </div>
          )}

          {/* TOOL 14: Canonical checker */}
          {activeTool === 'canonical' && (
            <div className="space-y-4">
              <div>
                <span className="block text-xs font-mono text-slate-400 mb-1">Input URL containing marketing queries or tracking queries:</span>
                <input type="text" value={canonicalUrlInput} onChange={(e) => setCanonicalUrlInput(e.target.value)} className="w-full bg-[#05060d] border border-slate-800 rounded px-3 py-2 text-xs text-white" />
              </div>

              <div className="p-4 bg-[#020306] border border-slate-900 rounded-xl space-y-1 text-xs">
                <span className="text-slate-500 font-mono text-[9px] uppercase">Validated Core Canonical Address:</span>
                <span className="text-emerald-400 block font-mono">{cleanedCanonical}</span>
                <span className="text-[10px] text-slate-500 block pt-1 leading-relaxed">Properly referencing this canonical prevent duplicate content penalties from multi-region Google crawler scrapes.</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
