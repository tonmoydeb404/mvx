import { configureStore } from "@reduxjs/toolkit";
import { discoverApi } from "../api/discoverApi";
import { movieApi } from "../api/movieApi";
import { popularApi } from "../api/popularApi";
import { searchApi } from "../api/searchApi";
import { trendingApi } from "../api/trendingApi";

export const store = configureStore({
  reducer: {
    [trendingApi.reducerPath]: trendingApi.reducer,
    [popularApi.reducerPath]: popularApi.reducer,
    [discoverApi.reducerPath]: discoverApi.reducer,
    [searchApi.reducerPath]: searchApi.reducer,
    [movieApi.reducerPath]: movieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      trendingApi.middleware,
      popularApi.middleware,
      discoverApi.middleware,
      searchApi.middleware,
      movieApi.middleware
    ),
  devTools: import.meta.env.MODE === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
