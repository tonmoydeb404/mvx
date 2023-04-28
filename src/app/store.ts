import { configureStore } from "@reduxjs/toolkit";
import { movieApi } from "../api/movieApi";
import { popularApi } from "../api/popularApi";
import { trendingApi } from "../api/trendingApi";

export const store = configureStore({
  reducer: {
    [trendingApi.reducerPath]: trendingApi.reducer,
    [popularApi.reducerPath]: popularApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      trendingApi.middleware,
      movieApi.middleware,
      popularApi.middleware
    ),
  devTools: import.meta.env.MODE === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
