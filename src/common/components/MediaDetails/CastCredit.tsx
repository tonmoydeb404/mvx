import { useMovieCreditsQuery } from "../../../api/movieApi";
import { useTvCreditsQuery } from "../../../api/tvApi";
import CreditCarousel from "../carousel/CreditCarousel";

type CastCreditProps = {
  type: "movie" | "tv";
  id: string;
};

const CastCredit = ({ type, id }: CastCreditProps) => {
  const creditData =
    type === "movie" ? useMovieCreditsQuery(id) : useTvCreditsQuery(id);

  return (
    <CreditCarousel
      creditList={creditData.isSuccess ? creditData.data.cast : []}
      isError={creditData.isError}
      isLoading={creditData.isLoading || creditData.isFetching}
      isSuccess={creditData.isSuccess}
      title="Casts"
      className="container mb-24"
    />
  );
};

export default CastCredit;
