import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, RouterLink, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private _TranslationService: TranslationService) { }

  currentTheme = signal<'nord' | 'black'>('nord');
  dropdownOpen = signal(false);

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') as 'nord' | 'black' | null;
    const themeToUse = savedTheme ?? 'nord';

    document.documentElement.setAttribute('data-theme', themeToUse);
    this.currentTheme.set(themeToUse);
  }


  toggleDropdown() {
    this.dropdownOpen.update(open => !open);
  }

  selectLang(lang: string) {
    this._TranslationService.changeLanguage(lang);
    this.dropdownOpen.set(false);
  }

  changeMode(): void {
    const html = document.documentElement;
    const current = html.getAttribute('data-theme');
    const newTheme = current === 'nord' ? 'black' : 'nord';

    html.setAttribute('data-theme', newTheme);
    this.currentTheme.set(newTheme as 'nord' | 'black');
    localStorage.setItem('theme', newTheme);
  }

}
