export type MediaType = "movie" | "tv" | "person";

export type Media = {
  type: MediaType;
  title: string;
  thumbnail: string;
  date: string;
  rating: number;
  id: string | number;
  backdrop?: string | null;
};
