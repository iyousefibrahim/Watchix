export interface TVContentRatingsResponse {
    results: TVContentRating[];
}

export interface TVContentRating {
    descriptors: string[];
    iso_3166_1: string;
    rating: string;
    id: number;
}
