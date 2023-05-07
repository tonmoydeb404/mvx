import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { Asset } from "../types/asset.type";
import { PaginatedResponse } from "../types/common.type";
import { PersonCredit } from "../types/credit.types";
import { Media } from "../types/media.type";
import {
  MovieCredits,
  MovieDetails,
  MovieImages,
  MovieVideos,
} from "../types/movie.type";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    movieDetails: builder.query<MovieDetails, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
      }),
    }),
    movieCredits: builder.query<MovieCredits<PersonCredit>, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
      }),
      transformResponse(response: MovieCredits) {
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
    movieVideos: builder.query<MovieVideos<Asset>, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/videos`,
      }),
      transformResponse(response: MovieVideos) {
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
    movieImages: builder.query<MovieImages<Asset>, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/images`,
      }),
      transformResponse(response: MovieImages) {
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
    movieSimilar: builder.query<PaginatedResponse<Media>, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/similar`,
      }),
      transformResponse: (response: PaginatedResponse) => {
        const results: Media[] = response.results.map((item) => ({
          type: "movie",
          title: item.title,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.release_date,
        }));
        return { ...response, results };
      },
    }),
    movieRecomendations: builder.query<
      PaginatedResponse<Media>,
      string | number
    >({
      query: (movieId) => ({
        url: `/movie/${movieId}/recommendations`,
      }),
      transformResponse: (response: PaginatedResponse) => {
        const results: Media[] = response.results.map((item) => ({
          type: "movie",
          title: item.title,
          thumbnail: item.poster_path,
          id: item.id,
          rating: item.vote_average,
          date: item.release_date,
        }));
        return { ...response, results };
      },
    }),
  }),
});

export const {
  useMovieCreditsQuery,
  useMovieDetailsQuery,
  useMovieImagesQuery,
  useMovieRecomendationsQuery,
  useMovieSimilarQuery,
  useMovieVideosQuery,
  useLazyMovieImagesQuery,
  useLazyMovieVideosQuery,
} = movieApi;
