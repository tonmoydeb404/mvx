import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { Media, MediaType } from "../types/media.type";
import type { TMDBResponse, TimeType } from "../types/tmdb.type";

type GetTrendingArgs = { type: MediaType | "all"; time: TimeType };

export const trendingApi = createApi({
  reducerPath: "trendingApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    getTrending: builder.query<TMDBResponse<Media>, GetTrendingArgs>({
      query: ({ type, time }) => ({
        url: `/trending/${type}/${time}`,
      }),
      transformResponse: (response: TMDBResponse) => {
        const results: Media[] = response.results.map((item) => ({
          type: item.media_type,
          title: item.media_type === "movie" ? item.title : item.name,
          thumbnail:
            item.media_type === "person" ? item.profile_path : item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date:
            item.media_type === "tv" ? item.first_air_date : item.release_date,
        }));
        return { ...response, results };
      },
    }),
  }),
});

export const { useLazyGetTrendingQuery } = trendingApi;
