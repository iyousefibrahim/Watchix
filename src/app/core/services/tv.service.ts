import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiscoverTv, DiscoverTvResponse } from '../interfaces/responses/discover-tv-response';
import { baseUrl } from '../../environment/baseUrl';
import { TvGenresResponse } from '../interfaces/responses/tv-genres-response';
import { SearchTvShowsResponse } from '../interfaces/responses/search-tvshows-response';
import { AiringTodayTVResponse } from '../interfaces/responses/airing-todaytv-response';
import { TVDetails } from '../interfaces/responses/tv-details';
import { TVContentRatingsResponse } from '../interfaces/responses/tv-content-rating-response';
import { TVCreditsResponse } from '../interfaces/responses/tv-credits-response';
import { TvKeywordsResponse } from '../interfaces/responses/tv-keyword';
import { LatestTvShow } from '../interfaces/responses/latest-tv-show';
import { TvRecommendationsResponse } from '../interfaces/responses/tv-recommendation-result';
import { TvReviewsResponse } from '../interfaces/responses/tv-review-author-details';
import { SimilarTvResponse } from '../interfaces/responses/similar-tv-show';
import { TvVideosResponse } from '../interfaces/responses/tv-video';
import { TvSeasonDetails } from '../interfaces/responses/tv-season-details';
import { TvSeasonImages } from '../interfaces/responses/tv-season-images';
import { TvSeasonVideos } from '../interfaces/responses/tv-season-videos';
import { TvEpisodeDetails } from '../interfaces/responses/tv-episode-details';
import { TvEpisodeCredits } from '../interfaces/responses/tv-episode-credits';
import { TvEpisodeImages } from '../interfaces/responses/tv-episode-images';
import { TvEpisodeVideos } from '../interfaces/responses/tv-episode-videos';

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

  getAiringTodayTV(page: number = 1): Observable<AiringTodayTVResponse> {
    return this._HttpClient.get<AiringTodayTVResponse>(
      `${baseUrl}/tv/airing_today?page=${page}`
    );
  }

  getOnTheAirTV(page: number = 1): Observable<AiringTodayTVResponse> {
    return this._HttpClient.get<AiringTodayTVResponse>(
      `${baseUrl}/tv/on_the_air?page=${page}`
    );
  }

  getPopularTV(page: number = 1): Observable<AiringTodayTVResponse> {
    return this._HttpClient.get<AiringTodayTVResponse>(
      `${baseUrl}/tv/popular?page=${page}`
    );
  }

  getTopRatedTV(page: number = 1): Observable<AiringTodayTVResponse> {
    return this._HttpClient.get<AiringTodayTVResponse>(
      `${baseUrl}/tv/top_rated?page=${page}`
    );
  }

  getTVDetails(series_id: number): Observable<TVDetails> {
    return this._HttpClient.get<TVDetails>(`${baseUrl}/tv/${series_id}`);
  }

  getContentRatings(seriesId: number): Observable<TVContentRatingsResponse> {
    return this._HttpClient.get<TVContentRatingsResponse>(`${baseUrl}/tv/${seriesId}/content_ratings`);
  }

  getTVCredits(seriesId: number): Observable<TVCreditsResponse> {
    return this._HttpClient.get<TVCreditsResponse>(`${baseUrl}/tv/${seriesId}/credits`);
  }

  getTvKeywords(seriesId: number): Observable<TvKeywordsResponse> {
    return this._HttpClient.get<TvKeywordsResponse>(
      `${baseUrl}/tv/${seriesId}/keywords`
    );
  }

  getLatestTvShow(): Observable<LatestTvShow> {
    return this._HttpClient.get<LatestTvShow>(`${baseUrl}/tv/latest`);
  }

  getTvRecommendations(seriesId: number, page: number = 1): Observable<TvRecommendationsResponse> {
    return this._HttpClient.get<TvRecommendationsResponse>(`${baseUrl}/tv/${seriesId}/recommendations`, {
      params: {
        language: 'en-US',
        page: page.toString()
      }
    });
  }

  getTvReviews(seriesId: number, page: number = 1): Observable<TvReviewsResponse> {
    return this._HttpClient.get<TvReviewsResponse>(`${baseUrl}/tv/${seriesId}/reviews`, {
      params: {
        language: 'en-US',
        page: page.toString()
      }
    });
  }

  getSimilarTvShows(seriesId: number, page: number = 1): Observable<SimilarTvResponse> {
    return this._HttpClient.get<SimilarTvResponse>(`${baseUrl}/tv/${seriesId}/similar`, {
      params: {
        language: 'en-US',
        page: page.toString()
      }
    });
  }

  getTvVideos(seriesId: number): Observable<TvVideosResponse> {
    return this._HttpClient.get<TvVideosResponse>(`${baseUrl}/tv/${seriesId}/videos`, {
      params: {
        language: 'en-US'
      }
    });
  }

  getTvSeasonDetails(seriesId: number, seasonNumber: number): Observable<TvSeasonDetails> {
    return this._HttpClient.get<TvSeasonDetails>(`${baseUrl}/tv/${seriesId}/season/${seasonNumber}`, {
      params: {
        language: 'en-US'
      }
    });
  }

  getTvSeasonImages(seriesId: number, seasonNumber: number): Observable<TvSeasonImages> {
    return this._HttpClient.get<TvSeasonImages>(`${baseUrl}/tv/${seriesId}/season/${seasonNumber}/images`, {
      params: {
        language: 'en-US',
        include_image_language: 'en,null'
      }
    });
  }

  getTvSeasonVideos(seriesId: number, seasonNumber: number): Observable<TvSeasonVideos> {
    return this._HttpClient.get<TvSeasonVideos>(`${baseUrl}/tv/${seriesId}/season/${seasonNumber}/videos`, {
      params: {
        language: 'en-US',
        include_video_language: 'en,null'
      }
    });
  }

  getEpisodeDetails(seriesId: number, seasonNumber: number, episodeNumber: number): Observable<TvEpisodeDetails> {
    return this._HttpClient.get<TvEpisodeDetails>(
      `${baseUrl}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}`,
      {
        params: {
          language: 'en-US',
        },
      }
    );
  }

  getEpisodeCredits(seriesId: number, seasonNumber: number, episodeNumber: number): Observable<TvEpisodeCredits> {
    return this._HttpClient.get<TvEpisodeCredits>(
      `${baseUrl}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/credits`,
      {
        params: {
          language: 'en-US',
        },
      }
    );
  }

  getEpisodeImages(seriesId: number, seasonNumber: number, episodeNumber: number): Observable<TvEpisodeImages> {
    return this._HttpClient.get<TvEpisodeImages>(
      `${baseUrl}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/images`,
      {
        params: {
          language: 'en-US',
          include_image_language: 'en,null',
        },
      }
    );
  }

  getEpisodeVideos(seriesId: number, seasonNumber: number, episodeNumber: number): Observable<TvEpisodeVideos> {
    return this._HttpClient.get<TvEpisodeVideos>(
      `${baseUrl}/tv/${seriesId}/season/${seasonNumber}/episode/${episodeNumber}/videos`,
      {
        params: {
          language: 'en-US',
          include_video_language: 'en,null',
        },
      }
    );
  }




}
