import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { TVService } from '../../core/services/tv.service';
import { TranslationService } from '../../core/services/translation.service';
import { TVDetails } from '../../core/interfaces/responses/tv-details';
import { imagePath } from '../../shared/utils/imagePath';
import { CommonModule } from '@angular/common';
import { WatchTrailerComponent } from "../watch-trailer/watch-trailer.component";
import { TranslateModule } from '@ngx-translate/core';
import { TvSeasonCardComponent } from "../tv-season-card/tv-season-card.component";
import { CreditsCardComponent } from "../credits-card/credits-card.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tv-details',
  imports: [CommonModule, WatchTrailerComponent, TranslateModule, TvSeasonCardComponent, CreditsCardComponent],
  templateUrl: './tv-details.component.html',
  styleUrl: './tv-details.component.css'
})
export class TvDetailsComponent implements OnInit, OnDestroy {
  private readonly _TVService = inject(TVService);
  private readonly _TranslationService = inject(TranslationService);
  private readonly _Title = inject(Title);

  Id = input.required<string | null>();
  tvDetails = signal<TVDetails | null>(null);
  tvEpisodes = signal<TVDetails | null>(null);
  seasons = signal<TVDetails['seasons'] | null>(null);
  // seasonNumber = signal<number>(0);

  imagePath = imagePath;

  ngOnInit(): void {
    this.getTVDetails();
    this._TranslationService.languageChanged$.subscribe({
      next: () => {
        this.getTVDetails();
      }
    });
  }
  
  ngOnDestroy(): void {
    this._Title.setTitle('Watchix');
  }

  private getTVDetails(): void {
    if (this.Id()) {
      this._TVService.getTVDetails(Number(this.Id())).subscribe({
        next: (response) => {
          this.tvDetails.set(response);
          this._Title.setTitle(this.tvDetails()?.name ?? '');

        },
        error: (error) => {
          console.error('Error fetching movie details:', error);
        }
      });
    }
  }

  // private getTVEpisodes(): void {
  //   if (this.Id()) {
  //     this._TVService.getEpisodeDetails(this.seasonNumber).subscribe({
  //       next: (response) => {
  //         // Handle the response for TV episodes if needed
  //       },
  //       error: (error) => {
  //         console.error('Error fetching TV episodes:', error);
  //       }
  //     });
  //   }
  // }

}
