export type AnyMediaItem = {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    genre_ids: number[];
    [key: string]: any;
};
