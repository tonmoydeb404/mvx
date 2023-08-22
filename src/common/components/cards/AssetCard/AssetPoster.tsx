import { LazyLoadImage } from "react-lazy-load-image-component";

import { POSTER_PLACEHOLDER } from "../../../../config/default-images";
import { Asset } from "../../../../types/asset.type";
import { getPoster } from "../../../utils/common";

const AssetPoster = ({ file_path, aspect_ratio }: Asset) => {
  const src = getPoster(file_path);
  return (
    <div
      style={aspect_ratio ? { aspectRatio: aspect_ratio } : {}}
      className={`rounded-lg overflow-hidden w-full relative`}
    >
      <LazyLoadImage
        src={src}
        placeholderSrc={POSTER_PLACEHOLDER}
        className="object-cover object-center w-full h-full"
        loading="lazy"
        width="100%"
        height="100%"
        visibleByDefault={src === POSTER_PLACEHOLDER}
      />
    </div>
  );
};

export const AssetPosterSkeleton = () => (
  <div className="animate-pulse">
    <div
      style={{ aspectRatio: 0.667 }}
      className="rounded-lg overflow-hidden w-full relative bg-secondary-base"
    ></div>
  </div>
);

export default AssetPoster;
