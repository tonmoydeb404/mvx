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
        <button id={`prev-${id}`} className="btn-icon btn-secondary">
          <HiChevronLeft className="text-2xl" />
        </button>
        <button id={`next-${id}`} className="btn-icon btn-secondary">
          <HiChevronRight className="text-2xl" />
        </button>
      </div>

      {filters ? (
        <div className="flex w-full sm:w-auto sm:order-2 items-stretch flex-wrap gap-x-2 gap-y-3  sm:gap-x-3">
          {filters.map((item) => (
            <button
              key={item.value}
              onClick={() => setFilter(item)}
              className={`pill pill-primary ${
                item.value === filter.value ? "active" : ""
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
