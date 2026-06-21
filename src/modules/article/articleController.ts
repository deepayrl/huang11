import { DB } from '../../models/db';
import { compileArticleTemplate } from '../../templates/article.tpl';

export class ArticleController {
  public static resolveHtmlBySlug(slug: string, lang: string, categoryPath: string = 'blog'): string | null {
    const articles = DB.getArticles();
    const article = articles.find(a => a.slug === slug);
    if (!article) return null;

    const safeLang = ['en', 'it', 'zh', 'fr', 'de', 'es'].includes(lang) ? (lang as any) : 'en';
    return compileArticleTemplate(article, safeLang, categoryPath);
  }
}
