import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private readonly _TranslateService = inject(TranslateService);

  constructor() {
    let savedLanguage = localStorage.getItem('lang') || "en|US";

    // Default Language
    this._TranslateService.setDefaultLang('en|US');

    // Use Lang in localstorage
    this._TranslateService.use(savedLanguage);

    // Change Direction
    this.changeDirection()

  }

  changeDirection(): void {
    let savedLanguage = localStorage.getItem('lang') || "en|US";
    // Change Direction
    if (savedLanguage === 'en|US') {
      // ltr
      document.documentElement.dir = 'ltr';
    } else {
      // ar -> rtl
      document.documentElement.dir = 'rtl';
    }
  }

  changeLanguage(lang: string): void {
    localStorage.setItem('lang', lang);
    this._TranslateService.use(lang);
    this.changeDirection();
  }
}
