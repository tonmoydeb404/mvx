import { useEffect, useRef } from "react";
// @ts-ignore
import { Keyboard, Navigation } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { mediaBreakpoints } from "../../../config/breakpoints";
import { QueryResponse } from "../../../types/common.type";
import { Media } from "../../../types/media.type";
import { MediaCardSkeleton } from "../cards/Media/MediaCard";
import MediaDisplayCard from "../cards/Media/MediaDisplayCard";
import ErrorState from "../utils/ErrorState";
import CarouselHeader, { CarouselHeaderProps, Filter } from "./CarouselHeader";

type MediaCarouselProps<F> = CarouselHeaderProps<F> & QueryResponse<Media[]>;

const MediaCarousel = <F extends Filter>({
  className,
  id,
  isLoading = true,
  isSuccess,
  isError,
  isEmpty,
  data,
  ...props
}: MediaCarouselProps<F>) => {
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
                <MediaDisplayCard {...item} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default MediaCarousel;
