import { QueryResponse } from "../../../../types/common.type";
import { PersonDetails as PersonDetailsType } from "../../../../types/person.type";
import { getMediaImage } from "../../../utils/common";
import genderList from "../../../utils/genderList";
import ErrorState from "../../utils/ErrorState";
import PersonSocial, { PersonSocialSkeleton } from "./PersonSocial";

export const PersonDetailsSkeleton = () => {
  return (
    <header className={`animate-pulse mb-28 pt-28`}>
      <div className="container flex flex-col md:flex-row gap-10">
        <div className="w-[90%] h-[400px] min-[350px]:w-[300px] rounded-lg bg-secondary-base"></div>
        <div className="flex-1">
          <h1 className="h-[30px] w-[90%] sm:w-[80%] bg-secondary-base rounded mb-2"></h1>
          <div className="flex items-center gap-2 mb-10">
            <PersonSocialSkeleton />
            <PersonSocialSkeleton />
            <PersonSocialSkeleton />
            <PersonSocialSkeleton />
          </div>

          <h3 className="h-[28px] w-[150px] bg-secondary-base rounded mb-4"></h3>
          <p className="h-[16px] sm:w-[80%] bg-secondary-base rounded mb-2"></p>
          <p className="h-[16px] sm:w-[70%] bg-secondary-base rounded mb-2"></p>
          <p className="h-[16px] sm:w-[75%] bg-secondary-base rounded mb-2"></p>
          <p className="h-[16px] sm:w-[50%] bg-secondary-base rounded mb-20"></p>

          <div className="mb-3 pb-2.5 border-b border-b-secondary-base">
            <div className="h-[18px] sm:w-[350px] rounded bg-secondary-base"></div>
          </div>
          <div className="mb-3 pb-2.5 border-b border-b-secondary-base">
            <div className="h-[18px] sm:w-[380px] rounded bg-secondary-base"></div>
          </div>
          <div className="mb-3 pb-2.5 border-b border-b-secondary-base">
            <div className="h-[18px] sm:w-[400px] rounded bg-secondary-base"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

type PersonDetailsProps = QueryResponse<PersonDetailsType>;

const PersonDetails = ({
  data,
  isError,
  isLoading,
  isSuccess,
}: PersonDetailsProps) => {
  // Success State
  if (!isLoading && isSuccess && data) {
    const image = getMediaImage(data.profile_path, "person");
    return (
      <header className="mb-28 pt-28">
        <div className="container flex flex-col items-start md:flex-row z-[1] relative gap-10">
          <div className="w-[90%] min-[350px]:w-[300px] rounded-lg overflow-hidden ">
            <img src={image} alt={data.name} className="w-full" />
          </div>
          <div className="flex-1">
            <h1 className="font-medium text-2xl sm:text-3xl mb-3">
              {data.name}
            </h1>
            <PersonSocial id={data.id} className="mb-10" />
            {data.biography ? (
              <>
                <h3 className="text-xl mb-2 font-medium">Biography</h3>
                <p className="mb-16 text-background-content-muted leading-relaxed whitespace-pre-wrap">
                  {data.biography}
                </p>
              </>
            ) : null}
            <div className="flex flex-col lg:flex-row lg:items-center gap-y-2 gap-x-5 mb-3 pb-2.5 border-b border-b-secondary-base">
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                <b>Birthdate:</b>
                <span className="text-background-content-muted">
                  {data.birthday}
                </span>
              </div>
              {data.deathday ? (
                <div className="flex flex-wrap gap-4">
                  <b>Death Date</b>
                  <span className="text-background-content-muted">
                    {data.deathday}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="flex flex-col lg:flex-row  gap-y-2 gap-x-4 mb-3 pb-2.5 border-b border-b-secondary-base">
              <b>Place Of Birth</b>
              <span className="text-background-content-muted">
                {data.place_of_birth || "Unknown"}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row gap-y-2 gap-x-5 mb-3 pb-2.5 border-b border-b-secondary-base">
              <div className="flex items-center gap-4">
                <b>Known For: </b>
                <span className="text-background-content-muted">
                  {data.known_for_department}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <b>Gender:</b>
                <span className="text-background-content-muted">
                  {genderList[data.gender] || "Unknown"}
                </span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-y-2 gap-x-4 mb-3 pb-2.5 border-b border-b-secondary-base">
              <b>Known As</b>
              <span className="text-background-content-muted flex-1">
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
  return <PersonDetailsSkeleton />;
};

export default PersonDetails;
