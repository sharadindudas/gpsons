"use client";

import { IProduct } from "@/types/types";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import ProductCard from "@/components/common/ProductCard";

import "swiper/css";
import "swiper/css/autoplay";

interface Props {
  products: IProduct[];
}

const ProductCarousel = ({ products }: Props) => {
  const carouselOptions: SwiperOptions = {
    loop: true,
    speed: 2000,
    slidesPerView: "auto",
    autoplay: {
      delay: 2000,
      pauseOnMouseEnter: true,
    },
    modules: [Autoplay],
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

export default ProductCarousel;
