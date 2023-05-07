import { useTvRecomendationsQuery } from "../../../../api/tvApi";
import MediaCarousel from "../../carousel/MediaCarousel";

type TvRecomendationsProps = {
  id: string;
  className?: string;
};

const TvRecomendations = ({ id, className }: TvRecomendationsProps) => {
  const { isError, isFetching, isLoading, isSuccess, data } =
    useTvRecomendationsQuery(id);

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

export default TvRecomendations;
