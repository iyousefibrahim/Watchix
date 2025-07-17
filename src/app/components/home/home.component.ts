import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { MediaSectionComponent } from "../media-section/media-section.component";
import { MoviesService } from '../../core/services/movies.service';
import { TVService } from '../../core/services/tv.service';
import { TrendingService } from '../../core/services/trending.service';
import { TrendingMovie } from '../../core/interfaces/responses/trending-movies-response';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TranslationService } from '../../core/services/translation.service';
import { MovieListItem } from '../../core/interfaces/responses/movie-list-response';

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
  nowPlayingMovies = signal<MovieListItem[] | null>(null);
  topRatedMovies = signal<MovieListItem[] | null>(null);
  upComingMovies = signal<MovieListItem[] | null>(null);



  ngOnInit(): void {
    this.loadTrendingMovies();
    this.loadRecommendedMovies();
    this.loadTopRatedMovies();
    this.loadUpComingMovies();

    this._TranslationService.languageChanged$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.loadTrendingMovies();
        this.loadRecommendedMovies();
        this.loadTopRatedMovies();
        this.loadUpComingMovies();
      });
  }

  private loadTrendingMovies(): void {
    this._TrendingService.getTrendingMovies('week').subscribe({
      next: (res) => {
        const firstFour = res.results.slice(0, 4);
        this.trendingMovies.set(firstFour);
      }
    });
  }

  private loadRecommendedMovies(): void {
    this._MoviesService.getNowPlayingMovies().subscribe({
      next: (res) => {
        const firstFour = res.results.slice(0, 4);
        this.nowPlayingMovies.set(firstFour);
      }
    })
  }

  private loadTopRatedMovies(): void {
    this._MoviesService.getTopRatedMovies().subscribe({
      next: (res) => {
        const firstFour = res.results.slice(0, 4);
        this.topRatedMovies.set(firstFour);
      }
    })
  }

  private loadUpComingMovies(): void {
    this._MoviesService.getUpcomingMovies().subscribe({
      next: (res) => {
        const firstFour = res.results.slice(0, 4);
        this.upComingMovies.set(firstFour);
        console.log(res, "up coming");

      }
    })
  }
}
