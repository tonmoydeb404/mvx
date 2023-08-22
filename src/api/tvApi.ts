import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { Asset } from "../types/asset.type";
import { PaginatedResponse } from "../types/common.type";
import { PersonCredit } from "../types/credit.types";
import { Media } from "../types/media.type";
import { TvCredits, TvDetails, TvImages, TvVideos } from "../types/tv.type";

export const tvApi = createApi({
  reducerPath: "tvApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    tvDetails: builder.query<TvDetails, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}`,
      }),
    }),
    tvCredits: builder.query<TvCredits<PersonCredit>, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/credits`,
      }),
      transformResponse(response: TvCredits) {
        const cast: PersonCredit[] = response.cast.map((cast) => ({
          id: cast.id,
          profile_path: cast.profile_path,
          credit: cast.character,
          name: cast.name,
          credit_id: cast.credit_id,
        }));
        const crew: PersonCredit[] = response.crew.map((crew) => ({
          id: crew.id,
          profile_path: crew.profile_path,
          credit: crew.job,
          name: crew.name,
          credit_id: crew.credit_id,
        }));
        return { id: response.id, crew, cast };
      },
    }),
    tvVideos: builder.query<TvVideos<Asset>, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/videos`,
      }),
      transformResponse(response: TvVideos) {
        const results: Asset[] = response.results
          .filter((video) => video.site === "YouTube")
          .map((video) => ({
            aspect_ratio: null,
            file_path: video.key,
            type: "video",
          }));

        return { id: response.id, results };
      },
    }),
    tvImages: builder.query<TvImages<Asset>, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/images`,
      }),
      transformResponse(response: TvImages) {
        const backdrops: Asset[] = response.backdrops.map((image) => ({
          aspect_ratio: image.aspect_ratio,
          file_path: image.file_path,
          type: "backdrop",
        }));

        const posters: Asset[] = response.posters.map((image) => ({
          aspect_ratio: image.aspect_ratio,
          file_path: image.file_path,
          type: "poster",
        }));

        return { id: response.id, backdrops, posters };
      },
    }),
    tvSimilar: builder.query<PaginatedResponse<Media>, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/similar`,
      }),
      transformResponse: (response: PaginatedResponse) => {
        const results: Media[] = response.results.map((item) => ({
          type: "tv",
          title: item.name,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.first_air_date,
          backdrop: item.backdrop_path,
        }));
        return { ...response, results };
      },
    }),
    tvRecomendations: builder.query<PaginatedResponse<Media>, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/recommendations`,
      }),
      transformResponse: (response: PaginatedResponse) => {
        const results: Media[] = response.results.map((item) => ({
          type: "tv",
          title: item.name,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.first_air_date,
          backdrop: item.backdrop_path,
        }));
        return { ...response, results };
      },
    }),
  }),
});

export const {
  useTvCreditsQuery,
  useTvDetailsQuery,
  useTvImagesQuery,
  useTvRecomendationsQuery,
  useTvSimilarQuery,
  useTvVideosQuery,
  useLazyTvImagesQuery,
  useLazyTvVideosQuery,
} = tvApi;
