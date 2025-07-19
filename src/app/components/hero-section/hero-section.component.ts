import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { MovieListItem } from '../../core/interfaces/responses/movie-list-response';
import { CommonModule } from '@angular/common';
import { imagePath } from '../../shared/utils/imagePath';
import { TranslationService } from '../../core/services/translation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { WatchTrailerComponent } from "../watch-trailer/watch-trailer.component";

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, WatchTrailerComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements OnInit {
  private readonly _MoviesService = inject(MoviesService);
  private readonly _TranslationService = inject(TranslationService);
  private readonly _destroyRef = inject(DestroyRef);

  readonly imagePath = imagePath;
  randomMovie = signal<MovieListItem | null>(null);
  movieId = signal<number | null>(null);

  ngOnInit(): void {
    this._TranslationService.languageChanged$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.loadRandomMovie();
      });
  }

  private loadRandomMovie(): void {
    this._MoviesService.getPopularMovies()
      .subscribe((res) => {
        const movies = res.results;
        const index = Math.floor(Math.random() * movies.length);
        const selectedMovie = movies[index];
        this.randomMovie.set(selectedMovie);
        this.movieId.set(selectedMovie.id);        
      });
  }}