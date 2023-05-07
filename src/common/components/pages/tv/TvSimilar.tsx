import { useTvSimilarQuery } from "../../../../api/tvApi";
import MediaCarousel from "../../carousel/MediaCarousel";

type TvSimilarProps = {
  id: string;
  className?: string;
};

const TvSimilar = ({ id, className }: TvSimilarProps) => {
  const { isError, isFetching, isLoading, isSuccess, data } =
    useTvSimilarQuery(id);

  return (
    <MediaCarousel
      data={data?.results}
      isSuccess={isSuccess}
      isEmpty={isSuccess && data.total_results === 0}
      isLoading={isLoading || isFetching}
      id={"movie-smilar"}
      isError={isError}
      className={`container ${className}`}
      title="Smilar Tv Shows"
      filters={false}
    />
  );
};

export default TvSimilar;
