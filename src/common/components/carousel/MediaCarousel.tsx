// @ts-ignore
import { Keyboard, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { mediaBreakpoints } from "../../../config/breakpoints";
import { ApiResponse } from "../../../types/common.type";
import { Media } from "../../../types/media.type";
import MediaCard, { MediaCardSkeleton } from "../cards/MediaCard";
import ErrorState from "../utils/ErrorState";
import CarouselHeader, { CarouselHeaderProps, Filter } from "./CarouselHeader";

type MediaCarouselProps<F> = CarouselHeaderProps<F> & ApiResponse<Media[]>;

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
        modules={[Navigation, Keyboard]}
        breakpoints={mediaBreakpoints}
        navigation={{ nextEl: `#next-${id}`, prevEl: `#prev-${id}` }}
        keyboard
        mousewheel
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
                <MediaCard {...item} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default MediaCarousel;
