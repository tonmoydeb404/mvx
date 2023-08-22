import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../common/layouts/AppLayout";
import DiscoverMovies from "../pages/DiscoverMovies";
import DiscoverTvs from "../pages/DiscoverTvs";
import Home from "../pages/Home";
import Movie from "../pages/Movie";
import Person from "../pages/Person";
import PopularPersons from "../pages/PopularPersons";
import Search from "../pages/Search";
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
        path: "/movies",
        element: <DiscoverMovies />,
      },
      {
        path: "/movies/:id",
        element: <Movie />,
      },
      {
        path: "/tvs",
        element: <DiscoverTvs />,
      },
      {
        path: "/tvs/:id",
        element: <Tv />,
      },
      {
        path: "/persons",
        element: <PopularPersons />,
      },
      {
        path: "/persons/:id",
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
