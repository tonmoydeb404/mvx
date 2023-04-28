import { useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { Keyboard, Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Media } from "../../types/media.type";
import MediaCard, { MediaCardSkeleton } from "./cards/MediaCard";

type CarouselFilter = {
  title: string;
  id: string;
};

type MediaCarouselType = {
  filters: CarouselFilter[];
  title: string;
  data: Media[];
  onChange?: (filter: CarouselFilter) => any;
  isLoading: boolean;
  isSuccess: boolean;
};

const MediaCarousel = ({
  filters = [],
  title = "",
  onChange = () => {},
  data = [],
  isLoading = true,
  isSuccess = false,
}: MediaCarouselType) => {
  const [filterItem, setFilterItem] = useState<CarouselFilter | undefined>(
    filters[0]
  );
  const carouselRef = useRef<SwiperRef>(null);

  const onChangeFilter = (filter: CarouselFilter) => {
    setFilterItem(filter);
    onChange(filter);
    // reset carousel
    carouselRef.current?.swiper.slideTo(0);
  };

  return (
    <div className="min-h-[400px]">
      <div className="flex items-center justify-between flex-wrap gap-x-8 gap-y-3">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <div className="inline-flex item-strech gap-1 p-2 bg-secondary-800 rounded-lg">
          {filters.map((filter) => (
            <button
              key={filter.id}
              value={filter.id}
              className={`px-3 py-1 text-sm uppercase  rounded font-medium ${
                filterItem?.id === filter.id
                  ? "bg-primary-600"
                  : "hover:bg-secondary-700"
              }`}
              onClick={() => onChangeFilter(filter)}
            >
              {filter.title}
            </button>
          ))}
        </div>
      </div>
      <Swiper
        ref={carouselRef}
        modules={[Navigation, Keyboard, Mousewheel]}
        breakpoints={{
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
        }}
        navigation={{
          nextEl: "#next",
          prevEl: "#prev",
        }}
        keyboard
        mousewheel
        className="mt-10 relative group"
      >
        {isLoading ? (
          <>
            <SwiperSlide>
              <MediaCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <MediaCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <MediaCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <MediaCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <MediaCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <MediaCardSkeleton />
            </SwiperSlide>
            <SwiperSlide>
              <MediaCardSkeleton />
            </SwiperSlide>
          </>
        ) : null}

        {!isLoading && isSuccess
          ? data.map((item) => (
              <SwiperSlide key={item.id}>
                <MediaCard
                  date={item.date}
                  path={`/${item.type}/${item.id}`}
                  rating={item.rating}
                  thumbnail={item.thumbnail}
                  title={item.title}
                />
              </SwiperSlide>
            ))
          : null}

        <div slot="container-end">
          <button
            id="prev"
            className="p-1.5 invisible disabled:hidden group-hover:visible duration-300 bg-secondary-800/70 hover:bg-secondary-800 rounded-full absolute cursor-pointer  top-[45%] -translate-y-1/2 left-2 z-[100]"
          >
            <HiChevronLeft className="text-3xl" />
          </button>
          <button
            id="next"
            className="p-1.5 invisible disabled:hidden group-hover:visible duration-300 bg-secondary-800/70 hover:bg-secondary-800 rounded-full absolute cursor-pointer  top-[45%] -translate-y-1/2 right-2 z-[100]"
          >
            <HiChevronRight className="text-3xl" />
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default MediaCarousel;