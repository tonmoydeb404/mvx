import { LazyLoadImage } from "react-lazy-load-image-component";
import { PERSON_PLACEHOLDER } from "../../../../config/default-images";
import { Asset } from "../../../../types/asset.type";
import { getPoster } from "../../../utils/common";

const AssetProfile = ({ file_path, aspect_ratio }: Asset) => {
  const src = getPoster(file_path);
  return (
    <div
      className="w-full relative rounded overflow-hidden"
      style={{ aspectRatio: aspect_ratio || 0.667 }}
    >
      <LazyLoadImage
        src={src}
        loading="lazy"
        placeholderSrc={PERSON_PLACEHOLDER}
        className="w-full h-full"
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export const AssetProfileSkeleton = ({
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

export default AssetProfile;
