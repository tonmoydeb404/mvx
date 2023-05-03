import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { Media, MediaType } from "../types/media.type";
import type { TMDBResponse } from "../types/tmdb.type";

export type SearchType = MediaType | "multi";

type SearchArg = {
  type: SearchType;
  page: number;
  query: string;
  adult: boolean;
};

export const searchApi = createApi({
  reducerPath: "searchApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    search: builder.query<TMDBResponse<Media>, SearchArg>({
      query: (arg) => ({
        url: `/search/${arg.type}?query=${arg.query}&page=${arg.page}&include_adult=${arg.adult}`,
      }),
      transformResponse: (response: TMDBResponse, _meta, { type }) => {
        const results: Media[] = response.results.map((item) => ({
          type: type === "multi" ? item.media_type : type,
          title: (item.media_type || type) === "movie" ? item.title : item.name,
          thumbnail:
            (item.media_type || type) === "person"
              ? item.profile_path
              : item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date:
            (item.media_type || type) === "tv"
              ? item.first_air_date
              : item.release_date,
        }));
        return { ...response, results };
      },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ queryArgs }) => {
        return `${queryArgs.query}-${queryArgs.type}`;
      },
      merge(currentCacheData, responseData, { arg }) {
        if (arg.page > 1) {
          currentCacheData.results.push(...responseData.results);
          currentCacheData.page = responseData.page;
          return currentCacheData;
        }

        return responseData;
      },
      // Refetch when the page arg changes
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
  }),
});

export const { useLazySearchQuery } = searchApi;