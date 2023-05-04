import { useParams } from "react-router-dom";
import MediaDetails from "../common/components/MediaDetails";
import NotFound from "./error/NotFound";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  if (!id) return <NotFound />;

  return <MediaDetails id={id} type="movie" />;
};

export default MovieDetails;
