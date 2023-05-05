import { useCallback, useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import { discoverApi, useLazyDiscoverQuery } from "../api/discoverApi";
import { useAppDispatch } from "../app/hooks";
import MediaCard from "../common/components/cards/MediaCard";
import Loading from "../common/components/utils/Loading";
import SortSelect from "../common/components/utils/SortSelect";
import { MediaType } from "../types/media.type";
import { SortBy } from "../types/tmdb.type";
import NotFound from "./error/NotFound";

const DEFAULT_SORT: SortBy = "popularity.desc";

const Discover = () => {
  const { type } = useParams<{ type: MediaType }>();
  if (!type || !["movie", "tv"].includes(type)) return <NotFound />;

  const dispatch = useAppDispatch();
  const [discover, discoverResult] = useLazyDiscoverQuery();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>(DEFAULT_SORT);

  // sort by on type change
  useEffect(() => {
    setSortBy(DEFAULT_SORT);
  }, [type]);

  // handle data
  const handleData = useCallback(
    (pageNumber: number) => {
      // update page number
      setPage(pageNumber);
      // fetch data from api
      return discover({ type, page: pageNumber, sortBy });
    },
    [type, sortBy]
  );

  // load more content
  const loadMore = useCallback(async () => {
    await handleData(page + 1);
  }, [page]);

  // reset our state on discover type, sort by change
  useEffect(() => {
    dispatch(discoverApi.util.resetApiState());
    handleData(1);
  }, [type, sortBy]);

  const hasMore = discoverResult.isSuccess
    ? discoverResult.data?.total_pages > discoverResult.data?.page
    : false;

  return (
    <div className="container pt-28 pb-20">
      <div className="flex items-center flex-wrap justify-between gap-x-10 gap-y-4">
        <h3 className="text-2xl font-semibold">
          Discover {type === "movie" ? "Movies" : "Tv Shows"}
        </h3>

        <div className="flex flex-col w-full sm:flex-row sm:w-auto items-stretch gap-2">
          {/* TODO: Add Genre Filtering here */}
          <SortSelect
            value={sortBy}
            setValue={setSortBy}
            className="form-select bg-secondary-800 border-secondary-700 py-1.5"
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
                <b>No more content</b>
              </div>
            }
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10"
          >
            {discoverResult.data.results.map((item) => (
              <MediaCard key={item.id} {...item} />
            ))}
          </InfiniteScroll>
        ) : null}
      </div>
    </div>
  );
};

export default Discover;
