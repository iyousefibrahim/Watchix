import { Component, inject, input, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { MovieDetails } from '../../core/interfaces/responses/movie-details';
import { CommonModule } from '@angular/common';
import { imagePath } from '../../shared/utils/imagePath';
import { WatchTrailerComponent } from "../watch-trailer/watch-trailer.component";
import { TranslationService } from '../../core/services/translation.service';
import { CreditsComponent } from "../credits/credits.component";

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, WatchTrailerComponent, CreditsComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  private readonly _MoviesService = inject(MoviesService);
  private readonly _TranslationService = inject(TranslationService);

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

  private getMovieDetails(): void {
    if (this.Id()) {
      this._MoviesService.getMovieDetails(Number(this.Id())).subscribe({
        next: (response) => {
          this.movieDetails.set(response);
        },
        error: (error) => {
          console.error('Error fetching movie details:', error);
        }
      });
    }
  }
}
