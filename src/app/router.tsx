import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../common/layouts/AppLayout";
import Discover from "../pages/Discover";
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
        path: "/persons",
        element: <PopularPerson />,
      },
      {
        path: "/ai-suggestion",
        element: <Suggestion />,
      },
      {
        path: "/:type",
        element: <Discover />,
      },
      {
        path: "/movie/:id",
        element: <Movie />,
      },
      {
        path: "/tv/:id",
        element: <Tv />,
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
