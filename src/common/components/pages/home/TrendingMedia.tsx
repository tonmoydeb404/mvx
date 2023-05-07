import { useEffect, useState } from "react";
import { useLazyGetTrendingQuery } from "../../../../api/trendingApi";
import { TimeType } from "../../../../types/tmdb.type";
import { Filter } from "../../carousel/CarouselHeader";
import MediaCarousel from "../../carousel/MediaCarousel";

const filters: Filter<TimeType>[] = [
  { title: "Today", value: "day" },
  { title: "This Week", value: "week" },
];

type TrendingMediaProps = {
  className?: string;
};

const TrendingMedia = ({ className }: TrendingMediaProps) => {
  const [filter, setFilter] = useState(filters[0]);
  const [getTrending, { isError, isFetching, isLoading, isSuccess, data }] =
    useLazyGetTrendingQuery();

  useEffect(() => {
    getTrending({ time: filter.value, type: "all" });
  }, [filter]);

  return (
    <MediaCarousel
      data={data?.results}
      filters={filters}
      filter={filter}
      setFilter={setFilter}
      id="popular-media"
      isError={isError}
      isLoading={isLoading || isFetching}
      isSuccess={isSuccess}
      title="Popular"
      isEmpty={isSuccess && data?.total_results === 0}
      className={className}
    />
  );
};

export default TrendingMedia;
