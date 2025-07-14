import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscoverTv, DiscoverTvResponse } from '../interfaces/responses/discover-tv-response';
import { baseUrl } from '../../environment/baseUrl';
import { TvGenresResponse } from '../interfaces/responses/tv-genres-response';
import { SearchTvShowsResponse } from '../interfaces/responses/search-tvshows-response';

@Injectable({
  providedIn: 'root'
})
export class TVService {

  constructor(private _HttpClient: HttpClient) { }

  getDiscoverTV(page: number = 1): Observable<DiscoverTvResponse> {
    return this._HttpClient.get<DiscoverTvResponse>(`${baseUrl}/discover/tv?page=${page}`);
  }

  getTvGenres(page: number = 1): Observable<TvGenresResponse> {
    return this._HttpClient.get<TvGenresResponse>(`${baseUrl}/genre/tv/list?page=${page}`);
  }

  searchTvShows(query: string, page: number = 1): Observable<SearchTvShowsResponse> {
    return this._HttpClient.get<SearchTvShowsResponse>(`${baseUrl}/search/tv`, {
      params: {
        query,
        page,
        include_adult: false,
        language: 'en-US',
      }
    });
  }


}
