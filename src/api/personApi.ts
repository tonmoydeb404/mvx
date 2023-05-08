import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { Asset } from "../types/asset.type";
import { PaginatedResponse } from "../types/common.type";
import { MediaCredit } from "../types/credit.types";
import {
  Person,
  PersonCredits,
  PersonDetails,
  PersonImages,
  PersonSocial,
} from "../types/person.type";

export const personApi = createApi({
  reducerPath: "personApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    personDetails: builder.query<PersonDetails, string | number>({
      query: (personId) => ({
        url: `/person/${personId}`,
      }),
    }),
    personCredits: builder.query<PersonCredits<MediaCredit>, string | number>({
      query: (personId) => ({
        url: `/person/${personId}/combined_credits`,
      }),
      transformResponse(response: PersonCredits) {
        const cast: MediaCredit[] = response.cast.map((item) => ({
          type: item.media_type,
          title: item.title || item.name,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.first_air_date || item.release_date,
          credit: item.character,
        }));
        const crew: MediaCredit[] = response.crew.map((item) => ({
          type: item.media_type,
          title: item.title || item.name,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.first_air_date || item.release_date,
          credit: item.job,
        }));
        return { id: response.id, cast, crew };
      },
    }),
    personImages: builder.query<PersonImages<Asset>, string | number>({
      query: (personId) => ({
        url: `/person/${personId}/images`,
      }),
      transformResponse(response: PersonImages) {
        const profiles: Asset[] = response.profiles.map((image) => ({
          aspect_ratio: image.aspect_ratio,
          file_path: image.file_path,
          type: "profiles",
        }));

        return { id: response.id, profiles };
      },
    }),
    personSocial: builder.query<PersonSocial, string | number>({
      query: (personId) => ({
        url: `/person/${personId}/external_ids`,
      }),
    }),
    personPopular: builder.query<PaginatedResponse<Person>, number>({
      query: (page) => ({
        url: `/person/popular?page=${page}`,
      }),
      // Only have one cache entry because the arg always maps to one string
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge(currentCacheData, responseData, { arg }) {
        if (arg > 1) {
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

export const {
  usePersonDetailsQuery,
  usePersonCreditsQuery,
  usePersonImagesQuery,
  usePersonSocialQuery,
  useLazyPersonPopularQuery,
} = personApi;
