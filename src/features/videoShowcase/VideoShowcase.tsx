import { HiX } from "react-icons/hi";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { closeVideoShowcase, selectVideoShowcase } from "./videoShowcaseSlice";

const VideoShowcase = () => {
  const { show, url } = useAppSelector(selectVideoShowcase);
  const dispatch = useAppDispatch();
  return show && url ? (
    <div className="fixed top-0 left-0 w-full h-full z-[2000] flex flex-col items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-secondary-900/70 z-[-1]"
        onClick={() => dispatch(closeVideoShowcase())}
      ></div>

      <div className="w-full sm:w-[500px] md:w-[650px] lg:w-[800px] flex flex-col items-center justify-center gap-2">
        <button
          className="p-1.5 duration-300 text-white bg-secondary-700 hover:bg-secondary-800 rounded-sm cursor-pointer self-end"
          onClick={() => dispatch(closeVideoShowcase())}
        >
          <HiX className="text-2xl" />
        </button>
        <div className="aspect-video relative w-full">
          <ReactPlayer
            url={url}
            className="absolute top-0 left-0"
            width="100%"
            height="100%"
            controls
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default VideoShowcase;
