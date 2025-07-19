import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscoverMoviesResponse } from '../interfaces/responses/discover-movies-response';
import { MovieGenresResponse } from '../interfaces/responses/movie-genres-response';
import { baseUrl } from '../../environment/baseUrl';
import { MovieListResponse } from '../interfaces/responses/movie-list-response';
import { MovieDetails } from '../interfaces/responses/movie-details';
import { MovieCredits } from '../interfaces/responses/movie-credits';
import { MovieImages } from '../interfaces/responses/movie-images';
import { MovieKeywordsResponse } from '../interfaces/responses/movie-keywords-response';
import { LatestMovie } from '../interfaces/responses/latest-movie';
import { RecommendedMoviesResponse } from '../interfaces/responses/recommended-movies-response';
import { ReleaseDatesResponse } from '../interfaces/responses/release-date-response';
import { MovieReviewsResponse } from '../interfaces/responses/movie-reviews-response';
import { SimilarMoviesResponse } from '../interfaces/responses/similar-movies-response';
import { MovieVideosResponse } from '../interfaces/responses/movie-videos-response';
import { SearchMoviesResponse } from '../interfaces/responses/search-movies-response';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient: HttpClient) { }

  getDiscoverMovies(page: number = 1): Observable<DiscoverMoviesResponse> {
    return this._HttpClient.get<DiscoverMoviesResponse>(`${baseUrl}/discover/movie?page=${page}`);
  }

  getMovieGenres(page: number = 1): Observable<MovieGenresResponse> {
    return this._HttpClient.get<MovieGenresResponse>(`${baseUrl}/genre/movie/list?page=${page}`);
  }

  getNowPlayingMovies(page: number = 1): Observable<MovieListResponse> {
    return this._HttpClient.get<MovieListResponse>(`${baseUrl}/movie/now_playing?page=${page}`);
  }

  getPopularMovies(page: number = 1): Observable<MovieListResponse> {
    return this._HttpClient.get<MovieListResponse>(`${baseUrl}/movie/popular?page=${page}`);
  }

  getTopRatedMovies(page: number = 1): Observable<MovieListResponse> {
    return this._HttpClient.get<MovieListResponse>(`${baseUrl}/movie/top_rated?page=${page}`);
  }

  getUpcomingMovies(page: number = 1): Observable<MovieListResponse> {
    return this._HttpClient.get<MovieListResponse>(`${baseUrl}/movie/upcoming?page=${page}`);
  }

  getMovieDetails(movieId: number): Observable<MovieDetails> {
    return this._HttpClient.get<MovieDetails>(`${baseUrl}/movie/${movieId}`);
  }

  getMovieCredits(movieId: number): Observable<MovieCredits> {
    return this._HttpClient.get<MovieCredits>(`${baseUrl}/movie/${movieId}/credits`);
  }

  getMovieImages(movieId: number): Observable<MovieImages> {
    return this._HttpClient.get<MovieImages>(`${baseUrl}/movie/${movieId}/images`);
  }

  getMovieKeywords(movieId: number): Observable<MovieKeywordsResponse> {
    return this._HttpClient.get<MovieKeywordsResponse>(`${baseUrl}/movie/${movieId}/keywords`);
  }

  getLatestMovie(): Observable<LatestMovie> {
    return this._HttpClient.get<LatestMovie>(`${baseUrl}/movie/latest`);
  }

  getRecommendedMovies(movieId: number, page: number = 1): Observable<RecommendedMoviesResponse> {
    return this._HttpClient.get<RecommendedMoviesResponse>(`${baseUrl}/movie/${movieId}/recommendations?page=${page}`);
  }

  getMovieReleaseDates(movieId: number): Observable<ReleaseDatesResponse> {
    return this._HttpClient.get<ReleaseDatesResponse>(`${baseUrl}/movie/${movieId}/release_dates`);
  }

  getMovieReviews(movieId: number, page: number = 1): Observable<MovieReviewsResponse> {
    return this._HttpClient.get<MovieReviewsResponse>(`${baseUrl}/movie/${movieId}/reviews?page=${page}`);
  }

  getSimilarMovies(movieId: number, page: number = 1): Observable<SimilarMoviesResponse> {
    return this._HttpClient.get<SimilarMoviesResponse>(`${baseUrl}/movie/${movieId}/similar?page=${page}`);
  }

  getMovieVideos(movieId: number): Observable<MovieVideosResponse> {
    return this._HttpClient.get<MovieVideosResponse>(`${baseUrl}/movie/${movieId}/videos`);
  }

}
