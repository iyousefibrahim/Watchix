export type AnyMediaItem = {
    id: number;
    title?: string;
    name?: string;
    overview: string;
    backdrop_path: string;
    poster_path: string;
    release_date: string;
    genre_ids: number[];
    [key: string]: any;
};
