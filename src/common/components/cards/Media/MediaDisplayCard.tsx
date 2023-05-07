import { Media } from "../../../../types/media.type";
import { dateFormat, getPoster } from "../../../utils/common";
import MediaCard from "./MediaCard";

const MediaDisplayCard = ({
  date,
  rating,
  thumbnail,
  title,
  type,
  id,
}: Media) => {
  const image = getPoster(thumbnail);
  const mediaDate = dateFormat(date) || "Unknown";
  const path = `/${type}/${id}`;
  return (
    <MediaCard
      image={image}
      path={path}
      progress={rating}
      subtitle={mediaDate}
      title={title}
    />
  );
};

export default MediaDisplayCard;
