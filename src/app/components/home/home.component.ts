import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { MediaSectionComponent } from "../media-section/media-section.component";
import { MoviesService } from '../../core/services/movies.service';
import { TVService } from '../../core/services/tv.service';
import { TrendingService } from '../../core/services/trending.service';
import { TrendingMovie } from '../../core/interfaces/responses/trending-movies-response';

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

  trendingMovies = signal<TrendingMovie[] | null>(null);



  ngOnInit(): void {
    this._TrendingService.getTrendingMovies('week').subscribe({
      next: (res) => {
        const firstFive = res.results.slice(0, 4);
        this.trendingMovies.set(firstFive);
      }
    });
  }
}
