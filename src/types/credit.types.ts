import { Media } from "./media.type";

export type PersonCredit = {
  id: string | number;
  name: string;
  credit_id: string;
  credit: string;
  profile_path: string | null;
};

export type MediaCredit = Media & { credit: string };
