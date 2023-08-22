import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found - MVX</title>
      </Helmet>
      <div className="w-full min-h-screen py-24 flex items-center justify-center flex-col">
        <h2 className="text-5xl mb-2 font-bold">404</h2>
        <p className="">Sorry we didn't find your requested content</p>
      </div>
    </>
  );
};

export default NotFound;
