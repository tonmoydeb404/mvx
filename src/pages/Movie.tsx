import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useMovieDetailsQuery } from "../api/movieApi";
import MovieAssets from "../common/components/pages/movie/MovieAssets";
import MovieCasts from "../common/components/pages/movie/MovieCasts";
import MovieDetails from "../common/components/pages/movie/MovieDetails";
import MovieRecomendations from "../common/components/pages/movie/MovieRecomendations";
import MovieSimilar from "../common/components/pages/movie/MovieSimilar";
import NotFound from "./error/NotFound";

const Movie = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFound />;

  const { isError, isFetching, isLoading, isSuccess, data, error } =
    useMovieDetailsQuery(id);

  // handle not found
  if (isError && "status" in error && error?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>{isSuccess ? <title>{data.title} - MVX</title> : null}</Helmet>
      <MovieDetails
        isSuccess={isSuccess}
        isLoading={isFetching || isLoading}
        isError={isError}
        data={data}
      />
      <MovieCasts id={id} className="mb-24" />
      <MovieAssets id={id} className="mb-24" />
      <MovieSimilar id={id} className="mb-24" />
      <MovieRecomendations id={id} className="mb-24" />
    </>
  );
};

export default Movie;
