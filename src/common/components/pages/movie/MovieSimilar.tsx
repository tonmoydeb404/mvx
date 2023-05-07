import { useMovieSimilarQuery } from "../../../../api/movieApi";
import MediaCarousel from "../../carousel/MediaCarousel";

type MovieSimilarProps = {
  id: string;
  className?: string;
};

const MovieSimilar = ({ id, className }: MovieSimilarProps) => {
  const { isError, isFetching, isLoading, isSuccess, data } =
    useMovieSimilarQuery(id);

  return (
    <MediaCarousel
      data={data?.results}
      isSuccess={isSuccess}
      isEmpty={isSuccess && data.total_results === 0}
      isLoading={isLoading || isFetching}
      id={"movie-smilar"}
      isError={isError}
      className={`container ${className}`}
      title="Smilar Movies"
      filters={false}
    />
  );
};

export default MovieSimilar;
