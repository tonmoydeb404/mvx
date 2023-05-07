import { useEffect, useState } from "react";
import {
  useLazyTvImagesQuery,
  useLazyTvVideosQuery,
} from "../../../../api/tvApi";
import { Asset, AssetType } from "../../../../types/asset.type";
import AssetCarousel from "../../carousel/AssetCarousel";
import { Filter } from "../../carousel/CarouselHeader";

type TvAssetsProps = {
  id: string;
  className?: string;
};

const filters: Filter<AssetType>[] = [
  { title: "Videos", value: "video" },
  { title: "Backdrops", value: "backdrop" },
  { title: "Posters", value: "poster" },
];

const TvAssets = ({ id, className }: TvAssetsProps) => {
  const [getVideos] = useLazyTvVideosQuery();
  const [getImages] = useLazyTvImagesQuery();

  const [data, setData] = useState<Asset[] | undefined>(undefined);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);
  const [isEmpty, setEmpty] = useState(false);
  const [type, setType] = useState(filters[0]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        if (type.value === "video") {
          const response = await getVideos(id).unwrap();
          setData(response.results);
          setEmpty(response.results?.length == 0);
        } else {
          const response = await getImages(id).unwrap();
          if (type.value === "backdrop") {
            setData(response.backdrops);
            setEmpty(response.backdrops?.length == 0);
          } else {
            setData(response.posters);
            setEmpty(response.posters?.length == 0);
          }
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id]);

  return (
    <AssetCarousel
      data={data}
      isSuccess={!isLoading && !isError}
      isEmpty={isEmpty}
      isLoading={isLoading}
      id={"movie-assets"}
      isError={isError}
      className={`container ${className}`}
      title="Assets"
      filters={filters}
      filter={type}
      setFilter={setType}
    />
  );
};

export default TvAssets;
