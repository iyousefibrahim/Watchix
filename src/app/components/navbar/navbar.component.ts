// navbar.component.ts
import { Component, signal, computed, OnInit, OnDestroy, ElementRef, ViewChild, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { SearchService } from '../../core/services/search.service';
import { RouterLink, Router } from '@angular/router';
import { NgClass, NgFor, NgIf, NgSwitch } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, of, Subject, takeUntil } from 'rxjs';
import { MultiSearchResult } from '../../core/interfaces/responses/search-multi-response';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [TranslateModule, RouterLink, NgClass, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild('desktopSearchInput') desktopSearchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('mobileSearchInput') mobileSearchInput!: ElementRef<HTMLInputElement>;
  @ViewChild('dropdownButton') dropdownButtonRef!: ElementRef;

  private destroy$ = new Subject<void>();
  private searchSubject = new Subject<string>();

  private readonly _TranslationService = inject(TranslationService);
  private readonly _SearchService = inject(SearchService);
  private readonly _Router = inject(Router);


  currentTheme = signal<'nord' | 'black'>('nord');
  dropdownOpen = signal(false);

  // Search related signals
  searchQuery = signal('');
  searchResults = signal<MultiSearchResult[]>([]);
  isSearching = signal(false);
  showSearchResults = signal(false);
  isMobileSearchOpen = signal(false);
  searchFocused = signal(false);

  // Computed properties
  hasSearchResults = computed(() => this.searchResults().length > 0);
  shouldShowSearchDropdown = computed(() =>
    (this.showSearchResults() || this.isSearching()) &&
    this.searchQuery().length > 0
  );

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') as 'nord' | 'black' | null;
    const themeToUse = savedTheme ?? 'nord';

    document.documentElement.setAttribute('data-theme', themeToUse);
    this.currentTheme.set(themeToUse);

    this.setupSearchDebounce();
    document.addEventListener('click', this.handleDocumentClick);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.removeEventListener('click', this.handleDocumentClick);
  }

  private setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (query.length < 2) {
          this.searchResults.set([]);
          this.showSearchResults.set(false);
          this.isSearching.set(false);
          return of(null);
        }

        this.isSearching.set(true);
        return this._SearchService.searchMulti(query);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          const limitedResults = response.results.slice(0, 8);
          this.searchResults.set(limitedResults);
          this.showSearchResults.set(true);
        }
        this.isSearching.set(false);
      },
      error: () => {
        this.isSearching.set(false);
        this.searchResults.set([]);
        this.showSearchResults.set(false);
      }
    });
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    const query = target.value.trim();
    this.searchQuery.set(query);
    this.searchSubject.next(query);

    if (query.length === 0) {
      this.clearSearch();
    }
  }

  onSearchFocus(): void {
    this.searchFocused.set(true);
    if (this.searchQuery().length > 0 && this.hasSearchResults()) {
      this.showSearchResults.set(true);
    }
  }

  onSearchBlur(): void {
    setTimeout(() => {
      this.searchFocused.set(false);
      this.showSearchResults.set(false);
    }, 100);
  }

  selectSearchResult(result: MultiSearchResult): void {
    console.log(result);

    this.clearSearch();
    this.closeMobileSearch();
    if (!result?.media_type || !result?.id) return;

    const route = `/${result.media_type}/${result.id}`;
    this._Router.navigate([route]);
  }


  clearSearch(): void {
    this.searchQuery.set('');
    this.searchResults.set([]);
    this.showSearchResults.set(false);
    this.isSearching.set(false);

    if (this.desktopSearchInput) {
      this.desktopSearchInput.nativeElement.value = '';
    }
    if (this.mobileSearchInput) {
      this.mobileSearchInput.nativeElement.value = '';
    }
  }

  openMobileSearch(): void {
    this.isMobileSearchOpen.set(true);
    setTimeout(() => {
      this.mobileSearchInput?.nativeElement?.focus();
    }, 100);
  }

  closeMobileSearch(): void {
    this.isMobileSearchOpen.set(false);
    this.clearSearch();
  }

  getResultTitle(result: MultiSearchResult): string {
    return result.title || result.name || 'Unknown';
  }

  getResultImage(result: MultiSearchResult): string {
    let imagePath = result.poster_path || result.profile_path;
    return imagePath = `https://image.tmdb.org/t/p/w185${imagePath}`;
  }

  getMediaTypeLabel(mediaType: string): string {
    switch (mediaType) {
      case 'movie':
        return 'MOVIE';
      case 'tv':
        return 'TV_SHOW';
      case 'person':
        return 'PERSON';
      default:
        return 'UNKNOWN';
    }
  }

  toggleDropdown(): void {
    this.dropdownOpen.update(open => !open);
  }

  selectLang(lang: string): void {
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

  handleDocumentClick = (event: MouseEvent) => {
    const dropdownEl = this.dropdownButtonRef?.nativeElement;
    const clickedInside = dropdownEl?.contains(event.target as Node);

    if (!clickedInside && this.dropdownOpen()) {
      this.dropdownOpen.set(false);
    }
  };

}