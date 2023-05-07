import { MediaCredit } from "../../../../types/credit.types";
import { getPoster } from "../../../utils/common";
import MediaCard from "./MediaCard";

const MediaCreditCard = ({
  credit,
  rating,
  thumbnail,
  title,
  type,
  id,
}: MediaCredit) => {
  const image = getPoster(thumbnail);
  const path = `/${type}/${id}`;
  return (
    <MediaCard
      image={image}
      path={path}
      progress={rating}
      subtitle={credit}
      title={title}
    />
  );
};

export default MediaCreditCard;
