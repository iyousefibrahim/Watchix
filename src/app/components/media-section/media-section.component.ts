import { Component, input } from '@angular/core';
import { MediaCardComponent } from "../media-card/media-card.component";
import { TranslateModule } from '@ngx-translate/core';
import { AnyMediaItem } from '../../core/interfaces/any-media-item';

@Component({
  selector: 'app-media-section',
  imports: [MediaCardComponent, TranslateModule],
  templateUrl: './media-section.component.html',
  styleUrl: './media-section.component.css'
})
export class MediaSectionComponent {
  readonly title = input.required<string>();
  readonly items = input.required<AnyMediaItem[] | null>();
  readonly mediaType = input.required<'movie' | 'tv'>();

}
