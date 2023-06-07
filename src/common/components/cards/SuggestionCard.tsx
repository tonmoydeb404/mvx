import { Link } from "react-router-dom";
import { useMovieDetailsQuery } from "../../../api/movieApi";
import { useTvDetailsQuery } from "../../../api/tvApi";
import { Suggestion } from "../../../types/suggestion.type";
import { getPoster } from "../../utils/common";
import ErrorState from "../utils/ErrorState";

const SuggestionCardSkeleton = () => {
  return (
    <div className="flex items-start gap-3 bg-secondary-800 p-3 rounded-lg animate-pulse">
      <div className="w-[150px] relative aspect-[0.667] rounded-lg bg-secondary-700"></div>
      <div className="flex-1">
        <div className="w-[200px] h-[24px] bg-secondary-700 rounded mb-4"></div>
        <div className="w-[80%] h-[15px] bg-secondary-700 rounded mb-1.5"></div>
        <div className="w-[65%] h-[15px] bg-secondary-700 rounded mb-1.5"></div>
        <div className="w-[75%] h-[15px] bg-secondary-700 rounded mb-1.5"></div>
        <div className="w-[50%] h-[15px] bg-secondary-700 rounded mb-1.5"></div>
      </div>
    </div>
  );
};

const SuggestionCard = ({ id, title, media_type }: Suggestion) => {
  const { isSuccess, data, isFetching, isLoading, isError } =
    media_type === "movie" ? useMovieDetailsQuery(id) : useTvDetailsQuery(id);

  if (!isLoading && !isFetching && isError) {
    return (
      <div className="bg-secondary-800 p-3 rounded-lg flex items-center justify-center">
        <ErrorState className="min-h-[200px]" />
      </div>
    );
  }

  if (!isLoading && !isFetching && isSuccess && data) {
    return (
      <div className="flex items-start gap-3 bg-secondary-800 p-3 rounded-lg">
        <div className="w-[150px] relative aspect-[0.667] rounded-lg overflow-hidden">
          <img
            src={getPoster(data?.poster_path || null)}
            alt={title}
            className="object-cover object-center w-full h-full"
          />
        </div>
        <div className="flex-1">
          <Link
            target="_blank"
            className="text-lg font-medium mb-1 block"
            to={`/${media_type}/${id}`}
          >
            {title}
          </Link>
          <p className="text-[15px] leading-snug text-secondary-300">
            {data?.overview}
          </p>
        </div>
      </div>
    );
  }

  return <SuggestionCardSkeleton />;
};

export default SuggestionCard;

// TODO: make ai suggesiton modular and make an api endpoint in RTK query
