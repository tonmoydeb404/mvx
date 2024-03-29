import { HiX } from "react-icons/hi";
import ReactPlayer from "react-player";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { VIDEO_PLACEHOLDER } from "../../config/default-images";
import { closeVideoShowcase, selectVideoShowcase } from "./videoShowcaseSlice";

const VideoShowcase = () => {
  const { show, url } = useAppSelector(selectVideoShowcase);
  const dispatch = useAppDispatch();
  return show && url ? (
    <div className="fixed top-0 left-0 w-full h-full z-[2000] flex flex-col items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-background-base/70 z-[-1]"
        onClick={() => dispatch(closeVideoShowcase())}
      ></div>

      <div className="w-full sm:w-[500px] md:w-[650px] lg:w-[800px] flex flex-col items-center justify-center gap-2">
        <button
          className="p-1.5 duration-300 text-white bg-secondary-base hover:bg-secondary-dark rounded-sm cursor-pointer self-end"
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
            light={
              <img
                src={VIDEO_PLACEHOLDER}
                className="object-cover object-center w-full aspect-video rounded-lg"
                loading="lazy"
              />
            }
            controls
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default VideoShowcase;
