import { HiOutlinePlay } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { VIDEO_PLACEHOLDER } from "../../../../config/default-images";
import { Asset } from "../../../../types/asset.type";
import { youtubeThumbnail } from "../../../utils/common";

const AssetVideo = ({ file_path }: Asset) => {
  const src = youtubeThumbnail(file_path);

  return (
    <div className="group">
      <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
        <LazyLoadImage
          src={src}
          alt={file_path}
          placeholderSrc={VIDEO_PLACEHOLDER}
          className="object-cover object-center w-full h-full"
          loading="lazy"
          width="100%"
          height="100%"
          visibleByDefault={src === VIDEO_PLACEHOLDER}
        />

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-secondary-900 bg-opacity-0 hover:bg-opacity-40 duration-300 cursor-pointer">
          <HiOutlinePlay className="text-7xl hover:text-primary-600" />
        </div>
      </div>
    </div>
  );
};

export const AssetVideoSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-video relative rounded-lg overflow-hidden mb-3 w-full bg-secondary-800"></div>
    <div className="h-[24px] bg-secondary-800 w-[150px] rounded"></div>
  </div>
);

export default AssetVideo;
