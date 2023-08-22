import {
  FaFacebookSquare,
  FaImdb,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import { usePersonSocialQuery } from "../../../../api/personApi";

export const PersonSocialSkeleton = () => (
  <div className="animate-pulse">
    <div className="w-[26px] h-[26px] bg-secondary-base rounded-sm"></div>
  </div>
);

type PersonSocialProps = {
  id: number | string;
  className?: string;
};

const PersonSocial = ({ id, className = "" }: PersonSocialProps) => {
  const { isSuccess, data, isLoading } = usePersonSocialQuery(id);

  return (
    <div
      className={`flex items-center gap-2 flex-wrap text-[26px] ${className}`}
    >
      {/* Loading State */}
      {isLoading ? (
        <>
          <PersonSocialSkeleton />
          <PersonSocialSkeleton />
          <PersonSocialSkeleton />
          <PersonSocialSkeleton />
        </>
      ) : null}

      {/* Success State */}
      {isSuccess ? (
        <>
          {data.facebook_id ? (
            <a
              target="_blank"
              href={`https://facebook.com/${data.facebook_id}`}
            >
              <FaFacebookSquare />
            </a>
          ) : null}
          {data.imdb_id ? (
            <a target="_blank" href={`https://imdb.com/name/${data.imdb_id}`}>
              <FaImdb />
            </a>
          ) : null}
          {data.instagram_id ? (
            <a
              target="_blank"
              href={`https://instagram.com/${data.instagram_id}`}
            >
              <FaInstagram />
            </a>
          ) : null}
          {data.twitter_id ? (
            <a target="_blank" href={`https://twitter.com/${data.twitter_id}`}>
              <FaTwitterSquare />
            </a>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default PersonSocial;
