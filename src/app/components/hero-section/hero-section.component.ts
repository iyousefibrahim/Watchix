import { Component, inject, OnInit, signal } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { MovieListItem } from '../../core/interfaces/responses/movie-list-response';
import { CommonModule } from '@angular/common';
import { imagePath } from '../../shared/utils/imagePath';
import { ButtonComponent } from "../button/button.component";
import { take } from 'rxjs';

@Component({
  selector: 'app-hero-section',
  imports: [CommonModule, ButtonComponent],
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.css'
})
export class HeroSectionComponent implements OnInit {
  private readonly _MoviesService = inject(MoviesService);
  imagePath = imagePath;

  randomMovie = signal<MovieListItem | null>(null);
  movieId = signal<number>(0);

  ngOnInit(): void {
    this._MoviesService.getPopularMovies()
      .pipe(take(1))
      .subscribe((res) => {
        const movies = res.results;
        const index = Math.floor(Math.random() * movies.length);
        const selectedMovie = movies[index];

        this.randomMovie.set(selectedMovie);
        this.movieId.set(selectedMovie.id);

        this._MoviesService.getMovieVideos(this.movieId()).subscribe({
          next: (res) => {
            console.log('🎬 Movie videos:', res);
          },
          error: (err) => {
            console.log('❌ Error fetching videos:', err);
          }
        });
      });
  }

}
