export type TvCredits<T = { [key: string]: any }> = {
  id: number;
  cast: T[];
  crew: T[];
};

export type TvDetails = {
  name: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
  id: string | number;
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  overview: string | null;
  episode_run_time: number[];
  tagline: string | null;
  created_by: { id: number; name: string }[];
  number_of_episodes: number;
  number_of_seasons: number;
  languages: string[];
};

export type TvImages<T = { [key: string]: any }> = {
  id: number;
  backdrops: T[];
  posters: T[];
};

export type TvVideos<T = { [key: string]: any }> = {
  id: number;
  results: T[];
};
