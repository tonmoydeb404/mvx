import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { PaginatedResponse } from "../types/common.type";
import { Media, MediaType } from "../types/media.type";
import type { TimeType } from "../types/tmdb.type";

type GetTrendingArgs = { type: MediaType | "all"; time: TimeType };

export const trendingApi = createApi({
  reducerPath: "trendingApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    getTrending: builder.query<PaginatedResponse<Media>, GetTrendingArgs>({
      query: ({ type, time }) => ({
        url: `/trending/${type}/${time}`,
      }),
      transformResponse: (response: PaginatedResponse) => {
        const results: Media[] = response.results.map((item) => ({
          type: item.media_type,
          title: item.title || item.name,
          thumbnail: item.profile_path || item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.first_air_date || item.release_date,
          backdrop: item.backdrop_path,
        }));
        return { ...response, results };
      },
    }),
  }),
});

export const { useLazyGetTrendingQuery, useGetTrendingQuery } = trendingApi;
