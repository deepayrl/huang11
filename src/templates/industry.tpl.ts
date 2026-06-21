import { IndustryCode, LocalizedString } from '../models/db';

export function compileIndustryTemplate(ind: IndustryCode, lang: keyof LocalizedString): string {
  const name = ind.name[lang] || ind.name['en'];
  const desc = ind.description[lang] || ind.description['en'];
  const pain = ind.painPoints[lang] || ind.painPoints['en'];
  const sol = ind.modauiSolution[lang] || ind.modauiSolution['en'];
  const url = `https://modaui.com/${lang}/industry/${ind.id}`;

  const hreflangs = ['en', 'it', 'zh', 'fr', 'de', 'es'].map(l => 
    `<link rel="alternate" hreflang="${l}" href="https://modaui.com/${l}/industry/${ind.id}" />`
  ).join('\n  ');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="https://modaui.com/en/industry/${ind.id}" />`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": desc,
    "provider": {
      "@type": "Organization",
      "name": "modaui",
      "url": "https://modaui.com"
    }
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `https://modaui.com/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Industries",
        "item": `https://modaui.com/${lang}/industry`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": name,
        "item": url
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>Unified ${name} SaaS Software & POS Systems | modaui OS</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${url}">
  
  ${hreflangs}
  ${xDefault}
  
  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
  <script type="application/ld+json">
    ${JSON.stringify(breadcrumbJsonLd)}
  </script>
</head>
<body style="font-family: system-ui, sans-serif; background-color: #060913; color: #fff; padding: 40px;">
  <div style="max-width: 750px; margin: 0 auto; background: #0b0f19; border: 1px solid #1e293b; padding: 40px; border-radius: 16px;">
    
    <!-- Dynamic Visual Breadcrumbs -->
    <nav style="font-family: monospace; font-size: 13px; color: #64748b; margin-bottom: 25px; padding: 10px 15px; background: rgba(30, 41, 59, 0.4); border-radius: 8px; border: 1px solid #1e293b; line-height: 1;">
      <a href="/${lang === 'en' ? '' : lang}" style="color: #06b6d4; text-decoration: none; font-weight: bold;">modaui</a>
      <span style="margin: 0 8px;">&gt;</span>
      <span style="color: #64748b;">industries</span>
      <span style="margin: 0 8px;">&gt;</span>
      <span style="color: #94a3b8;">${name}</span>
    </nav>

    <h1 style="color: #06b6d4; font-size: 26px; margin-bottom: 20px;">Vertical Stack: ${name}</h1>
    <p style="font-size: 16px; color: #cbd5e1; line-height: 1.7;">${desc}</p>
    
    <div style="margin-top: 30px; border: 1px solid #dc2626; background: rgba(220, 38, 38, 0.05); padding: 20px; border-radius: 10px;">
      <h3 style="color: #f87171; margin-top: 0; font-size: 14px; text-transform: uppercase;">Industry-specific Bottlenecks</h3>
      <p style="margin-bottom: 0; font-size: 14px; color: #fca5a5;">${pain}</p>
    </div>

    <div style="margin-top: 20px; border: 1px solid #10b981; background: rgba(16, 185, 129, 0.05); padding: 20px; border-radius: 10px;">
      <h3 style="color: #34d399; margin-top: 0; font-size: 14px; text-transform: uppercase;">The modaui Unified Solution</h3>
      <p style="margin-bottom: 0; font-size: 14px; color: #a7f3d0;">${sol}</p>
    </div>

    <footer style="margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px; text-align: center; color: #475569; font-size: 12px;">
      © 2026 modaui Technologies. GDPR and local fiscal rules audited.
    </footer>
  </div>
</body>
</html>`;
}
