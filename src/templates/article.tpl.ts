import { Article, LocalizedString } from '../models/db';

export function compileArticleTemplate(article: Article, lang: keyof LocalizedString, categoryPath: string = 'blog'): string {
  const title = article.title[lang] || article.title['en'];
  const summary = article.summary[lang] || article.summary['en'];
  const content = article.content[lang] || article.content['en'];
  const url = `https://modaui.com/${lang}/${categoryPath}/${article.slug}`;

  // Multi-language Alternate hreflang tags for Google index matching
  const hreflangs = ['en', 'it', 'zh', 'fr', 'de', 'es'].map(l => 
    `<link rel="alternate" hreflang="${l}" href="https://modaui.com/${l}/${categoryPath}/${article.slug}" />`
  ).join('\n  ');
  const xDefault = `<link rel="alternate" hreflang="x-default" href="https://modaui.com/en/${categoryPath}/${article.slug}" />`;

  // JSON-LD dynamic construction
  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": summary,
    "url": url,
    "datePublished": article.publishedTime,
    "author": {
      "@type": "Person",
      "name": article.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "modaui",
      "logo": {
        "@type": "ImageObject",
        "url": "https://modaui.com/logo.png"
      }
    },
    "keywords": article.keywords.join(', ')
  };

  // Breadcrumb schema
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
        "name": categoryPath.toUpperCase(),
        "item": `https://modaui.com/${lang}/${categoryPath}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": url
      }
    ]
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>${title} | modaui ${categoryPath.substring(0, 1).toUpperCase() + categoryPath.substring(1)}</title>
  <meta name="description" content="${summary}">
  <link rel="canonical" href="${url}">
  
  ${hreflangs}
  ${xDefault}
  
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${summary}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="modaui AI Commerce OS">
  
  <script type="application/ld+json">
    ${JSON.stringify(blogJsonLd)}
  </script>
  <script type="application/ld+json">
    ${JSON.stringify(breadcrumbJsonLd)}
  </script>
</head>
<body style="font-family: system-ui, sans-serif; background-color: #060913; color: #fff; padding: 40px; line-height: 1.8;">
  <div style="max-width: 750px; margin: 0 auto; background: #0b0f19; border: 1px solid #1e293b; padding: 40px; border-radius: 16px;">
    
    <!-- Dynamic Visual Breadcrumbs -->
    <nav style="font-family: monospace; font-size: 13px; color: #64748b; margin-bottom: 25px; padding: 10px 15px; background: rgba(30, 41, 59, 0.4); border-radius: 8px; border: 1px solid #1e293b; line-height: 1;">
      <a href="/${lang === 'en' ? '' : lang}" style="color: #06b6d4; text-decoration: none; font-weight: bold;">modaui</a>
      <span style="margin: 0 8px;">&gt;</span>
      <a href="/${lang}/${categoryPath}" style="color: #06b6d4; text-decoration: none;">${categoryPath}</a>
      <span style="margin: 0 8px;">&gt;</span>
      <span style="color: #94a3b8;">${title}</span>
    </nav>

    <header style="margin-bottom: 30px; border-bottom: 1px solid #1e293b; padding-bottom: 20px;">
      <div style="font-family: monospace; font-size: 11px; color: #8b5cf6; text-transform: uppercase; margin-bottom: 10px;">
        ${article.category} • ${article.readingTime}
      </div>
      <h1 style="font-size: 32px; line-height: 1.3; margin: 0 0 10px 0; color: #fff;">${title}</h1>
      <div style="color: #64748b; font-size: 13px;">
        Written by <strong>${article.author}</strong> on ${article.publishedTime}
      </div>
    </header>

    <main style="color: #cbd5e1; font-size: 16px;">
      ${content.replace(/\n\n/g, '</p><p>')}
    </main>

    <footer style="margin-top: 50px; border-top: 1px solid #1e293b; padding-top: 25px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #64748b;">
      <div>
        <strong>Keywords:</strong> ${article.keywords.map(k => `#${k}`).join(' ')}
      </div>
      <div>
        © 2026 modaui AI Commerce OS
      </div>
    </footer>
  </div>
</body>
</html>`;
}
