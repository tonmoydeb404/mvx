import { useEffect, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Keyboard, Navigation } from "swiper";
import { mediaBreakpoints } from "../../../config/breakpoints";
import { QueryResponse } from "../../../types/common.type";
import { MediaCredit } from "../../../types/credit.types";
import { MediaCardSkeleton } from "../cards/Media/MediaCard";
import MediaCreditCard from "../cards/Media/MediaCreditCard";
import ErrorState from "../utils/ErrorState";
import CarouselHeader, { CarouselHeaderProps, Filter } from "./CarouselHeader";

type MediaCreditCarouselProps<F> = CarouselHeaderProps<F> &
  QueryResponse<MediaCredit[]>;

const MediaCreditCarousel = <F extends Filter>({
  className,
  id,
  isLoading = true,
  isSuccess,
  isError,
  isEmpty,
  data,
  ...props
}: MediaCreditCarouselProps<F>) => {
  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    swiperRef.current?.swiper.slideTo(0);
  }, [props.filter]);
  return (
    <div className={className}>
      <CarouselHeader id={id} {...props} />

      {/* Error State */}
      {!isLoading && isError ? <ErrorState className="min-h-[200px]" /> : null}

      {/* Empty State */}
      {!isLoading && isSuccess && isEmpty ? (
        <ErrorState
          className="min-h-[200px]"
          text="Sorry we couldn't find anything"
        />
      ) : null}

      <Swiper
        ref={swiperRef}
        modules={[Navigation, Keyboard]}
        breakpoints={mediaBreakpoints}
        navigation={{ nextEl: `#next-${id}`, prevEl: `#prev-${id}` }}
        keyboard
      >
        {/* Loading State */}
        {isLoading
          ? [...Array(7).keys()].map((item) => (
              <SwiperSlide key={item}>
                <MediaCardSkeleton />
              </SwiperSlide>
            ))
          : null}

        {/* Success State */}
        {isSuccess && !isLoading && data
          ? data.map((item) => (
              <SwiperSlide key={item.id}>
                <MediaCreditCard {...item} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default MediaCreditCarousel;
