import { useMovieRecomendationsQuery } from "../../../api/movieApi";
import { useTvRecomendationsQuery } from "../../../api/tvApi";
import MediaCarousel from "../carousel/MediaCarousel";

type RecomendationsProps = {
  type: "movie" | "tv";
  id: string;
};

const Recomendations = ({ type, id }: RecomendationsProps) => {
  const RecomendationsMovies =
    type === "movie"
      ? useMovieRecomendationsQuery(id)
      : useTvRecomendationsQuery(id);

  return (
    <MediaCarousel
      id="recomendations"
      data={
        RecomendationsMovies.isSuccess ? RecomendationsMovies.data.results : []
      }
      isError={RecomendationsMovies.isError}
      isLoading={
        RecomendationsMovies.isLoading || RecomendationsMovies.isFetching
      }
      isSuccess={RecomendationsMovies.isSuccess}
      title="Recomendations"
      className="container mb-24"
    />
  );
};

export default Recomendations;
