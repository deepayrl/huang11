import { DB } from '../../models/db';
import { compileIndustryTemplate } from '../../templates/industry.tpl';

export class IndustryController {
  public static resolveHtmlById(id: string, lang: string): string | null {
    const industries = DB.getIndustries();
    const ind = industries.find(i => i.id === id);
    if (!ind) return null;

    const safeLang = ['en', 'it', 'zh', 'fr', 'de', 'es'].includes(lang) ? (lang as any) : 'en';
    return compileIndustryTemplate(ind, safeLang);
  }
}
