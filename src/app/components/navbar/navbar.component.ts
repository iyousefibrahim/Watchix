import { Component, inject, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { MenubarModule } from 'primeng/menubar';
import { SplitButton } from 'primeng/splitbutton';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, BadgeModule, InputTextModule, SplitButton, CommonModule, TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  items: MenuItem[] = [];
  languages: MenuItem[] = [];

  private readonly _TranslationService = inject(TranslationService);
  private readonly translate = inject(TranslateService);

  ngOnInit(): void {
    this.loadMenu();

    this.translate.onLangChange.subscribe(() => {
      this.loadMenu();
    });
  }

  loadMenu() {
    this.translate.get([
      'NAV.HOME',
      'NAV.LANG.EN',
      'NAV.LANG.AR'
    ]).subscribe(trans => {
      this.items = [
        { label: trans['NAV.HOME'] }
      ];

      this.languages = [
        {
          label: trans['NAV.LANG.EN'],
          command: () => this.changeLang('en')
        },
        {
          label: trans['NAV.LANG.AR'],
          command: () => this.changeLang('ar')
        }
      ];
    });
  }

  changeLang(lang: string) {
    this._TranslationService.changeLanguage(lang);
  }
}
