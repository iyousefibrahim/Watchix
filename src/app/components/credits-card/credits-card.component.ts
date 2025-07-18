import { Component, effect, inject, input, signal } from '@angular/core';
import { MoviesService } from '../../core/services/movies.service';
import { TVService } from '../../core/services/tv.service';
import { TVCreditsResponse } from '../../core/interfaces/responses/tv-credits-response';
import { MovieCredits } from '../../core/interfaces/responses/movie-credits';
import { TranslateModule } from '@ngx-translate/core';
import { imagePath } from '../../shared/utils/imagePath';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-credits-card',
  imports: [TranslateModule],
  templateUrl: './credits-card.component.html',
  styleUrl: './credits-card.component.css'
})
export class CreditsCardComponent {
  mediaType = input.required<'movie' | 'tv'>();
  id = input.required<number | null>();

  private readonly _MovieService = inject(MoviesService);
  private readonly _TVService = inject(TVService);
  private readonly _TranslationService = inject(TranslationService);

  cast = signal<(MovieCredits['cast'] | TVCreditsResponse['cast'])>([]);
  imagePath = imagePath;

  constructor() {
    effect(() => {
      this.fetchCredits()
    });

    this._TranslationService.languageChanged$.subscribe(() => {
      this.fetchCredits();
    });
  }

  private fetchCredits() {
    const type = this.mediaType();
    const itemId = this.id();

    if (!type || !itemId) return;

    if (type === 'movie') {
      this._MovieService.getMovieCredits(itemId).subscribe((res) => {
        this.cast.set(res.cast.slice(0, 12));
      });
    } else {
      this._TVService.getTVCredits(itemId).subscribe((res) => {
        this.cast.set(res.cast.slice(0, 12));
      });
    }
  }
}
