import { useMovieCreditsQuery } from "../../../../api/movieApi";
import PersonCreditCarousel from "../../carousel/PersonCreditCarousel";

type MovieCastsProps = {
  id: string;
  className?: string;
};

const MovieCasts = ({ id, className }: MovieCastsProps) => {
  const { isError, isFetching, isLoading, isSuccess, data } =
    useMovieCreditsQuery(id);

  return (
    <PersonCreditCarousel
      data={data?.cast}
      isSuccess={isSuccess}
      isEmpty={isSuccess && data.cast.length === 0}
      isLoading={isLoading || isFetching}
      id={"person-credit"}
      isError={isError}
      className={`container ${className}`}
      title="Casts"
      filters={false}
    />
  );
};

export default MovieCasts;
