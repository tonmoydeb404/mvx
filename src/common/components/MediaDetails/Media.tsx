import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
// @ts-ignore
import { Keyboard, Mousewheel, Navigation } from "swiper";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import {
  useLazyMovieImagesQuery,
  useLazyMovieVideosQuery,
} from "../../../api/movieApi";
import { useLazyTvImagesQuery, useLazyTvVideosQuery } from "../../../api/tvApi";
import ContentImageCard, {
  ContentImageCardSkeleton,
} from "../cards/ContentImageCard";
import ContentVideoCard, {
  ContentVideoCardSkeleton,
} from "../cards/ContentVideoCard";
import ErrorState from "../utils/ErrorState";

type MediaType = "videos" | "backdrops" | "posters";

type MediaProps = {
  type: "movie" | "tv";
  className?: string;
  id: string;
  defaultType?: MediaType;
};

const breakpoints = {
  200: {
    slidesPerView: 1,
    spaceBetween: 10,
  },
  320: {
    slidesPerView: 1.5,
    spaceBetween: 10,
  },
  480: {
    slidesPerView: 2,
    spaceBetween: 15,
  },
  640: {
    slidesPerView: 2.5,
    spaceBetween: 15,
  },
  1024: {
    slidesPerView: 3,
    spaceBetween: 15,
  },
  1400: {
    slidesPerView: 4,
    spaceBetween: 15,
  },
};

const mediaTypeList: { title: string; value: MediaType }[] = [
  { title: "Videos", value: "videos" },
  { title: "Backdrops", value: "backdrops" },
  { title: "Posters", value: "posters" },
];

const Media = ({
  type,
  className = "",
  id,
  defaultType = "videos",
}: MediaProps) => {
  const [contentType, setContentType] = useState<MediaType>(defaultType);
  const [getVideos, movieVideos] =
    type === "movie" ? useLazyMovieVideosQuery() : useLazyTvVideosQuery();
  const [getImages, movieImages] =
    type === "movie" ? useLazyMovieImagesQuery() : useLazyTvImagesQuery();

  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(true);
  const [isEmpty, setEmpty] = useState(false);

  const swiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    // reset scroll
    swiperRef.current?.swiper?.slideTo(0);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        if (contentType === "videos") {
          const data = await getVideos(id).unwrap();
          setEmpty(data.results?.length == 0);
        } else {
          const data = await getImages(id).unwrap();
          setEmpty(data[contentType]?.length == 0);
        }
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [contentType, id]);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center mb-10 gap-5">
        <h2 className="text-2xl font-medium">Media</h2>

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
          {mediaTypeList.map((type) => (
            <button
              key={type.value}
              onClick={() => setContentType(type.value)}
              className={`py-1 px-3 sm:py-1.5 sm:px-4 min-w-[70px] text-sm rounded-2xl ring-[1.5px] ring-primary-700 cursor-pointer ${
                type.value === contentType
                  ? "bg-primary-700 font-medium"
                  : "hover:bg-primary-700/30"
              }`}
            >
              {type.title}
            </button>
          ))}
        </div>
      </div>

      {/* Loading state */}
      {isLoading ? (
        <Swiper breakpoints={breakpoints}>
          {[...Array(5).keys()].map((item) => (
            <SwiperSlide key={item}>
              {contentType === "videos" ? (
                <ContentVideoCardSkeleton />
              ) : (
                <ContentImageCardSkeleton type={contentType} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}

      {/* Error state */}
      {isError ? <ErrorState className="min-h-[200px]" /> : null}

      {/* Empty state */}
      {!isLoading && !isError && isEmpty ? (
        <ErrorState
          className="min-h-[200px]"
          text="Sorry we couldn't find anything"
        />
      ) : null}

      {/* Success State */}
      {!isLoading && !isError ? (
        <Swiper
          ref={swiperRef}
          modules={[Navigation, Keyboard, Mousewheel]}
          breakpoints={breakpoints}
          navigation={{ nextEl: "#contentNext", prevEl: "#contentPrev" }}
          keyboard
        >
          {/* show videos */}
          {contentType === "videos" && movieVideos.isSuccess
            ? movieVideos.data.results.map((video) => {
                // only allow youtube videos
                if (video.site !== "YouTube") return null;
                const url = `https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`;
                // const v = `https://www.youtube.com/watch?v=${video.key}`;
                return (
                  <SwiperSlide key={video.key}>
                    <ContentVideoCard src={url} title={video.name} />
                  </SwiperSlide>
                );
              })
            : null}

          {/* show backdrops */}
          {contentType === "backdrops" && movieImages.isSuccess
            ? movieImages.data.backdrops.map((image) => (
                <SwiperSlide key={image.file_path}>
                  <ContentImageCard
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    type="backdrops"
                  />
                </SwiperSlide>
              ))
            : null}

          {/* show posters */}
          {contentType === "posters" && movieImages.isSuccess
            ? movieImages.data.posters.map((image) => (
                <SwiperSlide key={image.file_path}>
                  <ContentImageCard
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    type="posters"
                  />
                </SwiperSlide>
              ))
            : null}
        </Swiper>
      ) : null}
    </div>
  );
};

export default Media;
