import { useMovieDetailsQuery } from "../../../api/movieApi";
import { useTvDetailsQuery } from "../../../api/tvApi";
import usdFormat from "../../utils/usdFormat";
import CircularProgress from "../utils/CircularProgress";
import ErrorState from "../utils/ErrorState";

type MediaDetailsHeaderProps = {
  type: "movie" | "tv";
  id: string;
};

const MediaDetailsHeaderSkeleton = () => {
  return (
    <header className={`animate-pulse mb-28 pt-28`}>
      <div className="container flex flex-col md:flex-row gap-10">
        <div className="w-[90%] h-[400px] min-[350px]:w-[300px] rounded-lg bg-secondary-800"></div>
        <div className="flex-1">
          <h1 className="h-[30px] w-[90%] sm:w-[80%] bg-secondary-800 rounded mb-2"></h1>
          <h2 className="h-[20px] w-[150px] bg-secondary-800 rounded mb-10"></h2>

          <h3 className="h-[28px] w-[150px] bg-secondary-800 rounded mb-4"></h3>
          <p className="h-[18px] sm:w-[80%] bg-secondary-800 rounded mb-1.5"></p>
          <p className="h-[18px] sm:w-[70%] bg-secondary-800 rounded mb-1.5"></p>
          <p className="h-[18px] sm:w-[50%] bg-secondary-800 rounded mb-20"></p>

          <div className="mb-3 pb-2.5 border-b border-b-secondary-800">
            <div className="h-[18px] sm:w-[350px] rounded bg-secondary-800"></div>
          </div>
          <div className="mb-3 pb-2.5 border-b border-b-secondary-800">
            <div className="h-[18px] sm:w-[380px] rounded bg-secondary-800"></div>
          </div>
          <div className="mb-3 pb-2.5 border-b border-b-secondary-800">
            <div className="h-[18px] sm:w-[400px] rounded bg-secondary-800"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

const MediaDetailsHeader = ({ id, type }: MediaDetailsHeaderProps) => {
  const { isLoading, isFetching, isError, isSuccess, data } =
    type === "movie" ? useMovieDetailsQuery(id) : useTvDetailsQuery(id);

  if (!isFetching && !isLoading && isSuccess) {
    const background = data.backdrop
      ? `https://image.tmdb.org/t/p/original${data.backdrop}`
      : "";
    const poster = data.thumbnail
      ? `https://image.tmdb.org/t/p/w500${data.thumbnail}`
      : "/images/no-poster.jpg";
    const date = data.date
      ? new Date(data.date).toLocaleString("en-us", {
          month: "short",
          year: "numeric",
          day: "2-digit",
        })
      : "Unknown";
    const runtime = data.runtime
      ? `${Math.floor(data.runtime / 60)}h ${data.runtime % 60}min`
      : "Unknown";
    return (
      <header
        style={{ backgroundImage: `url('${background}')` }}
        className={`bg-no-repeat bg-fixed bg-cover before:block before:absolute before:bottom-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:from-secondary-900/80 before:to-secondary-900 before:backdrop-blur-[1px] before:z-[0] relative mb-28 pt-28`}
      >
        <div className="container flex flex-col md:flex-row z-[1] relative gap-10">
          <div className="w-[90%] min-[350px]:w-[300px] rounded-lg overflow-hidden ">
            <img src={poster} alt={data.title} className="w-full" />
          </div>
          <div className="flex-1">
            <h1 className="font-medium text-2xl sm:text-3xl">{data.title}</h1>
            <h2 className="text-lg text-secondary-300 mb-5">{data.tagline}</h2>
            <div className="flex flex-wrap-reverse gap-3 justify-between mb-10">
              {data.rating ? (
                <div className="relative">
                  <CircularProgress
                    progress={(data.rating / 10) * 100}
                    radius={38}
                    stroke={5}
                    foregroundClassName="stroke-primary-700 fill-secondary-700/70"
                    backgroundClassName="stroke-transparent fill-transparent"
                  />
                  <span className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
                    {data.rating.toFixed(1)}
                  </span>
                </div>
              ) : null}
              {data.genres ? (
                <div className="flex flex-wrap items-center gap-1">
                  {data.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-xs px-2 py-1 bg-primary-600 rounded-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            {data.overview ? (
              <>
                <h3 className="text-[22px] mb-2 font-medium">Overview</h3>
                <p className="mb-16 leading-relaxed">{data.overview}</p>
              </>
            ) : null}
            <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-5 mb-3 pb-2.5 border-b border-b-secondary-700">
              <div className="flex items-center gap-4">
                <b>Release Date:</b>
                <span className="text-secondary-400">{date}</span>
              </div>
              <div className="flex items-center gap-4">
                <b>{data.type === "tv" ? "Average Runtime:" : "Runtime:"}</b>
                <span className="text-secondary-400">{runtime}</span>
              </div>
            </div>
            {data.type === "movie" ? (
              <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-5 mb-3 pb-2.5 border-b border-b-secondary-700">
                <div className="flex items-center gap-4">
                  <b>Budget:</b>
                  <span className="text-secondary-400">
                    {usdFormat.format(data.budget)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <b>Revenue:</b>
                  <span className="text-secondary-400">
                    {usdFormat.format(data.revenue)}
                  </span>
                </div>
              </div>
            ) : (
              <>
                <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-5 mb-3 pb-2.5 border-b border-b-secondary-700">
                  <div className="flex items-center gap-4">
                    <b>Seasons:</b>
                    <span className="text-secondary-400">
                      {data.seasons || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <b>Episodes:</b>
                    <span className="text-secondary-400">
                      {data.episodes || "Unknown"}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-4 mb-3 pb-2.5 border-b border-b-secondary-700">
                  <b>Creators:</b>
                  <span className="text-secondary-400">
                    {data.creators?.length
                      ? data.creators.map((creator) => creator.name).join(", ")
                      : "Unknown"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </header>
    );
  }

  if (!isFetching && !isLoading && isError) {
    return <ErrorState className="w-full min-h-screen" />;
  }

  return <MediaDetailsHeaderSkeleton />;
};

export default MediaDetailsHeader;
