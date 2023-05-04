import { MediaCredit } from "../../../types/media.type";

const CreditCard = ({ avatar, name, credit }: MediaCredit) => {
  const image = avatar
    ? `https://image.tmdb.org/t/p/original${avatar}`
    : "/images/poster-loading.jpg";
  return (
    <div className="flex flex-col items-center text-center">
      <div className="aspect-square relative rounded-full overflow-hidden mb-5">
        <img
          src={image}
          alt={name}
          className="object-cover object-center w-full h-full"
        />
      </div>

      <h3 className="text-xl font-medium line-clamp-1" title={name}>
        {name}
      </h3>
      <h4 className="text-base text-secondary-400 line-clamp-1" title={credit}>
        {credit}
      </h4>
    </div>
  );
};

export const CreditCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center text-center animate-pulse">
      <div className="aspect-square relative rounded-full overflow-hidden mb-5 bg-secondary-700 w-full"></div>

      <div className="h-[24px] w-[80%] bg-secondary-700 rounded"></div>
      <div className="h-[20px] w-[100px] bg-secondary-700 mt-2 rounded"></div>
    </div>
  );
};

export default CreditCard;
