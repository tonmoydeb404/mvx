import { useMovieCreditsQuery } from "../../../api/movieApi";
import { useTvCreditsQuery } from "../../../api/tvApi";
import CreditCarousel from "../carousel/CreditCarousel";

type MediaDetailsCastProps = {
  type: "movie" | "tv";
  id: string;
};

const MediaDetailsCast = ({ type, id }: MediaDetailsCastProps) => {
  const credits =
    type === "movie" ? useMovieCreditsQuery(id) : useTvCreditsQuery(id);

  return (
    <CreditCarousel
      creditList={credits.isSuccess ? credits.data.cast : []}
      isError={credits.isError}
      isLoading={credits.isLoading || credits.isFetching}
      isSuccess={credits.isSuccess}
      title="Casts"
      className="container mb-24"
    />
  );
};

export default MediaDetailsCast;
