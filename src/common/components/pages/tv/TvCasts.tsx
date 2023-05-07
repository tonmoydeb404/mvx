import { useTvCreditsQuery } from "../../../../api/tvApi";
import PersonCreditCarousel from "../../carousel/PersonCreditCarousel";

type TvCastsProps = {
  id: string;
  className?: string;
};

const TvCasts = ({ id, className }: TvCastsProps) => {
  const { isError, isFetching, isLoading, isSuccess, data } =
    useTvCreditsQuery(id);

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

export default TvCasts;
