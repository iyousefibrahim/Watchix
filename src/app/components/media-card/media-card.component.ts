import { Component, input } from '@angular/core';
import { AnyMediaItem } from '../../core/interfaces/any-media-item';
import { imagePath } from '../../shared/utils/imagePath';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-media-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.css'
})
export class MediaCardComponent {
  items = input.required<AnyMediaItem[] | null>();
  imagePath = imagePath;
  skeletonArray = Array(4);

}
