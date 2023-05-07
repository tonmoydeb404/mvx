import { useEffect, useState } from "react";
import { useLazyGetPopularQuery } from "../../../../api/popularApi";
import { MediaType } from "../../../../types/media.type";
import { Filter } from "../../carousel/CarouselHeader";
import MediaCarousel from "../../carousel/MediaCarousel";

const filters: Filter<MediaType>[] = [
  { title: "Movies", value: "movie" },
  { title: "Tv Shows", value: "tv" },
];

type PopularMediaProps = {
  className?: string;
};

const PopularMedia = ({ className }: PopularMediaProps) => {
  const [filter, setFilter] = useState(filters[0]);
  const [getPopular, popular] = useLazyGetPopularQuery();

  useEffect(() => {
    getPopular(filter.value);
  }, [filter]);

  return (
    <MediaCarousel
      data={popular.data?.results}
      filters={filters}
      filter={filter}
      setFilter={setFilter}
      id="popular-media"
      isError={popular.isError}
      isLoading={popular.isLoading || popular.isFetching}
      isSuccess={popular.isSuccess}
      title="Popular"
      isEmpty={popular.isSuccess && popular.data.total_results === 0}
      className={className}
    />
  );
};

export default PopularMedia;
