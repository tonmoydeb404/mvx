import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { Media } from "../types/media.type";
import {
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
    personCredits: builder.query<PersonCredits<Media>, string | number>({
      query: (personId) => ({
        url: `/person/${personId}/combined_credits`,
      }),
      transformResponse(response: PersonCredits) {
        const cast: Media[] = response.cast.map((item) => ({
          type: item.media_type,
          title: item.title || item.name,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.first_air_date || item.release_date,
        }));
        const crew: Media[] = response.crew.map((item) => ({
          type: item.media_type,
          title: item.title || item.name,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.first_air_date || item.release_date,
        }));
        return { id: response.id, cast, crew };
      },
    }),
    personImages: builder.query<PersonImages, string | number>({
      query: (personId) => ({
        url: `/person/${personId}/images`,
      }),
    }),
    personSocial: builder.query<PersonSocial, string | number>({
      query: (personId) => ({
        url: `/person/${personId}/external_ids`,
      }),
    }),
  }),
});

export const {
  usePersonDetailsQuery,
  usePersonCreditsQuery,
  usePersonImagesQuery,
  usePersonSocialQuery,
} = personApi;
