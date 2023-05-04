import { MediaImageResponse, MediaVideoResponse } from "./tmdb.type";

export type MediaType = "movie" | "tv" | "person";

export type Media = {
  type: MediaType;
  title: string;
  thumbnail: string;
  date: string;
  rating: number;
  id: string | number;
};

type MediaDetailsCommon = {
  backdrop: string | null;
  genres: { id: number; name: string }[];
  overview: string | null;
  runtime: number | null;
  tagline: string | null;
} & Media;

export type MediaMovieDetails = MediaDetailsCommon & {
  type: "movie";
  budget: number;
  revenue: number;
  video: boolean;
};

export type MediaTvDetails = MediaDetailsCommon & {
  type: "tv";
  episodes: number;
  seasons: number;
  creators: { id: number; name: string }[];
};

export type MediaDetails = MediaMovieDetails | MediaTvDetails;

export type MediaCredit = {
  name: string;
  credit: string;
  avatar: string | null;
  id: number;
  credit_id: string;
};
export type MediaCredits = {
  writer: MediaCredit[];
  director: MediaCredit[];
  cast: MediaCredit[];
};

export type MediaVideo = {
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  id: string;
};
export type MediaVideos = MediaVideoResponse<MediaVideo>;

export type MediaImage = {
  aspect_ratio: number;
  file_path: string;
  width: number;
  height: number;
};
export type MediaImages = MediaImageResponse<MediaImage>;
