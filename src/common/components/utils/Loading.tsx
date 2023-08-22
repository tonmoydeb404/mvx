import { CgSpinner } from "react-icons/cg";

const Loading = ({ className = "" }: { className?: string }) => {
  return (
    <div className="py-10 col-[1/-1]  grid-cols-[1fr] flex items-center justify-center">
      <CgSpinner
        className={`animate-spin text-primary-base text-5xl ${className}`}
      />
    </div>
  );
};

export default Loading;
