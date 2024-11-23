"use client";

import { useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Image from "next/image";

interface ProductImageCarouselProps {
  images: string[];
}

const ProductImageCarousel = ({ images }: ProductImageCarouselProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();

  const carouselOptionsOne: SwiperOptions = {
    freeMode: true,
    spaceBetween: 10,
    autoHeight: true,
    navigation: true,
    watchSlidesProgress: true,
    modules: [FreeMode, Navigation, Thumbs],
    direction: "vertical",
  };

  const carouselOptionsTwo: SwiperOptions = {
    loop: images?.length > 3,
    spaceBetween: 50,
    slidesPerView: 1,
    slidesPerGroup: 1,
    centeredSlides: true,
    navigation: false,
    thumbs: {
      swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
    },
    modules: [FreeMode, Navigation, Thumbs],
  };

  return (
    <div className="flex gap-5 h-[600px]">
      <Swiper
        {...carouselOptionsOne}
        className="small-slider w-24 !m-0 rounded-xl"
        onSwiper={setThumbsSwiper}
      >
        {images?.map((image) => (
          <SwiperSlide key={image} className="w-full !h-28 mx-auto">
            <Image
              src={image}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-full rounded-lg"
              alt="product-img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        {...carouselOptionsTwo}
        className="big-slider w-[500px] rounded-lg"
      >
        {images?.map((image) => (
          <SwiperSlide key={image} className="rounded-lg">
            <Image
              src={image}
              width="0"
              height="0"
              sizes="100vw"
              className="w-full h-auto rounded-lg"
              alt="product-img"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductImageCarousel;
