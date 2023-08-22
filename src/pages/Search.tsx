import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { CgSpinner } from "react-icons/cg";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { Navigate, useSearchParams } from "react-router-dom";
import { SearchType, useLazySearchQuery } from "../api/searchApi";
import MediaDisplayCard from "../common/components/cards/Media/MediaDisplayCard";
import ErrorState from "../common/components/utils/ErrorState";
import Loading from "../common/components/utils/Loading";

const searchOptions: { title: string; type: SearchType }[] = [
  {
    title: "All",
    type: "multi",
  },
  {
    title: "Movies",
    type: "movie",
  },
  {
    title: "Tv Shows",
    type: "tv",
  },
  {
    title: "Person",
    type: "person",
  },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!searchParams.get("query")) return <Navigate to={"/"} replace />;

  const [type, setType] = useState<SearchType>(
    (searchParams.get("type") as SearchType) ?? "multi"
  );
  const query = searchParams.get("query");
  const [loading, setLoading] = useState(true);
  const [adult, setAdult] = useState(false);

  const [search, searchResult] = useLazySearchQuery();
  const [page, setPage] = useState(1);

  // handle data
  const handleData = async (pageNumber: number) => {
    try {
      if (!query) throw new Error("invalid query");
      // update page number
      setPage(pageNumber);
      // fetch data from api
      await search({
        type,
        page: pageNumber,
        query,
        adult,
      }).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // load more content
  const loadMore = useCallback(async () => {
    await handleData(page + 1);
  }, [page]);

  // reset our state on search type change
  useEffect(() => {
    setLoading(true);
    handleData(1);
  }, [type, query, adult]);

  // change type
  const changeType = (t: SearchType) => {
    if (t === "multi") {
      setSearchParams((p) => {
        p.delete("type");
        return p;
      });
    } else {
      setSearchParams((p) => {
        p.set("type", t);
        return p;
      });
    }
    setType(t);
  };

  const hasMore = searchResult.isSuccess
    ? searchResult.data?.total_pages > searchResult.data?.page
    : false;

  return (
    <>
      <Helmet>
        <title>Search Result - MVX</title>
      </Helmet>
      <div className="container pt-28 pb-20">
        <div className="flex sm:items-center flex-wrap flex-col sm:flex-row sm:justify-between gap-x-10 gap-y-1 mb-5">
          <h3 className="text-2xl">
            Search result of -{" "}
            <span className="font-medium">'{searchParams.get("query")}'</span>
          </h3>

          {!loading && searchResult.isSuccess ? (
            <span className="text-sm uppercase opacity-50">
              total results: {searchResult.data?.total_results ?? 0}
            </span>
          ) : null}
        </div>

        <div className="flex items-stretch flex-wrap gap-x-2 gap-y-3 mb-10">
          {searchOptions.map((item) => (
            <button
              key={item.type}
              onClick={() => changeType(item.type)}
              className={`pill pill-primary ${
                item.type === type ? "active" : ""
              }`}
            >
              {item.title}
            </button>
          ))}

          <button
            className={`pill sm:ml-auto ${
              adult ? "pill-success" : "pill-secondary"
            }`}
            onClick={() => setAdult((prev) => !prev)}
          >
            {adult ? (
              <HiCheckCircle className="text-success-600" />
            ) : (
              <HiXCircle className="text-error-700" />
            )}{" "}
            Include adult
          </button>
        </div>

        {searchResult.isLoading || loading ? <Loading /> : null}
        {!loading && searchResult.isSuccess ? (
          <>
            {searchResult.data.total_results > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-5 gap-y-10 mb-20">
                {searchResult.data.results.map((item) => (
                  <MediaDisplayCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <ErrorState
                className="min-h-[300px]"
                text="Sorry, we couldn’t find any results for this search."
              />
            )}

            {hasMore ? (
              <div className="flex items-center justify-center">
                <button
                  className="btn btn-secondary"
                  onClick={loadMore}
                  disabled={searchResult.isFetching || searchResult.isLoading}
                >
                  {searchResult.isFetching ? (
                    <>
                      <span>Loading More</span>
                      <CgSpinner
                        className={`animate-spin text-primary-600 text-2xl`}
                      />
                    </>
                  ) : (
                    "Load More"
                  )}
                </button>
              </div>
            ) : null}
          </>
        ) : null}

        {searchResult.isError ? <ErrorState className="min-h-[300px]" /> : null}
      </div>
    </>
  );
};

export default Search;
