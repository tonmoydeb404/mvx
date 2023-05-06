import { usePersonImagesQuery } from "../../../api/personApi";
import PersonImage, { PersonImageSkeleton } from "../person/PersonImage";
import ErrorState from "../utils/ErrorState";

type PersonDetailsImagesProps = {
  id: string;
};

const PersonDetailsImages = ({ id }: PersonDetailsImagesProps) => {
  const { isSuccess, data, isError, isLoading, isFetching } =
    usePersonImagesQuery(id);

  return (
    <div className="container mb-24">
      <h2 className="text-2xl font-medium mb-10">Photos</h2>
      <div className="grid grid-cols-1 min-[320px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {/* Error State */}
        {isError ? (
          <ErrorState className="col-start-1 col-end-[-1] min-h-[200px]" />
        ) : null}

        {/* Loading State */}
        {isLoading || isFetching ? (
          <>
            <PersonImageSkeleton />
            <PersonImageSkeleton className="hidden min-[320px]:block" />
            <PersonImageSkeleton className="hidden md:block" />
            <PersonImageSkeleton className="hidden xl:block" />
          </>
        ) : null}

        {/* Empty State */}
        {!isLoading && !isFetching && isSuccess && !data.profiles.length ? (
          <ErrorState
            className="col-start-1 col-end-[-1] min-h-[200px]"
            text="Sorry we couldn't find anything"
          />
        ) : null}

        {/* Success State */}
        {!isLoading && !isFetching && isSuccess && data.profiles?.length
          ? data.profiles.map((image) => {
              return <PersonImage {...image} key={image.file_path} />;
            })
          : null}
      </div>
    </div>
  );
};

export default PersonDetailsImages;
