import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { MovieDetails } from '../../core/interfaces/responses/movie-details';
import { CommonModule } from '@angular/common';
import { imagePath } from '../../shared/utils/imagePath';
import { WatchTrailerComponent } from "../watch-trailer/watch-trailer.component";
import { TranslationService } from '../../core/services/translation.service';
import { CreditsComponent } from "../credits/credits.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, WatchTrailerComponent, CreditsComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
  private readonly _MoviesService = inject(MoviesService);
  private readonly _TranslationService = inject(TranslationService);
  private readonly _Title = inject(Title);

  Id = input.required<string | null>();
  movieDetails = signal<MovieDetails | null>(null);
  imagePath = imagePath;

  ngOnInit(): void {
    this.getMovieDetails();
    this._TranslationService.languageChanged$.subscribe({
      next: () => {
        this.getMovieDetails();
      }
    });
  }

  ngOnDestroy(): void {
    this._Title.setTitle('Watchix');
  }

  private getMovieDetails(): void {
    if (this.Id()) {
      this._MoviesService.getMovieDetails(Number(this.Id())).subscribe({
        next: (response) => {
          this.movieDetails.set(response);
          this._Title.setTitle(this.movieDetails()?.title ?? '');
        },
        error: (error) => {
          console.error('Error fetching movie details:', error);
        }
      });
    }
  }
}
