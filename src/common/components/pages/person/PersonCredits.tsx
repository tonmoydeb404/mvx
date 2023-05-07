import { useState } from "react";
import { usePersonCreditsQuery } from "../../../../api/personApi";
import { Filter } from "../../carousel/CarouselHeader";
import MediaCreditCarousel from "../../carousel/MediaCreditCarousel";

type CreditType = "cast" | "crew";

type PersonCreditsProps = {
  id: string;
  className?: string;
};

const creditList: Filter<CreditType>[] = [
  { title: "Cast", value: "cast" },
  { title: "Crew", value: "crew" },
];

const PersonCredits = ({ id, className = "" }: PersonCreditsProps) => {
  const { isLoading, isError, isSuccess, data, isFetching } =
    usePersonCreditsQuery(id);
  const [creditType, setCreditType] = useState(creditList[0]);

  return (
    <MediaCreditCarousel
      data={data?.[creditType.value]}
      isSuccess={isSuccess}
      isEmpty={isSuccess && data[creditType.value]?.length === 0}
      isLoading={isLoading || isFetching}
      id={"person-credit"}
      isError={isError}
      className={`container ${className}`}
      title="Smilar Movies"
      filters={creditList}
      filter={creditType}
      setFilter={setCreditType}
    />
  );
};

export default PersonCredits;
