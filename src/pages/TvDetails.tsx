import { useParams } from "react-router-dom";
import MediaDetails from "../common/components/MediaDetails";
import NotFound from "./error/NotFound";

const TvDetails = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFound />;

  return <MediaDetails id={id} type="tv" />;
};

export default TvDetails;
