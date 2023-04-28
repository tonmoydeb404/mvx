type CircularProgressType = {
  radius: number;
  stroke: number;
  progress: number;
  backgroundClassName?: string;
  foregroundClassName?: string;
};

const CircularProgress = ({
  radius = 0,
  stroke = 0,
  progress = 0,
  backgroundClassName = "fill-transparent stroke-gray-800",
  foregroundClassName = "fill-transparent stroke-blue-500",
}: CircularProgressType) => {
  const size = radius * 2;
  const actualRadius = radius - stroke * 2;

  const length = actualRadius * 2 * Math.PI;
  const dashoffset = length - (progress / 100) * length;

  return (
    <svg height={size} width={size} className="rounded-full">
      <circle
        className={backgroundClassName}
        strokeWidth={stroke}
        r={actualRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        className={foregroundClassName}
        strokeWidth={stroke}
        r={actualRadius}
        cx={radius}
        cy={radius}
        strokeDasharray={`${length}px ${length}px`}
        strokeDashoffset={dashoffset}
      />
    </svg>
  );
};

export default CircularProgress;

// Building a Progress Ring: https://css-tricks.com/building-progress-ring-quickly/
