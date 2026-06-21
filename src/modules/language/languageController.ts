export class LanguageController {
  public static getSupportedLocales(): string[] {
    return ['en', 'it', 'zh', 'fr', 'de', 'es'];
  }

  public static getHreflangTags(relativePath: string): string[] {
    const locales = this.getSupportedLocales();
    return locales.map(locale => {
      return `<link rel="alternate" hreflang="${locale}" href="https://modaui.com/${locale}${relativePath}" />`;
    });
  }
}
