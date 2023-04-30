import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../common/layouts/AppLayout";
import Details from "../pages/Details";
import Discover from "../pages/Discover";
import Home from "../pages/Home";
import ErrorBoundary from "../pages/error/ErrorBoundary";
import NotFound from "../pages/error/NotFound";

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    ErrorBoundary,
    children: [
      {
        path: "/:type",
        element: <Discover />,
      },
      {
        path: "/:type/:id",
        element: <Details />,
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