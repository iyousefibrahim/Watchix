export interface TvReviewAuthorDetails {
  name: string;
  username: string;
  avatar_path: string | null;
  rating: number | null;
}

export interface TvReview {
  author: string;
  author_details: TvReviewAuthorDetails;
  content: string;
  created_at: string;
  id: string;
  updated_at: string;
  url: string;
}

export interface TvReviewsResponse {
  id: number;
  page: number;
  results: TvReview[];
  total_pages: number;
  total_results: number;
}
