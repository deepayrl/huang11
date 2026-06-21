import { SitemapPage, CommerceTemplate, DownloadKit } from '../types';

export const PROGRAMMATIC_KEYWORDS = [
  { keyword: 'CRM for Restaurant Italy', trafficScore: 980, difficulty: 'Low', intent: 'Transactional' },
  { keyword: 'AI POS software Milan', trafficScore: 720, difficulty: 'Low', intent: 'Transactional' },
  { keyword: 'Inventory Software for Italy fashion', trafficScore: 1100, difficulty: 'Medium', intent: 'Commercial' },
  { keyword: 'VAT Calculator Europe', trafficScore: 3500, difficulty: 'Medium', intent: 'Informational' },
  { keyword: 'Invoice Generator POS free', trafficScore: 2400, difficulty: 'Low', intent: 'Transactional' },
  { keyword: 'ERP for Fashion boutique Rome', trafficScore: 650, difficulty: 'Low', intent: 'Transactional' },
  { keyword: 'POS for Bakery Palermo', trafficScore: 480, difficulty: 'Very Low', intent: 'Transactional' },
  { keyword: 'AI CRM automation retail Turin', trafficScore: 540, difficulty: 'Low', intent: 'Commercial' },
  { keyword: 'Shopify alternative Italian merchants', trafficScore: 1900, difficulty: 'Medium', intent: 'Commercial' },
  { keyword: 'Stripe local IVA Agenzia Entrate', trafficScore: 2800, difficulty: 'Medium', intent: 'Commercial' }
];

export const TEMPLATES: CommerceTemplate[] = [
  {
    id: 'temp-restaurant-pos',
    title: {
      en: 'Michelin Star Restaurant POS & Floor Setup',
      it: 'POS Ristorante Stellato Michelin e Configurazione Sale',
      zh: '米其林星级餐厅收银与动态桌台分布模板'
    },
    category: 'Restaurant',
    rating: 4.9,
    downloads: 1840,
    description: {
      en: 'Includes interactive seating mockups, specialized multi-printer order relay triggers, and automatic sommelier pairing prompts.',
      it: 'Include layout dei tavoli, relè di ordine su stampanti multiple e suggerimenti di abbinamento cibo-vino.',
      zh: '内建全景桌位状态沙盘、厨房多发终端打印路由链、以及专属侍酒师高阶品项追加推荐清单。'
    },
    metrics: { label: { en: 'Order flow speedup', it: 'Velocità d\'ordine', zh: '订单流转提速度' }, value: '+42%' },
    features: {
      en: ['Virtual Floor Map', 'Instant Bill Splitting', 'Wine pairing AI Prompt'],
      it: ['Mappa della sala virtuale', 'Divisione del conto rapida', 'AI Promozione Vini'],
      zh: ['可视化全彩物理沙盘', '多维度一键快速账单拆分', 'AI 侍餐侍酒伴侣智能推介']
    }
  },
  {
    id: 'temp-fashion-crm',
    title: {
      en: 'Luxury Fashion Boutique Omnichannel DNA',
      it: 'DNA Omnicanale Boutique di Moda Lusso',
      zh: '高档时装精品全通路会员运营与营销 DNA 模板'
    },
    category: 'Retail & Fashion',
    rating: 4.8,
    downloads: 2450,
    description: {
      en: 'Preconfigured loyalty score multipliers based on purchase velocity. Automatically triggers WhatsApp catalog updates to VIP collectors.',
      it: 'Moltiplicatori di fedeltà preconfigurati. Invia automatici i cataloghi via WhatsApp ai clienti VIP.',
      zh: '预置根据到店消费频次与金额自动跃迁的高级会员模型。智能联动国外主流 WhatsApp 目录，直达高客单收藏用户。'
    },
    metrics: { label: { en: 'Customer lifetime value', it: 'Valore cliente nel tempo', zh: '忠诚客户终身价值' }, value: '+68%' },
    features: {
      en: ['VIP Cohort builder', 'WhatsApp Catalogs API', 'In-Store styling notes'],
      it: ['Costruttore coorte VIP', 'API Catalogo WhatsApp', 'Schede stile in negozio'],
      zh: ['VIP 分群分类自动化引擎', 'WhatsApp 私域商品目录直通', '资深买手门店搭配备忘备查']
    }
  },
  {
    id: 'temp-bakery-pos',
    title: {
      en: 'Artisanal Bakery & Pasticceria Fast-Checkout',
      it: 'Cassa veloce panetteria artigianale e pasticceria',
      zh: '手造烘焙工坊与甜品店极速扫码快捷收买模板'
    },
    category: 'Bakery',
    rating: 4.7,
    downloads: 1290,
    description: {
      en: 'Optimum grid layouts for fast-moving SKU counters. Fully handles integrated shelf barcodes and expiry inventory warnings.',
      it: 'Layout ottimale per cassieri veloci. Gestisce i codici a barre e i segnali di scadenza prodotto.',
      zh: '针对高频人流量设计的自选格栅收银布局。内置对临期、赏味极限日期食品的双向拦截警报。'
    },
    metrics: { label: { en: 'Checkout queue time', it: 'Tempo in coda alla cassa', zh: '高峰期排队结账耗时' }, value: '-55%' },
    features: {
      en: ['Fast Grid UI', 'Weight-Scale integrations', 'Expiry Watchdog'],
      it: ['Interfaccia cassa rapida', 'Integrazione bilance pesatrici', 'Controllo scadenze'],
      zh: ['黄金格栅大按钮收银界面', '数字台秤与自动计数机对接', '自适应赏味期限预警机制']
    }
  }
];

export const DOWNLOADS_CENTER: DownloadKit[] = [
  {
    id: 'kit-modaui-dna-restaurant',
    name: {
      en: 'Custom Resto-DNA Config Engine',
      it: 'Motore di Configurazione Resto-DNA Personalizzato',
      zh: 'modaui 餐饮专属 DNA 极低功耗数据模板'
    },
    fileSize: '48 KB',
    fileType: 'JSON',
    tag: { en: 'Best-Seller', it: 'Più scaricato', zh: '黄金标配' },
    downloads: 4120,
    description: {
      en: 'Upload this file directly via modaui setting dashboard to instantly inject restaurant menu groups, VAT layouts, and sommelier neural routes.',
      it: 'Carica questo file direttamente nel pannello modaui per importare menù, aliquota IVA e percorsi AI.',
      zh: '通过后台“一键装载”模块，瞬间自动导入整套西式餐饮的经典品类层级、税费参数和智能推荐网络。'
    }
  },
  {
    id: 'kit-excel-accounting-pack',
    name: {
      en: 'SME Cash Flow & Profit Projection Worksheet',
      it: 'Foglio di calcolo per la proiezione dei profitti delle PMI',
      zh: '中小企现金流管理与税前税后利润核算沙盒模板'
    },
    fileSize: '1.2 MB',
    fileType: 'XLSX',
    tag: { en: 'Finance tool', it: 'Strumenti finanziari', zh: '财务利器' },
    downloads: 3200,
    description: {
      en: 'A highly structured forecasting matrix featuring markup vs margin calculators, multi-currency currency buffers, and EU reporting layouts.',
      it: 'Foglio Excel strutturato con formule di ricarico rispetto al margine, valute multiple e report fiscali.',
      zh: '支持复合加价转换、跨币种汇率避险对冲公式、以及对标欧洲申报明细的结构化表格。'
    }
  }
];

export const SITEMAP_PAGES: SitemapPage[] = [
  { url: 'https://modaui.com/', priority: '1.0', changefreq: 'daily', lastmod: '2026-06-21', title: 'modaui AI Commerce OS' },
  { url: 'https://modaui.com/solutions', priority: '0.9', changefreq: 'weekly', lastmod: '2026-06-20', title: 'Omnichannel Solutions' },
  { url: 'https://modaui.com/compare', priority: '0.8', changefreq: 'weekly', lastmod: '2026-06-18', title: 'modaui vs Shopify, Stripe, Square' },
  { url: 'https://modaui.com/templates', priority: '0.9', changefreq: 'daily', lastmod: '2026-06-21', title: 'Commerce DNA Templates' },
  { url: 'https://modaui.com/tools', priority: '0.9', changefreq: 'daily', lastmod: '2026-06-21', title: 'Free Business AI Tools' },
  { url: 'https://modaui.com/blog', priority: '0.8', changefreq: 'daily', lastmod: '2026-06-21', title: 'modaui AI Growth blog' },
  { url: 'https://modaui.com/docs', priority: '0.8', changefreq: 'weekly', lastmod: '2026-06-15', title: 'API Reference & Guides' },
  { url: 'https://modaui.com/trust', priority: '0.7', changefreq: 'monthly', lastmod: '2026-06-10', title: 'GDPR compliance & Security' },
  { url: 'https://modaui.com/changelog', priority: '0.7', changefreq: 'weekly', lastmod: '2026-06-21', title: 'modaui Changelog' }
];

export function getFullJsonLdSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": "https://modaui.com/#software",
        "name": "modaui AI Commerce OS",
        "url": "https://modaui.com",
        "publisher": {
          "@type": "Organization",
          "name": "modaui Technologies Inc.",
          "url": "https://modaui.com",
          "logo": "https://modaui.com/logo.png"
        },
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
          "description": "Start for free"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "512"
        },
        "description": "The unified AI operating system for retail stores, restaurants, and digital commerce. Powers real-time billing, automatic VAT compliance, and dynamic local optimization."
      },
      {
        "@type": "FAQPage",
        "@id": "https://modaui.com/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is modaui AI Commerce OS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "modaui is an all-in-one AI operating system for retail, restaurants, and ecommerce. It unifies payments, CRM, warehousing, and automated content discovery."
            }
          }
        ]
      }
    ]
  };
}
