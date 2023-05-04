import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import {
  Media,
  MediaCredit,
  MediaCredits,
  MediaDetails,
  MediaImages,
  MediaVideos,
} from "../types/media.type";
import { MediaCreditResponse, TMDBResponse } from "../types/tmdb.type";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    movieDetails: builder.query<MediaDetails, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}`,
      }),
      transformResponse(response: { [key: string]: any }) {
        const movie: MediaDetails = {
          title: response.title || response.original_title,
          backdrop: response.backdrop_path,
          budget: response.budget,
          date: response.release_date,
          genres: response.genres,
          id: response.id,
          overview: response.overview,
          rating: response.vote_average,
          revenue: response.revenue,
          runtime: response.runtime,
          tagline: response.tagline,
          thumbnail: response.poster_path,
          type: "movie",
          video: response.video,
        };
        return movie;
      },
    }),
    movieCredits: builder.query<MediaCredits, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
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
    movieVideos: builder.query<MediaVideos, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/videos`,
      }),
    }),
    movieImages: builder.query<MediaImages, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/images`,
      }),
    }),
    movieSimilar: builder.query<TMDBResponse<Media>, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/similar`,
      }),
      transformResponse: (response: TMDBResponse) => {
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
    movieRecomendations: builder.query<TMDBResponse<Media>, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/recommendations`,
      }),
      transformResponse: (response: TMDBResponse) => {
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
