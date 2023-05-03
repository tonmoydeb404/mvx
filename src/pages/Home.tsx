import { useEffect, useState } from "react";
import "swiper/swiper-bundle.css";
import { useLazyGetPopularQuery } from "../api/popularApi";
import { useLazyGetTrendingQuery } from "../api/trendingApi";
import HeroSearch from "../common/components/HeroSearch";
import MediaCarousel from "../common/components/carousel/MediaCarousel";
import { MediaType } from "../types/media.type";
import { TimeType } from "../types/tmdb.type";

const Home = () => {
  const [trendingTime, setTrendingTime] = useState<TimeType>("day");
  const [popularType, setPopularType] = useState<MediaType>("movie");
  const [getTrending, trendingResult] = useLazyGetTrendingQuery();
  const [getPopular, popularResult] = useLazyGetPopularQuery();

  useEffect(() => {
    const fetchData = async () => {
      await getTrending({ type: "all", time: trendingTime });
    };
    fetchData();
  }, [trendingTime]);

  useEffect(() => {
    const fetchData = async () => {
      await getPopular(popularType);
    };

    fetchData();
  }, [popularType]);

  return (
    <main>
      <header className="bg-[url('https://www.themoviedb.org/t/p/w533_and_h300_bestv2/gMJngTNfaqCSCqGD4y8lVMZXKDn.jpg')] bg-no-repeat bg-cover before:block before:absolute before:bottom-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:from-secondary-900/50 before:to-secondary-900 before:backdrop-blur-[2px] before:z-[0] relative ">
        <div className="container flex items-center justify-center min-h-[550px] ">
          <div className="z-[1] relative flex flex-col text-center">
            <h2 className="text-5xl sm:text-6xl font-bold">Wellcome.</h2>
            <p className="sm:text-lg mt-2 mb-10">
              explore your favourite movies & tv shows from here
            </p>

            <HeroSearch />
          </div>
        </div>
      </header>

      <div className="container py-20 flex flex-col gap-y-10 sm:gap-y-20">
        <MediaCarousel<TimeType>
          title="Trending"
          filters={[
            { title: "Today", id: "day" },
            { title: "This Week", id: "week" },
          ]}
          data={trendingResult.data?.results || []}
          filterValue={trendingTime}
          setFilterValue={(filter) => setTrendingTime(filter)}
          isLoading={trendingResult.isLoading || trendingResult.isFetching}
          isSuccess={trendingResult.isSuccess}
          isError={trendingResult.isError}
        />

        <MediaCarousel<MediaType>
          title="Popular"
          filters={[
            { title: "Movies", id: "movie" },
            { title: "Tv Shows", id: "tv" },
          ]}
          data={popularResult.data?.results || []}
          filterValue={popularType}
          setFilterValue={(filter) => setPopularType(filter)}
          isLoading={popularResult.isLoading || popularResult.isFetching}
          isSuccess={popularResult.isSuccess}
          isError={popularResult.isError}
        />
      </div>
    </main>
  );
};

export default Home;
