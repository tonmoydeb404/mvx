import { PersonDetails } from "../../../types/person.type";
import genderList from "../../utils/genderList";
import { MediaDetailsHeaderSkeleton } from "../MediaDetails/MediaDetailsHeader";
import ErrorState from "../utils/ErrorState";

type PersonDetailsHeaderProps = {
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  data: PersonDetails | undefined;
};

const PersonDetailsHeader = ({
  data,
  isError,
  isLoading,
  isSuccess,
}: PersonDetailsHeaderProps) => {
  // Success State
  if (!isLoading && isSuccess && data) {
    const image = data.profile_path
      ? `https://image.tmdb.org/t/p/w500${data.profile_path}`
      : "/images/poster-loading.jpg";
    return (
      <header className="mb-28 pt-28">
        <div className="container flex flex-col items-start md:flex-row z-[1] relative gap-10">
          <div className="w-[90%] min-[350px]:w-[300px] rounded-lg overflow-hidden ">
            <img src={image} alt={data.name} className="w-full" />
          </div>
          <div className="flex-1">
            <h1 className="font-medium text-2xl sm:text-3xl mb-10">
              {data.name}
            </h1>

            {data.biography ? (
              <>
                <h3 className="text-xl mb-2 font-medium">Biography</h3>
                <p className="mb-16 text-secondary-300 leading-relaxed whitespace-pre-wrap">
                  {data.biography}
                </p>
              </>
            ) : null}
            <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-5 mb-3 pb-2.5 border-b border-b-secondary-700">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <b>Birthdate:</b>
                <span className="text-secondary-400">{data.birthday}</span>
              </div>
              {data.deathday ? (
                <div className="flex flex-wrap gap-4">
                  <b>Death Date</b>
                  <span className="text-secondary-400">{data.deathday}</span>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col lg:flex-row  gap-y-2 gap-x-4 mb-3 pb-2.5 border-b border-b-secondary-700">
              <b>Place Of Birth</b>
              <span className="text-secondary-400">
                {data.place_of_birth || "Unknown"}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row gap-y-2 gap-x-5 mb-3 pb-2.5 border-b border-b-secondary-700">
              <div className="flex items-center gap-4">
                <b>Known For: </b>
                <span className="text-secondary-400">
                  {data.known_for_department}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <b>Gender:</b>
                <span className="text-secondary-400">
                  {genderList[data.gender] || "Unknown"}
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-y-2 gap-x-4 mb-3 pb-2.5 border-b border-b-secondary-700">
              <b>Known As</b>
              <span className="text-secondary-400 flex-1">
                {data.also_known_as.join(", ")}
              </span>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Error State
  if (!isLoading && isError) {
    return <ErrorState className="w-full min-h-screen" />;
  }

  // Loading State
  return <MediaDetailsHeaderSkeleton />;
};

export default PersonDetailsHeader;
