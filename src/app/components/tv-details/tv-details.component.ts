import { Component, input } from '@angular/core';

@Component({
  selector: 'app-tv-details',
  imports: [],
  templateUrl: './tv-details.component.html',
  styleUrl: './tv-details.component.css'
})
export class TvDetailsComponent {
  Id = input.required<string | null>();

}
