import { LazyLoadImage } from "react-lazy-load-image-component";
import { BACKDROP_PLACEHOLDER } from "../../../../config/default-images";
import { Asset } from "../../../../types/asset.type";
import { getBackdrop } from "../../../utils/common";

const AssetBackdrop = ({ file_path, aspect_ratio }: Asset) => {
  const src = getBackdrop(file_path);

  return (
    <div
      style={aspect_ratio ? { aspectRatio: aspect_ratio } : {}}
      className={`rounded-lg overflow-hidden w-full relative aspect-video`}
    >
      <LazyLoadImage
        src={src}
        placeholderSrc={BACKDROP_PLACEHOLDER}
        className="object-cover object-center w-full h-full"
        loading="lazy"
        width="100%"
        height="100%"
        visibleByDefault={src === BACKDROP_PLACEHOLDER}
      />
    </div>
  );
};

export const AssetBackdropSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-video rounded-lg overflow-hidden w-full relative bg-secondary-800"></div>
  </div>
);

export default AssetBackdrop;
