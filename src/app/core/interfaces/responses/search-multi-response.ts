export interface MultiSearchResult {
    id: number;
    media_type: 'movie' | 'tv' | 'person';
    name?: string;
    title?: string;
    poster_path?: string;
    profile_path?: string;
    overview?: string;
}

export interface SearchMultiResponse {
    page: number;
    results: MultiSearchResult[];
    total_results: number;
    total_pages: number;
}