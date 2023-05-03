import { useCallback, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { HiCheckCircle, HiXCircle } from "react-icons/hi";
import { Navigate, useSearchParams } from "react-router-dom";
import { discoverApi } from "../api/discoverApi";
import { SearchType, useLazySearchQuery } from "../api/searchApi";
import { useAppDispatch } from "../app/hooks";
import MediaCard from "../common/components/cards/MediaCard";
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
  const [query] = useState(searchParams.get("query"));
  const [loading, setLoading] = useState(true);
  const [adult, setAdult] = useState(false);

  const dispatch = useAppDispatch();
  const [search, searchResult] = useLazySearchQuery();
  const [page, setPage] = useState(1);

  // handle data
  const handleData = useCallback(
    async (pageNumber: number) => {
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
    },
    [query, type, adult]
  );

  // load more content
  const loadMore = useCallback(async () => {
    await handleData(page + 1);
  }, [page, type, query, adult]);

  // reset our state on search type change
  useEffect(() => {
    setLoading(true);
    dispatch(discoverApi.util.resetApiState());
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

  console.log(searchResult.error);

  return (
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

      <div className="flex items-stretch flex-wrap gap-x-2 gap-y-3  sm:gap-x-3 mb-10">
        {searchOptions.map((item) => (
          <button
            key={item.type}
            onClick={() => changeType(item.type)}
            className={`py-1 px-3 sm:py-1.5 sm:px-4 min-w-[70px] text-sm rounded-2xl ring-[1.5px] ring-primary-700 cursor-pointer ${
              item.type === type
                ? "bg-primary-700 font-medium"
                : "hover:bg-primary-700/30"
            }`}
          >
            {item.title}
          </button>
        ))}

        <button
          className={`py-1 px-3 sm:py-1.5 sm:px-4 min-w-[70px] text-sm rounded-2xl ring-[1.5px] cursor-pointer inline-flex items-center justify-center gap-1 sm:ml-auto ${
            adult
              ? "ring-primary-700 text-inherit"
              : "ring-secondary-800 text-secondary-500 "
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
                <MediaCard
                  key={item.id}
                  date={item.date}
                  path={`/${item.type}/${item.id}`}
                  rating={item.rating}
                  thumbnail={item.thumbnail}
                  title={item.title}
                />
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
                className="px-5 py-2.5 rounded-sm border border-secondary-700 bg-secondary-800 inline-flex gap-2 hover:bg-secondary-700 duration-200 disabled:cursor-not-allowed disabled:hover:bg-secondary-800"
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
  );
};

export default Search;

// TODO: refactor this code
