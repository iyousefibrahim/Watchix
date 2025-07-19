import { Injectable } from '@angular/core';
import { SearchTvShowsResponse } from '../interfaces/responses/search-tvshows-response';
import { baseUrl } from '../../environment/baseUrl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SearchMoviesResponse } from '../interfaces/responses/search-movies-response';
import { SearchMultiResponse } from '../interfaces/responses/search-multi-response';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private _HttpClient: HttpClient) { }

  searchTvShows(query: string, page: number = 1): Observable<SearchTvShowsResponse> {
    return this._HttpClient.get<SearchTvShowsResponse>(`${baseUrl}/search/tv`, {
      params: { query, page, include_adult: false }
    });
  }

  searchMovies(query: string, page: number = 1): Observable<SearchMoviesResponse> {
    return this._HttpClient.get<SearchMoviesResponse>(`${baseUrl}/search/movie`, {
      params: { query, page }
    });
  }

  searchMulti(query: string, page: number = 1): Observable<SearchMultiResponse> {
    return this._HttpClient.get<SearchMultiResponse>(`${baseUrl}/search/multi`, {
      params: { query, page }
    });
  }

}
