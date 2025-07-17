import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { MovieListItem } from '../../core/interfaces/responses/movie-list-response';
import { CommonModule } from '@angular/common';
import { imagePath } from '../../shared/utils/imagePath';
import { ButtonComponent } from "../button/button.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslationService } from '../../core/services/translation.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements OnInit {
  private readonly _MoviesService = inject(MoviesService);
  private readonly _sanitizer = inject(DomSanitizer);
  private readonly _TranslationService = inject(TranslationService);
  private readonly _destroyRef = inject(DestroyRef);

  imagePath = imagePath;
  randomMovie = signal<MovieListItem | null>(null);
  movieId = signal<number | null>(null);
  safeTrailerUrl = signal<SafeResourceUrl | null>(null);
  trailerisOpend = signal<boolean>(false);

  ngOnInit(): void {
    this.loadRandomMovieAndTrailer();

    this._TranslationService.languageChanged$
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this.loadRandomMovieAndTrailer();
      });
  }

  private loadRandomMovieAndTrailer(): void {
    this._MoviesService.getPopularMovies()
      .subscribe((res) => {
        const movies = res.results;
        const index = Math.floor(Math.random() * movies.length);
        const selectedMovie = movies[index];

        this.randomMovie.set(selectedMovie);
        this.movieId.set(selectedMovie.id);

        this.loadTrailer(selectedMovie.id);
      });
  }

  private loadTrailer(id: number): void {
    this._MoviesService.getMovieVideos(id).subscribe({
      next: (res) => {
        const video = res.results.find(v => v.site === 'YouTube');
        if (video) {
          const url = `https://www.youtube.com/embed/${video.key}`;
          this.safeTrailerUrl.set(
            this._sanitizer.bypassSecurityTrustResourceUrl(url)
          );
        } else {
          this.safeTrailerUrl.set(null);
        }
      }
    });
  }

  closeTrailer(): void {
    this.trailerisOpend.set(false);
    document.body.classList.remove('overflow-hidden');
  }

  openTrailer(): void {
    this.trailerisOpend.set(true);
    document.body.classList.add('overflow-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}