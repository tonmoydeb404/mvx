import { LazyLoadImage } from "react-lazy-load-image-component";
import { MediaImage } from "../../../../types/media.type";

const ContentBackdropCard = ({ file_path, aspect_ratio }: MediaImage) => {
  const src = `https://image.tmdb.org/t/p/w500${file_path}`;
  const defImage = "/images/poster-loading.jpg";
  return (
    <div
      style={aspect_ratio ? { aspectRatio: aspect_ratio } : {}}
      className={`rounded-lg overflow-hidden w-full relative aspect-video`}
    >
      <LazyLoadImage
        src={src}
        placeholderSrc={defImage}
        className="object-cover object-center w-full h-full"
        loading="lazy"
        width="100%"
        height="100%"
        visibleByDefault={src === defImage}
      />
    </div>
  );
};

export const ContentBackdropCardSkeleton = () => (
  <div className="animate-pulse">
    <div
      className={`aspect-video rounded-lg overflow-hidden w-full relative bg-secondary-800`}
    ></div>
  </div>
);

export default ContentBackdropCard;
