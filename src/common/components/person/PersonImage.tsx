import { LazyLoadImage } from "react-lazy-load-image-component";
import { MediaImage } from "../../../types/media.type";

const PersonImage = ({ file_path, aspect_ratio }: MediaImage) => {
  const src = `https://image.tmdb.org/t/p/w500${file_path}`;
  const placeholder = "/images/poster-loading.jpg";
  return (
    <div
      className="w-full relative rounded overflow-hidden"
      style={{ aspectRatio: aspect_ratio || 0.667 }}
    >
      <LazyLoadImage
        src={src}
        loading="lazy"
        placeholderSrc={placeholder}
        className="w-full h-full"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export const PersonImageSkeleton = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div
      className={`w-full relative rounded overflow-hidden animate-pulse ${className}`}
      style={{ aspectRatio: 0.667 }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-slate-800"></div>
    </div>
  );
};

export default PersonImage;
