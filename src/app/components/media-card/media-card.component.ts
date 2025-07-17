import { Component, input } from '@angular/core';
import { AnyMediaItem } from '../../core/interfaces/any-media-item';
import { imagePath } from '../../shared/utils/imagePath';
import { RouterLink } from '@angular/router';
import { DatePipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-media-card',
  imports: [RouterLink, DatePipe, NgClass],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.css'
})
export class MediaCardComponent {
  readonly items = input.required<AnyMediaItem[] | null>();
  readonly mediaType = input.required<'movie' | 'tv'>();

  readonly imagePath = imagePath;
  readonly skeletonArray = Array(4);

}
