import { Component, inject, signal, OnInit, computed, OnDestroy } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { MediaSectionComponent } from "../media-section/media-section.component";
import { MovieResult } from '../../core/interfaces/responses/search-movies-response';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from "../pagination/pagination.component";
import { TranslationService } from '../../core/services/translation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-all-movies',
  imports: [MediaSectionComponent, TranslateModule, PaginationComponent],
  templateUrl: './all-movies.component.html',
  styleUrl: './all-movies.component.css'
})
export class AllMoviesComponent implements OnInit, OnDestroy {
  private readonly _MoviesService = inject(MoviesService);
  private readonly _TranslationService = inject(TranslationService);
  private readonly _Title = inject(Title);
  readonly title = signal<string>('All Movies');

  readonly currentPage = signal(1);
  readonly totalPages = signal(1);
  readonly movies = signal<MovieResult[]>([]);

  ngOnInit(): void {
    this._TranslationService.languageChanged$.subscribe(() => {
      this.fetchMovies(this.currentPage());
    });
    this._Title.setTitle(this.title());
  }

  ngOnDestroy(): void {
    this._Title.setTitle('Watchix');
  }

  fetchMovies(page: number): void {
    this._MoviesService.getDiscoverMovies(page).subscribe((res) => {
      this.movies.set(res.results);
      this.totalPages.set(res.total_pages);
      this.currentPage.set(res.page);
    });
  }

  changePage(page: number): void {
    if (page !== this.currentPage()) {
      this.fetchMovies(page);
    }
  }

}