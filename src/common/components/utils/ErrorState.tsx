import { BiError } from "react-icons/bi";

type ErrorStateProps = {
  className?: string;
  text?: string;
};

const ErrorState = ({
  className = "",
  text = "Something wents to wrong. please try again later.",
}: ErrorStateProps) => {
  return (
    <div
      className={`flex flex-col items-center justify-center opacity-60 sm:text-lg text-center ${className}`}
    >
      <BiError className="text-4xl" />
      <p>{text}</p>
    </div>
  );
};

export default ErrorState;
