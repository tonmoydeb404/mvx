import { useParams } from "react-router-dom";
import { usePersonDetailsQuery } from "../api/personApi";
import PersonDetailsCredit from "../common/components/PersonDetails/PersonDetailsCredit";
import PersonDetailsHeader from "../common/components/PersonDetails/PersonDetailsHeader";
import PersonDetailsImages from "../common/components/PersonDetails/PersonDetailsImages";
import NotFound from "./error/NotFound";

const Person = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFound />;

  const person = usePersonDetailsQuery(id);

  // TODO: Handle not found
  // if (person.isError && status in person.error) {
  //   return <NotFound />;
  // }

  return (
    <>
      <PersonDetailsHeader
        isError={person.isError}
        isLoading={person.isLoading || person.isFetching}
        data={person.data}
        isSuccess={person.isSuccess}
      />
      <PersonDetailsCredit id={id} />
      <PersonDetailsImages id={id} />
    </>
  );
};

export default Person;
