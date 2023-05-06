import { MediaImage } from "./media.type";

export type PersonDetails = {
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  place_of_birth: string | null;
  birthday: string | null;
  profile_path: string | null;
  known_for_department: string;
  deathday: string | null;
  id: number;
};
export type PersonSocial = {
  imdb_id: string | null;
  facebook_id: string | null;
  twitter_id: string | null;
  instagram_id: string | null;
};
export type PersonImages = {
  id: number;
  profiles: MediaImage[];
};
export type PersonCredits<T = { [key: string]: any }> = {
  id: number;
  cast: T[];
  crew: T[];
};
