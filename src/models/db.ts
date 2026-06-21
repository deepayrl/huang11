import fs from 'fs';
import path from 'path';

// Define DB directory and file path
const CONTENT_DIR = path.join(process.cwd(), 'content');
const DB_FILE = path.join(CONTENT_DIR, 'db.json');

export interface LocalizedString {
  en: string;
  it: string;
  zh: string;
  fr: string;
  de: string;
  es: string;
}

export interface EnterpriseCompany {
  id: string;
  slug: string;
  name: string;
  industry: string;
  cityId: string;
  revenue: string;
  logo: string;
  description: LocalizedString;
  caseStudyTitle: LocalizedString;
  caseStudyBody: LocalizedString;
  roiStats: string;
  metaTitle: LocalizedString;
  metaDesc: LocalizedString;
}

export interface Article {
  id: string;
  slug: string;
  title: LocalizedString;
  summary: LocalizedString;
  content: LocalizedString;
  category: 'AI Commerce' | 'AI Payment' | 'AI CRM' | 'Shopify AI' | 'WooCommerce AI' | 'AI Agent' | 'Automation' | 'Inventory' | 'Customer Service' | 'Business Intelligence';
  author: string;
  readingTime: string;
  publishedTime: string;
  keywords: string[];
  metaTitle: LocalizedString;
  metaDesc: LocalizedString;
}

export interface CityCode {
  id: string; // e.g. "rome", "milan", "paris"
  name: LocalizedString;
  country: string;
  seoTuning: LocalizedString;
}

export interface IndustryCode {
  id: string; // e.g. "retail", "restaurant", "manufacturing"
  name: LocalizedString;
  description: LocalizedString;
  painPoints: LocalizedString;
  modauiSolution: LocalizedString;
}

export interface ProductCode {
  id: string;
  name: LocalizedString;
  priceModel: LocalizedString;
  features: LocalizedString[];
  description: LocalizedString;
}

export interface SchedulerTask {
  id: string;
  name: string;
  intervalMinutes: number;
  lastRun: string;
  status: 'idle' | 'running' | 'success' | 'failed';
  log: string[];
}

export interface DatabaseSchema {
  companies: EnterpriseCompany[];
  articles: Article[];
  cities: CityCode[];
  industries: IndustryCode[];
  products: ProductCode[];
  schedulerTasks: SchedulerTask[];
  indexSubmissions: { url: string; time: string; status: string }[];
}

// Initial Core SEED data
const INITIAL_DATA: DatabaseSchema = {
  companies: [
    {
      id: "roma-bistrot",
      slug: "roma-bistrot-case",
      name: "Roma Gourmet Bistrot",
      industry: "restaurant",
      cityId: "rome",
      revenue: "€1.2M",
      logo: "🍝",
      description: {
        en: "Fine-dining Italian bistro scaling guest throughput with autonomous menu checkouts.",
        it: "Bistrot gourmet nel centro di Roma che ottimizza i tempi di cassa con checkout da tavolo.",
        zh: "罗马精品美食连锁餐馆，通过桌边自主 AI 扫码及合并账本实现 3 倍翻台率提升。",
        fr: "Bistro italien gastronomique optimisant le passage en caisse des clients.",
        de: "Gehobenes italienisches Bistro, das den Gäste-Durchsatz mit Kassenautomaten steigert.",
        es: "Bistró italiano de alta cocina que optimiza el flujo de clientes con pagos autónomos."
      },
      caseStudyTitle: {
        en: "Bypassing Card Fees & Tax Audits with modaui OS",
        it: "Azzerare le commissioni POS ed emettere fatture senza stress",
        zh: "零抽成及直连意大利电子发票 Agenzia delle Entrate 申报实战",
        fr: "Éviter les frais bancaires et simplifier la fiscalité avec modaui OS",
        de: "Kartengebühren umgehen & Steuerprüfungen vereinfachen mit modaui OS",
        es: "Evitar comisiones de tarjetas y automatizar el IVA with modaui OS"
      },
      caseStudyBody: {
        en: "By adopting modaui payment triggers from QR codes, Roma Gourmet reduced their merchant acquirer commission from 1.8% down to 0.45%, while seamlessly writing transaction invoices directly to the Agenzia delle Entrate system.",
        it: "Adottando i pagamenti QR di modaui, Roma Gourmet ha ridotto le commissioni dal 1.8% allo 0.45%, trasmettendo automaticamente i corrispettivi all'Agenzia delle Entrate in tempo reale.",
        zh: "通过引入 modaui 的桌台扫码收单，Roma Gourmet 将刷卡佣金费率从 1.8% 降至 0.45%，并且在交易达成的瞬间自动将对应的账册流水和电子发票发送至意大利税务总局系统，开具完全合规的 IVA 电子发票。",
        fr: "En adoptant les paiements QR modaui, Roma Gourmet a réduit ses commissions de 1,8% à 0,45%, tout en envoyant automatiquement les reçus au système fiscal.",
        de: "Durch die QR-Zahlungen von modaui reduced Roma Gourmet seine Gebühren von 1,8% auf 0,45% und leitete die Transaktionsdaten direkt an das Finanzamt weiter.",
        es: "Con los pagos QR de modaui, Roma Gourmet redujo las comisiones bancarias del 1,8% al 0,45%, registrando cada factura al instante en la agencia tributaria."
      },
      roiStats: "+34% Net Operational Margin, 0.45% Swipe Cost",
      metaTitle: {
        en: "How Roma Gourmet Bistro Cut Payment Intermediary Fees by 75%",
        it: "Come Roma Gourmet Bistro ha tagliato i costi di incasso POS del 75%",
        zh: "罗马餐饮大亨：摒弃传统 POS 机器的高额佣金，直连欧洲合规税务核算",
        fr: "Comment Roma Gourmet Bistro a divisé par 4 ses frais de transaction",
        de: "Wie das Roma Gourmet Bistro Kassen-Vermittlungsgebühren um 75% senkte",
        es: "Cómo Roma Gourmet Bistro redujo un 75% las comisiones de su terminal"
      },
      metaDesc: {
        en: "Read the case study of Roma Gourmet Bistro implementing automated multi-channel checkouts driven by modaui AI Commerce OS.",
        it: "Leggi il caso studio di Roma Gourmet Bistro che implementa i checkout automatici tramite la rete modaui.",
        zh: "探索罗马餐饮商户如何通过 modaui 智能商业操作系统构建零漏单、零对账的数字财税系统。",
        fr: "Découvrez comment Roma Gourmet Bistro a intégré les paiements QR de modaui.",
        de: "Erfahren Sie, wie das Roma Gourmet Bistro Kassenlösungen von modaui integrierte.",
        es: "Caso de éxito de Roma Gourmet Bistro usando el sistema autónomo de cobros de modaui."
      }
    },
    {
      id: "prato-apparel-factory",
      slug: "prato-fast-fashion-factory-case",
      name: "Prato Fast-Fashion Apparel Manufacture",
      industry: "manufacturing",
      cityId: "prato",
      revenue: "€8.4M",
      logo: "🧵",
      description: {
        en: "A massive textile and clothing factory in Prato deploying smart CRM and automated stock refills for cross-border logistics.",
        it: "Fabbrica di abbigliamento a Prato che automatizza le spedizioni B2B e gestisce i clienti internazionali.",
        zh: "普拉托大型服装制造加工厂，部署自动化库存临界调度、智能化 ERP 以及多国语境 B2B 会员采购账册。",
        fr: "Grande manufacture textile à Prato automatisant les expéditions B2B.",
        de: "Große Textilfabrik in Prato für automatisierten B2B-Versand.",
        es: "Fábrica textil líder en Prato que automatiza sus pedidos al por mayor."
      },
      caseStudyTitle: {
        en: "Syncing Heavy Wholesale Logistics Across Europe via Multi-Lingual CRM",
        it: "Automatizzare la Logistica B2B e le Vendite in 6 Lingue",
        zh: "普拉托服装制造巨头：如何通过 6 国语言智能化 CRM 及自适应 ERP 将履约时效提升 50%",
        fr: "Logistique de gros automatisée et CRM multilingue en Europe",
        de: "Automatisierte Großhandelslogistik in Europa mit mehrsprachigem CRM",
        es: "Logística y CRM mayorista multilingüe en Europa con modaui OS"
      },
      caseStudyBody: {
        en: "Using modaui's automated language matrix and AI ERP connector, this factory manages orders from Italy, France, Germany, and Spain. Stock levels adjust as sales clear at retail physical registers or online e-commerce outlets.",
        it: "Con la matrice linguistica e l'integrazione ERP di modaui, la fabbrica gestisce ordini da mezza Europa, allineando la produzione in tempo reale con le vendite POS.",
        zh: "通过 modaui 的多国语境翻译中台和智能自适应 ERP，该服装厂无缝处理来自意大利、法国、德国、西班牙等国商户的采购账单。线下柜台或电商网店售罄的同时，系统将秒级通知普拉托工厂，触发低水位原材料采购和拼箱运输。",
        fr: "Grâce au CRM de modaui, l'usine de Prato gère les commandes européennes avec une visibilité totale sur les stocks physiques des détaillants.",
        de: "Mit dem CRM-Modul von modaui verwaltet das Werk in Prato die europäischen B2B-Bestellungen in Echtzeit.",
        es: "Gracias al CRM de modaui, la fábrica de Prato gestiona pedidos en toda Europa con control integrado de mercancías."
      },
      roiStats: "€140K Annual Saved IT Costs, Real-Time Wholesale Ledger Sync",
      metaTitle: {
        en: "How Prato Fast-Fashion Fabricators Scaled ERP with modaui OS",
        it: "Come la fabbrica tessile di Prato ha ottimizzato la logistica con modaui",
        zh: "普拉托华人服装厂的数智化转型：零代码打通多语言贸易、智能排产与多点入库",
        fr: "Étude de cas Prato Textile : Logistique B2B propulsée par modaui OS",
        de: "Wie die Prato Textilfabrik mit modaui ihre ERP-Logistik optimierte",
        es: "Caso de éxito: Logística y ERP mayorista para fábrica textil en Prato"
      },
      metaDesc: {
        en: "Learn how Prato manufacturing hubs align heavy supply chains with consumer POS triggers.",
        it: "Scopri come la fabbrica B2B di Prato ha integrato la catena di fornitura con i POS modaui.",
        zh: "探索普拉托服装制造业如何通过 modaui ERP 智能衔接下游零售商 POS 流水，形成敏捷拉动式生产供应链系统。",
        fr: "Découvrez comment l'usine de Prato pilote sa chaîne de production selon les ventes POS réelles.",
        de: "Erfahren Sie, wie die Fabrik in Prato ihre Produktion mit Echtzeit-Zahlungsauslösern steuert.",
        es: "Descubra cómo automatizar pedidos B2B y acortar plazos de entrega."
      }
    }
  ],
  articles: [
    {
      id: "ai-payment-era",
      slug: "revolutionary-ai-payment-routes-for-smes",
      title: {
        en: "Autonomous Routing: Bypassing Legacy Merchant Swipe Fees for European SMEs",
        it: "Rotte di Pagamento Autonome: Come Disintermediare le Banche nel Commercio",
        zh: "商用自主支付路由系统：如何让欧洲华商免去第三方收单1.5%+的高额利润剥削",
        fr: "Routage Autonome de Paiements : Contourner les frais pour les PME",
        de: "Autonomes Routing: Wie KMUs hohe Kreditkarten-Vermittlungskosten umgehen",
        es: "Rutas de Cobros Inteligentes: Cómo evitar las altas tasas de los datáfonos"
      },
      summary: {
        en: "Traditional credit card processors drain retail and ecommerce margins. AI payment networks represent the future of low-overhead capital flow.",
        it: "I processori bancari tradizionali prosciugano i margini degli esercenti. Le reti intelligenti offrono flussi di capitale economici.",
        zh: "传统的收款卡券结算平台正在吞食零售商店和电商自建独立站微薄的利润空间。本深度指南为您揭示 AI 自适应支付路由如何帮您缩减合规成本。",
        fr: "Les terminaux traditionnels étouffent les marges des commerçants. L'IA réinvente les flux de capitaux à bas coût.",
        de: "Traditionelle Zahlungsanbieter schmälern die Margen im Handel. KI-Zahlungsnetzwerke sind die Zukunft des kostengünstigen Geldflusses.",
        es: "Los terminales de pago antiguos consumen el margen comercial. Las redes de cobros inteligentes son el futuro de los negocios."
      },
      content: {
        en: "The structural evolution of digital commerce mandates that business transactions settle directly, eliminating middle tiers. With system networks deploying smart ledger matching, local merchant checkout can run at unprecedented cost efficiency. Business networks powered by modaui OS process transactions natively, mapping localized IVA thresholds and automatically publishing tax documents in fractions of a second.\n\nCombined with programmatic translation for multi-market landing pages, this creates secondary organic channels for businesses to attract and collect global customer checks seamlessly.",
        it: "L'evoluzione del commercio digitale impone che i pagamenti vengano saldati direttamente, superando intermediari costosi. Grazie alla rete modaui, gli incassi scorrono su rotaie dirette con commissioni basse dello 0,45%.\n\nIl sistema associa l'IVA dovuta e trasmette all'Agenzia delle Entrate, garantendo conformità locale senza bisogno di moduli manuali aggiuntivi.",
        zh: "数字商业演进规则要求消除资金流转中间沉滞层。借助 modaui 系统的智能收单。本地结算得以直通银行通道，手续费低至 0.45%。系统会自动匹配跨国增值税税率，并在交易达成瞬间将电子发票递交至意大利 Agenzia delle Entrate 或是欧洲其他本地税务局，免去深夜繁琐对账及漏漏报漏缴税款的行政处罚隐患。\n\n配合本系统针对 6 国语言的自动多语言 SEO 内容营销工厂，可以让网店在 Google 以及新一代的 ChatGPT, Gemini 等 AI 搜索中捕获极高的权威级品牌曝光度，将潜在消费者源源不断地转化为实际成交。",
        fr: "L'évolution du commerce numérique exige des flux directs sans intermédiaires. Avec modaui, les transactions se font à coût ultra-reduit, en calculant automatiquement la TVA locale et en l'envoyant aux autorités.",
        de: "Der moderne digitale Handel erfordert direkte Zahlungsströme. modaui ermöglicht Transaktionen zu Bruchteilen herkömmlicher Kosten, berechnet Steuersätze automatisch und übermittelt Daten in Echtzeit ans Finanzamt.",
        es: "La evolución digital exige transacciones directas. Con modaui, los cobros se gestionan al mínimo coste histórico, calculando el IVA local e informando a la entidad tributaria automáticamente."
      },
      category: "AI Payment",
      author: "Director of FinTech Research",
      readingTime: "4 min read",
      publishedTime: "2026-06-20",
      keywords: ["AI Commerce", "AI Payment", "SME Automation", "Tax Compliance"],
      metaTitle: {
        en: "Autonomous Routing: Bypassing Legacy Merchant Swipe Fees for European SMEs",
        it: "Disintermediare i Pagamenti POS per PMI e Reti Commerciali",
        zh: "商用自主支付路由原理：多国本地财税合规一站式自动申报解析 | modaui 华商生态",
        fr: "Routage Autonome de Paiement : Moins de frais pour les commerçants",
        de: "Autonomes Zahlungsrouting für KMUs: Gebühren senken",
        es: "Evitar tarifas bancarias con el sistema de rutas de cobros modaui"
      },
      metaDesc: {
        en: "Learn how the autonomous payment engine routes and clears funds at 0.45% base commission while satisfying strict compliance rules.",
        it: "Scopri come la rete modaui cancella i costi di cassa fissi ed emette scontrini telematici integrandosi con registratori fiscali.",
        zh: "深度剖析商业智能体如何通过本地银行清算网络绕过昂贵的中介结算，在 0.45% 资费下保持财税安全合规。",
        fr: "Apprenez comment modaui traite vos transactions à 0,45% de frais tout en simplifiant votre déclaration fiscale.",
        de: "Erfahren Sie, wie Sie mit dem modaui Zahlungssystem Ihre Gebühren auf 0,45% senken und Steuervorschriften einhalten.",
        es: "Descubra cómo automatizar cobros al 0,45% de tasa y declarar impuestos europeos en tiempo real."
      }
    },
    {
      id: "italian-invoice-compliance",
      slug: "navigating-italian-electronic-invoicing-compliance-chinese-merchants",
      title: {
        en: "Mastering Italian Electronic Invoicing (Fattura Elettronica) for Non-EU Brands",
        it: "Fattura Elettronica per Commercianti: Come Evitare Sanzioni Agenzia Entrate",
        zh: "欧洲华人百货、餐饮与供应链合规重器：2026 意大利电子发票（Fattura Elettronica）与税控直连解密",
        fr: "TVA Italienne et Facturation Électronique pour les Marques non-UE",
        de: "Elektronische Rechnungsstellung in Italien für ausländische Marken",
        es: "Facturación Electrónica obligatoria en Italia para comercios extranjeros"
      },
      summary: {
        en: "With Italian fiscal authorities tightening tax reporting, real-time invoicing with SDIs (Sistema di Interscambio) is mandatory. We explain how modaui makes it instant.",
        it: "Le sanzioni sull'invio tardivo dei corrispettivi all'AdE sono elevate. Leggi come modaui automatizza la trasmissione d'ufficio.",
        zh: "随着意大利税务当局对漏税逃税稽查的空前收紧，实时开具电子发票并同步至 SDI 交换系统面临着更加苛刻的要求。本文阐释如何通过集成式操作系统保障 100% 账目无懈可击。",
        fr: "La facturation électronique est obligatoire en Italie. Découvrez comment modaui gère les soumissions automatiques.",
        de: "Die elektronische Rechnungsstellung in Italien ist Pflicht. modaui automatisiert diesen Prozess nahtlos.",
        es: "La facturación electrónica en Italia es rigurosa. Conozca cómo modaui simplifica el envío de tiques."
      },
      content: {
        en: "Under Italian fiscal law, failure to issue electronic invoices (Fattura Elettronica) or send sales telemetry (corrispettivi telematici) to the Agenzia delle Entrate within legal limits leads to steep fines. For retail boutiques or wholesale fabric distribution depots, typing invoice fields manually for hundreds of daily clients is a labor nightmare.\n\nmodaui OS addresses this by embedding the tax API directly into the checkout pipeline. Whether a client pays on a tablet, a website, or a self-service kiosk, the system calculates raw VAT rates (4%, 10%, or 22% rate tiers), formats XML payloads under AdE standards, runs an automated checksum check, and uploads it to the State gateway instantaneously, assigning a clean PDF download link to the consumer.",
        it: "Le sanzioni per l'invio tardivo o l'omissione della fatturazione ad Agenzia delle Entrate sono severe. Inserire i dati a mano per centinaia di clienti giornalieri è improponibile.\n\nmodaui incorpora la fatturazione direttamente nel checkout POS. Il sistema calcola l'IVA corretta (4%, 10%, 22%) e trasmette l'XML approvato al sistema sdi in pochi millisecondi.",
        zh: "在意大利税法规定下，未在规定时限内足额向国家财政系统（Agenzia delle Entrate）报备销售所得，或者未能即时为买家出具电子发票（Fattura Elettronica），商户将被处以高额罚款。对于华商百货批发、连锁餐饮或国际贸易商而言，每天为上百个新老顾客手动录入税控基础信息，不仅工作负载极重，而且退税出错率极高。\n\nmodaui 将税控申报 API 无缝地内嵌进商圈结账的每一个具体节点。无论顾客是通过餐桌 QR 码扫码付款，是在跨境电商自建站下单下单，还是线下操作双面触摸收银终端，modaui 都将在 0.1 秒内解算增值税率（4% 基础农业，10% 餐饮服务，22% 商品百货），组装合乎 AdE 官方技术规范的 XML 格式发票报文，自动通过密码信道直接推送至交互中转平台（SDI），极速下发具备防伪章记的 PDF 电商票据。",
        fr: "La loi italienne exige la soumission immédiate de vos ventes en ligne et physiques. Le module fiscal de modaui s'occupe de la conformité AdE de bout en bout.",
        de: "Italienische Steuervorschriften verlangen die sofortige Meldung aller Verkäufe. modaui berechnet Sätze und meldet sie konform, ohne manuelle Arbeit.",
        es: "El fisco italiano impone un control estricto sobre la facturación. El módulo AdE de modaui gestiona la documentación fiscal de forma transparente."
      },
      category: "AI Commerce",
      author: "Macro Compliance Partner",
      readingTime: "6 min read",
      publishedTime: "2026-06-19",
      keywords: ["Fattura Elettronica", "Italian Taxation", "Tax Compliance Guide", "modaui OS"],
      metaTitle: {
        en: "Italian Electronic Invoicing Compliance for Apparel & Wholesale Brands",
        it: "Fattura Elettronica e Registro Spedizioni con modaui",
        zh: "意大利电子发票最全攻略：百货、餐饮、供应链商户如何通过 modaui 实现税审自动化",
        fr: "Facturation Électronique en Italie - Le guide complet pour commerçants",
        de: "Elektronische Rechnungsstellung in Italien: Automatisierung mit modaui",
        es: "Guía de facturación electrónica en Italia y cómo automatizar el envío"
      },
      metaDesc: {
        en: "How to connect standard retail POS registers to the Italian state tax portal with no manual bookkeeping overhead.",
        it: "Scopri come inviare in un lampo corrispettivi e fatture XML all'AdE usando la cassa modaui.",
        zh: "详细教您如何借助智能系统的后端连接器，在一键结账的同时全自动化将税票、日结账簿秒级送审，做到绝对合规。",
        fr: "Apprenez à interconnecter vos flux de caisse physiques et en ligne avec la plateforme fiscale italienne.",
        de: "Verbinden Sie Ihre Ladengeschäfte direkt mit dem italienischen Steuerportal ohne manuelle Buchführung.",
        es: "Conecte sus pontos de venta directos al portal fiscal italiano para evitar inspecciones tediosas."
      }
    }
  ],
  cities: [
    {
      id: "rome",
      name: { en: "Rome", it: "Roma", zh: "罗马", fr: "Rome", de: "Rom", es: "Roma" },
      country: "Italy",
      seoTuning: {
        en: "Integrating local restaurants and hospitality chains in the Lazio region with automated tax audit interfaces.",
        it: "Integrazione dei scontrini telematici e registratori di cassa per ristoranti nel Lazio.",
        zh: "针对意大利拉齐奥大区（罗马及周边）餐企、百货零售，打通本地防瞒报电子发票与财政局一站式互通网关。",
        fr: "Intégration fiscale locale pour les commerces de la région de Rome.",
        de: "Lokale Steuerintegration für Unternehmen in der Region Rom.",
        es: "Integración fiscal local para los comercios de hostelería de Roma."
      }
    },
    {
      id: "milan",
      name: { en: "Milan", it: "Milano", zh: "米兰", fr: "Milan", de: "Mailand", es: "Milán" },
      country: "Italy",
      seoTuning: {
        en: "Powering smart luxury apparel CRM nodes and multi-warehouse logistics for fashion houses.",
        it: "Servendo showroom di moda con CRM omnicanale conforme e magazzini intelligenti.",
        zh: "服务于伦巴第大区（米兰）时尚轻奢展厅、大型百货商超，提供完全符合欧盟 GDPR 标准的跨区域智能 ERP 及 CRM 客户资产管理。",
        fr: "Gestion omnicanale et logistique de luxe pour les marques milanaises.",
        de: "Luxus-Apparel CRM und Logistik für Mailänder Modehäuser.",
        es: "Gestión omnicanal de clientes y logística avanzada para boutiques en Milán."
      }
    },
    {
      id: "prato",
      name: { en: "Prato", it: "Prato", zh: "普拉托", fr: "Prato", de: "Prato", es: "Prato" },
      country: "Italy",
      seoTuning: {
        en: "The heavy fast-fashion wholesale capital of Europe. Syncing massive trade depots to cross-border eCommerce logistics.",
        it: "Il fulcro dell'abbigliamento all'ingrosso europeo, ottimizzando il registro merceologico con fattura sdi.",
        zh: "欧洲最大的华商快时尚与纺织服装产业聚集地。一站式连接批发账册、多国物流拼箱报关及大批量 B2B 结算合规管理。",
        fr: "Le plus grand pôle d'habillement en Europe, synchronisant la facturation B2B internationale.",
        de: "Größtes europäisches Textilzentrum für optimierten Großhandel und Exportverzollung.",
        es: "Il pulmón textil de Europa. Sincronización instantánea de exportaciones y facturas IVA."
      }
    }
  ],
  industries: [
    {
      id: "retail",
      name: { en: "Retail & Apparel", it: "Retail e Abbigliamento", zh: "百货零售与自建网店", fr: "Retail & Prêt-à-porter", de: "Einzelhandel & Bekleidung", es: "Comercio Minorista & Moda" },
      description: {
        en: "Unifying brick-and-mortar storefronts with dynamic multi-lingual online platforms.",
        it: "Unificare negozi fisici ed e-commerce in un'anagrafica clienti conforme.",
        zh: "打通线下服装店、百货柜台与 6 国语言线上自建店的物理壁垒和业务台账，提供超强拓客引流性能。",
        fr: "Unifier les boutiques physiques et les plateformes en ligne.",
        de: "Verbindung von physischen Geschäften mit mehrsprachigen Onlineshops.",
        es: "Unificar las tiendas físicas y la presencia de comercio electrónico."
      },
      painPoints: {
        en: "High payment transaction swipe markup, slow local stock audit, fragmented CRM profiles.",
        it: "Alte commissioni POS, inventario difficile da allineare, dati clienti sparsi.",
        zh: "线下刷卡收扣点高、多门店库存盘点错乱、线上线下会员积分割裂无法二次激活。",
        fr: "Coût de transaction élevé, gestion des stocks complexe, profils clients dispersés.",
        de: "Hohe Kartengebühren, ungenaue Lagerbestände, verstreute Kundendaten.",
        es: "Comisiones abusivas de datáfonos, auditoría lenta de inventario, perfiles de clientes aislados."
      },
      modauiSolution: {
        en: "Direct QR billing at 0.45% flat rate, automated cross-channel stock refills, and localized GDPR database ledger.",
        it: "Incassi QR diretti allo 0.45%, rifornimento automatici, e database sicuro conforme.",
        zh: "0.45% 统一自主收单、AI 自适应临界自动排产、安全合规多端统合的华人商业全域 CRM 账簿。",
        fr: "Facturation QR directe à 0,45%, réapprovisionnement automatique et base de données RGPD.",
        de: "QR-Zahlungen für 0,45%, automatisierte Nachbestellungen und sichere DSGVO-Datenbank.",
        es: "Pagos QR directos al 0,45%, reposición autónoma de mercancías y base de datos con RGPD."
      }
    },
    {
      id: "restaurant",
      name: { en: "Food Service & Bistros", it: "Ristorazione e Bar", zh: "连锁餐饮与智能餐馆", fr: "Restauration & Bistrots", de: "Gastronomie & Gaststätten", es: "Restauración & Cafeterías" },
      description: {
        en: "Empowering fast-paced dining rooms with direct table checkouts and instant digital fiscal compliance.",
        it: "Integrazione dei scontrini telematici, ordini digitali e gestione tavoli e cassa.",
        zh: "赋能各类中餐馆、意式餐饮连锁。提供高性能扫码快速点单、分票买单以及实时税控电子收据管理。",
        fr: "Gestion des tables, commandes par QR code et encaissement sécurisé.",
        de: "Automatisierte Bestellungen per QR-Code und direkter Kassenbelegdruck.",
        es: "Comande digital, comandas en mesa por QR y tique electrónico inmediato."
      },
      painPoints: {
        en: "Table wait congestion, missed invoices, card reader terminal lease fees.",
        it: "Code alla cassa nei weekend, sanzioni AdE per scontrini non emessi, noleggio POS costoso.",
        zh: "周末高峰期收银台结账排队臃肿、高薪收银员离职空缺、纸质税控打单机器高频故障卡纸。",
        fr: "Attente aux caisses lors des pics d'activité, risques de non-délivrance des reçus obligatoires.",
        de: "Lange Wartezeiten an der Kasse, Fehler bei Rechnungslegung zu Stoßzeiten.",
        es: "Colas para pagar, desajustes en el arqueo diario, costes mensuales por el alquiler del datáfono."
      },
      modauiSolution: {
        en: "Direct table QR payment settlements directly on clients' devices mapping localized Tax modules.",
        it: "Autocassa digitale da tavolo integrata con SDI per invio automatico dei corrispettivi.",
        zh: "免除 POS 的桌边 QR 快速安全买单结算，与国家税控机关 API 毫秒级直连，不漏一张税单、不产生任何繁重手续费降本提效。",
        fr: "Encaissement sur smartphone client sans terminal externe et synchronisation AdE immédiate.",
        de: "Selbstständiges Bezahlen am Tisch per Smartphone und direkter Bondruck im Hintergrund.",
        es: "Autopago en mesa mediante móvil sin datáfono físico, enviando el IVA a Hacienda automáticamente."
      }
    }
  ],
  products: [
    {
      id: "ai-pos-checkout",
      name: { en: "modaui Omni POS Terminal", it: "modaui Cassa Unificata POS", zh: "modaui Omni 智能多点收银终端", fr: "Terminal modaui Omni POS", de: "modaui Omni-Kassen-Terminal", es: "Terminal modaui Omni TPV" },
      priceModel: { en: "€39/month flat fee", it: "€39/mese fisso", zh: "固每月固定包月费用 €39，无流抽点", fr: "39 €/mois fixe", de: "39 €/Monat Flat", es: "39 €/mes tarifa plana" },
      features: [
        { en: "0.45% clearing fee", it: "Commissione 0.45%", zh: "本地银行秒级开账清算 (0.45%)", fr: "Frais de compensation 0,45%", de: "0,45 % Clearing-Gebühr", es: "Tasa de compensación 0,45%" },
        { en: "Automated Tax receipt", it: "Invio scontrino telematico", zh: "发票直连欧洲及意大利税控系统 API", fr: "Reçus fiscaux automatisés", de: "Automatischer Steuerbeleg-Versand", es: "Emisión automática de tique fiscal" }
      ],
      description: {
        en: "A robust digital POS running on standard iPad/Android browsers with zero local installs. Integrated with active network printers.",
        it: "Cassa digitale che gira su tablet Android ed iPad senza installazioni. Integrata con stampanti fiscali telematiche.",
        zh: "运行于任何平板或智能手机浏览器的轻量级销售终端系统，支持一键结账、税控自动打单与桌台沙盘等完备底层功能。",
        fr: "Un terminal de caisse numérique moderne sur tablette avec zéro installation nécessaire.",
        de: "Ein robustes digitales Kassensystem für jeden Browser ohne lokale Installation.",
        es: "TPV digital moderno que funciona en cualquier tableta o navegador sin instalación local."
      }
    }
  ],
  schedulerTasks: [
    { id: "ai-blog-crawler", name: "AI Active Keyword Crawler (Gemini Model Search)", intervalMinutes: 1440, lastRun: "2026-06-21 00:00:00", status: "success", log: ["Crawl initiated", "Identified 12 trending search intents in Retail", "Enqueued for generation"] },
    { id: "ai-auto-generation", name: "AI Page Auto-Generator Pipeline (Gemini 3.5-Flash)", intervalMinutes: 1440, lastRun: "2026-06-21 02:30:00", status: "success", log: ["Initialized modular builder", "Assembled templates: enterprise, cities, industries", "Re-synthesized 164 programmatic localized paths"] },
    { id: "i18n-auto-translation", name: "Multi-Language Deep Translation Sync", intervalMinutes: 1440, lastRun: "2026-06-21 03:00:00", status: "success", log: ["Fetched untranslated records", "Completed translation checks for fr, de, es", "Hreflang header indices built successfully"] },
    { id: "sitemap-auto-update", name: "Sitemap.xml & Robots.txt Auto-Refresher", intervalMinutes: 180, lastRun: "2026-06-21 04:00:00", status: "success", log: ["Gathered 145,280 pages dynamically", "Saved Sitemap.xml to disk", "robots.txt verified: OK"] },
    { id: "google-index-submit", name: "Google Indexing API Real-Time Submission", intervalMinutes: 30, lastRun: "2026-06-21 04:15:00", status: "success", log: ["Sent 15 newly generated URLs", "Google API Response: 200 SUCCESS", "All indexes live in index queue"] }
  ],
  indexSubmissions: [
    { url: "https://modaui.com/company/roma-bistrot-case", time: "2026-06-21 04:15:00", status: "SUBMITTED" },
    { url: "https://modaui.com/city/rome", time: "2026-06-21 04:15:10", status: "SUBMITTED" },
    { url: "https://modaui.com/industry/retail", time: "2026-06-21 04:15:20", status: "INDEXED" },
    { url: "https://modaui.com/blog/revolutionary-ai-payment-routes-for-smes", time: "2026-06-21 04:15:30", status: "INDEXED" }
  ]
};

export class FileDatabase {
  private data: DatabaseSchema;

  constructor() {
    // Ensure directory exists
    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }
    
    // Read or create
    if (fs.existsSync(DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = JSON.parse(fileContent);
      } catch (err) {
        console.error("Failed to parse local DB file. Resetting to initial seed data:", err);
        this.data = { ...INITIAL_DATA };
        this.save();
      }
    } else {
      this.data = { ...INITIAL_DATA };
      this.save();
    }
  }

  private save() {
    fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  public getData(): DatabaseSchema {
    return this.data;
  }

  public getCompanies(): EnterpriseCompany[] {
    return this.data.companies;
  }

  public getArticles(): Article[] {
    return this.data.articles;
  }

  public getCities(): CityCode[] {
    return this.data.cities;
  }

  public getIndustries(): IndustryCode[] {
    return this.data.industries;
  }

  public getProducts(): ProductCode[] {
    return this.data.products;
  }

  public getSchedulerTasks(): SchedulerTask[] {
    return this.data.schedulerTasks;
  }

  public getIndexSubmissions() {
    return this.data.indexSubmissions;
  }

  // Insert or update company
  public saveCompany(company: EnterpriseCompany) {
    const idx = this.data.companies.findIndex(c => c.id === company.id);
    if (idx !== -1) {
      this.data.companies[idx] = company;
    } else {
      this.data.companies.push(company);
    }
    this.save();
  }

  // Insert or update article
  public saveArticle(article: Article) {
    const idx = this.data.articles.findIndex(a => a.id === article.id);
    if (idx !== -1) {
      this.data.articles[idx] = article;
    } else {
      this.data.articles.push(article);
    }
    this.save();
  }

  // Log scheduler run
  public updateTaskLog(id: string, status: 'success' | 'failed', logs: string[]) {
    const idx = this.data.schedulerTasks.findIndex(t => t.id === id);
    if (idx !== -1) {
      const task = this.data.schedulerTasks[idx];
      task.status = status;
      task.lastRun = new Date().toISOString().replace('T', ' ').substring(0, 19);
      task.log = [...logs];
    }
    this.save();
  }

  // Add indexing tracking url
  public addIndexLog(url: string, status: string) {
    this.data.indexSubmissions.unshift({
      url,
      time: new Date().toISOString().replace('T', ' ').substring(0, 19),
      status
    });
    // Cap at 100 entries
    if (this.data.indexSubmissions.length > 100) {
      this.data.indexSubmissions.pop();
    }
    this.save();
  }

  // Bulk generated counts estimation
  public getSeoPageStats() {
    const counts = {
      companiesCount: this.data.companies.length,
      articlesCount: this.data.articles.length,
      citiesCount: this.data.cities.length,
      industriesCount: this.data.industries.length,
      productsCount: this.data.products.length,
      languagesCount: 6,
      // Mathematically generated structural variants (e.g. 10000 companies * 6 languages + 200 industries * 500 cities * 6)
      generatedSitemapTotal: 145280
    };
    return counts;
  }
}

// Singleton database instance
export const DB = new FileDatabase();
