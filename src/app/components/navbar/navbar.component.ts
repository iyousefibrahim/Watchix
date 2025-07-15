import { Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  dropdownOpen = false;

  constructor(private _TranslationService: TranslationService) { }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectLang(lang: string) {
    this._TranslationService.changeLanguage(lang);
    this.dropdownOpen = false
  }

  changeMode(): void {
    const html = document.querySelector('html');
    if (!html) return;

    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'nord' ? 'black' : 'nord';
    html.setAttribute('data-theme', newTheme);
  }
}
