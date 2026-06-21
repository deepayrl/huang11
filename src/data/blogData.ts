import { BlogPost, FaqItem, DocCategory, SaaSCompareItem } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    slug: 'future-of-ai-commerce-os-retail-automation',
    category: 'AI Commerce',
    readingTime: '5 min',
    publishedTime: '2026-06-20',
    author: 'Elena Rossi',
    authorRole: 'Chief of Commerce Systems',
    keywords: ['AI Commerce', 'modaui', 'Retail POS Automation', 'SaaS Commerce Engine', 'Smart Payment Workflows'],
    title: {
      en: 'The Future of AI Commerce OS: Unleashing Intelligent Retail Automation',
      it: 'Il futuro di AI Commerce OS: Scatenare l\'automazione intelligente del retail',
      zh: 'AI 商业操作系统未来：释放智能零售自动化商业生产力'
    },
    description: {
      en: 'Traditional ecommerce and brick-and-mortar storefronts are siloed. Discover how modaui operates as a single unified neuro-engine connecting active checkouts to automated systems.',
      it: 'Le-commerce tradizionale e i negozi fisici sono strutturati a silos. Scopri come modaui opera come un unico motore unificato collegando casse attive a sistemi automatizzati.',
      zh: '传统零售与电子商务处于割裂状态。了解 modaui 作为一个统一的智能中枢，如何无缝串联主动结账与自动化运营流程。'
    },
    content: {
      en: `### The Great Silo of Commerce Infrastructure

For decades, retail merchant technology has suffered from fragmented data. Your POS is disconnected from your web store; your customer feedback system is blind to active loyalty cards; your inventory and purchase order flows run on legacy Cron timers.

With **modaui AI Commerce OS**, we introduce the concept of "Autonomous Commerce". Instead of standard sequential cron scripts, modaui embeds a constant agent workflow linking **Active Feedback**, **Instant Payments**, and **Predictive Stock Allocation**.

### 1. Unified Intelligence Hub
Instead of synchronizing files at midnight, modaui processes client orders in real-time. The moment an Italian retail shop makes a sale on the Milan fashion boutique line, modaui updates local inventory levels automatically, fires automated purchase logs to manufacturing hubs in Zhejiang, and adapts personal email newsletters dynamically based on user engagement.

### 2. Eliminating Overhead
Our case studies show enterprise SMEs save up to 45 hours a week in custom API maintenance. By deploying pre-built "DNA profiles" customized for specific retail and restaurant sectors, configuration drops to zero.`,
      it: `### La grande frammentazione dell'infrastruttura commerciale

Per decenni, la tecnologia per i negozi al dettaglio ha sofferto di dati frammentati. Il tuo POS è scollegato dal tuo negozio web; il tuo sistema di feedback dei clienti è cieco di fronte alle carte fedeltà attive; i tuoi flussi di inventario e ordini di acquisto funzionano su vecchi timer legacy.

Con **modaui AI Commerce OS**, introduciamo il concetto di "Commercio Autonomo". Invece di script sequenziali standard, modaui integra un flusso di lavoro di agenti costante che collega **Feedback attivo**, **Pagamenti istantanei** e **Allocazione predittiva dei magazzini**.

### 1. Hub di intelligenza unificato
Invece di sincronizzare i file a mezzanotte, modaui elabora gli ordini in tempo reale. Nel momento in cui un negozio italiano conclude una vendita a Milano, modaui aggiorna automaticamente l'inventario locale, invia ordinativi automatici alle fabbriche di fornitura e adatta le newsletter via email.

### 2. Eliminare i costi operativi
I nostri studi dimostrano che le PMI risparmiano fino a 45 ore alla settimana in manutenzione API. Distribuendo profili "DNA" preconfigurati, il tempo di configurazione si azzera.`,
      zh: `### 零售商业基础设施的传统割裂瓶颈

数十年来，零售商业技术一直深受分散数据的困扰。实体店收银 POS 与您的在线网店毫无关联；您的客户关系 CRM 系统对活跃的会员积分毫不知情；您的库存盘点与采购流程甚至还在运行几年前的老旧定时器脚本。

借助 **modaui AI Commerce OS**，我们首次引入了“自主商业（Autonomous Commerce）”理念。modaui 构建了常态化的 AI 代理流水线，跨越并融合了**感知、实时支付账单、和预测性库存调度**。

### 1. 统一的多维智能中枢
与其每天半夜三更进行批处理同步，modaui 能够在 1 毫秒内敏捷调度订单生命周期。当米兰的时尚精品零售店卖出一件风衣时，modaui 将自动下调门店物理仓储库存、触发供应链系统向中转仓追加采购订单、并立刻在几秒内优化针对该会员的新媒体促销推荐。

### 2. 移除系统集成复杂度
以往企业耗资研发定制 API 的重资产配置模式彻底宣告终结。依靠 modaui 深度垂直细分的行业“DNA 环境库”，即可进行拖拽式一键装载运行。`
    },
    relatedIds: ['post-2', 'post-3']
  },
  {
    id: 'post-2',
    slug: 'mastering-eu-vat-calculating-margin-saas',
    category: 'Finance Guides',
    readingTime: '7 min',
    publishedTime: '2026-06-18',
    author: 'Marco Moretti',
    authorRole: 'European Tax Counsel',
    keywords: ['VAT Europe', 'Italian IVA', 'VAT Calculator', 'modaui Payments', 'SaaS Accounting integration'],
    title: {
      en: 'Mastering European VAT Compliance and Gross Profit Margins',
      it: 'Padroneggiare la conformità IVA europea e i margini di profitto lordo',
      zh: '掌控欧洲增值税（VAT）合规管理与零售批发的毛利润空间'
    },
    description: {
      en: 'Failing to properly manage cross-border VAT in Europe is a leading cause of startup merchant failure. Let us explain the exact mechanics of markup vs margin and instant VAT invoicing.',
      it: 'La mancata gestione corretta dell\'IVA transfrontaliera in Europa è una delle cause principali del fallimento dei commercianti. Spieghiamo la meccanica di ricarico rispetto al margine.',
      zh: '无法合规、精准地申报及计算欧洲跨国增值税，往往是跨境及本地商户遭遇流动性折损的关键所在。让我们彻底解析毛利率、加价率与发票直连机制。'
    },
    content: {
      en: `### Understanding the Math of Profitability

To survive as a modern merchant in Italy, Germany, or France, establishing a rigid understanding of physical accounting margin and EU VAT protocols is critical.

### The VAT Invoice Formula
When listing an item on **modaui**, you deal with both the Net Cost (Pre-Tax) and Gross Cost (Inclusive of local country VAT - e.g., 22% rate for Italian IVA on consumer goods).

$$\\text{VAT Amount} = \\text{Net price} \\times \\left(\\frac{\\text{VAT } \\%}{100}\\right)$$

### Markup vs Margin Confusion
*   **Markup Percentage** is added directly to cost to find sale price:
    $$\\text{Markup} = \\frac{\\text{Selling Price} - \\text{Cost}}{\\text{Cost}} \\times 100$$
*   **Gross Margin** represents the portion of the selling price that is profit:
    $$\\text{Gross Margin} = \\frac{\\text{Selling Price} - \\text{Cost}}{\\text{Selling Price}} \\times 100$$

With **modaui OS**, our integrated invoicing and payment terminals automate tax withholding automatically. It determines the buyer’s IP origin, checks VAT MOSS (Mini One Stop Shop) thresholds, and outputs instantly formatted receipts with QR codes conforming directly to European fiscal regulations.`,
      it: `### Comprendere la matematica della redditività

Per sopravvivere come commerciante moderno in Italia, in Germania o in Francia, è fondamentale avere una solida comprensione dei margini contabili e dei protocolli IVA dell'Unione Europea.

### La formula della fattura IVA
Quando inserisci un prodotto su **modaui**, gestisci sia il Costo Netto (pre-tasse) che il Costo Lordo (comprensivo dell'IVA locale - es. 22% in Italia).

$$\\text{Importo IVA} = \\text{Prezzo Netto} \\times \\left(\\frac{\\text{Aliquota } \\%}{100}\\right)$$

Con **modaui OS**, i nostri terminali di pagamento integrati automatizzano la ritenuta d'imposta sul posto, verificando l'origine geografica del cliente emettendo istantaneamente scontrini e fatture elettroniche con codice QR conformi alle norme vigenti.`,
      zh: `### 财务底层逻辑：吃透商业盈利率

想要在西欧、德法或是南欧市场成长为卓越的常青品牌，深度解构增值税规则与企业底层毛利润计算公式，是商界决策的第一课程。

### 增值税发票计算关系式
在 **modaui** 挂载任何数字及实体商品时，涉及净销售额与附加税（如意大利基准消费税率 22% 等）：

$$\\text{增值税额} = \\text{商品不含税净价} \\times \\left(\\frac{\\text{税率 } \\%}{100}\\right)$$

### 两个常混淆的价格百分比
*   **加价率 (Markup %)**: 相对基准采购进货成本的上升幅度百分比：
    $$\\text{加价百分比} = \\frac{\\text{最终销售售价} - \\text{采购成本}}{\\text{采购成本}} \\times 100$$
*   **毛利率 (Gross Margin %)**: 刨除成本后，利润占你实际售价的占比：
    $$\\text{毛利率百分比} = \\frac{\\text{最终销售售价} - \\text{采购成本}}{\\text{最终销售售价}} \\times 100$$

使用 **modaui OS** 系统，收银、对账与发票自动递交财政署等复杂繁复的操作都已全自动化运行。系统自动辨别客户扣税资质、并对所售货物实时签发符合当地合规架构的带 QR 二维码的电子账单。`
    },
    relatedIds: ['post-1', 'post-3']
  },
  {
    id: 'post-3',
    slug: 'why-modaui-leads-shopify-stripe-cross-border',
    category: 'SaaS Comparisons',
    readingTime: '6 min',
    publishedTime: '2026-06-15',
    author: 'Kenji Takahashi',
    authorRole: 'E-commerce Architecture Lead',
    keywords: ['Shopify alternative', 'Stripe alternative', 'Odoo ERP Integration', 'modaui AI Engine', 'Omnichannel Commerce'],
    title: {
      en: 'Why modaui Outperforms Legacy Silos (Shopify + Stripe + Odoo)',
      it: 'Perché modaui supera i silos tradizionali (Shopify + Stripe + Odoo)',
      zh: '为什么集成式平台 modaui 相比传统拼接（Shopify + Stripe + Odoo）能提升效能'
    },
    description: {
      en: 'Most businesses patch together an e-commerce storefront, a generic payment gateway, and complex ERP software. Learn how modaui delivers 10x cohesion at a fraction of the cost.',
      it: 'La maggior parte dei merchant unisce un ecommerce, un gateway generico e un complesso software ERP. Scopri come modaui offre una coesione 10 volte superiore.',
      zh: '多数零售团队往往把前台网店、中间第三方支付插件和后台繁琐的 ERP 手工焊接。本篇深入剖析 modaui 的一体化数字引擎优势。'
    },
    content: {
      en: `### The High Cost of the "SaaS Spaghetti" Stack

When you start an retail storefront in 2026, you typically make 4-5 core purchasing decisions:
1.  **Shopify** (or WooCommerce) for your checkout page front-end.
2.  **Stripe** (or Adyen) to act as your merchant bank proxy.
3.  **Odoo** (or NetSuite) to track warehousing, invoices, and accounting grids.
4.  **Zendesk** (or Mailchimp) to patch marketing loops and loyalty tickets.

Every month, these software systems drain thousands of dollars from your profit sheet. Furthermore, they require custom API integration code, which continuously breaks during minor layout changes.

### The modaui Paradigm shift
**modaui** replaces the entire disconnected spaghetti stack. By building an omni-channel **AI Commerce OS**, we provide:

- **Built-In Payment Ledger**: No high-percentage Stripe API middleware markups.
- **Embedded Real-Time CRM**: The AI knows your customer's complete in-store & online transactional footprint.
- **Self-Healing Inventory**: Restock thresholds adjust dynamically based on global macrotrends.`,
      it: `### Allarme Spaghetti-SaaS: Il costo nascosto dell'infrastruttura frammentata

Quando apri un'attività al giorno d'oggi, sei costretto a comprare Shopify per l'interfaccia, Stripe per i pagamenti, Odoo per la logistica e altri strumenti di messaggistica. Questi software costano migliaia di euro e necessitano di tecnici per tenerli in piedi.

**modaui** unisce tutto questo in un unico sistema ad alte prestazioni, con gestione IVA semplificata, CRM incorporato e intelligenza predittiva di inventario che si gestisce da sola.`,
      zh: `### 警惕“系统拼盘”：破碎应用生态所带来的额外内耗

在 2026 年启动零售快消或连锁业务，您往往面临繁重选择：
1.  **Shopify**: 渲染网页结账和前台橱窗。
2.  **Stripe**: 开通借记卡与信用卡收单。
3.  **Odoo**: 手工对账，盘点物料仓储与应收账款。
4.  **Zendesk**: 处理客服会话和客诉表单。

每个月，这些软件租金如同吸血般侵蚀您辛辛苦苦赚来的微薄净利。更让人痛苦的是，一旦任何一方稍有升级，您雇佣的高薪外包工程师就得花上几天修复断裂的数据传输链路。

### modaui 的维度跨越
**modaui 创造性地终结了这一现状**。通过彻底将所有这些场景聚合并融汇进一个完全可扩展、且内置 AI 代理协同系统的商业引擎：

- **自研原生结算中枢**: 开箱即用，省去繁冗的高扣点三方支付网关层层盘剥。
- **数字记忆客服代理**: AI 会话不仅能查到他刚刚取消的快递，还能立即判定他是一位实体店老客。
- **免人工决策补货逻辑**: 根据时令、销售爆单概率，全自动计算补货预警，最大程度压低死仓呆滞料。`
    }
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'General',
    question: {
      en: 'What is modaui AI Commerce OS?',
      it: 'Cos\'è modaui AI Commerce OS?',
      zh: '什么是 modaui 智能零售自动化商业操作系统？'
    },
    answer: {
      en: 'modaui is an all-in-one AI operating system for retail, restaurants, and ecommerce. It unifies payments, CRM, smart warehousing, and automatic content marketing into a single, cohesive engine designed to eliminate system integrations and boost sales.',
      it: 'modaui è un sistema operativo IA tutto-in-uno per negozi al dettaglio, ristoranti ed e-commerce. Unifica pagamenti, CRM, magazzino intelligente e marketing automatico senza costose integrazioni.',
      zh: 'modaui 是一套为零售商、跨国快消连锁、中大型餐饮及品牌电商倾力打造的一站式 AI 智能商务操作系统。我们将“收网结算”、“全域 CRM 记忆”、“智能预测仓储”及“AI 流量工坊”融合在单一架构中，旨在协助商家抛弃繁杂的外挂配置，专注于客户增长本身。'
    }
  },
  {
    id: 'faq-2',
    category: 'Billing & Tax',
    question: {
      en: 'How does the automated VAT compliance work in Italy/EU?',
      it: 'Come funziona la gestione IVA automatizzata in Italia/UE?',
      zh: '如何实现针对意大利及欧盟各国的增值税（VAT）合规流转？'
    },
    answer: {
      en: 'Our platform automatically detects customer location via geolocation and cross-references VAT IDs to compute correct European tax percentages instantly. It integrates directly with national fiscal billing APIs, issuing compliant receipts under EU OSS standards with fiscal QR layouts.',
      it: 'La nostra piattaforma rileva automaticamente la posizione e calcola l\'aliquota fiscale corretta. È integrata con il sistema di fatturazione elettronica dell\'Agenzia delle Entrate, garantendo conformità e codici QR conformi.',
      zh: '我们的系统会感知终端顾客的具体国别与订单属性，智能校核发票起征额。在欧洲内部可配合 OSS（一站式）申报合规制度，自动对接相应的税务登记系统与税收数据接口，极速生成带财政安全签名与条形码/QR码的电子票据。'
    }
  },
  {
    id: 'faq-3',
    category: 'Security',
    question: {
      en: 'Is modaui compliant with EU GDPR and security certifications?',
      it: 'modaui è conforme al GDPR dell\'UE e alle certificazioni di sicurezza?',
      zh: 'modaui 是否符合 GDPR 欧盟隐私及数据主权安全规范？'
    },
    answer: {
      en: 'Absolutely. All sensitive transaction data is fully securely encrypted, with host servers adhering to strict GDPR localization. We follow ISO 27001 architectures and maintain highly secured backup nodes operating outside standard disaster clusters.',
      it: 'Assolutamente sì. Tutti i dati sensibili sono crittografati, con server di hosting situati in Unione Europea. Rispettiamo gli standard ISO 27001 e applichiamo una rigida politica di conformità GDPR.',
      zh: '是的，这是一条不容置疑的安全底线。所有欧盟本地产生的客户数据、信用卡标记都满足数据局部存储要求（GDPR Compliant）。我们采纳 ISO 27001 重大风险防护框架，并对支付请求和敏感资料执行强加密双通道隔离防护。'
    }
  }
];

export const SAAS_COMPARE_MATRIX: SaaSCompareItem[] = [
  {
    featureName: {
      en: 'AI Agent Workflows & Automation',
      it: 'Flussi di lavoro e automazione AI Agent',
      zh: 'AI 智能体代理（会话、调度与跨层级自动化）'
    },
    modauiHas: true,
    shopifyHas: 'partial',
    stripeHas: false,
    squareHas: false,
    odooHas: 'partial',
    description: {
      en: 'modaui native AI interprets sales stock trends, auto-drafts responses, and makes financial decisions on the fly. Competitors only offer separate ChatGPT-wrapper plugins.',
      it: 'Il motore nativo di modaui analizza lo stock, formula risposte ed elabora rimborsi. Gli altri offrono solo plug-in esterni costosi.',
      zh: 'modaui 的核心内核直接串联 AI 决策流。无需外接第三方 API 机器人或购买插件，AI 会自动判研全域库存、拟写多语言营销邮件、自发生成销售图谱。客户甚至能通过语音操控后台。'
    }
  },
  {
    featureName: {
      en: 'Integrated Omnichannel POS Ledger',
      it: 'Registro cassa POS unificato multicanale',
      zh: '全域收银、网店、实体店一账贯通'
    },
    modauiHas: true,
    shopifyHas: 'partial',
    stripeHas: false,
    squareHas: true,
    odooHas: 'partial',
    description: {
      en: 'Combines direct retail hardware transactions, self-service QR menus, and web platform invoicing in a single unified accounting register.',
      it: 'Combina transazioni POS fisiche, menù QR digitali e fatturazione web in un unico registro contabile coeso.',
      zh: '物理网点收银机、移动端扫码自选收银、和网店发票直接落在同一台大账本账目上。告别每日打两份 POS 对账单的低效传统操作。'
    }
  },
  {
    featureName: {
      en: 'Self-Generating Programmatic SEO Factory',
      it: 'SEO Factory programmatico auto-generante',
      zh: '程序化 SEO 获客工坊（每日自动更新）'
    },
    modauiHas: true,
    shopifyHas: false,
    stripeHas: false,
    squareHas: false,
    odooHas: false,
    description: {
      en: 'Automatically generates pages, localizes them to 3+ languages, publishes schemas, updates sitemaps, and crawls rankings to fetch direct organic traffic.',
      it: 'Genera sitemap, articoli tradotti e descrizioni prodotto per posizionarti su Google senza faticare.',
      zh: '为企业在 24 小时不断自动捕获地区长尾搜索关键词、智能撰写高质量行业方案和下载物料、一键转换为多国语言对谷歌呈报索引，使网站化身永不停摆的搜索引擎流量捕获池。'
    }
  },
  {
    featureName: {
      en: 'Local European Tax/VAT Compliance',
      it: 'Fatturazione elettronica e conformità IVA UE',
      zh: '欧盟/意大利多国电子税务发票即时合规'
    },
    modauiHas: true,
    shopifyHas: 'partial',
    stripeHas: 'partial',
    squareHas: 'partial',
    odooHas: 'partial',
    description: {
      en: 'Direct API binding with national fiscal portals. Fully supports MOSS rules, Italian Agenzia delle Entrate specifications, and invoices layout containing QR checkmarks.',
      it: 'Integrazione diretta con Agenzia delle Entrate per l\'invio automatico dei corrispettivi fiscali.',
      zh: '直连欧洲多国及意大利等消费税电子申报系统。自动开具包含特定税号、地址校验与安全合规数字签名的专用电子票据报表。'
    }
  }
];

export const TECHNICAL_DOC_CATEGORIES: DocCategory[] = [
  {
    id: 'cat-developer',
    title: {
      en: 'Developer API Reference',
      it: 'Riferimento API Sviluppatore',
      zh: '开发者 API 参考文档'
    },
    docs: [
      {
        id: 'doc-api-intro',
        title: {
          en: 'Authentication & Base URL',
          it: 'Autenticazione e URL di base',
          zh: '接口安全性身份校验与网关基地址'
        },
        content: {
          en: `### Authentication Protocol
Access to the modaui API requires a secure Bearer token. You can generate a restricted token under the \`modaui Cloud Console\` settings block.

\`\`\`bash
# Endpoint Base URL
https://api.modaui.com/v1

# Secure Auth Request Header Example
curl -X GET "https://api.modaui.com/v1/endpoints/inventory/stock" \\
  -H "Authorization: Bearer mda_live_sec_8927429188"
\`\`\`
`,
          it: `### Protocollo di autenticazione
L'accesso all'API modaui richiede un token sicuro Bearer. Puoi generare i tuoi token di accesso sicuro dal pannello \`modaui Console\`.

\`\`\`bash
# URL Base API
https://api.modaui.com/v1

# Esempio di autenticazione
curl -X GET "https://api.modaui.com/v1/endpoints/inventory/stock" \\
  -H "Authorization: Bearer mda_live_sec_8927429188"
\`\`\`
`,
          zh: `### 接口鉴权与访问路径
对 modaui 底层核心 API 的操作需在 Header 中携带 Bearer 密钥标记。请前去 \`modaui 后台控制台\` 的“系统安全性 -> API 令牌申请”签发专有访问令牌。

\`\`\`bash
# 核心公共 API 网关入口
https://api.modaui.com/v1

# 发起带有鉴权头部参数的 cURL 请求示范
curl -X GET "https://api.modaui.com/v1/endpoints/inventory/stock" \\
  -H "Authorization: Bearer mda_live_sec_8927429188"
\`\`\`
`
        }
      },
      {
        id: 'doc-api-agent',
        title: {
          en: 'Simulating AI Flow & Webhooks',
          it: 'Simulare flussi AI e webhook',
          zh: 'AI 代理流程异步订阅与 Webhook 通信接口'
        },
        content: {
          en: `### Listening to AI Decision Logs
Register a secure webhook endpoint to intercept modaui AI automated actions, such as automatically buying out stock or triggering email recovery.

\`\`\`json
{
  "event": "ai.agent.decision_workflow",
  "timestamp": "2026-06-21T04:20:00Z",
  "data": {
    "workflow_id": "flow-889",
    "agent_name": "Retail Restock Manager",
    "action_taken": "AUTO_PURCHASE_ORDER_SUBMITTED",
    "target_supplier": "Zhejiang Loom Fabrics Ltd",
    "trigger_reason": "Global summer peak demand forecast exceeded local threshold 12%"
  }
}
\`\`\`
`,
          it: `### Ricevere i log di decisione dell'agente AI
Configura un webhook per intercettare gli ordini di riassortimento dei magazzini elaborati dalla nostra intelligenza artificiale.

\`\`\`json
{
  "event": "ai.agent.decision_workflow",
  "timestamp": "2026-06-21T04:20:00Z",
  "data": {
    "workflow_id": "flow-889",
    "agent_name": "Retail Restock Manager",
    "action_taken": "AUTO_PURCHASE_ORDER_SUBMITTED"
  }
}
\`\`\`
`,
          zh: `### 订阅智能代理决策事件日志
通过在控制面板中挂载安全 Webhook。您可以对 AI Agent 自动决策流程（例如执行紧急补货、启动不合规资金隔离等）进行即时监测追踪。

\`\`\`json
{
  "event": "ai.agent.decision_workflow",
  "timestamp": "2026-06-21T04:20:00Z",
  "data": {
    "workflow_id": "flow-889",
    "agent_name": "零售库存自主自适应中枢",
    "action_taken": "自动下达追加仓储指令",
    "target_supplier": "浙江某品牌快消供应链总仓",
    "trigger_reason": "本地夏装预计销售趋势提前突破周线告警阈值 12%"
  }
}
\`\`\`
`
        }
      }
    ]
  },
  {
    id: 'cat-tutorials',
    title: {
      en: 'Omnichannel & Core Tutorials',
      it: 'Tutorial Omnicanale e Core',
      zh: '全通路实操商业教程'
    },
    docs: [
      {
        id: 'tut-pos-rest',
        title: {
          en: 'Setting Up Restaurant QR Ordering',
          it: 'Configurazione del menù d\'ordine QR',
          zh: '如何一键配置并推行餐厅扫码收银系统'
        },
        content: {
          en: `### Step 1: Scan Table Allocation
Open your **modaui mobile app** and link physical QR codes directly to table configurations. No slow client-side loading; modaui handles menu layouts at the edge.

### Step 2: Set Live Kitchen Monitors
Under inventory, assign printing routers or live screen routes so orders placed by diners immediately ring kitchen devices. Payments settle automatically when table sessions exit.`,
          it: `### Passo 1: Disposizione del tavolo
Collega i codici QR cartacei ai tavoli virtuali tramite la console di modaui.
### Passo 2: Monitor da cucina
Tutti gli ordini effettuati dai clienti tramite QR sono visibili istantaneamente nei tablet della cucina, con ricezione immediata degli scontrini di cassa.`,
          zh: `### 第一步：扫码绑定桌号位置
在手机上打开 **modaui 管理后台**。拍一下桌面贴花上的物理二维码贴纸，即可一键把该码与特定编号的卡座及包厢深度锁定绑定。

### 第二步：智能厨房看板连通性
配置完成后，当食客完成微信/支付宝或外币卡扫码下单，厨房内部配置的显示大屏会在 20ms 内响起提示音提醒备菜，并自动锁定桌台已领优惠券。`
        }
      }
    ]
  }
];
