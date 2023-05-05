import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// @ts-ignore
import { Keyboard, Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { usePersonCreditsQuery } from "../../../api/personApi";
import { mediaBreakpoints } from "../../../config/breakpoints";
import { Media } from "../../../types/media.type";
import MediaCard, { MediaCardSkeleton } from "../cards/MediaCard";
import ErrorState from "../utils/ErrorState";

type CreditType = "cast" | "crew";

type PersonDetailsCreditProps = {
  id: string;
  defaultType?: CreditType;
};

const creditList: { title: string; value: CreditType }[] = [
  { title: "Cast", value: "cast" },
  { title: "Crew", value: "crew" },
];

const PersonDetailsCredit = ({
  id,
  defaultType = "cast",
}: PersonDetailsCreditProps) => {
  const { isLoading, isError, isSuccess, data, isFetching } =
    usePersonCreditsQuery(id);
  const [creditType, setCreditType] = useState<CreditType>(defaultType);
  const [credit, setCredit] = useState<Media[] | undefined>(undefined);

  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    // reset scroll
    swiperRef.current?.swiper?.slideTo(0);
    setCredit(data?.[creditType]);
  }, [creditType, id, data]);

  return (
    <>
      <div className={"container mb-28"}>
        <div className="flex flex-wrap items-center mb-10 gap-5">
          <h2 className="text-2xl font-medium">Works</h2>

          <div className="sm:order-3 inline-flex gap-1 ml-auto">
            <button
              id="contentPrev"
              className="p-1.5 disabled:opacity-30 duration-300 text-white bg-secondary-800 hover:bg-secondary-700 rounded-sm cursor-pointer"
            >
              <HiChevronLeft className="text-2xl" />
            </button>
            <button
              id="contentNext"
              className="p-1.5 disabled:opacity-30 duration-300 text-white bg-secondary-800 hover:bg-secondary-700 rounded-sm cursor-pointer"
            >
              <HiChevronRight className="text-2xl" />
            </button>
          </div>

          <div className="flex w-full sm:w-auto sm:order-2 items-stretch flex-wrap gap-x-2 gap-y-3  sm:gap-x-3">
            {creditList.map((type) => (
              <button
                key={type.value}
                onClick={() => setCreditType(type.value)}
                className={`py-1 px-3 sm:py-1.5 sm:px-4 min-w-[70px] text-sm rounded-2xl ring-[1.5px] ring-primary-700 cursor-pointer ${
                  type.value === creditType
                    ? "bg-primary-700 font-medium"
                    : "hover:bg-primary-700/30"
                }`}
              >
                {type.title}
              </button>
            ))}
          </div>
        </div>

        {/* Error state */}
        {isError ? <ErrorState className="min-h-[200px]" /> : null}

        {/* Empty state */}
        {!isLoading && !isError && credit && !credit.length ? (
          <ErrorState
            className="min-h-[200px]"
            text="Sorry we couldn't find anything"
          />
        ) : null}

        {isLoading || isFetching || isSuccess ? (
          <Swiper
            ref={swiperRef}
            modules={[Navigation, Keyboard, Mousewheel]}
            breakpoints={mediaBreakpoints}
            navigation={{ nextEl: "#contentNext", prevEl: "#contentPrev" }}
            keyboard
          >
            {/* Loading State */}
            {isLoading || isFetching
              ? [...Array(5).keys()].map((item) => (
                  <SwiperSlide key={item}>
                    <MediaCardSkeleton />
                  </SwiperSlide>
                ))
              : null}

            {/* Success state */}
            {!isLoading && !isFetching && isSuccess && credit
              ? credit.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MediaCard {...item} />
                  </SwiperSlide>
                ))
              : null}
          </Swiper>
        ) : null}
      </div>
    </>
  );
};

export default PersonDetailsCredit;
