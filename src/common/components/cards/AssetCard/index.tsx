import { Asset, AssetType } from "../../../../types/asset.type";
import AssetBackdrop, { AssetBackdropSkeleton } from "./AssetBackdrop";
import AssetPoster, { AssetPosterSkeleton } from "./AssetPoster";
import AssetVideo, { AssetVideoSkeleton } from "./AssetVideo";

export const AssetCardSkeleton = ({ type }: { type?: AssetType }) => {
  if (type === "video") {
    return <AssetVideoSkeleton />;
  }
  if (type === "backdrop") {
    return <AssetBackdropSkeleton />;
  }
  return <AssetPosterSkeleton />;
};

const AssetCard = (props: Asset) => {
  if (props.type === "video") {
    return <AssetVideo {...props} />;
  }
  if (props.type === "backdrop") {
    return <AssetBackdrop {...props} />;
  }
  return <AssetPoster {...props} />;
};

export default AssetCard;
