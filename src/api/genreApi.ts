import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { GenreResponse } from "../types/genre.type";

export const genreApi = createApi({
  reducerPath: "genreApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    movieGenre: builder.query<GenreResponse, undefined>({
      query: () => ({
        url: "/genre/movie/list",
      }),
    }),
    tvGenre: builder.query<GenreResponse, undefined>({
      query: () => ({
        url: "/genre/tv/list",
      }),
    }),
  }),
});

export const { useMovieGenreQuery, useTvGenreQuery } = genreApi;
