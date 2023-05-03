import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";
import { Credit, MediaCredits, MediaDetails } from "../types/media.type";
import { MediaCreditResponse } from "../types/tmdb.type";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: tmdbQuery(),
  endpoints: (builder) => ({
    getMovieDetails: builder.query<MediaDetails, string | number>({
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
    getMovieCredits: builder.query<MediaCredits, string | number>({
      query: (movieId) => ({
        url: `/movie/${movieId}/credits`,
      }),
      transformResponse(response: MediaCreditResponse) {
        const writer: Credit[] = response.crew
          .filter((crew) => crew.department === "Writing")
          .map((crew) => ({
            id: crew.id,
            avatar: crew.profile_path,
            title: crew.job,
            name: crew.name,
          }));
        const cast: Credit[] = response.cast.map((cast) => ({
          id: cast.id,
          avatar: cast.profile_path,
          title: cast.character,
          name: cast.name,
        }));
        const director: Credit[] = response.crew
          .filter((crew) => crew.department === "Directing")
          .map((crew) => ({
            id: crew.id,
            avatar: crew.profile_path,
            title: crew.job,
            name: crew.name,
          }));
        return { writer, cast, director };
      },
    }),
  }),
});

export const { useGetMovieDetailsQuery, useGetMovieCreditsQuery } = movieApi;
