"use client";

import { IProduct } from "@/types/types";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import ProductCard from "@/components/common/ProductCard";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-coverflow";

interface Props {
  products: IProduct[];
}

const TopRatedCarousel = ({ products }: Props) => {
  const carouselOptions: SwiperOptions = {
    loop: true,
    grabCursor: true,
    speed: 2000,
    slidesPerView: "auto",
    autoplay: {
      delay: 2000,
      pauseOnMouseEnter: true,
    },
    modules: [Autoplay, EffectCoverflow],
    effect: "coverflow",
    spaceBetween: 30,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: false,
    },
  };

  return (
    <Swiper className="product-carousel mt-12" {...carouselOptions}>
      {products && products?.length !== 0
        ? products?.map((item) => (
            <SwiperSlide className="overflow-hidden" key={item.productid}>
              <ProductCard item={item} />
            </SwiperSlide>
          ))
        : "No Products !!"}
    </Swiper>
  );
};

export default TopRatedCarousel;
