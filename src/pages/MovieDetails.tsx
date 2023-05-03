import { useParams } from "react-router-dom";
import {
  useGetMovieCreditsQuery,
  useGetMovieDetailsQuery,
} from "../api/movieApi";
import CircularProgress from "../common/components/utils/CircularProgress";
import usdFormat from "../common/utils/usdFormat";
import NotFound from "./error/NotFound";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFound />;

  const movieDetails = useGetMovieDetailsQuery(id);
  const movieCredits = useGetMovieCreditsQuery(id);

  if (!movieDetails.isLoading && movieDetails.isSuccess) {
    const background = `https://image.tmdb.org/t/p/original${movieDetails.data.backdrop}`;
    const poster = `https://image.tmdb.org/t/p/w500${movieDetails.data.thumbnail}`;
    const date = movieDetails.data.date
      ? new Date(movieDetails.data.date).toLocaleString("en-us", {
          month: "short",
          year: "numeric",
          day: "2-digit",
        })
      : "Unknown";
    const runtime = movieDetails.data.runtime
      ? `${Math.floor(movieDetails.data.runtime / 60)}h ${
          movieDetails.data.runtime % 60
        }min`
      : "Unknown";
    return (
      <>
        <header
          style={{ backgroundImage: `url('${background}')` }}
          className={`bg-no-repeat bg-fixed bg-cover before:block before:absolute before:bottom-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-b before:from-secondary-900/80 before:to-secondary-900 before:backdrop-blur-[1px] before:z-[0] relative mb-28 pt-28`}
        >
          <div className="container flex flex-col md:flex-row z-[1] relative gap-10">
            <div className="w-[90%] min-[350px]:w-[300px] rounded-lg overflow-hidden ">
              <img
                src={poster}
                alt={movieDetails.data.title}
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <h1 className="font-medium text-2xl sm:text-3xl">
                {movieDetails.data.title}
              </h1>
              <h2 className="text-lg text-secondary-300 mb-5">
                {movieDetails.data.tagline}
              </h2>
              <div className="flex flex-wrap-reverse gap-3 justify-between mb-10">
                {movieDetails.data.rating ? (
                  <div className="relative">
                    <CircularProgress
                      progress={(movieDetails.data.rating / 10) * 100}
                      radius={38}
                      stroke={5}
                      foregroundClassName="stroke-primary-700 fill-secondary-700/70"
                      backgroundClassName="stroke-transparent fill-transparent"
                    />
                    <span className="text-xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
                      {movieDetails.data.rating.toFixed(1)}
                    </span>
                  </div>
                ) : null}
                {movieDetails.data.genres ? (
                  <div className="flex flex-wrap items-center gap-1">
                    {movieDetails.data.genres.map((genre) => (
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
              {movieDetails.data.overview ? (
                <>
                  <h3 className="text-[22px] mb-2 font-medium">Overview</h3>
                  <p className="mb-16 leading-relaxed">
                    {movieDetails.data.overview}
                  </p>
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
                    {usdFormat.format(movieDetails.data.budget)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <b>Revenue:</b>
                  <span className="text-secondary-400">
                    {usdFormat.format(movieDetails.data.revenue)}
                  </span>
                </div>
              </div>
              {/* <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-4 mb-3 pb-2.5 border-b border-b-secondary-700">
                <b>Director:</b>
                <span>John Francis Daley, Jonathan M. Goldstein</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-4 mb-3 pb-2.5 border-b border-b-secondary-700">
                <b>Writer:</b>
                <span>
                  John Francis Daley, Chris McKay, Michael Gilio, Michael Gilio,
                  Jonathan M. Goldstein
                </span>
              </div> */}
            </div>
          </div>
        </header>

        {/* Cast */}
        <div className="container mb-24">
          <h2 className="text-2xl font-medium mb-10">Top Cast</h2>
          <div className="grid grid-cols-5 gap-5">
            {movieCredits.isSuccess
              ? movieCredits.data?.cast.map((cast) => (
                  <div
                    className="flex flex-col items-center justify-center"
                    key={cast.id}
                  >
                    <div className="aspect-square relative rounded-full overflow-hidden mb-5">
                      <img
                        src={`https://image.tmdb.org/t/p/original${cast.avatar}`}
                        alt={cast.name}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>

                    <h3 className="text-xl font-medium">{cast.name}</h3>
                    <h4 className="text-base text-secondary-400">
                      {cast.title}
                    </h4>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Writer */}
        <div className="container mb-24">
          <h2 className="text-2xl font-medium mb-10">Writers</h2>
          <div className="grid grid-cols-5 gap-5">
            {movieCredits.isSuccess
              ? movieCredits.data?.writer.map((writer) => (
                  <div
                    className="flex flex-col items-center justify-center"
                    key={writer.id}
                  >
                    <div className="aspect-square relative rounded-full overflow-hidden mb-5">
                      <img
                        src={`https://image.tmdb.org/t/p/original${writer.avatar}`}
                        alt={writer.name}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>

                    <h3 className="text-xl font-medium">{writer.name}</h3>
                    <h4 className="text-base text-secondary-400">
                      {writer.title}
                    </h4>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Directors */}
        <div className="container mb-24">
          <h2 className="text-2xl font-medium mb-10">Directors</h2>
          <div className="grid grid-cols-5 gap-5">
            {movieCredits.isSuccess
              ? movieCredits.data?.director.map((director) => (
                  <div className="flex flex-col items-center" key={director.id}>
                    <div className="aspect-square relative rounded-full overflow-hidden mb-5">
                      <img
                        src={`https://image.tmdb.org/t/p/original${director.avatar}`}
                        alt={director.name}
                        className="object-cover object-center w-full h-full"
                      />
                    </div>

                    <h3 className="text-xl font-medium text-center">
                      {director.name}
                    </h3>
                    <h4 className="text-base text-secondary-400">
                      {director.title}
                    </h4>
                  </div>
                ))
              : null}
          </div>
        </div>

        {/* Videos */}
        <div className="container pb-20">
          <h2 className="text-2xl font-medium mb-10">Videos</h2>
          <div className="grid grid-cols-3 gap-5">
            <div>
              <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
                <img
                  src="https://image.tmdb.org/t/p/original/d8hGMH1igEFnpNFEEFdP3yFHV3U.jpg"
                  alt="nothing"
                  className="object-cover object-center w-full h-full"
                />
              </div>

              <h3 className="text-lg font-medium">Chris Pine</h3>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!movieDetails.isLoading && movieDetails.isError) {
    return <p>something wents to wrong!</p>;
  }

  return <p>loading</p>;
};

export default MovieDetails;
