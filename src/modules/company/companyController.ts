import { DB } from '../../models/db';
import { compileCompanyTemplate } from '../../templates/company.tpl';

export class CompanyController {
  public static resolveHtmlBySlug(slug: string, lang: string): string | null {
    const companies = DB.getCompanies();
    const company = companies.find(c => c.slug === slug);
    if (!company) return null;

    const safeLang = ['en', 'it', 'zh', 'fr', 'de', 'es'].includes(lang) ? (lang as any) : 'en';
    return compileCompanyTemplate(company, safeLang);
  }
}
