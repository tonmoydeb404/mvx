import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLazyPersonPopularQuery } from "../api/personApi";
import PersonCard from "../common/components/cards/PersonCard";
import Loading from "../common/components/utils/Loading";

const PopularPersons = () => {
  const [getPopular, popularPersons] = useLazyPersonPopularQuery();
  const [page, setPage] = useState(1);

  // handle data
  useEffect(() => {
    getPopular(page);
  }, [page]);

  // load more content
  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const hasMore = popularPersons.isSuccess
    ? popularPersons.data?.total_pages > popularPersons.data?.page
    : false;

  return (
    <>
      <Helmet>
        <title>Popular Persons - MVX</title>{" "}
      </Helmet>
      <div className="container pt-28 pb-20">
        <div className="flex items-center flex-wrap justify-between gap-x-10 gap-y-4">
          <h3 className="text-2xl font-semibold">Popular Persons</h3>
        </div>

        <div className="mt-20">
          {popularPersons.isLoading ? <Loading /> : null}
          {popularPersons.isSuccess ? (
            <InfiniteScroll
              dataLength={popularPersons.data.results.length}
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
              {popularPersons.data.results.map((item) => (
                <PersonCard key={item.id} {...item} />
              ))}
            </InfiniteScroll>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default PopularPersons;
