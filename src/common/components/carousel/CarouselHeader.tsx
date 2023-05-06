import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

export type Filter<T = string> = {
  title: string;
  value: T;
};

type Props = { title: string; className?: string; id: string };

type WithFilter<F> = {
  filter: F;
  filters: F[];
  setFilter: (f: F) => any;
} & Props;

type WithOutFilter = {
  filters: false;
  filter?: undefined;
  setFilter?: undefined;
} & Props;

export type CarouselHeaderProps<F> = WithOutFilter | WithFilter<F>;

const CarouselHeader = <F extends Filter>({
  filter,
  filters,
  setFilter,
  title,
  className = "",
  id,
}: CarouselHeaderProps<F>) => {
  return (
    <div className={`flex flex-wrap items-center mb-10 gap-5 ${className}`}>
      <h2 className="text-2xl font-medium">{title}</h2>

      <div className="sm:order-3 inline-flex gap-1 ml-auto">
        <button
          id={`prev-${id}`}
          className="p-1.5 disabled:opacity-30 duration-300 text-white bg-secondary-800 hover:bg-secondary-700 rounded-sm cursor-pointer"
        >
          <HiChevronLeft className="text-2xl" />
        </button>
        <button
          id={`next-${id}`}
          className="p-1.5 disabled:opacity-30 duration-300 text-white bg-secondary-800 hover:bg-secondary-700 rounded-sm cursor-pointer"
        >
          <HiChevronRight className="text-2xl" />
        </button>
      </div>

      {filters ? (
        <div className="flex w-full sm:w-auto sm:order-2 items-stretch flex-wrap gap-x-2 gap-y-3  sm:gap-x-3">
          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item)}
              className={`py-1 px-3 sm:py-1.5 sm:px-4 min-w-[70px] text-sm rounded-2xl ring-[1.5px] ring-primary-700 cursor-pointer ${
                item.value === filter.value
                  ? "bg-primary-700 font-medium"
                  : "hover:bg-primary-700/30"
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CarouselHeader;
