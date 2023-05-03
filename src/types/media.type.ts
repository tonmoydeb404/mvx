export type MediaType = "movie" | "tv" | "person";

export type Media = {
  type: MediaType;
  title: string;
  thumbnail: string;
  date: string;
  rating: number;
  id: string | number;
};

export type MediaDetails = {
  backdrop: string | null;
  budget: number;
  genres: { id: number; name: string }[];
  overview: string | null;
  revenue: number;
  runtime: number | null;
  tagline: string | null;
  video: boolean;
} & Media;

export type Credit = {
  name: string;
  title: string;
  avatar: string | null;
  id: number;
};

export type MediaCredits = {
  writer: Credit[];
  director: Credit[];
  cast: Credit[];
};
