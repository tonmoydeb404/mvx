import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLazyDiscoverTvsQuery } from "../api/discoverApi";
import MediaDisplayCard from "../common/components/cards/Media/MediaDisplayCard";
import Loading from "../common/components/utils/Loading";
import SortSelect from "../common/components/utils/SortSelect";
import { SortBy } from "../types/tmdb.type";

const DEFAULT_SORT: SortBy = "popularity.desc";

const DiscoverTvs = () => {
  const [discover, discoverResult] = useLazyDiscoverTvsQuery();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>(DEFAULT_SORT);

  // handle data
  const handleData = useCallback(
    (pageNumber: number) => {
      // update page number
      setPage(pageNumber);
      // fetch data from api
      return discover({ page: pageNumber, sortBy });
    },
    [sortBy]
  );

  // load more content
  const loadMore = useCallback(async () => {
    await handleData(page + 1);
  }, [page]);

  // reset our state on sort by change
  useEffect(() => {
    handleData(1);
  }, [sortBy]);

  const hasMore = discoverResult.isSuccess
    ? discoverResult.data?.total_pages > discoverResult.data?.page
    : false;

  return (
    <>
      <Helmet>
        <title>Discover Tv Shows - MVX</title>
      </Helmet>
      <main className="container pt-28 pb-20">
        <div className="flex items-center flex-wrap justify-between gap-x-10 gap-y-4">
          <h3 className="text-2xl font-semibold">Discover Tv Shows</h3>

          <div className="flex flex-col w-full sm:flex-row sm:w-auto items-stretch gap-2">
            <SortSelect
              value={sortBy}
              setValue={setSortBy}
              className="form-select bg-secondary-base border-background-content-muted py-1.5"
              id="sortBy"
            />
          </div>
        </div>

        <div className="mt-20">
          {discoverResult.isLoading ? <Loading /> : null}
          {discoverResult.isSuccess ? (
            <InfiniteScroll
              dataLength={discoverResult.data.results.length}
              next={loadMore}
              hasMore={hasMore}
              loader={<Loading />}
              endMessage={
                <div className="flex items-center justify-center col-[1/-1] py-10">
                  <b>No more tv shows</b>
                </div>
              }
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10"
            >
              {discoverResult.data.results.map((item) => (
                <MediaDisplayCard key={item.id} {...item} />
              ))}
            </InfiniteScroll>
          ) : null}
        </div>
      </main>
    </>
  );
};

export default DiscoverTvs;
