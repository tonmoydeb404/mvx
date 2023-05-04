import { useMovieSimilarQuery } from "../../../api/movieApi";
import { useTvSimilarQuery } from "../../../api/tvApi";
import MediaCarousel from "../carousel/MediaCarousel";

type SimilarProps = {
  type: "movie" | "tv";
  id: string;
};

const Similar = ({ type, id }: SimilarProps) => {
  const similarMovies =
    type === "movie" ? useMovieSimilarQuery(id) : useTvSimilarQuery(id);

  return (
    <MediaCarousel
      id="similar"
      data={similarMovies.isSuccess ? similarMovies.data.results : []}
      isError={similarMovies.isError}
      isLoading={similarMovies.isLoading || similarMovies.isFetching}
      isSuccess={similarMovies.isSuccess}
      title="Similar"
      className="container mb-24"
    />
  );
};

export default Similar;
