import {
  BACKDROP_EMPTY_PLACEHOLDER,
  PERSON_EMPTY_PLACEHOLDER,
  POSTER_EMPTY_PLACEHOLDER,
} from "../../config/default-images";
import { MediaType } from "../../types/media.type";

// Get average or an array
export const average = (array: number[]) =>
  array.length ? array.reduce((a, b) => a + b) / array.length : 0;

// Format date string
export const dateFormat = (date: string) =>
  date
    ? new Date(date).toLocaleString("en-us", {
        month: "short",
        year: "numeric",
        day: "2-digit",
      })
    : false;

// usd format of a number
export const usdFormat = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);

// format runtime number
export const formatRuntime = (runtime: number | null) =>
  runtime ? `${Math.floor(runtime / 60)}h ${runtime % 60}min` : false;

// get backdrop full path
export const getBackdrop = (path: string | null) =>
  path
    ? `https://image.tmdb.org/t/p/original${path}`
    : BACKDROP_EMPTY_PLACEHOLDER;

// get poster full path
export const getPoster = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : POSTER_EMPTY_PLACEHOLDER;

// get profile full path
export const getProfile = (path: string | null) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : PERSON_EMPTY_PLACEHOLDER;

// get media card image
export const getMediaImage = (path: string | null, type: MediaType) => {
  if (path) return `https://image.tmdb.org/t/p/w500${path}`;
  switch (type) {
    case "person":
      return PERSON_EMPTY_PLACEHOLDER;
    case "movie":
    case "tv":
    default:
      return POSTER_EMPTY_PLACEHOLDER;
  }
};

// get youtube thumbnail
export const youtubeThumbnail = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// get youtube video url
export const youtubeUrl = (id: string) =>
  `https://www.youtube.com/watch?v=${id}`;
