import { Component, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { MovieListItem } from '../../core/interfaces/responses/movie-list-response';
import { CommonModule } from '@angular/common';
import { imagePath } from '../../shared/utils/imagePath';
import { ButtonComponent } from "../button/button.component";
import { take } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements OnInit {
  private readonly _MoviesService = inject(MoviesService);
  private readonly sanitizer = inject(DomSanitizer);

  imagePath = imagePath;

  randomMovie = signal<MovieListItem | null>(null);
  movieId = signal<number | null>(null);
  safeTrailerUrl = signal<SafeResourceUrl | null>(null);
  trailerisOpend = signal<Boolean>(false);

  ngOnInit(): void {
    this._MoviesService.getPopularMovies()
      .pipe(take(1))
      .subscribe((res) => {
        const movies = res.results;
        const index = Math.floor(Math.random() * movies.length);
        const selectedMovie = movies[index];

        this.randomMovie.set(selectedMovie);
        this.movieId.set(selectedMovie.id);

        this.loadTrailer(selectedMovie.id);
      });
  }

  loadTrailer(id: number): void {
    this._MoviesService.getMovieVideos(id).subscribe({
      next: (res) => {
        const trailers = res.results.filter(
          v => v.type === 'Trailer' && v.site === 'YouTube'
        );

        if (trailers.length > 0) {
          const trailerKey = trailers[0].key;
          const url = `https://www.youtube.com/embed/${trailerKey}`;
          this.safeTrailerUrl.set(
            this.sanitizer.bypassSecurityTrustResourceUrl(url)
          );
        }
      }
    });
  }
  
}
