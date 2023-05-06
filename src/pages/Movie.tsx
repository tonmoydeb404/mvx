import { useParams } from "react-router-dom";
import { useMovieDetailsQuery } from "../api/movieApi";
import MovieAssets from "../common/components/movie/MovieAssets";
import MovieCasts from "../common/components/movie/MovieCasts";
import MovieDetails from "../common/components/movie/MovieDetails";
import MovieRecomendations from "../common/components/movie/MovieRecomendations";
import MovieSimilar from "../common/components/movie/MovieSimilar";
import NotFound from "./error/NotFound";

const Movie = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFound />;

  const movieDetails = useMovieDetailsQuery(id);

  return (
    <>
      <MovieDetails
        isSuccess={movieDetails.isSuccess}
        isLoading={movieDetails.isFetching || movieDetails.isLoading}
        isError={movieDetails.isError}
        data={movieDetails.data}
      />
      <MovieCasts id={id} className="mb-24" />
      <MovieAssets id={id} className="mb-24" />
      <MovieSimilar id={id} className="mb-24" />
      <MovieRecomendations id={id} className="mb-24" />
    </>
  );
};

export default Movie;
