import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-media-card',
  imports: [],
  templateUrl: './media-card.component.html',
  styleUrl: './media-card.component.css'
})
export class MediaCardComponent {
  items = input.required<any[]>();
}
