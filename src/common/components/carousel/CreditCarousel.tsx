import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// @ts-ignore
import { Keyboard, Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MediaCredit } from "../../../types/media.type";
import CreditCard, { CreditCardSkeleton } from "../cards/CreditCard";
import ErrorState from "../utils/ErrorState";

type CreditCarouselProps = {
  title: string;
  className?: string;
  creditList: MediaCredit[];
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
};

const breakpoints = {
  200: {
    slidesPerView: 1.5,
    spaceBetween: 10,
  },
  320: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  480: {
    slidesPerView: 2.5,
    spaceBetween: 15,
  },
  640: {
    slidesPerView: 3,
    spaceBetween: 15,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 5,
    spaceBetween: 15,
  },
  1400: {
    slidesPerView: 6,
    spaceBetween: 15,
  },
};

const CreditCarousel = ({
  title,
  className = "",
  creditList,
  isSuccess,
  isError,
  isLoading,
}: CreditCarouselProps) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-medium ">{title}</h2>
        {isSuccess ? (
          <div className="inline-flex gap-1">
            <button
              id="prev"
              className="p-1.5 disabled:opacity-30 duration-300 text-white bg-secondary-800 hover:bg-secondary-700 rounded-sm cursor-pointer"
            >
              <HiChevronLeft className="text-2xl" />
            </button>
            <button
              id="next"
              className="p-1.5 disabled:opacity-30 duration-300 text-white bg-secondary-800 hover:bg-secondary-700 rounded-sm cursor-pointer"
            >
              <HiChevronRight className="text-2xl" />
            </button>
          </div>
        ) : null}
      </div>
      <div className="mt-10">
        {/* loading state */}
        {isLoading ? (
          <Swiper breakpoints={breakpoints}>
            {[...Array(7).keys()].map((item) => (
              <SwiperSlide key={item}>
                <CreditCardSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}

        {/* success state */}
        {!isLoading && isSuccess && creditList.length ? (
          <Swiper
            modules={[Navigation, Keyboard, Mousewheel]}
            breakpoints={breakpoints}
            navigation={{ nextEl: "#next", prevEl: "#prev" }}
            keyboard
            mousewheel
          >
            {creditList.map((cast) => (
              <SwiperSlide key={cast.id}>
                <CreditCard {...cast} />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : null}

        {/* Empty state */}
        {!isLoading && isSuccess && !creditList.length ? (
          <ErrorState
            className="min-h-[200px]"
            text="Sorry we couldn't find anything"
          />
        ) : null}
      </div>
      {!isLoading && isError ? <ErrorState className="min-h-[200px]" /> : null}
    </div>
  );
};

export default CreditCarousel;
