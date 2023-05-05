import { useMovieRecomendationsQuery } from "../../../api/movieApi";
import { useTvRecomendationsQuery } from "../../../api/tvApi";
import MediaCarousel from "../carousel/MediaCarousel";

type MediaDetailsRecomendationsProps = {
  type: "movie" | "tv";
  id: string;
};

const MediaDetailsRecomendations = ({
  type,
  id,
}: MediaDetailsRecomendationsProps) => {
  const recomendations =
    type === "movie"
      ? useMovieRecomendationsQuery(id)
      : useTvRecomendationsQuery(id);

  return (
    <MediaCarousel
      id="recomendations"
      data={recomendations.isSuccess ? recomendations.data.results : []}
      isError={recomendations.isError}
      isLoading={recomendations.isLoading || recomendations.isFetching}
      isSuccess={recomendations.isSuccess}
      title="Recomendations"
      className="container mb-24"
    />
  );
};

export default MediaDetailsRecomendations;
