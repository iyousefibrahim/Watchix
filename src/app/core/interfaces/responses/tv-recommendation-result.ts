export interface TvRecommendationResult {
  adult: boolean;
  backdrop_path: string | null;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string | null;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

export interface TvRecommendationsResponse {
  page: number;
  results: TvRecommendationResult[];
  total_pages: number;
  total_results: number;
}
