"use client";

import { Autoplay, EffectCoverflow } from "swiper/modules";
import { SwiperOptions } from "swiper/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { banners } from "@/utils/constants";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";

const BannerSection = () => {
  const carouselOptions: SwiperOptions = {
    loop: true,
    speed: 2000,
    slidesPerView: "auto",
    spaceBetween: 90,
    centeredSlides: true,
    autoplay: {
      delay: 2000,
      pauseOnMouseEnter: true,
    },
    grabCursor: true,
    effect: "coverflow",
    modules: [Autoplay, EffectCoverflow],
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1.2,
      slideShadows: false,
    },
  };

  return (
    <section id="banner" className="pb-10">
      <Swiper {...carouselOptions} className="banner-carousel">
        {banners.map((item) => (
          <SwiperSlide className="!w-[95%] mx-auto" key={item.id}>
            <Image
              width={0}
              height={0}
              sizes="100vw"
              priority
              src={item.link}
              alt="banner-img"
              className="w-full h-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSection;
