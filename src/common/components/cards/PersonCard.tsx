import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import { PERSON_PLACEHOLDER } from "../../../config/default-images";
import { Person } from "../../../types/person.type";

const PersonCard = ({ profile_path, name, id }: Person) => {
  const image = profile_path
    ? `https://image.tmdb.org/t/p/original${profile_path}`
    : PERSON_PLACEHOLDER;

  return (
    <div className="flex flex-col items-center text-center">
      <Link to={`/person/${id}`} className="block w-full">
        <div className="aspect-square relative rounded-full overflow-hidden mb-5 w-full">
          <LazyLoadImage
            src={image}
            alt={name}
            placeholderSrc={PERSON_PLACEHOLDER}
            className="object-cover object-center w-full h-full"
            loading="lazy"
            width="100%"
            height="100%"
            visibleByDefault={image === PERSON_PLACEHOLDER}
          />
        </div>
      </Link>

      <Link to={`/person/${id}`} className="block">
        <h3
          className="text-xl font-medium line-clamp-1 hover:text-primary-600"
          title={name}
        >
          {name}
        </h3>
      </Link>
    </div>
  );
};

export const PersonCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center text-center animate-pulse">
      <div className="aspect-square relative rounded-full overflow-hidden mb-5 bg-secondary-700 w-full"></div>

      <div className="h-[24px] w-[80%] bg-secondary-700 rounded"></div>
    </div>
  );
};

export default PersonCard;
