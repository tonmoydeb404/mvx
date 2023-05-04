type ContentImageCardProps = {
  src: string;
  type: "backdrops" | "posters";
};

const ContentImageCard = ({ src, type }: ContentImageCardProps) => {
  return (
    <div
      className={`${
        type === "backdrops" ? "relative aspect-video w-full" : ""
      } rounded-lg overflow-hidden`}
    >
      <img
        src={src}
        alt={type}
        className="object-cover object-center w-full h-full"
        loading="lazy"
      />
    </div>
  );
};

export const ContentImageCardSkeleton = ({
  type,
}: {
  type: "backdrops" | "posters";
}) => (
  <div className="animate-pulse">
    <div
      className={` ${
        type === "backdrops" ? "aspect-video" : "aspect-square"
      } rounded-lg overflow-hidden w-full relative bg-secondary-800`}
    ></div>
  </div>
);

export default ContentImageCard;
