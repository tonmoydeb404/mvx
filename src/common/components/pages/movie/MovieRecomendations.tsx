import { useMovieRecomendationsQuery } from "../../../../api/movieApi";
import MediaCarousel from "../../carousel/MediaCarousel";

type MovieRecomendationsProps = {
  id: string;
  className?: string;
};

const MovieRecomendations = ({ id, className }: MovieRecomendationsProps) => {
  const { isError, isFetching, isLoading, isSuccess, data } =
    useMovieRecomendationsQuery(id);

  return (
    <MediaCarousel
      data={data?.results}
      isSuccess={isSuccess}
      isEmpty={isSuccess && data.total_results === 0}
      isLoading={isLoading || isFetching}
      id={"movie-recomendations"}
      isError={isError}
      className={`container ${className}`}
      title="Recomendations"
      filters={false}
    />
  );
};

export default MovieRecomendations;
