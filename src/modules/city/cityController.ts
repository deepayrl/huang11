import { DB } from '../../models/db';
import { compileCityTemplate } from '../../templates/city.tpl';

export class CityController {
  public static resolveHtmlById(id: string, lang: string): string | null {
    const cities = DB.getCities();
    const city = cities.find(c => c.id === id);
    if (!city) return null;

    const safeLang = ['en', 'it', 'zh', 'fr', 'de', 'es'].includes(lang) ? (lang as any) : 'en';
    return compileCityTemplate(city, safeLang);
  }
}
