import { LazyLoadImage } from "react-lazy-load-image-component";
import { usePersonImagesQuery } from "../../../api/personApi";

type PersonDetailsImagesProps = {
  id: string;
};

const PersonDetailsImages = ({ id }: PersonDetailsImagesProps) => {
  const { isSuccess, data } = usePersonImagesQuery(id);

  return (
    <div className="container mb-24">
      <h2 className="text-2xl font-medium mb-10">Photos</h2>
      {isSuccess ? (
        <div className="masonry ">
          {data.profiles.map((image) => {
            return (
              <div
                className="mb-4 relative rounded overflow-hidden"
                style={{ aspectRatio: image.aspect_ratio }}
                key={image.file_path}
              >
                <LazyLoadImage
                  src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                  loading="lazy"
                  placeholderSrc={"/images/poster-loading.jpg"}
                  className="object-cover object-center w-full h-full"
                  width={"100%"}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default PersonDetailsImages;
