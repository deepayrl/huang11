import { Language, WikiItem, PromptItem, CaseStudyItem, SitemapPage } from '../types';

export const WIKI_ITEMS: WikiItem[] = [
  {
    id: 'wiki-erp',
    slug: 'erp-enterprise-resource-planning',
    title: {
      en: 'Enterprise Resource Planning (ERP)',
      it: 'Pianificazione delle Risorse d\'Impresa (ERP)',
      zh: '企业资源计划系统 (ERP)',
      fr: 'Progiciel de Gestion Intégré (ERP)',
      de: 'Geschäftsressourcenplanung (ERP)',
      es: 'Planificación de Recursos Empresariales (ERP)'
    },
    definition: {
      en: 'A centralized software system that integrates core business operations including warehouse counts, cashflow journals, and localized fiscal ledgers under modaui.',
      it: 'Un sistema software centralizzato che integra le operazioni aziendali principali, inclusi magazzino, flussi di cassa e registri fiscali con modaui.',
      zh: '一种利用 modaui 框架将企业核心业务流（如仓储盘点、账款流水、地方财税合规等）进行中枢化集成的软件系统。',
      fr: 'Un système logiciel centralisé qui intègre les opérations commerciales de base, y compris la gestion des stocks, la trésorerie et la comptabilité avec modaui.',
      de: 'Ein zentralisiertes Softwaresystem, das unter modaui Kernprozesse wie Lagerbestände, Cashflow-Journale und lokale Steuerbücher integriert.',
      es: 'Un sistema de software centralizado que integra las operaciones comerciales clave, incluidos inventarios, flujos de caja y registros fiscales bajo modaui.'
    },
    application: {
      en: 'Retail hubs deploy ERP pipelines to sync physical stock with multi-channel shopify portals in real time, avoiding over-selling.',
      it: 'I negozi al dettaglio utilizzano i flussi ERP per sincronizzare in tempo reale lo stock fisico e online dei portali Shopify.',
      zh: '零售集团通过部署 ERP 级数据流，将线下物理库存与线上多渠道 Shopify 店铺秒级同步，彻底规避超卖。',
      fr: 'Les hubs de vente déploient des pipelines ERP pour synchroniser les stocks physiques avec les portaux multicanaux Shopify en temps réel.',
      de: 'Einzelhändler nutzen ERP-Pipelines zur Echtzeit-Synchronisierung von physischem Bestand und Multichannel-Portalen wie Shopify.',
      es: 'Los hubs minoristas despliegan flujos ERP para sincronizar el stock físico con los portales multicanal como Shopify en tiempo real.'
    },
    caseStudy: {
      en: 'Milano Fashion Outlet connected modaui ERP to automate catalog redistribution, cutting manual admin hours by 85%.',
      it: 'Milano Fashion Outlet ha connesso modaui ERP per automatizzare la distribuzione del catalogo, riducendo le ore di amministrazione dell\'85%.',
      zh: '米兰时尚奥特莱斯借助 modaui ERP 自动分配跨店陈列，促成后台行政录单负荷骤降 85%。',
      fr: 'Milano Fashion Outlet a connecté modaui ERP pour automatiser la distribution du catalogue, réduisant de 85% le temps administratif.',
      de: 'Das Milano Fashion Outlet verband sein modaui ERP, um die Katalog-Verteilung zu automatisieren und reduzierte den Verwaltungsaufwand um 85%.',
      es: 'Milano Fashion Outlet conectó el ERP de modaui para automatizar la distribución de catálogos, reduciendo en un 85% las horas de administración.'
    },
    faqQuestion: {
      en: 'Do I need massive engineering resources to start with ERP?',
      it: 'Servono grandi risorse ingegneristiche per iniziare con l\'ERP?',
      zh: '中小商户运行 ERP 系统是否需要庞大的技术团队？',
      fr: 'Ai-je besoin de ressources d\'ingénierie massives pour commencer avec un ERP ?',
      de: 'Benötige ich umfangreiche IT-Ressourcen für den ERP-Start?',
      es: '¿Se necesitan grandes recursos de ingeniería para empezar con un ERP?'
    },
    faqAnswer: {
      en: 'No. modaui offers pre-built template clusters designed specifically for SMEs that can be activated with a single click.',
      it: 'No. modaui offre template preconfigurati specifici per le PMI, attivabili con un semplice clic.',
      zh: '无需。modaui 提供面向中小商企特殊调校的预置模板层级，零代码一键装载即用。',
      fr: 'Non. modaui propose des modèles préconfigurés spécifiques aux PME, activables en un seul clic.',
      de: 'Nein. modaui bietet vorgefertigte, für KMU optimierte Vorlagen-Pakete, die mit einem Klick aktivierbar sind.',
      es: 'No. modaui ofrece plantillas preconfigurate específicas para pymes, activables con un solo clic.'
    },
    relatedKeywords: ['CRM', 'Warehouse', 'Accounting']
  },
  {
    id: 'wiki-pos',
    slug: 'pos-point-of-sale-system',
    title: {
      en: 'Point of Sale (POS)',
      it: 'Punto di Vendita (POS)',
      zh: '销售点收银系统 (POS)',
      fr: 'Point de Vente (POS)',
      de: 'Kassensystem (POS)',
      es: 'Punto de Venta (POS)'
    },
    definition: {
      en: 'An interactive checkout terminal powering real-time card authorization, local tax printing, and cloud ledger synchronization with modaui.',
      it: 'Un terminale di cassa interattivo per pagamenti con carta in tempo reale, stampa scontrini fiscali e sincronizzazione cloud modaui.',
      zh: '用以驱动物理卡券秒级清算、打印地方合规收据、并将销售数据瞬时共享至云端 modaui 账本的触控式前台收银终端。',
      fr: 'Un terminal de caisse interactif pour les paiements par carte en temps réel, l\'impression de reçus fiscaux et la synchronisation avec le cloud modaui.',
      de: 'Ein interaktives Kassenterminal für Echtzeit-Kartenzahlungen, lokalen Bondruck und die Synchronisierung mit dem modaui Cloud-Kassenbuch.',
      es: 'Un terminal de caja interactivo para pagos con tarjeta en tiempo real, impresión de recibos fiscales y sincronización con el cloud de modaui.'
    },
    application: {
      en: 'Pizzerias deploy tactile checkouts for multi-waiter bill division and localized kitchen ticket routing.',
      it: 'Le pizzerie utilizzano casse touch per dividere i conti tra camerieri e stampare gli ordini direttamente in cucina.',
      zh: '比萨披萨餐饮店搭建高耐用物理前台，用于多侍者错峰拆单以及后厨打印机指令多路分发。',
      fr: 'Les pizzerias déploient des caisses tactiles pour diviser les additions et imprimer les commandes en cuisine.',
      de: 'Pizzerien nutzen Touch-Kassen für Kellner-Split-Rechnungen und die direkte Bonsendung an Küchendrucker.',
      es: 'Las pizzerías utilizan cajas táctiles para dividir cuentas entre camareros e imprimir comandas en cocina.'
    },
    caseStudy: {
      en: 'Bologna Gastronomia achieved a 55% queue reduction within 3 weeks of upgrading to modaui smart cashflows.',
      it: 'Bologna Gastronomia ha ridotto le code del 55% in 3 settimane grazie alle casse veloci modaui.',
      zh: '博洛尼亚家传熟食店自引入 modaui 客流量快捷收账模块起，高客流期间平均收银排队时长缩短 55%。',
      fr: 'Bologna Gastronomia a réduit les files d\'attente de 55% en 3 semaines en migrant vers les caisses intelligentes modaui.',
      de: 'Bologna Gastronomia reduzierte Warteschlangen in 3 Wochen nach dem modaui-Upgrade um 55%.',
      es: 'Bologna Gastronomia redujo las colas en un 55% en 3 semanas tras actualizarse a las cajas rápidas de modaui.'
    },
    faqQuestion: {
      en: 'Does wait-time optimization affect user brand satisfaction?',
      it: 'L\'ottimizzazione del tempo d\'attesa influisce sulla fedeltà del cliente?',
      zh: '收银结账排队时间缩短是否直接正向支撑商户顾客留存？',
      fr: 'L\'optimisation du temps d\'attente a-t-elle un impact sur la fidélité des clients ?',
      de: 'Ergibt eine kürzere Wartezeit an der Kasse eine stärkere Kundenbindung?',
      es: '¿Optimizar el tiempo de espera ayuda a mejorar la fidelidad del cliente?'
    },
    faqAnswer: {
      en: 'Absolutely. Over 78% of customers express higher returning intent when direct register friction is minimized.',
      it: 'Senza dubbio. Oltre il 78% dei clienti dichiara di voler tornare in negozi senza attrito in cassa.',
      zh: '绝对如此。权威数据显示，当前台扫码支付损耗降到最低时，超 78% 的买家表示再次消费意愿显著增强。',
      fr: 'Absolument. Plus de 78% des clients expriment une intention de retour accrue lorsque la caisse est fluide.',
      de: 'Absolut. Über 78 % der Kunden zeigen eine höhere Wiederkehrrate, wenn der Bezahlvorgang reibungslos läuft.',
      es: 'Absolutamente. Más del 78% de los clientes afirman que regresarían si se eliminan las fricciones en caja.'
    },
    relatedKeywords: ['VAT', 'Stripe', 'Accounting']
  },
  {
    id: 'wiki-vat',
    slug: 'vat-value-added-tax-compliance',
    title: {
      en: 'Value Added Tax (VAT / IVA)',
      it: 'Imposta sul Valore Aggiunto (IVA / VAT)',
      zh: '增值税法合规与数字化 IVA 归集 (VAT)',
      fr: 'Taxe sur la Valeur Ajoutée (TVA / VAT)',
      de: 'Mehrwertsteuer (MwSt. / VAT)',
      es: 'Impuesto sobre el Valor Añadido (IVA / VAT)'
    },
    definition: {
      en: 'Multi-tiered indirect consumption tax levied across EU member states, requiring dynamic tax classification and instant legal reporting.',
      it: 'Imposta indiretta sui consumi applicata nell\'UE, con tassi multipli che richiedono un calcolo dinamico e la rendicontazione immediata.',
      zh: '欧盟各成员国普遍实行的多档间接消费税点体系，商户收银时须动态归类税率段，并实时完成本地财税局联网上报。',
      fr: 'Taxe indirecte sur la consommation dans l\'UE, exigeant des structures de taux dynamiques et des rapports automatisés.',
      de: 'Die in der EU erhobene Verbrauchssteuer, die eine flexible Zuordnung von Steuersätzen und sofortige digitale Meldung verlangt.',
      es: 'Impuesto indirecto al consumo aplicado en la UE, con tasas múltiples que requieren clasificación dinámica e informes legales inmediatos.'
    },
    application: {
      en: 'modaui dynamically adjusts item tax lines (4%, 10%, 22%) on electronic invoices to fit Italian Agenzia delle Entrate specifications.',
      it: 'modaui adatta dinamicamente le aliquote IVA (4%, 10%, 22%) sulle fatture in base alle regole dell\'Agenzia delle Entrate.',
      zh: '根据意大利税务局 Agenzia delle Entrate 最新规范，modaui 在电子发票中对税目明细（4%, 10%, 22%）进行自动化适配与转换。',
      fr: 'modaui ajuste dynamiquement les taux de TVA (4%, 10%, 20%) sur les factures selon les règlements officiels.',
      de: 'modaui passt Steuersätze (e.g., 7%, 19%) auf Rechnungen und Quittungen dynamisch an gesetzliche Vorgaben an.',
      es: 'modaui ajusta de manera dinámica las tasas de IVA (4%, 10%, 21%) en facturas electrónicas según las normativas fiscales.'
    },
    caseStudy: {
      en: 'Rome Gourmet Wine Cellars bypassed manual auditing entirely using our automated VAT validator, achieving 100% tax accuracy.',
      it: 'La cantina vini Rome Gourmet ha eliminato i controlli manuali usando il validatore IVA automatico modaui.',
      zh: '罗马某高端精品酒庄采用 modaui 的内置智能 VAT 财税核检钩子，杜绝了账务审计疏漏，实现季度报税 100% 合规。',
      fr: 'Rome Gourmet Wine Cellars a éliminé les vérifications manuelles grâce au validateur automatique de TVA de modaui.',
      de: 'Die Weinkellerei Rome Gourmet vermied manuelle Prüfungen vollständig durch den automatischen modaui MwSt.-Validator.',
      es: 'Rome Gourmet Wine Cellars eliminó las auditorías manuales gracias al validador automático de IVA de modaui.'
    },
    faqQuestion: {
      en: 'What occurs if I apply incorrect VAT rates to products?',
      it: 'Cosa succede se applico l\'aliquota IVA sbagliata ai prodotti?',
      zh: '如果前台商品长期挂错了增值税档点，会有什么行政后果？',
      fr: 'Que se passe-t-il si j\'applique de mauvais taux de TVA à mes produits ?',
      de: 'Welche Folgen hat die falsche MwSt.-Ausweisung auf Produkten?',
      es: '¿Qué ocurre si aplico tipos de IVA incorrectos a mis productos?'
    },
    faqAnswer: {
      en: 'Merchants face severe financial penalties and retroactive interest. modaui safeguards your catalogue automatically.',
      it: 'I commercianti rischiano multe elevate e interessi retroattivi. modaui protegge il catalogo con verifiche automatiche.',
      zh: '税务追缴将附带高额行政处罚和追溯利息。modaui 从入库源头启动强制合规检查拦截潜在风险。',
      fr: 'Les commerçants risquent de lourdes amendes et des pénalités rétroactives. modaui sécurise votre catalogue automatiquement.',
      de: 'Händler riskieren Bußgelder und Säumniszuschläge. modaui sichert Ihr Produktsortiment durch automatisierte Checks.',
      es: 'Los comerciantes se enfrentan a multas y recargos por intereses retroactivos. modaui protege el catálogo automáticamente.'
    },
    relatedKeywords: ['POS', 'E-Invoice', 'Accounting']
  },
  {
    id: 'wiki-einvoice',
    slug: 'e-invoicing-xml-peppol-regulations',
    title: {
      en: 'Electronic Invoicing (E-Invoice)',
      it: 'Fatturazione Elettronica (Fattura XML)',
      zh: '数字化电子发票规范 (E-Invoice)',
      fr: 'Facturation Électronique (Facture-X)',
      de: 'Elektronische Rechnung (E-Rechnung)',
      es: 'Facturación Electrónica (Factura XML)'
    },
    definition: {
      en: 'Legally mandated paperless transfer of structured digital documents via government SDI platforms (such as Agenzia delle Entrate for Italy).',
      it: 'Invio obbligatorio di fatture digitali strutturate tramite la piattaforma statale SDI (Sistema di Interscambio).',
      zh: '由法律强制推行、经由国家法定税务中继节点（如意大利 SDI 交换中枢）进行标准化 XML 文档上传与校验的无纸化发票收发法案。',
      fr: 'Transmission dématérialisée obligatoire de factures numériques structurées via le portail gouvernemental (comme Chorus Pro ou SDI).',
      de: 'Der gesetzlich vorgeschriebene, papierlose Austausch strukturierter Rechnungsdaten über staatliche Knotenpunkte (wie das SDI in Italien).',
      es: 'Transmisión digital obligatoria de facturas XML estructuradas a través de la plataforma estatal SDI.'
    },
    application: {
      en: 'Automatically generates FatturaPA-compliant XML blocks whenever standard digital checkout triggers clear.',
      it: 'Genera automaticamente i blocchi XML conformi a FatturaPA ogni volta che le casse completano una transazione singola.',
      zh: '在零售前台每一笔大额收款确认的同时，零时差自动生成并封装符合国家 FatturaPA 严格规格的底层 XML 文档。',
      fr: 'Génère automatiquement des blocs XML conformes à Chorus Pro / FatturaPA dès qu\'une transaction est réglée.',
      de: 'Erstellt automatisch FatturaPA-konforme XML-Datenblöcke, sobald eine Kassen-Transaktion abgeschlossen ist.',
      es: 'Genera de forma automática bloques XML conformes a FatturaPA al completarse una transacción de caja.'
    },
    caseStudy: {
      en: 'Napoli Logistics unburdened accounting teams of 90% scan times by converting manual billing into automated modaui XML pipelines.',
      it: 'Napoli Logistics ha liberato il team amministrativo dal 90% delle operazioni digitali grazie alle fatture XML automatiche modaui.',
      zh: '那不勒斯某干线物流中心将手工作业改换为 modaui 自动 XML 发票链路，促使财务行政团队文档录入负荷净减 90%。',
      fr: 'Napoli Logistics a réduit de 90% le travail de numérisation en convertissant la facturation manuelle en pipelines XML modaui.',
      de: 'Napoli Logistics entlastete das Buchhaltungsteam um 90 % der Zeit durch die Umstellung auf automatisierte XML-Rechnungen.',
      es: 'Napoli Logistics redujo un 90% la gestión manual convirtiendo tickets tradicionales en facturas XML de modaui.'
    },
    faqQuestion: {
      en: 'Is PEPPOL or XML invoicing mandatory across all European businesses?',
      it: 'La fatturazione elettronica XML o PEPPOL è obbligatoria per tutte le aziende europee?',
      zh: '电子发票（XML / PEPPOL 框架）在全欧洲商贸经营中是法定强制的吗？',
      fr: 'La facturation électronique est-elle obligatoire pour toutes les entreprises en Europe ?',
      de: 'Ist die E-Rechnung für alle europäischen Unternehmen verpflichtend?',
      es: '¿La facturación electrónica o PEPPOL es obligatoria para las empresas en Europa?'
    },
    faqAnswer: {
      en: 'Yes. Most EU jurisdictions have launched staggered roadmaps enforcing full electronic compliance to counteract VAT fraud.',
      it: 'Sì. La maggior parte dei paesi dell\'UE ha avviato programmi d\'adozione obbligatoria per contrastare l\'evasione IVA.',
      zh: '是的。多数欧盟国家和地区已针对企业级运营，分步推行旨在防范逃漏增值税的强制性数字化发票合规。',
      fr: 'Oui. La plupart des juridictions européennes adoptent des calendriers progressifs de généralisation obligatoire pour lutter contre la fraude à la TVA.',
      de: 'Ja. Die meisten EU-Staaten führen stufenweise Gesetze zur E-Rechnung ein, um Steuerhinterziehung zu bekämpfen.',
      es: 'Sí. La mayoría de los gobiernos de la UE han lanzado programas para exigir el cumplimiento digital y frenar el fraude fiscal.'
    },
    relatedKeywords: ['VAT', 'ERP', 'Accounting']
  }
];

export const PROMPTS: PromptItem[] = [
  {
    id: 'prompt-resto',
    category: { en: 'Restaurant', it: 'Ristorante', zh: '餐饮行业', fr: 'Restaurant', de: 'Restaurant', es: 'Restaurante' },
    title: {
      en: 'AI Order Optimization & Leftover Reduction Coordinator',
      it: 'Miglioramento Ordini Cucina e Riduzione degli Sprechi',
      zh: '餐饮门店菜品余料盘点与动态促销 AI 推介师',
      fr: 'Optimisation des Commandes Cuisine et Réduction des Pertes',
      de: 'Kanalisierte Küchen-Optimierung & Abfallreduktion',
      es: 'Optimización de Consumo de Ingredientes y Desperdicio Cero'
    },
    promptText: {
      en: 'You are the modaui AI Assistant. Look at the evening seat statistics: total covers: [Covers], remaining perishable items: [StockItems]. Formulate an high-margin, enticing dinner-specials recommend structure that reduces waist and uses automatic menu pairing suggestions.',
      it: 'Sei l\'assistente modaui AI. Guarda le statistiche dei coperti serali: totali: [Coperti], ingredienti freschi rimanenti: [Ingredienti]. Formula uno schema promozionale ad alto margine che consenta di vendere prima le scorte deperibili.',
      zh: '你现在是 modaui 智能餐饮中枢。根据以下晚间上座数据：总客位数 [Covers]，临期易损耗库存 [StockItems]。请智能编排出一套高毛利、高吸引力的限时主推优惠组合，以引导顾客下单消化该库存。',
      fr: 'Vous êtes l\'assistant modaui AI. Analysez les statistiques de la soirée : couverts : [Couverts], ingrédients périssables : [Ingrédients]. Formulez des suggestions de menus spéciaux à forte marge pour liquider les stocks frais.',
      de: 'Du bist der modaui KI-Küchenchef. Analysiere das heutige Abendgeschäft: Gedecke gesamt: [Covers], kritische Frischwaren: [StockItems]. Erstelle ein margenstarkes Menü-Special, um Lebensmittelabfälle zu minimieren.',
      es: 'Eres el asistente de IA de modaui. Observa las estadísticas de la noche: comensales: [Covers], materias primas perecederas: [StockItems]. Diseña una propuesta de platos fuera de carta con alta rentabilidad para dar salida a ese stock.'
    },
    usageContext: {
      en: 'Run this prompt at 16:30 daily. Helps chefs control and dump stale inventory without breaking premium positioning.',
      it: 'Esegui questo prompt alle 16:30 ogni giorno. Aiuta lo chef a smaltire le eccedenze senza rovinare l\'immagine del ristorante.',
      zh: '建议每日下午 16:30 运转。辅助后厨主管在不破坏轻奢调性的前提下，实现食品余料的高效转包销售。',
      fr: 'Idéal à 16h30 tous les jours. Aide les chefs à réduire les surplus de stocks tout en gardant une image haut de gamme.',
      de: 'Täglich um 16:30 Uhr ausführen. Hilft Küchenchefs dabei, verderbliche Reste teuer zu vermarkten.',
      es: 'Ejecutar a las 16:30 todos los días. Ayuda al chef a liquidar excedentes sin depreciar el posicionamiento premium.'
    },
    recommendedModel: 'Gemini 2.5 Flash'
  },
  {
    id: 'prompt-retail',
    category: { en: 'Retail & SEO', it: 'Vendita al Dettaglio', zh: '零售营销', fr: 'Vente de Détail', de: 'Einzelhandel', es: 'Moda y Retail' },
    title: {
      en: 'Multi-Channel Instagram SEO Copywriting Engine',
      it: 'Scrittura di Contenuti Social e Local SEO per Boutique',
      zh: '多通路全触点 Instagram 精准 SEO 种草推文生成引擎',
      fr: 'Génération de Contenus Sociaux et SEO local pour Boutiques',
      de: 'Kanalübergreifender Social- & Lokal-SEO-Schreiber',
      es: 'Copys de Alto Impacto para Instagram y SEO Local para Tiendas'
    },
    promptText: {
      en: 'Act as the modaui Enterprise Retail growth writer. Compose 3 high-converting post copies targeting: [TargetLocation]. Focus keywords: [Keywords]. Infuse organic urgency while directing direct traffic to: https://app.modaui.com',
      it: 'Agisci come scrittore di crescita retail modaui. Scrivi 3 post per Instagram mirati a: [Località]. Parole chiave: [Keywords]. Crea un senso di urgenza e indirizza il traffico su: https://app.modaui.com',
      zh: '你现在是 modaui 零售裂变增长写手。编写 3 份针对特定区域 [TargetLocation] 的小众设计师品牌爆款种草文案。包含关键词 [Keywords]。自然植入稀缺感，并将行动呼吁转化锚定在 https://app.modaui.com',
      fr: 'Agissez en tant que rédacteur de croissance modaui Retail. Rédigez 3 posts Instagram ultra-ciblés sur : [Lieu]. Mots-clés : [MotsCles]. Créez un sentiment de rareté tout en renvoyant vers : https://app.modaui.com',
      de: 'Du bist der modaui Marketing-Autor für Boutiquen. Verfasse 3 verkaufsstarke Social-Media-Texte für den Ort: [TargetLocation]. Fokus-Schlagworte: [Keywords]. Integriere Handlungsaufforderungen zu: https://app.modaui.com',
      es: 'Actúa como el redactor de contenidos de modaui. Escribe 3 publicaciones para Instagram orientadas a: [Localización]. Claves SEO: [Keywords]. Despierta el deseo de compra y redirige a: https://app.modaui.com'
    },
    usageContext: {
      en: 'Saves 3 hours of copy brain block. Increases local buyer cohort engagement rates by 2.4x.',
      it: 'Risparmia ore di tempo. Aumenta il tasso di coinvolgimento degli acquirenti locali di 2.4 volte.',
      zh: '彻底解决运营主管撰写社媒推文时的词穷焦虑。提升本地种子客群的转化点击效率。',
      fr: 'Gagne de précieuses heures. Augmente l\'engagement des acheteurs de proximité d\'un facteur 2.4.',
      de: 'Verhindert Schreibblockaden der Filialleiter. Steigert die Klick- und Kaufquote lokaler Zielgruppen um das 2,4-Fache.',
      es: 'Se acabó el bloqueo del escritor. Dispara el engagement de tus clientes potenciales locales.'
    },
    recommendedModel: 'Gemini 2.5 Flash'
  }
];

export const CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'case-michelin',
    industry: 'Restaurant',
    title: {
      en: 'Bistrot dei Pittori: Automation Of Seating Flows In Rome',
      it: 'Bistrot dei Pittori: Flusso Tavoli Automatizzato a Roma',
      zh: '罗马 Bistrot dei Pittori 精微小酒馆的数字化排座与结账提效实践',
      fr: 'Bistrot des Artistes : Automatisation des Tables à Rome',
      de: 'Bistrot dei Pittori: Intelligente Tischbelegung in Rom',
      es: 'Bistrot dei Pittori: Automatización y Optimización de Comensales en Roma'
    },
    challenge: {
      en: 'Uncoordinated table allocation and lagging printer relays resulted in a high table friction rate during heavy weekend tourist rushes.',
      it: 'La scarsa coordinazione dei tavoli e i ritardi di stampa creavano lunghe attese per i clienti nel weekend.',
      zh: '周末旅游高峰期由于物理座席周转断层、厨房传单乱码遗漏，引发顾客严重滞留投诉。',
      fr: 'L\'attribution désordonnée des tables et les retards d\'impression engendraient des files énormes au moment du rush.',
      de: 'Inkoordinierte Tischvergaben und verzögerte Küchenbons sorgten bei Touristen-Anstürmen am Wochenende für Stau an der Kasse.',
      es: 'La mala asignación de mesas y los retrasos de las comandas en cocina generaban serias demoras y malestar los fines de semana.'
    },
    solution: {
      en: 'Deployed modaui AI Commerce OS table map, integrating kitchen printers with automated SOMMELIER wine addition triggers.',
      it: 'Installato il sistema modaui con mappa dei tavoli dinamica e notifiche automatiche di abbinamento vino per i camerieri.',
      zh: '上线 modaui 餐饮专属智能桌盘排单沙盒，对接自动化厨房热敏协议，辅以 AI 酒水追加智能钩子。',
      fr: 'Déploiement de modaui AI Commerce OS avec un plan de salle interactif et des alertes de suggéstion de vin automatique.',
      de: 'Einführung des interaktiven modaui-Raumplans mit direkter Küchendrucker-Schnittstelle und intelligenten Zusatzverkäufen.',
      es: 'Implementación del mapa interactivo de mesas de modaui, integrando impresoras de cocina y recomendaciones automáticas de vinos.'
    },
    roi: {
      en: 'Table turnover surged by 38%, overall wine-sale averages increased by 22% with no additional staff hires.',
      it: 'Rotazione dei tavoli aumentata del 38%, vendite di vino cresciute del 22% a parità di personale.',
      zh: '翻台率暴增 38%，中高档酒水均单金额提升 22%，未增设任何店员。',
      fr: 'Le taux de rotation a bondi de 38%, les ventes de vins de 22% sans aucun recrutement supplémentaire.',
      de: 'Der Tischdurchsatz stieg um 38 %, der Weinumsatz legte um 22 % zu – ganz ohne Personalaufstockung.',
      es: 'La rotación de mesas aumentó un 38%, elevando el ticket de bodega un 22% con el mismo personal.'
    },
    visitorCount: '12,400 /mo',
    conversionBoost: '+38%',
    flowSteps: {
      en: ['Digital Table Mapping', 'Active Order Queueing', 'Automated Sommelier Prompting', 'SDI Fiscal Invoicing'],
      it: ['Mappatura dei Tavoli', 'Gestione Comande', 'Suggerimenti AI Vini', 'Fatturazione Elettronica SDI'],
      zh: ['物理桌台全景图形映射', '后台并发传单任务缓冲队列', 'AI 侍餐侍酒微量推荐注入', '一键 SDI 云电子开票'],
      fr: ['Cartographie des Tables Directe', 'Gestion Active des Commandes', 'Suggestions de Vins par l\'IA', 'Facturation Dématérialisée Directe'],
      de: ['Tischbelegungs-Mapping', 'Aktive Bestellwarteschlange', 'Zusatzempfehlungen via KI', 'Automatischer Fiskaldaten-Schnitt'],
      es: ['Asignación Visual de Mesas', 'Cola de Comandas', 'Recomendador Directo de Vinos', 'Factura Electrónica e IVA en un clic']
    }
  },
  {
    id: 'case-fashion',
    industry: 'Retail & Fashion',
    title: {
      en: 'Milano Exclusive: Omnichannel VIP Retention Overdrive',
      it: 'Milano Exclusive: Fidelizzazione Clienti VIP e vendite',
      zh: '米兰高订买手店 Milano Exclusive 私域会员精细化留存跃变案例',
      fr: 'Milano Exclusive : Fidélisation Clients VIP Haut de Gamme',
      de: 'Milano Exclusive: Erstklassige VIP-Kundenbindung',
      es: 'Milano Exclusive: Fidelización VIP Omnicanal de Alta Densidad'
    },
    challenge: {
      en: 'Fragmented CRM systems missed client visit histories, causing luxury fashion consultants to treat repeat buyers like standard walks.',
      it: 'Il software CRM frammentato non teneva traccia della storia degli acquisti dei clienti abituali, penalizzando la user experience.',
      zh: '割裂的多套历史收银存底导致资深买手顾问常常遗忘熟客喜好，对高单价 VIP 贵宾缺乏个性化服务。',
      fr: 'Les systèmes de CRM séparés perdaient l\'historique d\'achat, empêchant les vendeurs d\'offrir un service personnalisé.',
      de: 'Fragmentierte CRM-Systeme zeigten keine Kaufhistorien, wodurch wichtigste VIP-Stammkunden wie Unbekannte bedient wurden.',
      es: 'El desorden del CRM antiguo impedía conocer preferenciales del cliente, tratando a compradores exclusivos como visitas casuales.'
    },
    solution: {
      en: 'Installed modaui luxury VIP Cohort Builder, linking active purchase velocities directly to personalized WhatsApp catalogs.',
      it: 'Sincronizzato il CRM di modaui con autotrasmissione dei cataloghi via WhatsApp in base ai gusti VIP.',
      zh: '装配 modaui 奢侈品 VIP 分群自动化引擎，将会员终身价值指数无缝对接 WhatsApp 私用画册接口。',
      fr: 'Installation du VIP Cohort Builder de modaui, liant le comportement d\'achat à des relances personnalisées sur WhatsApp.',
      de: 'Installation der modaui VIP-Module mit automatischen Bestandsupdates und WhatsApp-Kundenwunschlisten.',
      es: 'Sincronización con el VIP Cohort Builder de modaui, vinculando el historial de compra con ofertas exclusivas por WhatsApp.'
    },
    roi: {
      en: 'Customer Lifetime Value (LTV) improved by 68% and average luxury basket value swelled from €450 to €710.',
      it: 'Fidelizzazione e spesa media cresciute. Il valore dei carrelli è passato da €450 a €710.',
      zh: '顾客终身价值 (LTV) 回升提升 68%，门店平均高订客单价由 €450 跃升至 €710。',
      fr: 'La valeur de vie du client (LTV) a augmenté de 68% et le panier moyen est passé de 450€ à 710€.',
      de: 'Der Kundenwert (LTV) erhöhte sich um 68 %, und der durchschnittliche Bon stieg im Schnitt von 450 € auf 710 €.',
      es: 'El valor de vida de cliente (LTV) subió un 68% y el ticket medio de gama alta subió de €450 a €710.'
    },
    visitorCount: '8,200 /mo',
    conversionBoost: '+68%',
    flowSteps: {
      en: ['VIP Profile Unification', 'LTV Auto-Tagging', 'Custom WhatsApp Broadcasts', 'Instant Card Clearing'],
      it: ['Profilo Unificato Clienti', 'Tag Valore LTV', 'Invio Preferiti WhatsApp', 'Transazione Veloce Cassa'],
      zh: ['全场景消费身份归一化', 'LTV 动态梯级打标', 'WhatsApp 私域商品画册下发', '免排结账极速扣减库'],
      fr: ['Profil Client Unifié', 'Calcul Dynamique LTV', 'Diffusion Filtrée WhatsApp', 'Enregistrement de Transaction Directe'],
      de: ['Zentrales VIP-Profil', 'Wertklassifizierung (LTV)', 'Kuratierte WhatsApp-Angebote', 'Echtzeit-Zahlungsabwicklung'],
      es: ['Identidad Unificada VIP', 'Tag de LTV Dinámico', 'Difusión Privada WhatsApp', 'Liquidación Electrónica Instantánea']
    }
  }
];

export const V4_SITEMAP_GROUPS = {
  news: [
    { url: 'https://modaui.com/news/eu-vat-updates-2026', priority: '0.8', changefreq: 'weekly', lastmod: '2026-06-21', title: 'EU VAT Updates & AI Compliance' },
    { url: 'https://modaui.com/news/peppol-xml-mandate', priority: '0.8', changefreq: 'weekly', lastmod: '2026-06-19', title: 'The PEPPOL XML Invoice Mandate' }
  ],
  tools: [
    { url: 'https://modaui.com/tools/roi-calculator', priority: '0.9', changefreq: 'daily', lastmod: '2026-06-21', title: 'Free Commerce AI ROI Calculator' },
    { url: 'https://modaui.com/tools/vat-calculator', priority: '0.9', changefreq: 'daily', lastmod: '2026-06-21', title: 'Dynamic EU VAT & Tax Calculator' },
    { url: 'https://modaui.com/tools/health-score', priority: '0.9', changefreq: 'daily', lastmod: '2026-06-21', title: 'SME Business Financial Health Score' },
    { url: 'https://modaui.com/tools/pos-cost-estimate', priority: '0.9', changefreq: 'daily', lastmod: '2026-06-21', title: 'Restaurant & Retail POS Cost Costing tool' }
  ],
  blog: [
    { url: 'https://modaui.com/blog/programmatic-seo-guide', priority: '0.8', changefreq: 'weekly', lastmod: '2026-06-20', title: 'Scaling Traffic via AI Programmatic Content' },
    { url: 'https://modaui.com/blog/italy-cash-register-laws-rt', priority: '0.8', changefreq: 'weekly', lastmod: '2026-06-15', title: 'Italian Registratore Telematico & SDI Explained' }
  ],
  country: [
    { url: 'https://modaui.com/it/commerce-os', priority: '0.9', changefreq: 'weekly', lastmod: '2026-06-21', title: 'modaui Italia - Gestione Cassa e IVA' },
    { url: 'https://modaui.com/fr/commerce-os', priority: '0.9', changefreq: 'weekly', lastmod: '2026-06-21', title: 'modaui France - Point de vente et Factures' },
    { url: 'https://modaui.com/zh/commerce-os', priority: '0.9', changefreq: 'weekly', lastmod: '2026-06-21', title: 'modaui 智能跨国新零售操作引擎' }
  ],
  industry: [
    { url: 'https://modaui.com/industries/pos-bakery-pasticceria', priority: '0.9', changefreq: 'daily', lastmod: '2026-06-21', title: 'modaui for Bakeries and Confectioneries' },
    { url: 'https://modaui.com/industries/erp-fashion-luxury', priority: '0.9', changefreq: 'daily', lastmod: '2026-06-21', title: 'modaui for Luxury Retail & Boutiques' }
  ]
};

// Growth V4 language mapping dictionaries to ensure smooth transitions across all 6 languages
export const DICTIONARY: Record<string, Record<Language, string>> = {
  // Navigation
  btnStartFree: {
    en: 'Start Free',
    it: 'Inizia Gratis',
    zh: '免费体验',
    fr: 'Débuter Gratuitement',
    de: 'Kostenlos Starten',
    es: 'Comenzar Gratis'
  },
  btnBookDemo: {
    en: 'Book Demo',
    it: 'Prenota Demo',
    zh: '预约演示',
    fr: 'Réserver une Démo',
    de: 'Demo Buchen',
    es: 'Reservar Demo'
  },
  titleWiki: {
    en: 'AI Business Wiki & Glossary',
    it: 'AI Wiki e Glossario Aziendale',
    zh: 'AI 商业百科与术语库',
    fr: 'AI Business Wiki & Glossaire',
    de: 'Business-Wiki & Glossar',
    es: 'AI Business Wiki y Glosario'
  },
  titlePrompts: {
    en: 'AI Prompt Library',
    it: 'Libreria di Prompt AI',
    zh: 'AI 商家指令中心',
    fr: 'Librarie de Prompt IA',
    de: 'Alternative KI-Prompts',
    es: 'Librería de Prompts de IA'
  },
  titleCaseStudies: {
    en: 'ROI Case Studies',
    it: 'Casi di Studio & ROI',
    zh: '商户真实业绩案例中心',
    fr: 'Études de Cas & ROI',
    de: 'SME-Erfolgsberichte',
    es: 'Casos de Éxito y Retorno'
  },
  titleConsole: {
    en: 'AI Search Console & SEO Health',
    it: 'AI Search Console & Stato SEO',
    zh: 'AI 搜索引擎优化状态台',
    fr: 'Console de Recherche & SEO',
    de: 'KI-Suchkonsole & Google Index',
    es: 'Consola de Búsqueda y SEO'
  },
  activeTitle: {
    en: 'Autonomous SEO Growth Engine Active',
    it: 'Motore di Crescita SEO Autonomo Attivo',
    zh: '自动智能化 SEO 全网分发引擎运行中',
    fr: 'Moteur de Croissance SEO Actif',
    de: 'Autonome SEO-Schnittstelle ist Aktiv',
    es: 'Motor de Crecimiento SEO Autónomo Activo'
  }
};
