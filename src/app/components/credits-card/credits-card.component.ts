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

  ngOnInit(): void {
    const type = this.mediaType();
    const itemId = this.id();

    if (type && itemId) {
      this.fetchCredits(type, itemId);
    }

    this._TranslationService.languageChanged$.subscribe(() => {
      const type = this.mediaType();
      const itemId = this.id();

      if (type && itemId) {
        this.fetchCredits(type, itemId);
      }
    });
  }

  private fetchCredits(type: 'movie' | 'tv', itemId: number) {
    const serviceCall =
      type === 'movie'
        ? this._MovieService.getMovieCredits(itemId)
        : this._TVService.getTVCredits(itemId);

    serviceCall.subscribe((res) => {
      this.cast.set(res.cast.slice(0, 12));
    });
  }
}
