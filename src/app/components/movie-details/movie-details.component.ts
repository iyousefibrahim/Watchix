import { Component, inject, input, signal } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { MovieDetails } from '../../core/interfaces/responses/movie-details';
import { CommonModule } from '@angular/common';
import { imagePath } from '../../shared/utils/imagePath';
import { WatchTrailerComponent } from "../watch-trailer/watch-trailer.component";

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule, WatchTrailerComponent],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent {

  private readonly _MoviesService = inject(MoviesService);

  Id = input.required<string | null>();
  movieDetails = signal<MovieDetails | null>(null);
  imagePath = imagePath;

  ngOnInit(): void {
    this._MoviesService.getMovieDetails(Number(this.Id())).subscribe({
      next: (res) => {
        this.movieDetails.set(res);
      }
    });
  }
}
