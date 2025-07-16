import { Component, Input, input } from '@angular/core';
import { MediaCardComponent } from "../media-card/media-card.component";

@Component({
  selector: 'app-media-section',
  imports: [MediaCardComponent],
  templateUrl: './media-section.component.html',
  styleUrl: './media-section.component.css'
})
export class MediaSectionComponent {
  title = input.required<string>();
  @Input({required:true}) items! : any[];
}
