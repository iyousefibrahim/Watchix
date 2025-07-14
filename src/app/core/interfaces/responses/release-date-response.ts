export interface ReleaseDatesResponse {
  id: number;
  results: CountryReleaseInfo[];
}

export interface CountryReleaseInfo {
  iso_3166_1: string;
  release_dates: ReleaseDate[];
}

export interface ReleaseDate {
  certification: string;
  descriptors: any[];
  iso_639_1: string;
  note: string;
  release_date: string;
  type: number;
}