import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import average from "../common/utils/average";
import {
  Media,
  MediaCredit,
  MediaCredits,
  MediaDetails,
  MediaImages,
  MediaVideos,
} from "../types/media.type";
import { MediaCreditResponse, TMDBResponse } from "../types/tmdb.type";

export const tvApi = createApi({
  reducerPath: "tvApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    tvDetails: builder.query<MediaDetails, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}`,
      }),
      transformResponse(response: { [key: string]: any }) {
        const tv: MediaDetails = {
          title: response.name,
          backdrop: response.backdrop_path,
          date: response.first_air_date,
          genres: response.genres,
          id: response.id,
          overview: response.overview,
          rating: response.vote_average,
          runtime: average(response.episode_run_time),
          tagline: response.tagline,
          thumbnail: response.poster_path,
          type: "tv",
          creators: response.created_by,
          episodes: response.number_of_episodes,
          seasons: response.number_of_seasons,
        };
        return tv;
      },
    }),
    tvCredits: builder.query<MediaCredits, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/credits`,
      }),
      transformResponse(response: MediaCreditResponse) {
        const writer: MediaCredit[] = response.crew
          .filter((crew) => crew.department === "Writing")
          .map((crew) => ({
            id: crew.id,
            avatar: crew.profile_path,
            credit: crew.job,
            name: crew.name,
            credit_id: crew.credit_id,
          }));
        const cast: MediaCredit[] = response.cast.map((cast) => ({
          id: cast.id,
          avatar: cast.profile_path,
          credit: cast.character,
          name: cast.name,
          credit_id: cast.credit_id,
        }));
        const director: MediaCredit[] = response.crew
          .filter((crew) => crew.department === "Directing")
          .map((crew) => ({
            id: crew.id,
            avatar: crew.profile_path,
            credit: crew.job,
            name: crew.name,
            credit_id: crew.credit_id,
          }));
        return { writer, cast, director };
      },
    }),
    tvVideos: builder.query<MediaVideos, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/videos`,
      }),
    }),
    tvImages: builder.query<MediaImages, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/images`,
      }),
    }),
    tvSimilar: builder.query<TMDBResponse<Media>, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/similar`,
      }),
      transformResponse: (response: TMDBResponse) => {
        const results: Media[] = response.results.map((item) => ({
          type: "tv",
          title: item.name,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.first_air_date,
        }));
        return { ...response, results };
      },
    }),
    tvRecomendations: builder.query<TMDBResponse<Media>, string | number>({
      query: (tvId) => ({
        url: `/tv/${tvId}/recommendations`,
      }),
      transformResponse: (response: TMDBResponse) => {
        const results: Media[] = response.results.map((item) => ({
          type: "tv",
          title: item.name,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.first_air_date,
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
