import { HiOutlinePlay } from "react-icons/hi";

type ContentVideoCardProps = {
  src: string;
  title?: string;
};

const ContentVideoCard = ({ src, title }: ContentVideoCardProps) => {
  return (
    <div className="group">
      <div className="aspect-video relative rounded-lg overflow-hidden mb-3">
        <img
          src={src}
          alt={title}
          className="object-cover object-center w-full h-full"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-secondary-900/40 opacity-0 hover:opacity-100 duration-300 cursor-pointer">
          <HiOutlinePlay className="text-7xl hover:text-primary-600" />
        </div>
      </div>

      {title ? (
        <h3 className="text-lg font-medium line-clamp-1 cursor-pointer hover:text-primary-600">
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
