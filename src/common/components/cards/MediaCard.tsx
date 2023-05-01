import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import CircularProgress from "../utils/CircularProgress";

type MovieCardType = {
  thumbnail: string | null;
  title: string;
  date: string;
  path: string;
  rating: number;
};

const MediaCard = ({ date, path, rating, thumbnail, title }: MovieCardType) => {
  // transform image
  const image = thumbnail
    ? `https://image.tmdb.org/t/p/w500${thumbnail}`
    : "/images/no-poster.jpg";
  // format date
  const mediaDate = date
    ? new Date(date).toLocaleString("en-us", {
        month: "short",
        year: "numeric",
        day: "2-digit",
      })
    : "Unknown";

  return (
    <article className="flex flex-col h-full">
      <div className="relative rounded-lg overflow-hidden">
        <Link to={path} title={title}>
          <LazyLoadImage
            src={image}
            alt={title}
            placeholderSrc={"/images/poster-loading.jpg"}
            className="w-full h-[200px] min-[400px]:h-[250px]"
            loading="lazy"
            width={"100%"}
            visibleByDefault={image === "/images/no-poster.jpg"}
          />
        </Link>

        {typeof rating === "number" ? (
          <div className="absolute bottom-2 left-1 inline-flex items-center justify-center pointer-events-none">
            <CircularProgress
              progress={(rating / 10) * 100}
              stroke={3}
              radius={25}
              backgroundClassName="stroke-transparent fill-transparent"
              foregroundClassName="stroke-primary-600 fill-black/70"
            />
            <span className="text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
        ) : null}
      </div>
      <div className="mt-2">
        <Link
          to={path}
          className="sm:text-lg font-medium line-clamp-1 hover:text-primary-600"
        >
          {title}
        </Link>
        <p className="text-xs sm:text-sm mt-0.5 text-secondary-400">
          {mediaDate}
        </p>
      </div>
    </article>
  );
};

export const MediaCardSkeleton = () => {
  return (
    <article className="flex flex-col w-full animate-pulse">
      <div className="h-[200px] rounded-lg min-[400px]:h-[256px] w-full bg-secondary-800"></div>
      <div className="mt-4">
        <div className="w-[80%] h-4 bg-secondary-800 rounded-sm"></div>
        <p className=" mt-1.5 w-[90px] h-2 bg-secondary-800 rounded-sm"></p>
      </div>
    </article>
  );
};

export default MediaCard;
