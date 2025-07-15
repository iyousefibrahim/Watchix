export interface TvKeyword {
  id: number;
  name: string;
}

export interface TvKeywordsResponse {
  id: number;
  results: TvKeyword[];
}
