export interface TrendingTVResponse {
  page: number;
  results: TrendingTV[];
  total_pages: number;
  total_results: number;
}

export interface TrendingTV {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}
