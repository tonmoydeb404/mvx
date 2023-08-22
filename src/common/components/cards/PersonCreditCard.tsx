import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import {
  PERSON_EMPTY_PLACEHOLDER,
  PERSON_PLACEHOLDER,
} from "../../../config/default-images";
import { PersonCredit } from "../../../types/credit.types";

const PersonCreditCard = ({ profile_path, name, credit, id }: PersonCredit) => {
  const image = profile_path
    ? `https://image.tmdb.org/t/p/original${profile_path}`
    : PERSON_EMPTY_PLACEHOLDER;

  return (
    <div className="flex flex-col items-center text-center">
      <Link to={`/persons/${id}`} className="block w-full">
        <div className="aspect-square relative rounded-full overflow-hidden mb-5 w-full">
          <LazyLoadImage
            src={image}
            alt={name}
            placeholderSrc={PERSON_PLACEHOLDER}
            className="object-cover object-center w-full h-full"
            wrapperClassName="!bg-cover !bg-center"
            loading="lazy"
            width="100%"
            height="100%"
            visibleByDefault={image === PERSON_EMPTY_PLACEHOLDER}
          />
        </div>
      </Link>

      <Link to={`/persons/${id}`} className="block">
        <h3
          className="text-xl font-medium line-clamp-1 hover:text-primary-600"
          title={name}
        >
          {name}
        </h3>
      </Link>
      <h4 className="text-base text-secondary-400 line-clamp-1" title={credit}>
        {credit}
      </h4>
    </div>
  );
};

export const PersonCreditCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center text-center animate-pulse">
      <div className="aspect-square relative rounded-full overflow-hidden mb-5 bg-secondary-700 w-full"></div>

      <div className="h-[24px] w-[80%] bg-secondary-700 rounded"></div>
      <div className="h-[20px] w-[100px] bg-secondary-700 mt-2 rounded"></div>
    </div>
  );
};

export default PersonCreditCard;
