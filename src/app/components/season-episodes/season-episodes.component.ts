import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { TVService } from '../../core/services/tv.service';
import { imagePath } from '../../shared/utils/imagePath';
import { TvSeasonDetails } from '../../core/interfaces/responses/tv-season-details';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../core/services/translation.service';
import { Title } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-season-episodes',
  imports: [ButtonComponent, TranslateModule, DatePipe],
  templateUrl: './season-episodes.component.html',
  styleUrl: './season-episodes.component.css'
})
export class SeasonEpisodesComponent implements OnInit, OnDestroy {
  private readonly _TVService = inject(TVService);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _TranslationService = inject(TranslationService);
  private readonly _Title = inject(Title);

  seasonDetails = signal<TvSeasonDetails | null>(null);
  tvId = signal<string | number | null>(null);
  seasonNumber = signal<string | number | null>(null);
  imagePath = imagePath;

  emptyArray = Array.from({ length: 6 }, (_, i) => i + 1);

  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe(params => {
      this.tvId.set(params['id']);
      this.seasonNumber.set(params['seasonNumber']);
      this.fetchSeason();
    });

    this._TranslationService.languageChanged$.subscribe(() => {
      this.fetchSeason();
    });
  }

  ngOnDestroy(): void {
    this._Title.setTitle('Watchix');
  }

  private fetchSeason(): void {
    const id = Number(this.tvId());
    const season = Number(this.seasonNumber());

    this._TVService.getTvSeasonDetails(id, season).subscribe({
      next: (data) => {
        this.seasonDetails.set(data);
        this._Title.setTitle(this.seasonDetails()?.name || 'Season Details');
      }
    });
  }
}
