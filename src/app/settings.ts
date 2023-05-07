import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

export const tmdbQuery = () =>
  fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      if (TMDB_TOKEN) {
        headers.set("authorization", `Bearer ${TMDB_TOKEN}`);
      }
      return headers;
    },
  }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    { status?: number; data?: { [key: string]: any } }
  >;
