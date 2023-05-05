import { HiOutlinePlay } from "react-icons/hi";
import { LazyLoadImage } from "react-lazy-load-image-component";

type ContentVideoCardProps = {
  src: string;
  title?: string;
  onClick?: () => any;
};

const ContentVideoCard = ({
  src,
  title,
  onClick = () => {},
}: ContentVideoCardProps) => {
  const defImage = "/images/poster-loading.jpg";
  return (
    <div className="group">
      <div
        className="aspect-video relative rounded-lg overflow-hidden mb-3"
        onClick={onClick}
      >
        <LazyLoadImage
          src={src}
          alt={title}
          placeholderSrc={defImage}
          className="object-cover object-center w-full h-full"
          loading="lazy"
          width="100%"
          height="100%"
          visibleByDefault={src === defImage}
        />
        <img
          src={src}
          alt={title}
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-secondary-900 bg-opacity-0 hover:bg-opacity-40 duration-300 cursor-pointer">
          <HiOutlinePlay className="text-7xl hover:text-primary-600" />
        </div>
      </div>

      {title ? (
        <h3
          onClick={onClick}
          className="text-lg font-medium line-clamp-1 cursor-pointer hover:text-primary-600"
        >
          {title}
        </h3>
      ) : null}
    </div>
  );
};

export const ContentVideoCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="aspect-video relative rounded-lg overflow-hidden mb-3 w-full bg-secondary-800"></div>
    <div className="h-[24px] bg-secondary-800 w-[150px] rounded"></div>
  </div>
);

export default ContentVideoCard;
