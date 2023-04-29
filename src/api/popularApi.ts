import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { Media, MediaType } from "../types/media.type";
import type { TMDBResponse } from "../types/tmdb.type";

export const popularApi = createApi({
  reducerPath: "popularApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    getPopular: builder.query<TMDBResponse<Media>, MediaType>({
      query: (type) => ({
        url: `/${type}/popular`,
      }),
      transformResponse: (response: TMDBResponse, _meta, type) => {
        const results: Media[] = response.results.map((item) => ({
          type: type,
          title: type === "movie" ? item.title : item.name,
          thumbnail: type === "person" ? item.profile_path : item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: type === "tv" ? item.first_air_date : item.release_date,
        }));
        return { ...response, results };
      },
    }),
  }),
});

export const { useLazyGetPopularQuery } = popularApi;
