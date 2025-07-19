import { Component, input } from '@angular/core';
import { Season, TVDetails } from '../../core/interfaces/responses/tv-details';
import { imagePath } from '../../shared/utils/imagePath';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-tv-season-card',
  imports: [TranslateModule, CommonModule, ButtonComponent],
  templateUrl: './tv-season-card.component.html',
  styleUrl: './tv-season-card.component.css'
})
export class TvSeasonCardComponent {
  readonly season = input.required<TVDetails['seasons'] | null>();
  readonly tvId = input.required<string | number | null>();
  readonly imagePath = imagePath;
}
