import { Component, inject, input, signal } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MoviesService } from '../../core/services/movies.service';
import { TVService } from '../../core/services/tv.service';

@Component({
  selector: 'app-watch-trailer',
  imports: [ButtonComponent],
  templateUrl: './watch-trailer.component.html',
  styleUrl: './watch-trailer.component.css'
})
export class WatchTrailerComponent {
  private readonly _MoviesService = inject(MoviesService);
  private readonly _TVService = inject(TVService);
  private readonly _sanitizer = inject(DomSanitizer);

  safeTrailerUrl = signal<SafeResourceUrl | null>(null);
  trailerisOpend = signal<boolean>(false);

  Id = input.required<number | null>();
  mediaType = input.required<string>();
  hasTrailer = signal<boolean>(false);


  ngOnInit(): void {
    this.loadTrailer(Number(this.Id()))
  }

  private loadTrailer(id: number): void {
    const handleVideo = (videoKey: string | undefined) => {
      if (videoKey) {
        const url = `https://www.youtube.com/embed/${videoKey}`;
        this.safeTrailerUrl.set(
          this._sanitizer.bypassSecurityTrustResourceUrl(url)
        );
        this.hasTrailer.set(true);
      } else {
        this.safeTrailerUrl.set(null);
        this.hasTrailer.set(false);
      }
    };

    if (this.mediaType() === 'movie') {
      this._MoviesService.getMovieVideos(id).subscribe({
        next: (res) => {
          const video = res.results.find(v => v.site === 'YouTube');
          handleVideo(video?.key);
        }
      });
    } else {
      this._TVService.getTvVideos(id).subscribe({
        next: (res) => {
          const video = res.results.find(v => v.site === 'YouTube');
          handleVideo(video?.key);
        }
      });
    }
  }

  closeTrailer(): void {
    this.trailerisOpend.set(false);
    document.body.classList.remove('overflow-hidden');
  }

  openTrailer(): void {
    this.trailerisOpend.set(true);
    document.body.classList.add('overflow-hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  
}
