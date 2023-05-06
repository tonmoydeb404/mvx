import { Swiper, SwiperSlide } from "swiper/react";
// @ts-ignore
import { Keyboard, Navigation } from "swiper";
import { assetBreakpoints } from "../../../config/breakpoints";
import { Asset, AssetType } from "../../../types/asset.type";
import { ApiResponse } from "../../../types/common.type";
import AssetCard, { AssetCardSkeleton } from "../cards/AssetCard";
import ErrorState from "../utils/ErrorState";
import CarouselHeader, { CarouselHeaderProps, Filter } from "./CarouselHeader";

type AssetCarouselProps<F> = CarouselHeaderProps<F> & ApiResponse<Asset[]>;

const AssetCarousel = <F extends Filter<AssetType>>({
  className,
  id,
  isLoading = true,
  isSuccess,
  isError,
  isEmpty,
  data,
  ...props
}: AssetCarouselProps<F>) => {
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
        breakpoints={assetBreakpoints}
        navigation={{ nextEl: `#next-${id}`, prevEl: `#prev-${id}` }}
        keyboard
        mousewheel
      >
        {/* Loading State */}
        {isLoading
          ? [...Array(7).keys()].map((item) => (
              <SwiperSlide key={item}>
                <AssetCardSkeleton type={props.filter?.value} />
              </SwiperSlide>
            ))
          : null}

        {/* Success State */}
        {isSuccess && !isLoading && data
          ? data.map((item) => (
              <SwiperSlide key={item.file_path}>
                <AssetCard {...item} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </div>
  );
};

export default AssetCarousel;
