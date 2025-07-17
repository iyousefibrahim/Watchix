import { Component, inject, input, signal } from '@angular/core';
import { TVService } from '../../core/services/tv.service';
import { TranslationService } from '../../core/services/translation.service';
import { TVDetails } from '../../core/interfaces/responses/tv-details';
import { imagePath } from '../../shared/utils/imagePath';

@Component({
  selector: 'app-tv-details',
  imports: [],
  templateUrl: './tv-details.component.html',
  styleUrl: './tv-details.component.css'
})
export class TvDetailsComponent {
  private readonly _TVService = inject(TVService);
  private readonly _TranslationService = inject(TranslationService);

  Id = input.required<string | null>();
  tvDetails = signal<TVDetails | null>(null);
  imagePath = imagePath;

  ngOnInit(): void {
    this.getTVDetails();
    this._TranslationService.languageChanged$.subscribe({
      next: () => {
        this.getTVDetails();
      }
    });
  }

  private getTVDetails(): void {
    if (this.Id()) {
      this._TVService.getTVDetails(Number(this.Id())).subscribe({
        next: (response) => {
          this.tvDetails.set(response);
        },
        error: (error) => {
          console.error('Error fetching movie details:', error);
        }
      });
    }
  }

  // private getTVEpisodes(): void {
  //   if (this.Id()) {
  //     this._TVService.getEpisodeDetails().subscribe({
  //       next: (response) => {
  //         // Handle the response for TV episodes if needed
  //       },
  //       error: (error) => {
  //         console.error('Error fetching TV episodes:', error);
  //       }
  //     });
  //   }
}
