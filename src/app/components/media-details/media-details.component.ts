import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MovieDetailsComponent } from "../movie-details/movie-details.component";
import { TvDetailsComponent } from "../tv-details/tv-details.component";

@Component({
  selector: 'app-media-details',
  imports: [CommonModule, MovieDetailsComponent, TvDetailsComponent],
  templateUrl: './media-details.component.html',
  styleUrl: './media-details.component.css'
})
export class MediaDetailsComponent implements OnInit {

  private readonly _ActivatedRoute = inject(ActivatedRoute);

  mediaType = signal<'movie' | 'tv' | null>(null);
  mediaId = signal<string | null>(null);

  ngOnInit() {
    this._ActivatedRoute.paramMap.subscribe(params => {
      this.mediaType.set(params.get('mediaType') as 'movie' | 'tv' | null);
      this.mediaId.set(params.get('mediaId'));
    });
  }
}
