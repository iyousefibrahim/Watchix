import { Component, inject, signal } from '@angular/core';
import { TVService } from '../../core/services/tv.service';
import { TranslationService } from '../../core/services/translation.service';
import { Title } from '@angular/platform-browser';
import { DiscoverTv } from '../../core/interfaces/responses/discover-tv-response';
import { MediaSectionComponent } from "../media-section/media-section.component";
import { PaginationComponent } from "../pagination/pagination.component";

@Component({
  selector: 'app-all-tv',
  imports: [MediaSectionComponent, PaginationComponent],
  templateUrl: './all-tv.component.html',
  styleUrl: './all-tv.component.css'
})
export class AllTvComponent {
  private readonly _TVService = inject(TVService);
  private readonly _TranslationService = inject(TranslationService);

  private readonly _Title = inject(Title);
  readonly title = signal<string>('All TV Shows');

  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
  readonly TVShows = signal<DiscoverTv[]>([]);

  ngOnInit(): void {
    this._TranslationService.languageChanged$.subscribe(() => {
      this.fetchTVShows(this.currentPage());
    });
    this._Title.setTitle(this.title());
  }

  ngOnDestroy(): void {
    this._Title.setTitle('Watchix');
  }

  fetchTVShows(page: number): void {
    this._TVService.getDiscoverTV(page).subscribe((res) => {
      this.TVShows.set(res.results);
      this.totalPages.set(res.total_pages);
      this.currentPage.set(res.page);
    });
  }

  changePage(page: number): void {
    if (page !== this.currentPage()) {
      this.fetchTVShows(page);
    }
  }

}
