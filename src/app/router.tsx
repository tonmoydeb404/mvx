import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../common/layouts/AppLayout";
import DiscoverMovies from "../pages/DiscoverMovies";
import DiscoverTvs from "../pages/DiscoverTvs";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Person from "../pages/Person";
import PopularPerson from "../pages/PopularPerson";
import Search from "../pages/Search";
import Suggestion from "../pages/Suggestion";
import Tv from "../pages/Tv";
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
        path: "/ai-suggestion",
        element: <Suggestion />,
      },
      {
        path: "/movie",
        element: <DiscoverMovies />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
      {
        path: "/tv",
        element: <DiscoverTvs />,
      },
      {
        path: "/tv/:id",
        element: <Tv />,
      },
      {
        path: "/person",
        element: <PopularPerson />,
      },
      {
        path: "/person/:id",
        element: <Person />,
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
