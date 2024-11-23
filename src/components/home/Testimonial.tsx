"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import TopHeading from "@/components/common/TopHeading";
import TestimonialCard from "@/components/home/common/TestimonialCard";
import { testimonials } from "@/utils/constants";

const TestimonialSection = () => {
  const carouselOptions: SwiperOptions = {
    modules: [Autoplay],
    slidesPerView: "auto",
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 2000,
      pauseOnMouseEnter: true,
    },
    speed: 2000,
    spaceBetween: 30,
  };

  return (
    <section id="testimonial" className="common-section">
      <TopHeading
        headingText1="What our"
        headingText2="Customers"
        headingText3="say"
        showBtn={false}
      />
      <Swiper
        {...carouselOptions}
        className="testimonial-carousel relative mt-12"
      >
        {testimonials.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <TestimonialCard testimonial={testimonial} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TestimonialSection;
