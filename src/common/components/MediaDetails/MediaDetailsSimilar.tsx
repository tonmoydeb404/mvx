import { useMovieSimilarQuery } from "../../../api/movieApi";
import { useTvSimilarQuery } from "../../../api/tvApi";
import MediaCarousel from "../carousel/MediaCarousel";

type MediaDetailsSimilarProps = {
  type: "movie" | "tv";
  id: string;
};

const MediaDetailsSimilar = ({ type, id }: MediaDetailsSimilarProps) => {
  const similar =
    type === "movie" ? useMovieSimilarQuery(id) : useTvSimilarQuery(id);

  return (
    <MediaCarousel
      id="similar"
      data={similar.isSuccess ? similar.data.results : []}
      isError={similar.isError}
      isLoading={similar.isLoading || similar.isFetching}
      isSuccess={similar.isSuccess}
      title="MediaDetailsSimilar"
      className="container mb-24"
    />
  );
};

export default MediaDetailsSimilar;
