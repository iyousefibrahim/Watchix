import { Component, input } from '@angular/core';
import { CreditsCardComponent } from "../credits-card/credits-card.component";

@Component({
  selector: 'app-credits',
  imports: [CreditsCardComponent],
  templateUrl: './credits.component.html',
  styleUrl: './credits.component.css'
})
export class CreditsComponent {
  mediaType = input.required<'movie' | 'tv'>();
  id = input.required<number>();
}
