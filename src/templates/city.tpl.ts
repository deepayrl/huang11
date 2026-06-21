import { CityCode, LocalizedString } from '../models/db';

export function compileCityTemplate(city: CityCode, lang: keyof LocalizedString): string {
  const name = city.name[lang] || city.name['en'];
  const tuning = city.seoTuning[lang] || city.seoTuning['en'];
  const url = `https://modaui.com/${lang}/city/${city.id}`;

  const hreflangs = ['en', 'it', 'zh', 'fr', 'de', 'es'].map(l => 
    `<link rel="alternate" hreflang="${l}" href="https://modaui.com/${l}/city/${city.id}" />`
  ).join('\n  ');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="https://modaui.com/en/city/${city.id}" />`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AdministrativeArea",
    "name": name,
    "containedInPlace": {
      "@type": "Country",
      "name": city.country
    },
    "description": tuning
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
        "name": "Cities",
        "item": `https://modaui.com/${lang}/city`
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
  <title>Smart Commerce Integration in ${name} | modaui OS</title>
  <meta name="description" content="${tuning}">
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
<body style="font-family: system-ui, sans-serif; background-color: #060913; color: #fff; padding: 45px;">
  <div style="max-width: 700px; margin: 0 auto; background: #0b0f19; border: 1px solid #1e293b; padding: 35px; border-radius: 12px;">
    
    <!-- Dynamic Visual Breadcrumbs -->
    <nav style="font-family: monospace; font-size: 13px; color: #64748b; margin-bottom: 25px; padding: 10px 15px; background: rgba(30, 41, 59, 0.4); border-radius: 8px; border: 1px solid #1e293b; line-height: 1;">
      <a href="/${lang === 'en' ? '' : lang}" style="color: #06b6d4; text-decoration: none; font-weight: bold;">modaui</a>
      <span style="margin: 0 8px;">&gt;</span>
      <span style="color: #64748b;">cities</span>
      <span style="margin: 0 8px;">&gt;</span>
      <span style="color: #94a3b8;">${name}</span>
    </nav>

    <h2>Digital Merchant Networking: ${name} (${city.country})</h2>
    <p style="font-size: 15px; color: #94a3b8; line-height: 1.6;">${tuning}</p>
    <div style="margin-top: 25px; border-top: 1px solid #1e293b; padding-top: 15px; font-size: 12px; color: #475569;">
      Powered by modaui regional routing. Secure gateway compliance: active.
    </div>
  </div>
</body>
</html>`;
}
