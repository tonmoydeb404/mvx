import { useParams } from "react-router-dom";
import { useTvDetailsQuery } from "../api/tvApi";
import TvAssets from "../common/components/pages/tv/TvAssets";
import TvCasts from "../common/components/pages/tv/TvCasts";
import TvDetails from "../common/components/pages/tv/TvDetails";
import TvRecomendations from "../common/components/pages/tv/TvRecomendations";
import TvSimilar from "../common/components/pages/tv/TvSimilar";
import NotFound from "./error/NotFound";

const Tv = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFound />;

  const { isError, isFetching, isLoading, isSuccess, data, error } =
    useTvDetailsQuery(id);

  // handle not found
  if (isError && "status" in error && error?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      <TvDetails
        isSuccess={isSuccess}
        isLoading={isFetching || isLoading}
        isError={isError}
        data={data}
      />
      <TvCasts id={id} className="mb-24" />
      <TvAssets id={id} className="mb-24" />
      <TvSimilar id={id} className="mb-24" />
      <TvRecomendations id={id} className="mb-24" />
    </>
  );
};

export default Tv;
