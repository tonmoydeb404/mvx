import { QueryResponse } from "../../../../types/common.type";
import { MovieDetails as MovieDetailsType } from "../../../../types/movie.type";
import {
  dateFormat,
  formatRuntime,
  getBackdrop,
  getPoster,
  usdFormat,
} from "../../../utils/common";

import CircularProgress from "../../utils/CircularProgress";
import ErrorState from "../../utils/ErrorState";

type MovieDetailsProps = QueryResponse<MovieDetailsType>;

export const MovieDetailsSkeleton = () => {
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

const MovieDetails = ({
  data,
  isError,
  isLoading,
  isSuccess,
}: MovieDetailsProps) => {
  // success state
  if (!isLoading && isSuccess && data) {
    const background = getBackdrop(data.backdrop_path);
    const poster = getPoster(data.poster_path);
    const date = dateFormat(data.release_date) || "Unknown";
    const runtime = formatRuntime(data.runtime) || "Unknown";
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
              {data.vote_average ? (
                <div className="relative">
                  <CircularProgress
                    progress={(data.vote_average / 10) * 100}
                    radius={38}
                    stroke={5}
                    foregroundClassName="stroke-primary-700 fill-secondary-700/70"
                    backgroundClassName="stroke-transparent fill-transparent"
                  />
                  <span className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
                    {data.vote_average.toFixed(1)}
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
                <b>Runtime:</b>
                <span className="text-secondary-400">{runtime}</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-5 mb-3 pb-2.5 border-b border-b-secondary-700">
              <div className="flex items-center gap-4">
                <b>Budget:</b>
                <span className="text-secondary-400">
                  {usdFormat(data.budget)}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <b>Revenue:</b>
                <span className="text-secondary-400">
                  {usdFormat(data.revenue)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // error state
  if (!isLoading && isError) {
    return <ErrorState className="w-full min-h-screen" />;
  }

  // Loading state
  return <MovieDetailsSkeleton />;
};

export default MovieDetails;
