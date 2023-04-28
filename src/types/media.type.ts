import { MediaType } from "./tmdb.type";

export type Media = {
  type: MediaType;
  title: string;
  thumbnail: string;
  date: string;
  rating: number;
  id: string | number;
};
