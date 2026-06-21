import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import adminRouter from './src/modules/admin/adminRouter';
import { ArticleController } from './src/modules/article/articleController';
import { CompanyController } from './src/modules/company/companyController';
import { CityController } from './src/modules/city/cityController';
import { IndustryController } from './src/modules/industry/industryController';
import { SEOManager } from './src/services/seoService';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware to support JSON parsing
  app.use(express.json());

  // Trigger base files setup on boot (Sitemap, robots, RSS)
  try {
    SEOManager.generatePhysicalSitemap();
    SEOManager.generateRobotsTxt();
    SEOManager.generateRssFeed();
    console.log("Initial SEO static feeds generated on boot.");
  } catch (err) {
    console.error("Failed to generate initial SEO static files:", err);
  }

  // 1. Administrative Dynamic SEO Router API
  app.use('/api/seo', adminRouter);

  // 2. Dynamic SEO Template Page Renderer Routes (serving dynamic HTML blocks mapped out of database)
  // Format: /:lang/blog/:slug, /:lang/company/:slug, /:lang/city/:id, /:lang/industry/:id
  
  app.get('/:lang/blog/:slug', (req, res) => {
    const { lang, slug } = req.params;
    const html = ArticleController.resolveHtmlBySlug(slug, lang);
    if (!html) {
      res.status(404).send("Article not found in database.");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  app.get('/:lang/company/:slug', (req, res) => {
    const { lang, slug } = req.params;
    const html = CompanyController.resolveHtmlBySlug(slug, lang);
    if (!html) {
      res.status(404).send("Corporate Case study not found.");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  app.get('/:lang/city/:id', (req, res) => {
    const { lang, id } = req.params;
    const html = CityController.resolveHtmlById(id, lang);
    if (!html) {
      res.status(404).send("City platform parameters not configured.");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  app.get('/:lang/industry/:id', (req, res) => {
    const { lang, id } = req.params;
    const html = IndustryController.resolveHtmlById(id, lang);
    if (!html) {
      res.status(404).send("Industry template parameters not configured.");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  // 2.2. Default English Dynamic Router variants (Omit /en/ prefix for default crawlers)
  app.get('/blog/:slug', (req, res) => {
    const { slug } = req.params;
    const html = ArticleController.resolveHtmlBySlug(slug, 'en');
    if (!html) {
      res.status(404).send("Article not found in database.");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  app.get('/company/:slug', (req, res) => {
    const { slug } = req.params;
    const html = CompanyController.resolveHtmlBySlug(slug, 'en');
    if (!html) {
      res.status(404).send("Corporate Case study not found.");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  app.get('/city/:id', (req, res) => {
    const { id } = req.params;
    const html = CityController.resolveHtmlById(id, 'en');
    if (!html) {
      res.status(404).send("City platform parameters not configured.");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  app.get('/industry/:id', (req, res) => {
    const { id } = req.params;
    const html = IndustryController.resolveHtmlById(id, 'en');
    if (!html) {
      res.status(404).send("Industry template parameters not configured.");
      return;
    }
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });

  // Serve the dynamic/static files like sitemap, robots, feed directly
  app.get('/sitemap.xml', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'sitemap.xml'));
  });

  app.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'robots.txt'));
  });

  app.get('/rss.xml', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'rss.xml'));
  });

  // 3. Vite development server connection or production static build fallback
  if (process.env.NODE_ENV !== "production") {
    console.log("Loading Vite dev middleware for hot reloading...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving pre-compiled standard static production files...");
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`modaui full-stack SEO operating system running on port ${PORT}`);
  });
}

startServer();
export default startServer;
