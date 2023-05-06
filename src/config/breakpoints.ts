import { SwiperOptions } from "swiper/types";

export const mediaBreakpoints: {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
} = {
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

export const assetBreakpoints: {
  [width: number]: SwiperOptions;
  [ratio: string]: SwiperOptions;
} = {
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
