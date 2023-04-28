import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { tmdbQuery } from "../app/settings";

export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: tmdbQuery(),
  endpoints: () => ({}),
});

export const {} = movieApi;
