import { Helmet } from "react-helmet-async";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import NotFound from "./NotFound";

const ErrorBoundary = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />;
    }
  }

  return (
    <>
      <Helmet>
        <title>Error - MVX</title>
      </Helmet>
      <div className="w-full min-h-screen py-24 flex items-center justify-center flex-col">
        <h2 className="text-5xl mb-2 font-bold">Error!</h2>
        <p className="">Something wents to wrong</p>
      </div>
    </>
  );
};

export default ErrorBoundary;
