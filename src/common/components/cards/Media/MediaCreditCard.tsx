import { MediaCredit } from "../../../../types/credit.types";
import { getMediaImage } from "../../../utils/common";
import MediaCard from "./MediaCard";

const MediaCreditCard = ({
  credit,
  rating,
  thumbnail,
  title,
  type,
  id,
}: MediaCredit) => {
  const image = getMediaImage(thumbnail, type);
  const path = `/${type}s/${id}`;
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
