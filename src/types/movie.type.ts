export type MovieCredits<T = { [key: string]: any }> = {
  id: number;
  cast: T[];
  crew: T[];
};

export type MovieDetails = {
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  id: string | number;
  backdrop_path: string | null;
  genres: { id: number; name: string }[];
  overview: string | null;
  runtime: number | null;
  tagline: string | null;
  budget: number;
  revenue: number;
  video: boolean;
};

export type MovieImages<T = { [key: string]: any }> = {
  id: number;
  backdrops: T[];
  posters: T[];
};

export type MovieVideos<T = { [key: string]: any }> = {
  id: number;
  results: T[];
};
