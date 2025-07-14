export interface MovieKeywordsResponse {
  id: number;
  keywords: Keyword[];
}

export interface Keyword {
  id: number;
  name: string;
}
