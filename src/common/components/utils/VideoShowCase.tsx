import { HiX } from "react-icons/hi";
import ReactPlayer from "react-player";

type VideoShowCaseProps = {
  src: string | null;
  onHide: () => any;
};

const VideoShowCase = ({ onHide, src }: VideoShowCaseProps) => {
  return src ? (
    <div className="fixed top-0 left-0 w-full h-full z-[2000] flex flex-col items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-secondary-900/70 z-[-1]"
        onClick={onHide}
      ></div>

      <div className="w-full sm:w-[500px] md:w-[650px] lg:w-[800px] flex flex-col items-center justify-center gap-2">
        <button
          className="p-1.5 duration-300 text-white bg-secondary-700 hover:bg-secondary-800 rounded-sm cursor-pointer self-end"
          onClick={onHide}
        >
          <HiX className="text-2xl" />
        </button>
        <div className="aspect-video relative w-full">
          <ReactPlayer
            url={src}
            className="absolute top-0 left-0"
            width="100%"
            height="100%"
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default VideoShowCase;
