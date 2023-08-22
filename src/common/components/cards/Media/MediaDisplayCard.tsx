import { Media } from "../../../../types/media.type";
import { dateFormat, getMediaImage } from "../../../utils/common";
import MediaCard from "./MediaCard";

const MediaDisplayCard = ({
  date,
  rating,
  thumbnail,
  title,
  type,
  id,
}: Media) => {
  const image = getMediaImage(thumbnail, type);
  const mediaDate = dateFormat(date) || "Unknown";
  const path = `/${type}s/${id}`;
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
