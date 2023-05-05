import MediaDetailsCast from "./MediaDetailsCast";
import MediaDetailsContent from "./MediaDetailsContent";
import MediaDetailsHeader from "./MediaDetailsHeader";
import MediaDetailsRecomendations from "./MediaDetailsRecomendations";
import MediaDetailsSimilar from "./MediaDetailsSimilar";

type MediaDetailsProps = {
  type: "movie" | "tv";
  id: string;
};

const MediaDetails = ({ type, id }: MediaDetailsProps) => {
  return (
    <>
      <MediaDetailsHeader type={type} id={id} />
      <MediaDetailsCast type={type} id={id} />
      <MediaDetailsContent type={type} id={id} className="container mb-24" />
      <MediaDetailsSimilar type={type} id={id} />
      <MediaDetailsRecomendations type={type} id={id} />
    </>
  );
};

export default MediaDetails;
