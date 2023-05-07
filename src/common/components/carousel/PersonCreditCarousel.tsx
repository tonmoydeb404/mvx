import { useEffect, useRef } from "react";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Keyboard, Navigation } from "swiper";
import { mediaBreakpoints } from "../../../config/breakpoints";
import { QueryResponse } from "../../../types/common.type";
import { PersonCredit } from "../../../types/credit.types";
import PersonCreditCard, {
  PersonCreditCardSkeleton,
} from "../cards/PersonCreditCard";
import ErrorState from "../utils/ErrorState";
import CarouselHeader, { CarouselHeaderProps, Filter } from "./CarouselHeader";

type PersonCreditCarouselProps<F> = CarouselHeaderProps<F> &
  QueryResponse<PersonCredit[]>;

const PersonCreditCarousel = <F extends Filter>({
  className,
  id,
  isLoading = true,
  isSuccess,
  isError,
  isEmpty,
  data,
  ...props
}: PersonCreditCarouselProps<F>) => {
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
                <PersonCreditCardSkeleton />
              </SwiperSlide>
            ))
          : null}

        {/* Success State */}
        {isSuccess && !isLoading && data
          ? data.map((item) => (
              <SwiperSlide key={item.id}>
                <PersonCreditCard {...item} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default PersonCreditCarousel;
