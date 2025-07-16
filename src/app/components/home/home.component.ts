import { Component } from '@angular/core';
import { HeroSectionComponent } from "../hero-section/hero-section.component";
import { MediaSectionComponent } from "../media-section/media-section.component";

@Component({
  selector: 'app-home',
  imports: [HeroSectionComponent, MediaSectionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
