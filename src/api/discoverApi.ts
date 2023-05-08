import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { PaginatedResponse } from "../types/common.type";
import { Media, MediaType } from "../types/media.type";
import type { SortBy } from "../types/tmdb.type";

type DiscoverArg = {
  type: MediaType;
  page: number;
  sortBy: SortBy;
};

export const discoverApi = createApi({
  reducerPath: "discoverApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    discover: builder.query<PaginatedResponse<Media>, DiscoverArg>({
      query: (arg) => ({
        url: `/discover/${arg.type}?page=${arg.page}&sort_by=${arg.sortBy}`,
      }),
      transformResponse: (response: PaginatedResponse, _meta, { type }) => {
        const results: Media[] = response.results.map((item) => ({
          type: type,
          title: type === "movie" ? item.title : item.name,
          thumbnail: type === "person" ? item.profile_path : item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: type === "tv" ? item.first_air_date : item.release_date,
          backdrop: item.backdrop_path,
        }));
        return { ...response, results };
      },
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ queryArgs }) => {
        return queryArgs.type;
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

export const { useLazyDiscoverQuery } = discoverApi;
