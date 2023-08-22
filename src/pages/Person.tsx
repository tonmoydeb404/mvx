import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { usePersonDetailsQuery } from "../api/personApi";
import PersonCredits from "../common/components/pages/person/PersonCredits";
import PersonDetails from "../common/components/pages/person/PersonDetails";
import PersonImages from "../common/components/pages/person/PersonImages";
import NotFound from "./error/NotFound";

const Person = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFound />;

  const { isError, isFetching, isLoading, isSuccess, data, error } =
    usePersonDetailsQuery(id);

  // handle not found
  if (isError && "status" in error && error?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      <Helmet>{isSuccess ? <title>{data.name} - MVX</title> : null}</Helmet>
      <PersonDetails
        isError={isError}
        isLoading={isLoading || isFetching}
        data={data}
        isSuccess={isSuccess}
        isEmpty={isSuccess && !data}
      />
      <PersonCredits id={id} className="mb-24" />
      <PersonImages id={id} />
    </>
  );
};

export default Person;
