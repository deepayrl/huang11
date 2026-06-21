import React, { useState, useId } from 'react';
import { 
  Sparkles, ShieldCheck, HelpCircle, ArrowRight, Zap, Play, Check, 
  MessageSquare, User, Calendar, Mail, FileText, Smartphone, LayoutGrid, 
  Database, HelpCircle as HelpIcon, ChevronRight, CheckCircle2, Lock, X, Menu, Globe,
  Cloud
} from 'lucide-react';

import { Language, BlogPost } from './types';
import { BLOG_POSTS, FAQS, SAAS_COMPARE_MATRIX, TECHNICAL_DOC_CATEGORIES } from './data/blogData';
import { getFullJsonLdSchema } from './data/seoData';

// Modular Child Components
import InteractiveCanvas from './components/InteractiveCanvas';
import ToolsCenter from './components/ToolsCenter';
import TemplatesDownload from './components/TemplatesDownload';
import GrowthFactory from './components/GrowthFactory';
import AiWikiGlossary from './components/AiWikiGlossary';
import AiPromptsHub from './components/AiPromptsHub';
import AiCaseStudies from './components/AiCaseStudies';
import DriveWorkspace from './components/DriveWorkspace';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentRoute, setCurrentRoute] = useState<'home' | 'solutions' | 'compare' | 'blog' | 'docs' | 'factory' | 'wiki' | 'prompts' | 'cases' | 'drive'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active state variables for interactive elements
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [dossierTopic, setDossierTopic] = useState<'about' | 'careers' | 'press' | 'partners' | 'offices' | 'privacy' | 'terms' | null>(null);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [demoEmail, setDemoEmail] = useState('');
  const [demoCompanyName, setDemoCompanyName] = useState('');
  const [demoSuccess, setDemoSuccess] = useState(false);
  
  // Interactive Flowchart Active Node Trigger
  const [activeWorkflowNode, setActiveWorkflowNode] = useState<string>('customer');

  // AI Sales Agent Chat window states
  const [aiChatOpen, setAiChatOpen] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string }>>([
    { sender: 'agent', text: 'Hi! I am the modaui AI Sales Assistant. How can I help grow your business today?' }
  ]);
  const [leadMailSubmitted, setLeadMailSubmitted] = useState(false);
  const [potentialEmail, setPotentialEmail] = useState('');

  // Pricing Interval Toggle
  const [pricePeriod, setPricePeriod] = useState<'monthly' | 'yearly'>('monthly');

  // Real URL SEO Synchronizer (Real-time dynamic route mapping)
  React.useEffect(() => {
    const parseUrl = () => {
      const pathSegs = window.location.pathname.substring(1).split('/');
      let parsedLang: Language = 'en';
      let parsedRoute: typeof currentRoute = 'home';
      
      const supportedLangs = ['en', 'it', 'zh', 'fr', 'de', 'es'];
      const validRoutes = ['home', 'solutions', 'compare', 'blog', 'docs', 'factory', 'wiki', 'prompts', 'cases', 'drive'];
      
      if (supportedLangs.includes(pathSegs[0])) {
        parsedLang = pathSegs[0] as Language;
        if (pathSegs[1] && validRoutes.includes(pathSegs[1])) {
          parsedRoute = pathSegs[1] as any;
        }
      } else if (pathSegs[0] && validRoutes.includes(pathSegs[0])) {
        parsedRoute = pathSegs[0] as any;
      }
      
      return { parsedLang, parsedRoute };
    };

    const syncStateFromUrl = () => {
      const { parsedLang, parsedRoute } = parseUrl();
      setLang(parsedLang);
      setCurrentRoute(parsedRoute);
    };

    syncStateFromUrl();

    window.addEventListener('popstate', syncStateFromUrl);
    return () => window.removeEventListener('popstate', syncStateFromUrl);
  }, []);

  React.useEffect(() => {
    let targetPath = '';
    if (lang !== 'en') {
      targetPath += `/${lang}`;
    }
    if (currentRoute !== 'home') {
      targetPath += `/${currentRoute}`;
    }
    if (selectedBlog) {
      targetPath += `/blog/${selectedBlog.slug}`;
    }
    if (targetPath === '') {
      targetPath = '/';
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    // Dynamic Title & Description for SEO programmatically injected to head
    const metadb: Record<string, { title: Record<string, string>; d: Record<string, string> }> = {
      home: {
        title: {
          en: 'modaui AI Commerce OS | Automated Global Retail Solutions',
          it: 'modaui AI Commerce OS | Registratori di Cassa e Magazzino',
          zh: '摩达数智 (modaui) | 欧洲收银 POS、智能 ERP 与 24h 自动获客系统'
        },
        d: {
          en: 'Discover the next-generation operating system built to reduce physical merchant transaction fees to 0.45%, sync active stock refilling, and grow customer CRM securely.',
          it: 'Rivoluziona il tuo business locale con i pagamenti QR all\'0,45% e scontrini digitali del network modaui.',
          zh: '开启新一代华人商业数字时代：打通桌边扫码收银、跨境智能供销仓储、7*24h 全流量获客，直连欧洲税务局合规申报电子发票。'
        }
      },
      solutions: {
        title: {
          en: 'Commerce Solutions | Retail & Fine-Dining | modaui',
          it: 'Soluzioni per Settore RETAIL e Ristoranti | modaui',
          zh: '餐馆与百货行业数字化技术方案 | 摩达数智 (modaui)'
        },
        d: {
          en: 'Deploy tailored Michelin-star blueprints or manufacturing warehouse logs. Complete client onboarding portfolios, zero setup fees.',
          it: 'Sfoglia i moduli software per boutique e ristorazione del catalogo modaui.',
          zh: '即刻采用餐馆分账、百货扫码、大宗物流出货等专属数字化软件蓝图，极速落地。'
        }
      },
      compare: {
        title: {
          en: 'modaui vs Legacy Commerce Software | Direct Profit Analysis',
          it: 'Confronto modaui contro Strumenti Tradizionali',
          zh: '集成底层账本与传统散装拼接软件利润率对比 | 摩达数智 (modaui)'
        },
        d: {
          en: 'Discover why a single-ledger unified architecture outperforms scattered combinations of Shopify, Stripe, and Odoo ERP while keeping you tax-compliant.',
          it: 'Scopri perché il nostro registro unico supera nettamente i pacchetti obsoleti riducendo i costi.',
          zh: '多维度剖析为什么单一可信账本在降低通道损耗、税控漏洞和人员成本方面远超散装拼接系统。'
        }
      },
      blog: {
        title: {
          en: 'Commerce Academy Blog & SEO Pressroom | modaui',
          it: 'Blog di Crescita Commerciale | modaui',
          zh: '华商流量增长、私域营销与欧洲财税博客 | 摩达数智 (modaui)'
        },
        d: {
          en: 'Learn how to optimize search positions, deploy local-language automated blog crawlers, and read audits of real SMEs reaching 400% ROI.',
          it: 'Articoli e approfondimenti fiscali redatti dai partner di sviluppo modaui.',
          zh: '深入涉猎长尾关键词营销策略、ChatGPT/Gemini 程序化获客手段以及欧洲合规财税解读。'
        }
      },
      docs: {
        title: {
          en: 'Developer Integration Guides & API docs | modaui',
          it: 'Manuale e API per Sviluppatori Integration Guides | modaui',
          zh: '开放商用 API 接口文档与多国架构配置 | 摩达数智 (modaui)'
        },
        d: {
          en: 'Query real-time sdi invoice webhooks, POS socket triggers, tax printer schemas, and programmatic database initializations.',
          it: 'Esplora le chiamate API, i webhook di scontrino digitale e i tracciati XML dell\'Agenzia delle Entrate.',
          zh: '阅览直连税控打印、自动发票申报 webhook、订单同步套接字以及多合一支付网关接口。'
        }
      },
      wiki: {
        title: {
          en: 'AI Merchant Compliance Wiki & Legal Encyclopedias | modaui',
          it: 'Enciclopedia Fiscale dei Termini Commerciali | modaui',
          zh: '商企合规核算与税制百科词条大观 | 摩达数智 (modaui)'
        },
        d: {
          en: 'Demystifying European value added tax laws (VAT), digital scontrini telematici, and GDPR privacy specifications.',
          it: 'I termini complessi dell\'e-commerce e della fiscalità spiegati in parole semplici.',
          zh: '深度解析 IVA 申报、GDPR 首要隐私法则以及各物理行业合规开票的法规细则。'
        }
      },
      prompts: {
        title: {
          en: '24h Client-Acquisition Prompt depots | modaui',
          it: 'Libreria di Prompt per Automazione Vendite | modaui',
          zh: '高转化 7*24h 自动获客与私域推送 AI 提示词库 | 摩达数智 (modaui)'
        },
        d: {
          en: 'Unlock conversion optimization copywriting templates to feeds into modern language assistants.',
          it: 'I migliori prompt per configurare chatbot operativi ed assistenti di vendita.',
          zh: '获取适配智能销售机器人的营销提示词与全渠道私域客户跟进沟通话术模板。'
        }
      },
      cases: {
        title: {
          en: 'Audited Small-Business ROI Case Whitepapers | modaui',
          it: 'Storie di Successo e Casi di Studio Certificati',
          zh: '全欧连锁铺面与外贸大工厂 ROI 收益实证白皮书 | 摩达数智 (modaui)'
        },
        d: {
          en: 'Read reports of real Roman Bistros cutting swipe cost by 75% and industrial textile units reducing shipping delays.',
          it: 'Le testimonianze autentiche dei proprietari che hanno accelerato i profitti con modaui.',
          zh: '阅读罗马美食酒家、普拉托服装制造大工厂等真实商户引入摩达系统后的实测利润变化。'
        }
      },
      drive: {
        title: {
          en: 'Google Drive CRM Backup & Console | modaui',
          it: 'Console Google Drive e Archivio Sicuro',
          zh: '谷歌网盘 (Google Drive) 安全沙箱备份配置控制台 | 摩达数智 (modaui)'
        },
        d: {
          en: 'Connect and sync your local CRM database leads directly to secure cloud folders within one single screen.',
          it: 'Sincronizza e scansiona il database per conservare le copie dei log di vendita.',
          zh: '在单页面内打通谷歌官方 OAuth 开通授权，将本站所收集的 CRM 商业线索一键秒级同步备份。'
        }
      },
      factory: {
        title: {
          en: 'XML Sitemap & robots.txt auto-builder Console | modaui',
          it: 'Gestore Sitemap.xml e robots.txt per Crawler',
          zh: 'Sitemap.xml 搜索引擎地图生成与收录抓取诊断控制台 | 摩达数智 (modaui)'
        },
        d: {
          en: 'Verify the active crawling schema reflecting 145,280 pages generated for search spiders and crawlers.',
          it: 'Visualizza e rigenera i percorsi fisici per Google Bot in tempo reale.',
          zh: '动态预览并诊断全站 14.5 万程序化独立页面节点的抓取状况、RSS 订阅源以及物理 Git 快照状态。'
        }
      }
    };

    let titleText = '';
    let descText = '';

    const activeLang: string = lang === 'zh' ? 'zh' : lang === 'it' ? 'it' : 'en';

    if (selectedBlog) {
      titleText = `${selectedBlog.title[lang as any] || selectedBlog.title.en} | modaui Blog`;
      descText = selectedBlog.summary[lang as any] || selectedBlog.summary.en;
    } else {
      const dbEntry = metadb[currentRoute] || metadb.home;
      titleText = dbEntry.title[activeLang] || dbEntry.title.en;
      descText = dbEntry.d[activeLang] || dbEntry.d.en;
    }

    // Write title
    document.title = titleText;

    // Write description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', descText);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://modaui.com${targetPath}`);

    // Update OpenGraph details
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', titleText);

    let ogDesc = document.querySelector('meta[property="og:description"]');
    if (!ogDesc) {
      ogDesc = document.createElement('meta');
      ogDesc.setAttribute('property', 'og:description');
      document.head.appendChild(ogDesc);
    }
    ogDesc.setAttribute('content', descText);

  }, [lang, currentRoute, selectedBlog]);

  // Translations Map
  const navT = {
    en: {
      brandTag: 'AI Commerce OS',
      home: 'Overview',
      solutions: 'Solutions',
      compare: 'Compare Stack',
      blog: 'Growth Blog',
      docs: 'API Docs',
      seoConsole: 'AI SEO Engine',
      wiki: 'Wiki',
      prompts: 'AI Prompts',
      cases: 'ROI Cases',
      drive: 'Cloud Sync ✦',
      ctaText: 'Start Free',
      heroTitle: 'modaui AI Commerce OS',
      heroSub: 'The AI Operating System for Modern Commerce.',
      heroDesc: 'Unify real-time payments, proactive inventory logistics, multilingual local brand marketing, and GDPR-compliant digital customer CRM memory into one seamless digital nervous system.',
      startNowBtn: 'Launch Setup Free',
      bookDemoBtn: 'Schedule Demo Layout',
      watchVideoBtn: 'Watch System Preview',
      integratedWorkflowHeader: 'Autonomous AI Commerce Flow',
      integratedWorkflowSub: 'Click any node to inspect modaui\'s decision-making flow in action.',
      featuresTitle: 'Unmatched Architectural Capabilities',
      featuresSub: 'Purpose-built to replace outdated fragmented third-party POS, CRM and standalone payment middleware.',
      compareHeaderTitle: 'Compare modaui vs Legacy Stash',
      compareHeaderSub: 'Why our single-register architecture outperforms combinations of frontend layouts, billing networks, and legacy accounting programs.',
      faqHeaderTitle: 'Frequently Answered Queries (GDPR / Tax compliant)',
      pricingTitle: 'Simple Scalable Flat Rates',
      pricingSub: 'Zero high % markup fees. Cancel or switch profiles anytime.',
      contactHeaderTitle: 'Deploy Your Free Global Layout Today',
      footerCompanyDesc: 'modaui is a registered trademark of modaui Technologies. Redefining modern commerce through fully local compliant neural pipelines.',
      privacyTerm: 'GDPR Privacy & Trust Policies',
      termsService: 'Terms of Commercial Service'
    },
    it: {
      brandTag: 'AI Commerce OS',
      home: 'Panoramica',
      solutions: 'Soluzioni',
      compare: 'Confronto',
      blog: 'Blog di Crescita',
      docs: 'Documentazione API',
      seoConsole: 'Console SEO',
      wiki: 'Wiki',
      prompts: 'Prompt AI',
      cases: 'Casi Studio',
      drive: 'Sincr. Cloud ✦',
      ctaText: 'Inizia Gratis',
      heroTitle: 'modaui AI Commerce OS',
      heroSub: 'Il Sistema Operativo IA per il Commercio Moderno.',
      heroDesc: 'Unifica pagamenti in tempo reale, logistica di magazzino predittiva, marketing automatico e CRM sicuro in un unico sistema ad alte prestazioni.',
      startNowBtn: 'Configurazione Gratuita',
      bookDemoBtn: 'Prenota un System-Demo',
      watchVideoBtn: 'Guarda Video Anteprima',
      integratedWorkflowHeader: 'Flusso di Commercio Autonomo',
      integratedWorkflowSub: 'Fai clic su qualsiasi punto della rete per ispezionare le decisioni del robot modaui.',
      featuresTitle: 'Infrastruttura di Sistema Tutto-In-Uno',
      featuresSub: 'Sostituisci i separati software di fatturazione, cassa POS fisica e database clienti con un registro unificato.',
      compareHeaderTitle: 'Confronto diretto modaui vs Concorrenti',
      compareHeaderSub: 'Perché la nostra architettura unificata riduce i costi di manutenzione API rispetto alla combinazione di Shopify, Stripe e Odoo.',
      faqHeaderTitle: 'Domande frequenti (Conformità IVA / Agenzia Entrate)',
      pricingTitle: 'Prezzi Chiari Senza Commissioni Nascoste',
      pricingSub: 'Nessun costo nascosto o percentuali elevate sulle transazioni fisiche.',
      contactHeaderTitle: 'Attiva il Tuo Profilo Commerciale Oggi',
      footerCompanyDesc: 'modaui è un marchio registrato di modaui Technologies. Rivoluziona il commercio locale con intelligenza artificiale conforme alle norme.',
      privacyTerm: 'Codici di Riservatezza GDPR',
      termsService: 'Condizioni Generali di Servizio'
    },
    zh: {
      brandTag: '智能商业操作系统',
      home: '产品全景',
      solutions: '行业场景',
      compare: '对比竞争对手',
      blog: '流量生长博客',
      docs: '开发者 API',
      seoConsole: 'SEO智能工厂',
      wiki: '商业百科',
      prompts: '提示词库',
      cases: '成功案例',
      drive: '云盘同步 ✦',
      ctaText: '开始免费体验',
      heroTitle: 'modaui华商生态平台',
      heroSub: 'AI 智能驱动：让欧洲华人百货、餐饮、进出口贸易迈向数智化。',
      heroDesc: '全面整合实时统一支付结算、前置自适应仓储物流、程序化多国语境流量营销、以及完全契合欧洲 GDPR 数据隐私的智能全域 CRM 系统。',
      startNowBtn: '一键搭建数字商铺',
      bookDemoBtn: '预约专人视频演练',
      watchVideoBtn: '观看系统极速配制演示',
      integratedWorkflowHeader: '自主 AI 商业决策流图谱',
      integratedWorkflowSub: '点击图谱中任意智能决策节点，直观透视 modaui 如何代替人工进行精细化流转。',
      featuresTitle: '重新构建数字化商业拼图',
      featuresSub: '无需外挂第三方收款网关、客服机器人与庞杂的离线 ERP，系统天生具备完备的高凝聚性底层账本。',
      compareHeaderTitle: '将集成式平台与外接拼盘对比',
      compareHeaderSub: '剖析为什么 modaui 单一底层注册账本在提升人效、缩减税损、加快物理周转上完胜传统的繁杂软件堆叠模式。',
      faqHeaderTitle: '经常被提及的高频合规财税解答 FAQ',
      pricingTitle: '拒绝按成交额高比例抽点',
      pricingSub: '拒绝套路。固定周期资费，无隐形扣点，全面捍卫实体企业辛勤劳动的纯利润空间。',
      contactHeaderTitle: '即刻加盟，体验数字商业革新',
      footerCompanyDesc: 'modaui 是 modaui Technologies 的注册品牌。依托高可靠合规的多国本地财政数据接洽，推进线下零售业深度数智化转型。',
      privacyTerm: 'GDPR 跨境主权隐私安全性守则',
      termsService: '商业客户授权许可使用协议'
    },
    fr: {
      brandTag: 'AI Commerce OS',
      home: 'Aperçu',
      solutions: 'Solutions',
      compare: 'Comparatif',
      blog: 'Blog de croissance',
      docs: 'API Docs',
      seoConsole: 'Moteur SEO',
      wiki: 'Wiki',
      prompts: 'Prompts IA',
      cases: 'Études de cas',
      ctaText: 'Start Free',
      heroTitle: 'modaui AI Commerce OS',
      heroSub: 'Le système d\'exploitation IA pour le commerce moderne.',
      heroDesc: 'Unifiez les paiements en temps réel, la logistique prédictive, le marketing automatique et le CRM sécurisé.',
      startNowBtn: 'Lancer gratuitement',
      bookDemoBtn: 'Réserver une démo',
      watchVideoBtn: 'Voir l\'aperçu',
      integratedWorkflowHeader: 'Flux autonome de commerce IA',
      integratedWorkflowSub: 'Cliquez sur un nœud pour inspecter le flux décisionnel de modaui.',
      featuresTitle: 'Capacités exceptionnelles',
      featuresSub: 'Conçu pour remplacer les terminaux POS obsolètes et systèmes CRM fragmentés.',
      compareHeaderTitle: 'Comparez modaui vs Legacy Stash',
      compareHeaderSub: 'Pourquoi notre architecture unifiée surpasse les solutions traditionnelles.',
      faqHeaderTitle: 'Questions fréquentes (Conformité RGPD / Fiscale)',
      pricingTitle: 'Tarifs simples et évolutifs',
      pricingSub: 'Pas de frais de transaction élevés. Annulez à tout moment.',
      contactHeaderTitle: 'Déployez modaui dès aujourd\'hui',
      footerCompanyDesc: 'modaui est une marque déposée de modaui Technologies. Redéfinir le commerce grâce à l\'IA.',
      privacyTerm: 'Confidentialité RGPD',
      termsService: 'Conditions d\'utilisation'
    },
    de: {
      brandTag: 'KI Commerce OS',
      home: 'Übersicht',
      solutions: 'Lösungen',
      compare: 'Plattform-Vergleich',
      blog: 'Wachstums-Blog',
      docs: 'API Docs',
      seoConsole: 'KI SEO-Engine',
      wiki: 'Wiki',
      prompts: 'KI-Prompts',
      cases: 'Fallstudien',
      ctaText: 'Start Free',
      heroTitle: 'modaui AI Commerce OS',
      heroSub: 'Das KI-Betriebssystem für modernen Handel.',
      heroDesc: 'Vereinheitlichen Sie Echtzeitzahlungen, vorausschauende Lagerhaltung, automatisiertes Marketing und CRM.',
      startNowBtn: 'Kostenlos starten',
      bookDemoBtn: 'Demo buchen',
      watchVideoBtn: 'Systemvorschau ansehen',
      integratedWorkflowHeader: 'Autonomer KI-Handelsfluss',
      integratedWorkflowSub: 'Klicken Sie auf einen Knoten, um den Entscheidungsfluss von modaui zu prüfen.',
      featuresTitle: 'Einzigartige Leistungsmerkmale',
      featuresSub: 'Entwickelt, um veraltete Kassen- und CRM-Insellösungen zu ersetzen.',
      compareHeaderTitle: 'modaui im Vergleich zu Legacy-Software',
      compareHeaderSub: 'Warum unsere integrierte Architektur traditionelle Kombinationen übertrifft.',
      faqHeaderTitle: 'Häufig gestellte Fragen (Compliance & DSGVO)',
      pricingTitle: 'Einfache, skalierbare Flatrates',
      pricingSub: 'Keine versteckten Provisionen. Jederzeit kündbar.',
      contactHeaderTitle: 'Richten Sie modaui noch heute ein',
      footerCompanyDesc: 'modaui is a registered trademark of modaui Technologies. Handel neu definiert.',
      privacyTerm: 'Datenschutz DSGVO',
      termsService: 'Nutzungsbedingungen'
    },
    es: {
      brandTag: 'AI Commerce OS',
      home: 'Overview',
      solutions: 'Soluciones',
      compare: 'Comparar Stack',
      blog: 'Blog de crecimiento',
      docs: 'API Docs',
      seoConsole: 'Fábrica SEO',
      wiki: 'Wiki',
      prompts: 'Prompts de IA',
      cases: 'Casos ROI',
      ctaText: 'Start Free',
      heroTitle: 'modaui AI Commerce OS',
      heroSub: 'El sistema operativo de IA para comercio moderno.',
      heroDesc: 'Unifique pagos en tiempo real, logística de inventario preventiva, marketing internacional y CRM con RGPD.',
      startNowBtn: 'Iniciar gratis',
      bookDemoBtn: 'Agendar Demo',
      watchVideoBtn: 'Ver previsualización',
      integratedWorkflowHeader: 'Flujo de comercio IA autónomo',
      integratedWorkflowSub: 'Haga clic en cualquier nodo para inspeccionar el flujo de modaui.',
      featuresTitle: 'Capacidades de sistema sobresalientes',
      featuresSub: 'Sustituya terminales POS obsoletos y sistemas CRM fragmentados.',
      compareHeaderTitle: 'Compare modaui vs Legacy Stash',
      compareHeaderSub: 'Por qué nuestra arquitectura unificada rinde más que los sistemas anteriores.',
      faqHeaderTitle: 'Preguntas frecuentes (Cumplimiento de IVA y RGPD)',
      pricingTitle: 'Tarifas planas simples y escalables',
      pricingSub: 'Sin altas comisiones por transacción. Cancele cuando quiera.',
      contactHeaderTitle: 'Active su perfil con modaui hoy',
      footerCompanyDesc: 'modaui es una marca registrada de modaui Technologies. Redefiniendo el comercio con IA.',
      privacyTerm: 'Privacidad RGPD',
      termsService: 'Condiciones del servicio'
    }
  }[lang];

  // Features description translated
  const FEATURES = [
    {
      id: 'feat-1',
      title: { en: 'AI Agent Workflows', it: 'Agenti Autonomi AI', zh: '自主智能体工作流水线' },
      desc: { en: 'Direct agent nodes monitor client invoice deadlines, trigger low-stock orders, and re-engage dormant VIP visitors.', it: 'Usa agenti intelligenti per monitorare scadenze delle fatture, riassortire stock e contattare vecchi clienti.', zh: '不间断对账、在库存临界点秒级向工厂签发采购凭据、并对高净值 VIP 推送专属优惠。' }
    },
    {
      id: 'feat-2',
      title: { en: 'AI Customer Service', it: 'Assistenza Clienti IA', zh: '数字记忆 AI 音/频全链客服' },
      desc: { en: 'Continuous training on your products, handling order issues, processing refunds, and resolving tax doubts.', it: 'Sempre pronti a rispondere ai clienti, organizzare resi e risolvere problemi sui pagamenti.', zh: '深谙您售卖的每款产品型号、支持全自动退款判断、对往来税务给出合理解释。' }
    },
    {
      id: 'feat-3',
      title: { en: 'AI Payment Routing', it: 'Pagamenti Intelligenti', zh: '免第三方网关原生低耗结算' },
      desc: { en: 'Optimized routing across EU credit networks and wallets. Issues rapid electronic bills containing localized Tax templates.', it: 'Tariffe ottimali su carte europee ed emissione fatture elettroniche con calcolatori IVA.', zh: '对接欧洲本地银行通道。免去高昂的中止结算扣点，默认附带税务申报表印鉴。' }
    },
    {
      id: 'feat-4',
      title: { en: 'AI Inventory Logistics', it: 'Inventario Predittivo', zh: '前置自适应仓储预测物流' },
      desc: { en: 'Adapts warehousing levels based on seasons and local sales metrics with automated purchase requisitions.', it: 'Regola la quantità minima di magazzino in base ai picchi estivi o natalizi per non rimanere senza stock.', zh: '结合本地天气、假期及爆款销量概率，智能化前置仓储，消除压货爆仓隐忧。' }
    },
    {
      id: 'feat-5',
      title: { en: 'AI CRM Memory Hub', it: 'CRM Sicuro GDPR', zh: 'GDPR 主权数据全场景 CRM' },
      desc: { en: 'Recognizes in-store sales and online logins as a single customer record. Strictly safe under EU localized schemas.', it: 'Unfifica le vendite fisiche in negozio ed e-commerce in un solo profilo cliente conforme al GDPR.', zh: '将实体到店扫码与线上零售网购在同一个会员账下进行整合，严格本地化储存。' }
    },
    {
      id: 'feat-6',
      title: { en: 'AI Auto-Marketing', it: 'SEO Multilingua Automatico', zh: '7x24h 程序化 SEO 流量工坊' },
      desc: { en: 'Renders localized landing pages and translates them to English, Italian, and Chinese to drive immediate crawl rankings.', it: 'Crea articoli e guide SEO tradotti per farti scalare le prime posizioni Google senza sforzo.', zh: '抓取地段长尾搜索关键词，自动生成方案，自动向搜索引擎呈报，将流量聚拢向总网店。' }
    }
  ];

  // Workflow decisions map for flowchart
  const WORKFLOW_NODES = [
    { id: 'customer', label: { en: 'Customer Touchpoint', it: 'Contatto Cliente', zh: '顾客订单发起' }, detail: { en: 'Visitor initiates checkout either physically via POS QR, or checkout page on Web.', it: 'Il cliente avvia il pagamento offline scannerizzando il QR del tavolo, o via web store.', zh: '顾客在实体店扫描桌台二维码落座点单，或者在手机及网页端橱窗中点击结账。' } },
    { id: 'brain', label: { en: 'AI Core Analysis', it: 'Analisi AI Brain', zh: 'AI 财务语义分析' }, detail: { en: 'modaui resolves the buyer tax jurisdiction (IVA/VAT) and detects localized loyalty campaigns.', it: 'Il sistema calcola la ritenuta d\'acconto e l\'aliquota IVA locale più idonea al cliente.', zh: '系统判断该订单主体财税优惠额度，计算该交易适用的增值税率（如意大利本地IVA）。' } },
    { id: 'reasoning', label: { en: 'Reasoning Check', it: 'Controllo Logistica', zh: '智能配货路由' }, detail: { en: 'Checks regional inventory. Routes dispatch trigger to the closest European manufacturing node.', it: 'Verifica la disponibilità fisica dei magazzini ed emette gli ordinativi di spedizione.', zh: '判定本地库房物理配载状态，计算出最优配送仓并调用智能仓储出货路径。' } },
    { id: 'payment', label: { en: 'Instant Secure Payout', it: 'Transazione Sicura', zh: '即时安全结算' }, detail: { en: 'Processes checkout with low bank merchant fees and registers invoice directly to tax portals.', it: 'Invia il corrispettivo all\'Agenzia delle Entrate ed effettua la ritenuta d\'imposta.', zh: '在毫秒级内直连收单通路，将交易所得直达商户绑定账户，并将电子发票递呈国家。' } }
  ];

  // Interactive Prompt Triggers for AI Sales Assistant Chat Widget
  const AI_CHAT_PROMPTS = [
    { label: { en: 'Suggest industry solutions', it: 'Consiglia soluzoni retail', zh: '推荐适配行业方案' }, query: 'What templates match a restaurant?' },
    { label: { en: 'How to calculate VAT margins?', it: 'Come calcolare IVA?', zh: '如何核算增值税与毛利？' }, query: 'Show me markup vs margin difference' },
    { label: { en: 'Request live video demo', it: 'Prenota un System-Demo', zh: '预约专人视频实机演练' }, query: 'I want to schedule a product walkthrough demo' }
  ];

  // Interactive AI Assistant core logic
  const handleAiPromptClick = (queryText: string) => {
    const userMsg = { sender: 'user' as const, text: queryText };
    let replyText = '';

    if (queryText.includes('restaurant') || queryText.includes('templates')) {
      replyText = lang === 'zh' 
        ? '💡 针对餐饮和零售实体：推荐部署 [Michelin Star Restaurant POS] DNA 模板。它完美内置了桌台桌位沙盘和自动分票。你可以在下方的 [DNA 配置环境库] 页面内进行一键部署或下载测试！'
        : '💡 We recommend our [Michelin Star Restaurant POS] DNA template. It comes fully equipped with automated seating triggers. You can browse, test or deploy it directly in the [Merchant DNA Templates] center below!';
    } else if (queryText.includes('markup') || queryText.includes('margins') || queryText.includes('VAT')) {
      replyText = lang === 'zh'
        ? '💡 财务核算提示：加价率是相对于进货成本而言，毛利率则是利润相对于销售总额。推荐使用下方的 [VAT与毛利率精算器] 免费计算器，输入即可快速算定！'
        : '💡 Understanding economics: Markup % is added directly to cost price to find selling price. Gross profit margin is selling profit relative to sale total. Use the free [VAT Margin Calculator] tool below for custom estimates!';
    } else {
      replyText = lang === 'zh'
        ? '💌 没问题！我已经将您的专人视频预约请求注册。请输入您的企业名与公司邮箱，我们的资深商业顾问将在2-4小时内提供专属实机演练。'
        : '💌 Absolutely. I’ve initiated the booking wizard. Simply type your company email below or use our scheduling sheet, and a commerce architecture partner will join your workspace within 2 hours!';
    }

    setAiChatMessages(prev => [...prev, userMsg, { sender: 'agent', text: replyText }]);
  };

  const submitLeadEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!potentialEmail.includes('@')) return;
    try {
      await fetch('/api/seo/crm/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: potentialEmail, source: 'ai_sales_chatbot' })
      });
    } catch (err) {
      console.error('CRM log failed:', err);
    }
    setLeadMailSubmitted(true);
    setAiChatMessages(prev => [
      ...prev,
      { sender: 'user', text: `My registration email: ${potentialEmail}` },
      { sender: 'agent', text: lang === 'zh' ? '🎉 登记成功！商业 DNA 蓝图归档文件已被分发到该邮箱。控制台欢迎访问：https://app.modaui.com' : '🎉 Registration success! Your unique onboarding material package has been dispatched. Access console anytime: https://app.modaui.com' }
    ]);
  };

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/seo/crm/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: demoEmail, companyName: demoCompanyName, source: 'book_demo_modal' })
      });
    } catch (err) {
      console.error('Demo CRM sync error:', err);
    }
    setDemoSuccess(true);
    setTimeout(() => {
      setDemoSuccess(false);
      setShowDemoModal(false);
      setDemoEmail('');
      setDemoCompanyName('');
    }, 3500);
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-sans sm:pb-32 selection:bg-cyan-500 selection:text-black">
      {/* 3D Glowing Constellation/Starfield neural network on the background */}
      <InteractiveCanvas />

      {/* Structured SEO Header Injector - JSON-LD Schema.org visualization */}
      <script type="application/ld+json">
        {JSON.stringify(getFullJsonLdSchema())}
      </script>

      {/* Global Navigation Header Section */}
      <header className="sticky top-0 z-50 w-full bg-[#070913]/90 backdrop-blur-md border-b border-slate-900 leading-normal">
        <div className="max-w-7xl mx-auto px-4 flex h-16 items-center justify-between">
          <button onClick={() => { setCurrentRoute('home'); setSelectedBlog(null); }} className="flex items-center gap-2 pointer-events-auto cursor-pointer">
            <span className="text-xl font-display font-bold tracking-tight text-white flex items-center gap-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">modaui</span>
              <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/20">
                {navT.brandTag}
              </span>
            </span>
          </button>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex gap-3 text-xs font-medium font-mono">
            <button
              onClick={() => { setCurrentRoute('home'); setSelectedBlog(null); }}
              className={`pb-1 transition-colors pointer-events-auto ${currentRoute === 'home' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}
              id="nav-link-home"
            >
              {navT.home}
            </button>
            <button
              onClick={() => { setCurrentRoute('solutions'); setSelectedBlog(null); }}
              className={`pb-1 transition-colors pointer-events-auto ${currentRoute === 'solutions' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}
              id="nav-link-solutions"
            >
              {navT.solutions}
            </button>
            <button
              onClick={() => { setCurrentRoute('compare'); setSelectedBlog(null); }}
              className={`pb-1 transition-colors pointer-events-auto ${currentRoute === 'compare' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}
              id="nav-link-compare"
            >
              {navT.compare}
            </button>
            <button
              onClick={() => { setCurrentRoute('blog'); }}
              className={`pb-1 transition-colors pointer-events-auto ${currentRoute === 'blog' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}
              id="nav-link-blog"
            >
              {navT.blog}
            </button>
            <button
              onClick={() => { setCurrentRoute('docs'); setSelectedBlog(null); }}
              className={`pb-1 transition-colors pointer-events-auto ${currentRoute === 'docs' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}
              id="nav-link-docs"
            >
              {navT.docs}
            </button>
            <button
              onClick={() => { setCurrentRoute('wiki'); setSelectedBlog(null); }}
              className={`pb-1 transition-colors pointer-events-auto ${currentRoute === 'wiki' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}
              id="nav-link-wiki"
            >
              {navT.wiki}
            </button>
            <button
              onClick={() => { setCurrentRoute('prompts'); setSelectedBlog(null); }}
              className={`pb-1 transition-colors pointer-events-auto ${currentRoute === 'prompts' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}
              id="nav-link-prompts"
            >
              {navT.prompts}
            </button>
            <button
              onClick={() => { setCurrentRoute('cases'); setSelectedBlog(null); }}
              className={`pb-1 transition-colors pointer-events-auto ${currentRoute === 'cases' ? 'text-cyan-400 border-b-2 border-cyan-500' : 'text-slate-400 hover:text-white'}`}
              id="nav-link-cases"
            >
              {navT.cases}
            </button>
            <button
              onClick={() => { setCurrentRoute('drive'); setSelectedBlog(null); }}
              className={`pb-1 text-emerald-400 font-mono font-medium pointer-events-auto hover:text-white transition-colors flex items-center gap-1.5 ${currentRoute === 'drive' ? 'text-cyan-400 border-b-2 border-cyan-500' : ''}`}
              id="nav-link-drive"
            >
              <Cloud className="w-3.5 h-3.5" />
              {navT.drive}
            </button>
            <button
              onClick={() => { setCurrentRoute('factory'); setSelectedBlog(null); }}
              className={`pb-1 text-purple-400 font-semibold pointer-events-auto hover:text-white transition-colors ${currentRoute === 'factory' ? 'text-cyan-400 border-b-2 border-cyan-500' : ''}`}
              id="nav-link-seo-console"
            >
              {navT.seoConsole}
            </button>
          </nav>

          {/* Localization Dropdown & Urgent CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language toggle element */}
            <div className="flex items-center gap-1 bg-[#141829]/65 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-305 pointer-events-auto">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
                id="language-switcher-desktop"
              >
                <option value="en" className="bg-[#0b0e1e] text-white font-mono">🇬🇧 English</option>
                <option value="it" className="bg-[#0b0e1e] text-white font-mono">🇮🇹 Italiano</option>
                <option value="zh" className="bg-[#0b0e1e] text-white font-mono">🇨🇳 中文</option>
                <option value="fr" className="bg-[#0b0e1e] text-white font-mono">🇫🇷 Français</option>
                <option value="de" className="bg-[#0b0e1e] text-white font-mono">🇩🇪 Deutsch</option>
                <option value="es" className="bg-[#0b0e1e] text-white font-mono">🇪🇸 Español</option>
              </select>
            </div>

            <a
              href="https://app.modaui.com"
              className="py-2 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-xs text-white hover:opacity-90 inline-block text-center pointer-events-auto transition-opacity"
              id="nav-btn-start"
            >
              {navT.ctaText}
            </a>
          </div>

          <div className="flex md:hidden items-center gap-2">
            {/* Small screen mobile menu drawer layout button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-350 hover:text-white p-1 pointer-events-auto"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#070913] border-t border-slate-900 p-4 space-y-2 font-mono text-sm leading-normal animate-fade-in pointer-events-auto">
            <button
              onClick={() => { setCurrentRoute('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded"
            >
              {navT.home}
            </button>
            <button
              onClick={() => { setCurrentRoute('solutions'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded"
            >
              {navT.solutions}
            </button>
            <button
              onClick={() => { setCurrentRoute('compare'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded"
            >
              {navT.compare}
            </button>
            <button
              onClick={() => { setCurrentRoute('blog'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded"
            >
              {navT.blog}
            </button>
            <button
              onClick={() => { setCurrentRoute('docs'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded"
            >
              {navT.docs}
            </button>
            <button
              onClick={() => { setCurrentRoute('wiki'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded"
            >
              {navT.wiki}
            </button>
            <button
              onClick={() => { setCurrentRoute('prompts'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded"
            >
              {navT.prompts}
            </button>
            <button
              onClick={() => { setCurrentRoute('cases'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded"
            >
              {navT.cases}
            </button>
            <button
              onClick={() => { setCurrentRoute('drive'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded text-emerald-400 font-semibold flex items-center gap-1.5"
            >
              <Cloud className="w-4 h-4" />
              {navT.drive}
            </button>
            <button
              onClick={() => { setCurrentRoute('factory'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 px-3 hover:bg-slate-900 rounded text-purple-400 font-bold"
            >
              {navT.seoConsole}
            </button>

            <div className="pt-2 flex flex-col gap-2 border-t border-slate-900">
              <div className="flex items-center gap-2 bg-[#141829] p-2.5 rounded-lg border border-slate-800">
                <Globe className="w-4 h-4 text-cyan-400" />
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value as Language)}
                  className="bg-transparent text-xs text-slate-200 focus:outline-none w-full font-mono"
                >
                  <option value="en" className="bg-[#0b0e1e] text-white font-mono">🇬🇧 English</option>
                  <option value="it" className="bg-[#0b0e1e] text-white font-mono">🇮🇹 Italiano</option>
                  <option value="zh" className="bg-[#0b0e1e] text-white font-mono">🇨🇳 中文</option>
                  <option value="fr" className="bg-[#0b0e1e] text-white font-mono">🇫🇷 Français</option>
                  <option value="de" className="bg-[#0b0e1e] text-white font-mono">🇩🇪 Deutsch</option>
                  <option value="es" className="bg-[#0b0e1e] text-white font-mono">🇪🇸 Español</option>
                </select>
              </div>

              <a
                href="https://app.modaui.com"
                className="w-full text-center py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-xs text-white"
              >
                {navT.ctaText}
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Main Coordinate Content Body */}
      <main className="relative z-10">

        {/* ROUTE 1: HOME PAGE overview */}
        {currentRoute === 'home' && (
          <>
            {/* HERO HERO SECTION */}
            <section className="relative pt-12 md:pt-24 pb-16 px-4 max-w-7xl mx-auto text-center" id="hero-heading">
              <span className="px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-950/30 text-[#00f0ff] text-xs font-mono tracking-widest inline-flex items-center gap-1.5 uppercase mb-6 animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Gen Enterprise Automation</span>
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-white leading-none">
                {navT.heroTitle}
              </h1>
              <p className="mt-4 text-xl sm:text-2xl font-light text-slate-300 font-display">
                {navT.heroSub}
              </p>

              <p className="mt-6 max-w-3xl mx-auto text-slate-400 text-sm md:text-base leading-relaxed">
                {navT.heroDesc}
              </p>

              {/* Instant Conversion CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="https://app.modaui.com"
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 font-semibold text-xs uppercase tracking-wider text-white pointer-events-auto transition-opacity"
                  id="btn-hero-launch"
                >
                  {navT.startNowBtn}
                </a>

                <button
                  onClick={() => setShowDemoModal(true)}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-[#0e1224] border border-slate-700 hover:bg-[#14182f] transition-all font-semibold text-xs tracking-wide text-white pointer-events-auto cursor-pointer flex items-center justify-center gap-1.5"
                  id="btn-hero-book-demo"
                >
                  <Calendar className="w-4 h-4 text-cyan-400" />
                  <span>{navT.bookDemoBtn}</span>
                </button>

                <button
                  onClick={() => setShowVideoModal(true)}
                  className="w-full sm:w-auto py-3.5 px-8 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors border border-slate-800 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer pointer-events-auto"
                  id="btn-hero-watch-demo"
                >
                  <Play className="w-4 h-4 fill-cyan-400 text-cyan-400" />
                  <span>{navT.watchVideoBtn}</span>
                </button>
              </div>

              {/* Visual Grid Card representing OS Nodes */}
              <div className="mt-16 border border-slate-900 rounded-3xl bg-[#090a16]/80 p-6 max-w-5xl mx-auto glow-card">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 rounded-xl bg-slate-950/30 border border-slate-900">
                    <span className="block text-xl md:text-3xl font-display font-semibold text-[#00F0FF]">+142%</span>
                    <span className="block text-[10px] text-slate-500 font-mono mt-1 uppercase">Checkout Flow Speed</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/30 border border-slate-900">
                    <span className="block text-xl md:text-3xl font-display font-semibold text-[#7000FF]">0.45%</span>
                    <span className="block text-[10px] text-slate-500 font-mono mt-1 uppercase">Base Card Acquirer rate</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/30 border border-slate-900">
                    <span className="block text-xl md:text-3xl font-display font-semibold text-emerald-400">99.99%</span>
                    <span className="block text-[10px] text-slate-500 font-mono mt-1 uppercase">Continuous Active Uptime</span>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/30 border border-slate-900">
                    <span className="block text-xl md:text-3xl font-display font-semibold text-white">12K+</span>
                    <span className="block text-[10px] text-slate-500 font-mono mt-1 uppercase">AI Programmatic Page views</span>
                  </div>
                </div>
              </div>
            </section>

            {/* INTEGRATED NEURO WORKFLOW ANIMATION FLOWCHART */}
            <section className="py-16 px-4 bg-[#0a0d1d]/40 border-t border-b border-slate-900">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10 pb-4">
                  <h2 className="text-2xl md:text-3xl font-display font-medium text-white">
                    {navT.integratedWorkflowHeader}
                  </h2>
                  <p className="mt-2 text-slate-400 text-xs md:text-sm">
                    {navT.integratedWorkflowSub}
                  </p>
                </div>

                {/* Animated Node Layout */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-8">
                  {WORKFLOW_NODES.map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setActiveWorkflowNode(node.id)}
                      className={`text-center p-5 rounded-2xl border transition-all cursor-pointer pointer-events-auto ${
                        activeWorkflowNode === node.id
                          ? 'border-cyan-400 bg-cyan-950/30 shadow-md transform scale-103'
                          : 'border-slate-850 hover:bg-slate-900/40 bg-[#080914]'
                      }`}
                      id={`btn-workflow-node-${node.id}`}
                    >
                      <div className="w-8 h-8 rounded-full bg-cyan-900/40 flex items-center justify-center mx-auto mb-3">
                        <Sparkles className={`w-4 h-4 ${activeWorkflowNode === node.id ? 'text-[#00F0FF] animate-spin' : 'text-slate-500'}`} />
                      </div>
                      <span className="block text-xs font-mono font-medium text-slate-300">
                        {node.label[lang]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Active detailed statement block */}
                <div className="bg-[#05060d] border border-cyan-950/80 p-6 rounded-2xl">
                  {WORKFLOW_NODES.map((node) => {
                    if (node.id === activeWorkflowNode) {
                      return (
                        <div key={node.id} className="animate-fade-in text-center sm:text-left">
                          <h4 className="text-xs uppercase font-mono tracking-wider text-cyan-400 flex items-center justify-center sm:justify-start gap-1.5 mb-2">
                            <CheckCircle2 className="w-4 h-4 text-[#00F0FF]" />
                            <span>Active Node Node: {node.label[lang]}</span>
                          </h4>
                          <p className="text-sm text-slate-300 leading-relaxed font-sans font-normal">
                            {node.detail[lang]}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </section>

            {/* TECHNICAL SYSTEM FEATURE LISTING GRID */}
            <section className="py-20 px-4 max-w-6xl mx-auto" id="features">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                  {navT.featuresTitle}
                </h2>
                <p className="mt-3 text-slate-400 text-sm">
                  {navT.featuresSub}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURES.map((item) => (
                  <div key={item.id} className="p-6 bg-slate-950/50 border border-slate-900 hover:border-slate-850 rounded-2xl glow-card transition-all flex flex-col justify-between">
                    <div>
                      <div className="w-9 h-9 rounded-xl bg-[#0d1226] border border-cyan-950/60 flex items-center justify-center mb-4">
                        <Zap className="w-4 h-4 text-cyan-400" />
                      </div>
                      <h3 className="text-base font-semibold text-white font-display mb-2">
                        {item.title[lang]}
                      </h3>
                      <p className="text-xs text-slate-400 leading-normal">
                        {item.desc[lang]}
                      </p>
                    </div>

                    <a
                      href="https://app.modaui.com"
                      className="text-[10px] font-mono font-medium tracking-wide uppercase text-cyan-400 hover:text-white mt-4 flex items-center gap-1 pointer-events-auto"
                      id={`feature-btn-${item.id}`}
                    >
                      <span>Deploy Node Config</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERACTIVE MERCHANTS FREE TOOLS SUITE */}
            <ToolsCenter lang={lang} />

            {/* DESIGN DNA MARKETPLACE AND DOWNLOADS CENTER */}
            <TemplatesDownload lang={lang} />

            {/* SYSTEM PRICING SECTION */}
            <section className="py-20 px-4 bg-[#0a0d1d]/30 border-t border-slate-900">
              <div className="max-w-4xl mx-auto text-center mb-12">
                <span className="px-3 py-1 rounded bg-[#10072b]/85 border border-[#430299]/50 text-purple-400 font-mono text-[10.5px] uppercase tracking-wider inline-block mb-3">
                  Fixed pricing
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
                  {navT.pricingTitle}
                </h2>
                <p className="mt-2 text-slate-400 text-sm">
                  {navT.pricingSub}
                </p>

                {/* Monthly Yearly pricing switcher state */}
                <div className="flex bg-slate-950 border border-slate-900 rounded-xl p-1 inline-flex mt-6 pointer-events-auto">
                  <button
                    onClick={() => setPricePeriod('monthly')}
                    className={`py-1.5 px-4 rounded-lg text-xs font-mono font-medium transition-colors ${
                      pricePeriod === 'monthly' ? 'bg-[#00f0ff]/10 text-[#00f0ff]' : 'text-slate-400 hover:text-white'
                    }`}
                    id="pricing-toggle-monthly"
                  >
                    Monthly plan
                  </button>
                  <button
                    onClick={() => setPricePeriod('yearly')}
                    className={`py-1.5 px-4 rounded-lg text-xs font-mono font-medium transition-colors ${
                      pricePeriod === 'yearly' ? 'bg-[#00f0ff]/10 text-[#00f0ff]' : 'text-slate-400 hover:text-white'
                    }`}
                    id="pricing-toggle-yearly"
                  >
                    Yearly plan (-20%)
                  </button>
                </div>
              </div>

              {/* Flat model row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {/* Profesional Profile */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 relative">
                  <span className="text-xs font-semibold text-slate-400 uppercase font-mono">Professional</span>
                  <div className="mt-4 flex items-baseline gap-1 text-white">
                    <span className="text-3xl font-display font-semibold">€{pricePeriod === 'monthly' ? '49' : '39'}</span>
                    <span className="text-xs text-slate-500 font-mono">/Mo</span>
                  </div>
                  <ul className="mt-6 space-y-3.5 text-xs text-slate-350 border-t border-slate-900 pt-4">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> 1 Physical Local POS</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Unified tax compliance</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Basic VIP loyalty logs</li>
                  </ul>
                  <a href="https://app.modaui.com" className="w-full inline-block text-center mt-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 font-semibold text-xs text-white">Start Premium Free</a>
                </div>

                {/* Business Standard Profile */}
                <div className="p-[2.5px] rounded-2xl bg-gradient-to-r from-[#00F0FF] to-[#7000FF] relative transform md:-translate-y-2 shadow-xl">
                  <div className="bg-[#0b0f1d] p-6 rounded-[13.5px] h-full flex flex-col justify-between">
                    <div>
                      <span className="inline-block bg-cyan-950/60 text-cyan-400 text-[10px] font-mono px-2.5 py-0.5 rounded border border-cyan-800 mb-2 uppercase">Best Seller</span>
                      <span className="block text-xs font-semibold text-white uppercase font-mono">Business Volume</span>
                      <div className="mt-4 flex items-baseline gap-1 text-white">
                        <span className="text-4xl font-display font-bold">€{pricePeriod === 'monthly' ? '99' : '79'}</span>
                        <span className="text-xs text-slate-500 font-mono">/Mo</span>
                      </div>
                      <ul className="mt-6 space-y-3.5 text-xs text-slate-200 border-t border-slate-900 pt-4">
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> 3 Multi-Register POS setups</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Smart self-healing Stock alerts</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Automated Multilingual SEO Factory</li>
                        <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> WhatsApp VIP Catalog updates</li>
                      </ul>
                    </div>
                    <a href="https://app.modaui.com" className="w-full inline-block text-center mt-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 font-semibold text-xs text-white transition-opacity hover:opacity-90">Start Ultimate Free</a>
                  </div>
                </div>

                {/* Enterprise Customized */}
                <div className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40">
                  <span className="text-xs font-semibold text-slate-400 uppercase font-mono">Corporate Enterprise</span>
                  <div className="mt-4 text-white">
                    <span className="text-2xl font-display font-semibold">Custom SLA</span>
                  </div>
                  <ul className="mt-6 space-y-3.5 text-xs text-slate-350 border-t border-slate-900 pt-4">
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Unlimited outlets & counters</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Dedicated ISO-27001 disaster nodes</li>
                    <li className="flex items-center gap-2"><Check className="w-4 h-4 text-cyan-400" /> Custom API integration mapping</li>
                  </ul>
                  <button onClick={() => setShowDemoModal(true)} className="w-full inline-block text-center mt-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-850 font-semibold text-xs text-white pointer-events-auto cursor-pointer">Inquire Commercial SLA</button>
                </div>
              </div>
            </section>

            {/* TRUST CENTER DETAILS */}
            <section className="py-16 px-4 max-w-5xl mx-auto border-t border-slate-900" id="trust-sheet">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-1">
                  <h3 className="text-lg font-display font-medium text-white flex items-center gap-1.5 uppercase tracking-wide">
                    <ShieldCheck className="w-5 h-5 text-cyan-400" />
                    <span>European Trust Hub</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Corporate integrity metrics. Encrypted physically at regional hardware layers.
                  </p>
                </div>

                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
                    <span className="block text-[10px] font-mono text-cyan-400 uppercase">GDPR Protected</span>
                    <span className="text-xs text-slate-300 block mt-1.5">
                      No external non-EU trackers. Customer logs strictly preserved inside isolated regional data containers.
                    </span>
                  </div>

                  <div className="p-4 bg-slate-950/40 border border-slate-900 rounded-xl">
                    <span className="block text-[10px] font-mono text-cyan-400 uppercase">ISO 27001 Protocols</span>
                    <span className="text-xs text-slate-300 block mt-1.5">
                      Security-by-design standards with military-grade dual encryption pipelines, securing bank card handshakes.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Frequently Asked Question Accordion Panel */}
            <section className="py-16 px-4 max-w-4xl mx-auto border-t border-slate-900 bg-slate-950/10 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-display font-medium text-white mb-8 text-center tracking-tight">
                {navT.faqHeaderTitle}
              </h2>
              <div className="space-y-4">
                {FAQS.map((faq) => (
                  <div key={faq.id} className="p-5 bg-slate-950/40 border border-slate-900 rounded-xl">
                    <h4 className="text-sm font-semibold text-white flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{faq.question[lang]}</span>
                    </h4>
                    <p className="mt-2.5 text-xs text-slate-400 leading-relaxed pl-6">
                      {faq.answer[lang]}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ROUTE 2: SOLUTIONS LISTING VIEW */}
        {currentRoute === 'solutions' && (
          <section className="py-12 px-4 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-display font-medium text-white">
                Vertical System Solutions
              </h2>
              <p className="mt-3 text-slate-405 text-sm">
                How modaui adapts dynamically across distinct commercial models with zero external setup overhead.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-slate-950/40 border border-[#00f0ff]/10 rounded-2xl glow-card">
                <span className="text-[10px] uppercase font-mono text-cyan-400">Micro-Commerce</span>
                <h3 className="text-xl font-display text-white mt-2 mb-3">Restaurant & Bistro POS Nodes</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Fully replaces custom printed kitchen routers or slow checkouts. Embeds table seating state and automatic sommelier recommendations directly in local web monitors.
                </p>
                <div className="text-xs font-mono text-cyan-400 bg-cyan-950/40 p-2 rounded">
                  ★ Key ROI: -55% drop in table queued times
                </div>
              </div>

              <div className="p-6 bg-slate-955/40 border border-purple-500/10 rounded-2xl glow-card">
                <span className="text-[10px] uppercase font-mono text-purple-400">High Volume</span>
                <h3 className="text-xl font-display text-white mt-2 mb-3">Luxury Boutique Fashion Retail</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Links local VIP loyalty scores directly to credit accounts. Detects buying frequency to automatically organize stock configurations at regional nodes.
                </p>
                <div className="text-xs font-mono text-purple-400 bg-purple-950/40 p-2 rounded">
                  ★ Key ROI: +68% Increase Customer Lifetime Value
                </div>
              </div>

              <div className="p-6 bg-slate-955/40 border border-slate-900 rounded-2xl hover:border-slate-800 transition-colors">
                <span className="text-[10px] uppercase font-mono text-slate-400">Logistics</span>
                <h3 className="text-xl font-display text-white mt-2 mb-3">B2C Digital Ecommerce Storefronts</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Bypasses high-premium third-party payment integrations. Features instantaneous VAT reporting compliant directly under EU Mini-One-Stop-Shop thresholds.
                </p>
              </div>

              <div className="p-6 bg-slate-955/40 border border-slate-900 rounded-2xl hover:border-slate-800 transition-colors">
                <span className="text-[10px] uppercase font-mono text-slate-400">Ecosystem</span>
                <h3 className="text-xl font-display text-white mt-2 mb-3">SME Multi-site Fast FMCG chain</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Consolidates active physical terminals across Milan, Munich, and Madrid under a single sovereign master registry dashboard. No fragmented databases.
                </p>
              </div>
            </div>

            {/* Quick deployment block linking directly to CTA destination */}
            <div className="mt-12 text-center">
              <a href="https://app.modaui.com" className="inline-block py-3 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-xs font-semibold text-white hover:opacity-90">
                Launch Custom Solution Hub
              </a>
            </div>
          </section>
        )}

        {/* ROUTE 3: COMPARISON MATRIX SHEET */}
        {currentRoute === 'compare' && (
          <section className="py-12 px-4 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-medium text-white text-center tracking-tight">
                {navT.compareHeaderTitle}
              </h2>
              <p className="mt-2 text-slate-400 text-xs md:text-sm">
                {navT.compareHeaderSub}
              </p>
            </div>

            {/* Table layout comparing modaui with Shopify, Stripe, Square, Odoo */}
            <div className="overflow-x-auto bg-[#080b18]/80 border border-slate-900 p-6 rounded-2xl">
              <table className="w-full text-left font-mono text-xs text-slate-300 whitespace-nowrap">
                <thead>
                  <tr className="border-b border-rose-950/20 text-slate-500 uppercase tracking-widest pb-3">
                    <th className="py-3 font-normal">Integration Metric</th>
                    <th className="py-3 text-cyan-400 font-semibold text-center">modaui OS</th>
                    <th className="py-3 text-slate-400 text-center">Shopify</th>
                    <th className="py-3 text-slate-400 text-center">Stripe</th>
                    <th className="py-3 text-slate-400 text-center">Odoo ERP</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {SAAS_COMPARE_MATRIX.map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-4 font-display font-semibold text-white">
                        {item.featureName[lang]}
                        <span className="block font-sans font-light text-[10px] text-slate-400 mt-1.5 max-w-[280px] whitespace-normal">
                          {item.description[lang]}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className="bg-emerald-950/40 text-emerald-400 border border-emerald-900/30 px-3 py-1 rounded text-[10px] font-bold">
                          ✓ Native Included
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        {item.shopifyHas === true ? '✓ Native' : item.shopifyHas === 'partial' ? '⚠️ Custom Plugins' : '❌ Absent'}
                      </td>
                      <td className="py-4 text-center">
                        {item.stripeHas === true ? '✓ Native' : item.stripeHas === 'partial' ? '⚠️ Raw API' : '❌ Absent'}
                      </td>
                      <td className="py-4 text-center">
                        {item.odooHas === true ? '✓ Native' : item.odooHas === 'partial' ? '⚠️ Heavy Setup' : '❌ Absent'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ROUTE 4: DYNAMIC MULTI-LANG SEO BLOG AND ARTICLE VIEW */}
        {currentRoute === 'blog' && (
          <section className="py-12 px-4 max-w-6xl mx-auto" id="blog-listings-row">
            
            {selectedBlog ? (
              /* Deep Article Render with meta tags mapping */
              <div className="max-w-3xl mx-auto bg-[#080d19]/85 p-6 md:p-8 rounded-2xl border border-slate-910 leading-relaxed font-sans font-normal relative">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="absolute -top-12 left-0 text-xs font-mono text-cyan-400 hover:text-white flex items-center gap-1.5 bg-slate-950 border border-slate-900 py-1.5 px-3.5 rounded-lg"
                  id="btn-back-to-blogs"
                >
                  ← Return to lists
                </button>

                {/* Article Header SEO specifics */}
                <div className="border-b border-slate-900 pb-5 mb-6">
                  <div className="flex gap-4 items-center text-[10px] font-mono text-[#00f0ff] uppercase">
                    <span>{selectedBlog.category}</span>
                    <span>• {selectedBlog.readingTime} read</span>
                    <span>• {selectedBlog.publishedTime}</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-display font-medium text-white pb-3 pt-3">
                    {selectedBlog.title[lang]}
                  </h1>
                  <span className="block text-slate-400 text-xs">
                    Author: <strong className="text-slate-200">{selectedBlog.author}</strong> ({selectedBlog.authorRole})
                  </span>

                  {/* SEO Keyword & JSON Breadcrumb indicators */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-slate-900/80">
                    {selectedBlog.keywords.map((kwd, idx) => (
                      <span key={idx} className="bg-slate-900 text-slate-500 font-mono text-[9px] px-2 py-0.5 rounded border border-slate-850">
                        #{kwd}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-slate-300 text-sm leading-relaxed space-y-4 font-sans font-normal markdown-body">
                  {/* Dynamic description indicator */}
                  <p className="font-semibold text-white text-xs border-l-2 border-cyan-500 pl-3 italic mb-6">
                    {selectedBlog.description[lang]}
                  </p>

                  <div className="whitespace-pre-line text-slate-300">
                    {selectedBlog.content[lang]}
                  </div>
                </div>

                {/* Simulated Article breadcrumb Schema indicator */}
                <div className="mt-8 pt-4 border-t border-slate-900/60 font-mono text-[9.5px] text-slate-500">
                  <span>Breadcrumb SEO Path: home &gt; blog &gt; {selectedBlog.slug}</span>
                  <span className="block mt-1">Conforms with: schema.org/Article index metrics.</span>
                </div>
              </div>
            ) : (
              /* Lists of available blog articles */
              <>
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="px-3 py-1 bg-cyan-950/40 text-cyan-400 font-mono text-xs rounded border border-cyan-800/40">
                    Content Center
                  </span>
                  <h2 className="text-3xl font-display font-medium text-white mt-1">
                    modaui Commerce Academy & Insights
                  </h2>
                  <p className="text-slate-400 text-xs mt-2">
                    Insights regarding European credit acquirer thresholds, local checkout layout modifications, and programmatic SEO.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {BLOG_POSTS.map((post) => (
                    <article key={post.id} className="p-5 bg-slate-950/40 border border-slate-900 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-cyan-400">
                          <span>{post.category}</span>
                          <span>{post.publishedTime}</span>
                        </div>
                        <h3 className="text-base font-semibold text-white font-display mt-3 hover:text-cyan-400 transition-colors">
                          {post.title[lang]}
                        </h3>
                        <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                          {post.description[lang]}
                        </p>
                      </div>

                      <button
                        onClick={() => setSelectedBlog(post)}
                        className="text-[10px] font-mono tracking-wide uppercase text-cyan-400 hover:text-white font-semibold flex items-center gap-1 mt-4 text-left pointer-events-auto cursor-pointer"
                        id={`btn-read-blog-${post.id}`}
                      >
                        <span>Deep Read Article</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </article>
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        {/* ROUTE 5: TECHNICAL API DOCUMENTATION HUB */}
        {currentRoute === 'docs' && (
          <section className="py-12 px-4 max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-display font-medium text-white">
                modaui Core Developer Hub
              </h2>
              <p className="text-slate-450 text-xs mt-2 font-mono">
                Integrating localized payments terminal web-hooks directly across your enterprise.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left sidebar listing documentation topics */}
              <div className="col-span-1 lg:col-span-4 bg-[#0a0c1a] border border-slate-900 rounded-xl p-4 space-y-4">
                {TECHNICAL_DOC_CATEGORIES.map((cat) => (
                  <div key={cat.id}>
                    <h4 className="text-[11px] font-bold font-mono tracking-wider uppercase text-slate-500 mb-2 px-1">
                      {cat.title[lang]}
                    </h4>
                    <div className="space-y-1">
                      {cat.docs.map((doc) => (
                        <button
                          key={doc.id}
                          className="w-full text-left py-1.5 px-2 hover:bg-slate-900 rounded text-xs text-slate-300 font-mono focus:text-[#00f0ff]"
                          onClick={() => {
                            alert(lang === 'zh'
                              ? `🗃️ [${doc.title[lang]}] 接口和测试指令已对接到您的本地模拟控制台沙盒内。`
                              : `🗃️ [${doc.title[lang]}] reference guidelines have been initialized in your preview panel.`);
                          }}
                        >
                          ▸ {doc.title[lang]}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Documentation viewer center */}
              <div className="col-span-1 lg:col-span-8 bg-[#04060c] border border-slate-900 p-6 rounded-xl">
                <div className="prose prose-invert prose-xs text-slate-300 space-y-4">
                  <span className="text-[10px] font-mono text-purple-400 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/40">
                    Live System Reference
                  </span>
                  <h3 className="text-lg font-semibold text-white font-display">
                    Secure Web API Handshake & Local Fiscal Gateway compliance
                  </h3>
                  <div className="border-b border-slate-900 pb-3" />
                  <p className="text-xs leading-relaxed">
                    The modaui ledger system functions through unified REST structures. Each physical checkout card swiped or scan action fires secure webhook callback events representing local EU customer parameters (e.g., city, regional VAT codes).
                  </p>

                  <pre className="p-4 bg-slate-950/70 border border-slate-900 rounded-lg text-[10px] font-mono text-cyan-300 leading-relaxed overflow-x-auto whitespace-pre">
                    {`# Fetch dynamic VAT-compliant invoice receipt JSON
GET /v1/billing/fiscal-invoices/invoice-mda_891
Authorization: Bearer mda_live_sec_8927429188

Response 200 OK:
{
  "invoice_id": "mda_891",
  "client_origin": "IT",
  "vat_applied_pct": 22.0,
  "net_subtotal_eur": 150.00,
  "tax_amount_eur": 33.00,
  "gross_total_eur": 183.00,
  "fiscal_signature_hash": "sec_sig_0f781a9bcde88f01"
}`}
                  </pre>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* ROUTE 6: AI GROWTH DASHBOARD & PROGRAMMATIC SEO PIPELINE */}
        {currentRoute === 'factory' && (
          <GrowthFactory lang={lang} />
        )}

        {/* ROUTE 7: AI BUSINESS ENCYCLOPEDIA & GLOSSARY */}
        {currentRoute === 'wiki' && (
          <AiWikiGlossary lang={lang} />
        )}

        {/* ROUTE 8: AI COPYABLE PROMPTS BLUEPRINTS */}
        {currentRoute === 'prompts' && (
          <AiPromptsHub lang={lang} />
        )}

        {/* ROUTE 9: ROI SUCCESS CASES VERIFICATION PANEL */}
        {currentRoute === 'cases' && (
          <AiCaseStudies lang={lang} />
        )}

        {/* ROUTE 10: GOOGLE CLOUD STORAGE WORKSPACE */}
        {currentRoute === 'drive' && (
          <DriveWorkspace lang={lang} />
        )}

      </main>

      {/* PERSISTENT CORE FOOTER */}
      <footer className="bg-[#05060d] border-t border-slate-900 py-12 px-4 leading-normal">
        {(() => {
          const lf = {
            en: {
              directory: 'Company Directory',
              about: 'About modaui Group',
              careers: 'Careers (Openings)',
              press: 'Milan Press Room',
              partners: 'Global Partner Network',
              offices: 'Operating Offices (Milano)',
              connections: 'Platform Connections',
              driveSync: 'Google Drive sync ✦',
              stripe: 'Stripe gateway terminal',
              whatsapp: 'WhatsApp Business link',
              telegram: 'Telegram Dev Channel',
              map: 'Locate via Google Maps',
              legal: 'Brand Trust & Legal',
              address: 'Via Montenapoleone 8, Milan, Italy'
            },
            it: {
              directory: 'Directory Aziendale',
              about: 'Chi Siamo - modaui',
              careers: 'Lavora con Noi',
              press: 'Ufficio Stampa Milano',
              partners: 'Programma Affiliati',
              offices: 'Uffici Operativi (Milano)',
              connections: 'Piattaforme esterne',
              driveSync: 'Esploratore Google Drive ✦',
              stripe: 'Pagamenti via Stripe',
              whatsapp: 'Canale diretto WhatsApp',
              telegram: 'Canale Sviluppo Telegram',
              map: 'Sede su Google Maps',
              legal: 'Affidabilità e Fiscale',
              address: 'Via Montenapoleone 8, Milano, Italia'
            },
            zh: {
              directory: '公司目录与服务',
              about: '关于 摩达数智 (modaui)',
              careers: '招纳贤士 / 全球招聘',
              press: '米兰总部新闻媒介中心',
              partners: '全球城市加盟伙伴推广',
              offices: '海外办事处 (米兰 / 罗马 / 温州)',
              connections: '外部数字平台连接',
              driveSync: '谷歌网盘 (Google Drive Sync) ✦',
              stripe: 'Stripe 统一结算通道',
              whatsapp: 'WhatsApp 企业自动推送',
              telegram: 'Telegram 实时客服通联',
              map: '谷歌地图总部定位 (G-Maps)',
              legal: '品牌信任与欧规合规',
              address: '意大利米兰蒙特拿破仑大街 8 号'
            }
          }[lang === 'zh' ? 'zh' : lang === 'it' ? 'it' : 'en'] || {
            directory: 'Company Directory',
            about: 'About modaui Group',
            careers: 'Careers (Openings)',
            press: 'Milan Press Room',
            partners: 'Global Partner Network',
            offices: 'Operating Offices (Milano)',
            connections: 'Platform Connections',
            driveSync: 'Google Drive sync ✦',
            stripe: 'Stripe gateway terminal',
            whatsapp: 'WhatsApp Business link',
            telegram: 'Telegram Dev Channel',
            map: 'Locate via Google Maps',
            legal: 'Brand Trust & Legal',
            address: 'Via Montenapoleone 8, Milan, Italy'
          };

          return (
            <div className="max-w-6xl mx-auto space-y-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
                
                {/* COL 1: Brand and Social hubs */}
                <div className="space-y-4">
                  <span className="text-base font-display font-medium tracking-tight text-white flex items-center gap-1.5">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">modaui</span>
                    <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/20 px-1.5 py-0.5 rounded">OS</span>
                  </span>
                  <p className="text-slate-500 text-[11px] leading-relaxed text-left">
                    {navT.footerCompanyDesc}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono italic text-left">
                    📍 {lf.address}
                  </p>
                  
                  {/* Connect buttons row */}
                  <div className="flex gap-2.5 pt-2">
                    <a 
                      href="https://wa.me/39333000000" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="WhatsApp Business API"
                      className="p-1 px-2.5 rounded bg-emerald-950/20 hover:bg-emerald-950/45 border border-emerald-900/30 text-emerald-400 hover:text-white transition-all text-[10px] font-mono flex items-center gap-1"
                    >
                      WhatsApp
                    </a>
                    <a 
                      href="https://t.me/modaui" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      title="Telegram Developers Global Group"
                      className="p-1 px-2.5 rounded bg-blue-950/20 hover:bg-blue-950/45 border border-blue-900/30 text-blue-400 hover:text-white transition-all text-[10px] font-mono flex items-center gap-1"
                    >
                      Telegram
                    </a>
                  </div>
                </div>

                {/* COL 2: Company Directory (公司目录) */}
                <div className="text-left">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 tracking-wider">{lf.directory}</h4>
                  <div className="space-y-2 text-[11px] font-sans flex flex-col items-start">
                    <button onClick={() => setDossierTopic('about')} className="text-slate-500 hover:text-white text-left pointer-events-auto cursor-pointer">{lf.about}</button>
                    <button onClick={() => setDossierTopic('careers')} className="text-slate-500 hover:text-white text-left pointer-events-auto cursor-pointer">{lf.careers}</button>
                    <button onClick={() => setDossierTopic('press')} className="text-slate-500 hover:text-white text-left pointer-events-auto cursor-pointer">{lf.press}</button>
                    <button onClick={() => setDossierTopic('partners')} className="text-slate-500 hover:text-white text-left pointer-events-auto cursor-pointer">{lf.partners}</button>
                    <button onClick={() => setDossierTopic('offices')} className="text-slate-500 hover:text-white text-left pointer-events-auto cursor-pointer">{lf.offices}</button>
                  </div>
                </div>

                {/* COL 3: Platform connections & OAuth Hub (平台与外部连接) */}
                <div className="text-left">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 tracking-wider">{lf.connections}</h4>
                  <div className="space-y-2 text-[11px] font-sans flex flex-col items-start">
                    <button 
                      onClick={() => { setCurrentRoute('drive'); setSelectedBlog(null); }} 
                      className="text-emerald-400 hover:text-emerald-300 font-semibold text-left pointer-events-auto cursor-pointer"
                    >
                      ✦ {lf.driveSync}
                    </button>
                    <a href="https://stripe.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white text-left font-mono text-[10px] flex items-center gap-1 py-0.5">
                      💳 {lf.stripe}
                    </a>
                    <a href="https://maps.google.com/?q=Via+Montenapoleone+8,+Milano" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white text-left font-mono text-[10px] flex items-center gap-1 py-0.5">
                      🗺️ {lf.map}
                    </a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white text-left font-mono text-[10px] flex items-center gap-1 py-0.5">
                      🐱 GitHub Source Repository
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white text-left font-mono text-[10px] flex items-center gap-1 py-0.5">
                      🔗 LinkedIn Enterprise Feed
                    </a>
                  </div>
                </div>

                {/* COL 4: Commerce Centers */}
                <div className="text-left">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 tracking-wider">Commerce Centers</h4>
                  <div className="space-y-2 text-[11px] font-sans flex flex-col items-start col-span-1">
                    <button onClick={() => { setCurrentRoute('solutions'); setSelectedBlog(null); }} className="block text-slate-500 hover:text-white pointer-events-auto text-left">Solutions Directory</button>
                    <button onClick={() => { setCurrentRoute('compare'); setSelectedBlog(null); }} className="block text-slate-500 hover:text-white pointer-events-auto text-left">Compare SaaS Stack</button>
                    <button onClick={() => { setCurrentRoute('blog'); setSelectedBlog(null); }} className="block text-slate-500 hover:text-white pointer-events-auto text-left">Commerce Academy</button>
                    <button onClick={() => { setCurrentRoute('factory'); }} className="block text-slate-500 hover:text-white pointer-events-auto text-left">Sitemap.xml Feed</button>
                    <button onClick={() => { setCurrentRoute('factory'); }} className="block text-slate-500 hover:text-white pointer-events-auto text-left">Robots.txt Crawlers</button>
                  </div>
                </div>

                {/* COL 5: Legal & trust compliance (品牌信任) */}
                <div className="text-left">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-3 tracking-wider">{lf.legal}</h4>
                  <div className="space-y-2 text-[11px] font-sans text-left">
                    <button onClick={() => setDossierTopic('privacy')} className="block text-slate-500 hover:text-white pointer-events-auto text-left py-0.5">{navT.privacyTerm}</button>
                    <button onClick={() => setDossierTopic('terms')} className="block text-slate-500 hover:text-white pointer-events-auto text-left py-0.5">{navT.termsService}</button>
                    <div className="pt-2 text-slate-600 font-mono text-[9px] space-y-1">
                      <span className="block">Target node: <b>app.modaui.com</b></span>
                      <span className="block text-[8px] text-emerald-500">🟢 Cloud Secure SSL Layer Active</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="pt-8 border-t border-slate-900/60 flex flex-col sm:flex-row justify-between items-center text-[10px] font-mono text-slate-500 gap-4">
                <span>© 2026 modaui.com Technologies Inc. Conforming with European fiscal digital accounting protocols.</span>
                <span className="text-[9px] text-slate-600">Enterprise VAT: IT3908210398 • Shared Drive clusters • SSL 256bit Encrypted</span>
              </div>
            </div>
          );
        })()}
      </footer>

      {/* PHASE 8: FLOATING INTELLIGENT "AI SALES AGENT" OR CHATBOT (Bottom Right Corner) */}
      <div className="fixed bottom-4 right-4 z-50 pointer-events-auto">
        {!aiChatOpen ? (
          <button
            onClick={() => setAiChatOpen(true)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-2xl flex items-center justify-center hover:opacity-95 transition-opacity cursor-pointer border border-cyan-400/40 relative"
            id="chat-toggle-open"
          >
            <MessageSquare className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping" />
          </button>
        ) : (
          <div className="bg-[#0b0e1e] border border-slate-800 rounded-2xl w-[320px] sm:w-[360px] shadow-2xl overflow-hidden animate-fade-in flex flex-col justify-between" id="ai-chat-window">
            
            {/* Header */}
            <div className="bg-[#070914] p-4 border-b border-slate-900 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <div>
                  <span className="block text-xs font-bold text-white uppercase font-mono">modaui AI Sales Agent</span>
                  <span className="block text-[9px] text-slate-500">24h Autonomous Growth Lead</span>
                </div>
              </div>
              <button
                onClick={() => setAiChatOpen(false)}
                className="text-slate-500 hover:text-white p-1"
                id="chat-toggle-close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="p-4 h-[240px] overflow-y-auto space-y-3 bg-[#070913]/40">
              {aiChatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`p-3 rounded-xl text-xs max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-sans'
                      : 'bg-slate-900 text-slate-300 font-sans'
                  }`}>
                    {msg.sender === 'agent' && <span className="block text-[8px] font-mono uppercase tracking-wider text-cyan-400 mb-1">modaui AI</span>}
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input prompts or Quick Recommendation buttons */}
            <div className="p-3 bg-[#070914] border-t border-slate-900 space-y-2">
              <span className="block text-[9px] font-mono text-slate-500 uppercase tracking-widest px-1">Quick Actions:</span>
              <div className="flex flex-col gap-1">
                {AI_CHAT_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAiPromptClick(prompt.query)}
                    className="w-full text-left py-1.5 px-3 bg-slate-950 hover:bg-slate-900 rounded border border-slate-900 text-[10px] font-mono text-cyan-400 transition-colors"
                  >
                    ✦ {prompt.label[lang]}
                  </button>
                ))}
              </div>

              {/* CRM Lead Email Harvester Block */}
              {!leadMailSubmitted ? (
                <form onSubmit={submitLeadEmail} className="pt-2 border-t border-slate-900/60 flex gap-2">
                  <input
                    type="email"
                    required
                    value={potentialEmail}
                    onChange={(e) => setPotentialEmail(e.target.value)}
                    placeholder="Enter business email..."
                    className="w-full bg-[#05060b] border border-slate-800 rounded-lg py-1.5 px-2.5 text-[11px] text-white focus:outline-none"
                    id="inp-chat-lead-email"
                  />
                  <button
                    type="submit"
                    className="py-1.5 px-3 bg-gradient-to-r from-cyan-500 to-indigo-600 text-[11px] font-semibold text-white rounded-lg whitespace-nowrap active:opacity-90"
                    id="btn-chat-lead-submit"
                  >
                    Get DNA Pack
                  </button>
                </form>
              ) : (
                <div className="text-[10px] text-center font-mono text-emerald-400 pt-2 border-t border-slate-900/60">
                  ✔ Checked as Lead. Synchronizing...
                </div>
              )}
            </div>

          </div>
        )}
      </div>

      {/* MOCK VIDEO PREVIEW SCREEN MODAL */}
      {showVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[#0b0f1d] border border-slate-800 rounded-2xl w-full max-w-2xl overflow-hidden glow-card">
            <div className="p-4 border-b border-slate-900 flex justify-between items-center">
              <span className="text-xs font-mono font-semibold text-[#00F0FF]">modaui OS System Walkthrough</span>
              <button onClick={() => setShowVideoModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            {/* Simulated tech-forward terminal layout loop for visual preview */}
            <div className="p-6 bg-[#04060b] text-cyan-400 font-mono text-xs space-y-2 h-[320px] overflow-y-auto leading-normal">
              <div className="text-slate-500">[11:04:12] Spinning up local emulator on modaui-demo-instance...</div>
              <div>&gt; Loading restock-neural-agent metadata: COMPLETE</div>
              <div>&gt; Initializing direct Italian debit acquiring socket: 200 OK</div>
              <div className="text-purple-400">&gt; Generating secure receipt tax checksum via Agenzia delle Entrate MOSS sandbox...</div>
              <div className="p-3 bg-slate-950 border border-slate-900 rounded my-3 text-slate-300">
                <span className="block text-[10px] text-cyan-400">POS Sales Simulation Matrix:</span>
                • Table 12: ordered 1x Sommelier Wine, 2x Carpaccio di Tartufo. Autodetect VAT: 10% reduced rate.<br />
                • Flow: Settle requested. Checksum parsed. Signature: <strong className="text-white">ITIVA_F8912AA775</strong>
              </div>
              <div className="text-emerald-400">&gt; Update active inventory: espresso level lowered by 11%. restock alarm triggers dispatch.</div>
              <div className="text-slate-500 cursor-pulse">[Loop running successfully. Close modal to exit system playback]</div>
            </div>
          </div>
        </div>
      )}

      {/* MOCK DEMO SIGNUP MODAL */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm pointer-events-auto">
          <div className="bg-[#0b0f1d] border border-slate-800 rounded-2xl w-full max-w-sm overflow-hidden glow-card">
            <div className="p-4 border-b border-slate-900 flex justify-between items-center">
              <span className="text-xs font-mono font-semibold text-white uppercase">Schedule Video Walkthrough</span>
              <button onClick={() => setShowDemoModal(false)} className="text-slate-400 hover:text-white p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleDemoSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Business Email</label>
                <input
                  type="email"
                  required
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-[#05070f] border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                  id="inp-modal-demo-email"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-slate-400 mb-1.5 uppercase">Company Name</label>
                <input
                  type="text"
                  required
                  value={demoCompanyName}
                  onChange={(e) => setDemoCompanyName(e.target.value)}
                  placeholder="e.g. Milan Pasticceria Srl"
                  className="w-full bg-[#05070f] border border-slate-800 rounded-lg py-2 px-3 text-xs text-white focus:outline-none"
                  id="inp-modal-demo-company"
                />
              </div>

              {demoSuccess && (
                <div className="p-2 bg-emerald-950/40 border border-emerald-800 text-[11px] font-mono text-emerald-400 rounded text-center">
                  ✔ Booking requested! We will call on Google Meet within 2 hours.
                </div>
              )}

              <button
                type="submit"
                disabled={demoSuccess}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-90 font-semibold text-xs text-white uppercase tracking-wider"
                id="btn-modal-demo-submit"
              >
                Confirm Setup Demo Session
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CORE DOSSIER & LEGAL POLICY HUB OVERLAY (PRODUCTION-GRADE) */}
      {dossierTopic !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md pointer-events-auto overflow-y-auto">
          <div className="bg-[#070914] border border-slate-900 rounded-3xl w-full max-w-2xl overflow-hidden glow-card my-8">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-900 flex justify-between items-center bg-[#05060d]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
                <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                  {lang === 'zh' ? 'modaui 华人数字商业中枢 • 官方备案' : lang === 'it' ? 'Dossier Ufficiale modaui • Milano' : 'Official modaui Dossier • Group Registry'}
                </span>
              </div>
              <button onClick={() => setDossierTopic(null)} className="text-slate-400 hover:text-white p-1 hover:bg-slate-900 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Drawer */}
            <div className="p-8 space-y-6 overflow-y-auto max-h-[500px] text-left">
              
              {/* TOPIC: ABOUT */}
              {dossierTopic === 'about' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white font-display">
                    {lang === 'zh' ? '关于 摩达数智 (modaui Group)' : lang === 'it' ? 'Chi Siamo - modaui Group' : 'About modaui Group'}
                  </h3>
                  <div className="text-xs text-slate-400 leading-relaxed space-y-3.5 font-normal">
                    <p>
                      {lang === 'zh' 
                        ? '摩达数智 (modaui) 是专为欧洲及全球华人实体经济研发的下一代智能商业操作系统（AI Commerce OS）。我们通过革命性的程序化架构，将数字收银（POS）、智能库存（ERP）、精准获客（CRM）、多语境 AI 外呼客服以及直连本地税务局（如意大利 Agenzia delle Entrate）的电子发票合规接口融为一体。'
                        : 'modaui is the unified AI Operating System built specifically to handle modern localized commerce workflow. We bypass legacy physical layers by orchestrating compliant point-of-sale systems, predicting active inventory refills, and coordinating multilingual outreach campaigns, fully compliant with national frameworks.'}
                    </p>
                    <p>
                      {lang === 'zh'
                        ? '我们的使命是捍卫华商实体的每一分辛勤所得。通过摒弃市面上常见的 1.5%~3% 高额扣点收单，modaui 提供低至 0.45% 的刷卡和扫码通道，并且保障所有的客户数据归属于商户自身，在安全的本地和谷歌网盘内进行离线同步。'
                        : 'Our unified system brings down physical transaction swipe costs heavily from 1.8% to 0.45% through robust cloud ledger technology, while ensuring CRM client logs are securely backed up directly in your own sandbox with active storage permissions.'}
                    </p>
                  </div>
                </div>
              )}

              {/* TOPIC: CAREERS */}
              {dossierTopic === 'careers' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white font-display">
                    {lang === 'zh' ? '招纳贤士 / 全球招聘 (Careers)' : lang === 'it' ? 'Lavora con Noi - Opportunità' : 'Careers at modaui'}
                  </h3>
                  <div className="text-xs text-slate-400 leading-relaxed space-y-4 font-normal">
                    <p>
                      {lang === 'zh'
                        ? '摩达数智致力于用科技赋能全球商户。我们在米兰、罗马以及中国温州设有研发与支持中心。以下职位长期对有意向的优秀海内外华人和本地背景人才开放：'
                        : 'Join the architecture team building reliable, low-latency micro-payment registries and high-throughput content crawling grids.'}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-900 hover:border-slate-800 transition-all">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-white font-mono">1. Senior Full-Stack Engineer (Italy Taxes)</span>
                          <span className="text-[9px] font-mono bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded border border-cyan-800/30">Milan / Hybrid</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Expertise in Node.js, Express, and integration with Sdi Invoice protocols / XML. Fluent in Italian & Chinese preferred.</p>
                      </div>

                      <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-900 hover:border-slate-800 transition-all">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-semibold text-white font-mono">2. AI Growth Campaign Specialist</span>
                          <span className="text-[9px] font-mono bg-purple-950 text-purple-400 px-2 py-0.5 rounded border border-purple-800/20">Rome / Remote</span>
                        </div>
                        <p className="text-[11px] text-slate-500">Orchestrating search intents, dynamic programmatic landing generators, and LLM keyword vectors.</p>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 font-mono">
                      ✉ Apply directly with your GitHub and career resume: <span className="text-cyan-400 font-bold">careers@modaui.com</span>
                    </p>
                  </div>
                </div>
              )}

              {/* TOPIC: PRESS */}
              {dossierTopic === 'press' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white font-display">
                    {lang === 'zh' ? '米兰总部新闻媒介中心' : lang === 'it' ? 'Ufficio Stampa Milano' : 'Milan Press Inquiry Room'}
                  </h3>
                  <div className="text-xs text-slate-400 leading-relaxed space-y-3 font-normal">
                    <p>
                      {lang === 'zh'
                        ? '欢迎来自欧洲主流财经媒体、华人社会报导和全球科技自媒体的联络。我们提供完整的 modaui 品牌矢量素材包、各行业华商数字化转型 ROI 报告白皮书、以及有关欧洲电子收税新规（Scontrino Telematico）的深度解读。'
                        : 'Official media press packs can be gathered instantly on demand. We deliver real-time metrics on offline business automation trends and multi-lingual consumer retention stats.'}
                    </p>
                    <div className="p-4 bg-slate-950 border border-slate-900 rounded-xl space-y-1.5 font-mono text-[11px]">
                      <div>👥 Press Contact: <b>Media Relations Italy</b></div>
                      <div>📧 Email: <span className="text-cyan-400">press@modaui.com</span></div>
                      <div>📍 Sede: <b>Via Montenapoleone 8, 20121 Milano (MI)</b></div>
                    </div>
                  </div>
                </div>
              )}

              {/* TOPIC: PARTNERS */}
              {dossierTopic === 'partners' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white font-display">
                    {lang === 'zh' ? '全球城市销售与技术加盟伙伴' : lang === 'it' ? 'Programma Affiliati & POS Partner' : 'Global Authorized Partner Network'}
                  </h3>
                  <div className="text-xs text-slate-400 leading-relaxed space-y-3.5 font-normal">
                    <p>
                      {lang === 'zh'
                        ? '摩达数智销售渠道实行城市独家合伙人政策。无论是意大利、行联邦制区域（如德奥）、还是西葡，各地资深华商品牌渠道和 POS 硬件分销商皆可申请加入 modaui 高额分佣与技术辅导联盟。'
                        : 'Expand your localized hardware distributor business with our digital terminal license. We unlock deep residual cash flow commissions on card volume and subscription accounts.'}
                    </p>
                    <p>
                      {lang === 'zh'
                        ? '合伙人将获得首年 100% 的安装运维授权，并享受长期租用分成以及永久免 POS 刷卡机中间抽扣政策。'
                        : 'Qualified regional agencies receive technical integration guides, customized system setups, and premium localization collateral.'}
                    </p>
                    <p className="text-cyan-400 font-mono text-[11px] font-bold">
                      ✦ Contact global relations desk: partnership@modaui.com
                    </p>
                  </div>
                </div>
              )}

              {/* TOPIC: OFFICES */}
              {dossierTopic === 'offices' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white font-display">
                    {lang === 'zh' ? '跨国运营办公中心 (Offices)' : lang === 'it' ? 'Uffici Operativi e Sedi' : 'Operating Offices & Hubs'}
                  </h3>
                  <div className="text-xs text-slate-400 leading-relaxed space-y-3.5 font-normal">
                    <p>
                      {lang === 'zh'
                        ? '我们的办公中心跨越欧洲潮流之都与华人发源腹地，支撑着24小时全天候不停机服务网络（SSL 256位加密链路实时通达）：'
                        : 'Our corporate hubs operate seamlessly across cross-border locations to assist your local tax compliance and terminal requirements:'}
                    </p>
                    <ul className="space-y-2.5 font-mono text-[11px]">
                      <li className="p-3 bg-slate-950 border border-slate-900 rounded-xl">
                        <span className="block text-white font-bold">🇮🇹 Milan HQ (米兰总部)</span>
                        <span className="block text-slate-500 mt-1">Address: Via Montenapoleone 8, 20121 Milano, Italy</span>
                      </li>
                      <li className="p-3 bg-slate-950 border border-slate-900 rounded-xl">
                        <span className="block text-white font-bold">🇨🇳 China Wenzhou Node (中国温州支持中心)</span>
                        <span className="block text-slate-500 mt-1">办公地址: 浙江省温州市鹿城区华侨数智科技大厦 308 室</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TOPIC: PRIVACY */}
              {dossierTopic === 'privacy' && (
                <div className="space-y-4 text-xs">
                  <h3 className="text-xl font-bold text-white font-display">
                    {lang === 'zh' ? 'GDPR 跨境主权隐私安全性守则' : lang === 'it' ? 'Dichiarazione sulla Riservatezza GDPR' : 'GDPR Privacy & Trust Policies'}
                  </h3>
                  <div className="text-slate-400 leading-relaxed space-y-3.5 font-normal">
                    <p className="font-semibold text-white">
                      Effective Date: June 21, 2026. Fully aligned with Regulation (EU) 2016/679 (General Data Protection Regulation - GDPR).
                    </p>
                    <p>
                      <b>1. Data Ownership:</b> At modaui Group, we explicitly declare that your company data, menu configurations, and customer CRM lists are strictly your own, sovereign assets. We do not resell, scrape, or leak registration leads to third parties.
                    </p>
                    <p>
                      <b>2. Secure Local Encryptions:</b> All client lead data uploaded via our booking form is safely encrypted with SSL 256-bit protocols, stored in regional filesystem databases, and is exportable on demand only to your authorized Google Drive workspace using secure OAuth tokens.
                    </p>
                    <p>
                      <b>3. Your GDPR Rights:</b> Under GDPR Articles 15 (Right of Access), 16 (Right to Rectification), and 17 (Right to Erasure / Right to be Forgotten), you have complete control over any email address stored. You may request a complete export or immediate wipe of your captured lead record anytime by messaging <span className="text-cyan-400 font-mono">gdpr@modaui.com</span>. We will execute the wipe within 1 hour.
                    </p>
                  </div>
                </div>
              )}

              {/* TOPIC: TERMS */}
              {dossierTopic === 'terms' && (
                <div className="space-y-4 text-xs">
                  <h3 className="text-xl font-bold text-white font-display">
                    {lang === 'zh' ? '商业客户授权许可使用协议 (Terms)' : lang === 'it' ? 'Condizioni Generali di Servizio' : 'Terms of Commercial Service'}
                  </h3>
                  <div className="text-slate-400 leading-relaxed space-y-3.5 font-normal">
                    <p className="font-semibold text-white">
                      Licensing and service covenants governing modaui AI Commerce OS platforms.
                    </p>
                    <p>
                      <b>1. License Grant:</b> We grant enterprise users a localized, non-transferable, non-exclusive digital license to host the modaui web point-of-sale layout on standard tablet/mobile environments with zero hardware lock restrictions.
                    </p>
                    <p>
                      <b>2. Financial Conformity:</b> It is the user’s absolute responsibility to activate exact municipal taxes and IVA rates conforming to their operating region. modaui operates as a neutral digital gateway and is not legally liable for merchant underreporting or incorrect tax transmissions.
                    </p>
                    <p>
                      <b>3. Zero High-% Intermediary Policies:</b> modaui guarantees never to charge secondary transactional volume commissions on your physical store sales. All flat rates are clear, foreseeable, and fully listed under our pricing structure with 30 days notice prior to monthly renewals.
                    </p>
                    <p>
                      <b>4. Legal Forum:</b> Any litigation or dispute arising from this contract shall be submitted to the exclusive jurisdiction of the Courts of Milan (MI), Italy.
                    </p>
                  </div>
                </div>
              )}

            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-[#05060d] border-t border-slate-900 flex justify-between items-center text-[10px] font-mono text-slate-500">
              <span>© 2026 modaui.com Group. Registered Enterprise IT3908210398.</span>
              <button 
                onClick={() => setDossierTopic(null)} 
                className="py-1 px-3 rounded bg-slate-950 text-slate-300 hover:text-white border border-slate-800 transition-colors cursor-pointer"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
