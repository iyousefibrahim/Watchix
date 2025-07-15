import { Injectable } from '@angular/core';
import { TrendingAllResponse } from '../interfaces/responses/trending-all-response';
import { Observable } from 'rxjs';
import { baseUrl } from '../../environment/baseUrl';
import { HttpClient } from '@angular/common/http';
import { TrendingMoviesResponse } from '../interfaces/responses/trending-movies-response';
import { TrendingTVResponse } from '../interfaces/responses/trending-tv-response';
import { TrendingPeopleResponse } from '../interfaces/responses/trending-people-response';

@Injectable({
  providedIn: 'root'
})
export class TrendingService {

  constructor(private _HttpClient: HttpClient) { }

  getTrendingAll(timeWindow: 'day' | 'week'): Observable<TrendingAllResponse> {
    return this._HttpClient.get<TrendingAllResponse>(baseUrl + `/trending/all/${timeWindow}`);
  }

  getTrendingMovies(timeWindow: 'day' | 'week'): Observable<TrendingMoviesResponse> {
    return this._HttpClient.get<TrendingMoviesResponse>(baseUrl + `/trending/movie/${timeWindow}`);
  }

  getTrendingTV(timeWindow: 'day' | 'week'): Observable<TrendingTVResponse> {
    return this._HttpClient.get<TrendingTVResponse>(baseUrl + `/trending/tv/${timeWindow}`);
  }

  getTrendingPeople(timeWindow: 'day' | 'week'): Observable<TrendingPeopleResponse> {
    return this._HttpClient.get<TrendingPeopleResponse>(baseUrl + `trending/person/${timeWindow}`);
  }

}
