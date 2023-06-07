import { useGetTrendingQuery } from "../../../../api/trendingApi";
import { getBackdrop } from "../../../utils/common";
import HeroSearch from "./HeroSearch";

const Hero = () => {
  const { isSuccess, data } = useGetTrendingQuery({ time: "day", type: "all" });

  // get all items that have backdrops
  const items = isSuccess
    ? data.results.filter((item) => typeof item.backdrop === "string")
    : null;
  // get a random backdrop
  const backdrop_id = items
    ? items[Math.floor(Math.random() * items.length)].backdrop
    : null;
  const backdrop = backdrop_id ? getBackdrop(backdrop_id) : null;
  return (
    <header
      style={{
        backgroundImage: backdrop ? `url('${backdrop}')` : "unset",
      }}
      className="bg-overlay"
    >
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
  );
};

export default Hero;
