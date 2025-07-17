import { inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private readonly _TranslateService = inject(TranslateService);

  private languageChangedSubject = new BehaviorSubject<string>(
    localStorage.getItem('lang') || 'en'
  );
  languageChanged$ = this.languageChangedSubject.asObservable();

  constructor() {
    const savedLanguage = this.languageChangedSubject.value;

    // Default Language
    this._TranslateService.setDefaultLang('en');

    // Use Lang in localstorage
    this._TranslateService.use(savedLanguage);

    // Change Direction
    this.changeDirection()

  }

  changeDirection(): void {
    let savedLanguage = localStorage.getItem('lang') || "en";
    // Change Direction
    if (savedLanguage === 'en') {
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
    this.languageChangedSubject.next(lang);
  }
}
