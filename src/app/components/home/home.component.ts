import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { MediaSectionComponent } from "../media-section/media-section.component";
import { MoviesService } from '../../core/services/movies.service';
import { TVService } from '../../core/services/tv.service';
import { TrendingService } from '../../core/services/trending.service';
import { TrendingMovie } from '../../core/interfaces/responses/trending-movies-response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, MediaSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private readonly _MoviesService = inject(MoviesService);
  private readonly _TVService = inject(TVService);
  private readonly _TrendingService = inject(TrendingService);
  private readonly _TranslationService = inject(TranslationService);
  private readonly _destroyRef = inject(DestroyRef);

  trendingMovies = signal<TrendingMovie[] | null>(null);

  ngOnInit(): void {
    this.loadTrendingMovies();

    this._TranslationService.languageChanged$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.loadTrendingMovies();
      });
  }

  private loadTrendingMovies(): void {
    this._TrendingService.getTrendingMovies('week').subscribe({
      next: (res) => {
        const firstFive = res.results.slice(0, 4);
        this.trendingMovies.set(firstFive);
      }
    });
  }
}
