import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import {
  POSTER_EMPTY_PLACEHOLDER,
  POSTER_PLACEHOLDER,
} from "../../../../config/default-images";
import CircularProgress from "../../utils/CircularProgress";

type MediaCardProps = {
  image: string;
  title: string;
  subtitle: string;
  progress: number | null;
  path: string;
};

const MediaCard = ({
  image,
  path,
  progress,
  subtitle,
  title,
}: MediaCardProps) => {
  return (
    <article className="flex flex-col">
      <div className="relative ">
        <Link to={path} title={title} className="block">
          <div className="relative aspect-[0.667] rounded-lg overflow-hidden">
            <LazyLoadImage
              src={image}
              alt={title}
              placeholderSrc={POSTER_PLACEHOLDER}
              className="object-cover object-center w-full h-full"
              loading="lazy"
              width={"100%"}
              height={"100%"}
              visibleByDefault={image === POSTER_EMPTY_PLACEHOLDER}
            />
          </div>
        </Link>

        {progress ? (
          <div className="absolute bottom-2 left-1 inline-flex items-center justify-center pointer-events-none">
            <CircularProgress
              progress={(progress / 10) * 100}
              stroke={3}
              radius={25}
              backgroundClassName="stroke-transparent fill-transparent"
              foregroundClassName="stroke-primary-base fill-black/70"
            />
            <span className="text-base absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-medium">
              {progress.toFixed(1)}
            </span>
          </div>
        ) : null}
      </div>
      <div className="mt-2">
        <Link
          to={path}
          className="sm:text-lg font-medium line-clamp-1 hover:text-primary-base"
        >
          {title}
        </Link>
        <p className="text-xs sm:text-sm mt-0.5 text-background-content-muted">
          {subtitle}
        </p>
      </div>
    </article>
  );
};

export const MediaCardSkeleton = () => {
  return (
    <article className="flex flex-col w-full animate-pulse">
      <div className="h-[200px] rounded-lg min-[400px]:h-[256px] w-full bg-secondary-base"></div>
      <div className="mt-4">
        <div className="w-[80%] h-4 bg-secondary-base rounded-sm"></div>
        <p className=" mt-1.5 w-[90px] h-2 bg-secondary-base rounded-sm"></p>
      </div>
    </article>
  );
};

export default MediaCard;
