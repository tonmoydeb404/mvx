import { HiOutlinePlay } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAppDispatch } from "../../../../app/hooks";
import { VIDEO_PLACEHOLDER } from "../../../../config/default-images";
import { openVideoShowcase } from "../../../../features/videoShowcase/videoShowcaseSlice";
import { Asset } from "../../../../types/asset.type";
import { youtubeThumbnail, youtubeUrl } from "../../../utils/common";

const AssetVideo = ({ file_path }: Asset) => {
  const dispatch = useAppDispatch();
  const src = youtubeThumbnail(file_path);
  const url = youtubeUrl(file_path);

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

        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-background-base bg-opacity-0 hover:bg-opacity-40 duration-300">
          <HiOutlinePlay
            className="text-7xl hover:text-primary-base cursor-pointer"
            onClick={() => dispatch(openVideoShowcase(url))}
          />
        </div>
      </div>
    </div>
  );
};

export const AssetVideoSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-video relative rounded-lg overflow-hidden mb-3 w-full bg-secondary-base"></div>
    <div className="h-[24px] bg-secondary-base w-[150px] rounded"></div>
  </div>
);

export default AssetVideo;
