import { EnterpriseCompany, LocalizedString } from '../models/db';

export function compileCompanyTemplate(company: EnterpriseCompany, lang: keyof LocalizedString): string {
  const title = company.metaTitle[lang] || company.metaTitle['en'];
  const desc = company.metaDesc[lang] || company.metaDesc['en'];
  const caseTitle = company.caseStudyTitle[lang] || company.caseStudyTitle['en'];
  const caseBody = company.caseStudyBody[lang] || company.caseStudyBody['en'];
  const url = `https://modaui.com/${lang}/company/${company.slug}`;

  const hreflangs = ['en', 'it', 'zh', 'fr', 'de', 'es'].map(l => 
    `<link rel="alternate" hreflang="${l}" href="https://modaui.com/${l}/company/${company.slug}" />`
  ).join('\n  ');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="https://modaui.com/en/company/${company.slug}" />`;

  // JSON-LD dynamic construction
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": title,
    "description": desc,
    "url": url,
    "author": {
      "@type": "Organization",
      "name": "modaui AI Commerce Labs"
    },
    "publisher": {
      "@type": "Organization",
      "name": "modaui",
      "logo": {
        "@type": "ImageObject",
        "url": "https://modaui.com/logo.png"
      }
    },
    "about": {
      "@type": "Organization",
      "name": company.name,
      "estimatedSalary": company.roiStats
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
        "name": "Companies",
        "item": `https://modaui.com/${lang}/company`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": company.name,
        "item": url
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${title} | modaui OS</title>
  <meta name="description" content="${desc}">
  <link rel="canonical" href="${url}">
  
  ${hreflangs}
  ${xDefault}
  
  <!-- OpenGraph Cards -->
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="modaui AI Commerce OS">
  
  <!-- Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  
  <script type="application/ld+json">
    ${JSON.stringify(jsonLd)}
  </script>
  <script type="application/ld+json">
    ${JSON.stringify(breadcrumbJsonLd)}
  </script>
</head>
<body style="font-family: system-ui, sans-serif; background-color: #060913; color: #fff; padding: 40px;">
  <div style="max-width: 800px; margin: 0 auto; border: 1px solid #1e293b; padding: 30px; border-radius: 12px; background: #0b0f19;">
    
    <!-- Dynamic Visual Breadcrumbs -->
    <nav style="font-family: monospace; font-size: 13px; color: #64748b; margin-bottom: 25px; padding: 10px 15px; background: rgba(30, 41, 59, 0.4); border-radius: 8px; border: 1px solid #1e293b; line-height: 1;">
      <a href="/${lang === 'en' ? '' : lang}" style="color: #06b6d4; text-decoration: none; font-weight: bold;">modaui</a>
      <span style="margin: 0 8px;">&gt;</span>
      <span style="color: #64748b;">case-studies</span>
      <span style="margin: 0 8px;">&gt;</span>
      <span style="color: #94a3b8;">${company.name}</span>
    </nav>

    <header style="border-bottom: 1px solid #1e293b; padding-bottom: 20px; margin-bottom: 20px;">
      <span style="color: #06b6d4; font-size: 11px; text-transform: uppercase; font-family: monospace;">Enterprise Onboarding Proof</span>
      <h1 style="font-size: 28px; margin: 8px 0 0 0;">${company.name}</h1>
    </header>
    
    <section style="margin-bottom: 30px;">
      <h2 style="color: #10b981; font-size: 18px;">${caseTitle}</h2>
      <p style="line-height: 1.6; color: #cbd5e1;">${caseBody}</p>
    </section>

    <div style="background: #0d1527; border: 1px solid #1e293b; padding: 20px; border-radius: 8px;">
      <h3 style="margin-top: 0; color: #8b5cf6; font-size: 14px; text-transform: uppercase;">EBITDA Growth Metrics</h3>
      <strong style="font-size: 18px; color: #fff;">${company.roiStats}</strong>
    </div>

    <footer style="margin-top: 40px; border-top: 1px solid #1e293b; padding-top: 20px; text-align: center; color: #64748b; font-size: 12px;">
      <p>© 2026 modaui. All rights reserved. Locally compliant across European jurisdictions.</p>
    </footer>
  </div>
</body>
</html>`;
}
