import Header from "./Header";

import CastCredit from "./CastCredit";
import Media from "./Media";
import Recomendations from "./Recomendations";
import Similar from "./Similar";

type MediaDetailsProps = {
  type: "movie" | "tv";
  id: string;
};

const MediaDetails = ({ type, id }: MediaDetailsProps) => {
  return (
    <>
      <Header type={type} id={id} />
      <CastCredit type={type} id={id} />
      <Media type={type} id={id} className="container mb-24" />
      <Similar type={type} id={id} />
      <Recomendations type={type} id={id} />
    </>
  );
};

export default MediaDetails;
