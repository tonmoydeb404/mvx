import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../common/layouts/AppLayout";
import Discover from "../pages/Discover";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import Search from "../pages/Search";
import ErrorBoundary from "../pages/error/ErrorBoundary";
import NotFound from "../pages/error/NotFound";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    ErrorBoundary,
    children: [
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/:type",
        element: <Discover />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetails />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
