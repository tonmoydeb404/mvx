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
export const getBackdrop = (backdrop_path: string | null) =>
  backdrop_path ? `https://image.tmdb.org/t/p/original${backdrop_path}` : "";

// get poster full path
export const getPoster = (poster_path: string | null) =>
  poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "/images/no-poster.jpg";

// get youtube thumbnail
export const youtubeThumbnail = (id: string) =>
  `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;

// get youtube video url
export const youtubeUrl = (id: string) =>
  `https://www.youtube.com/watch?v=${id}`;
