import { ITestimonial } from "@/types/types";
import Image from "next/image";

interface Props {
  testimonial: ITestimonial;
}

const TestimonialCard = ({ testimonial }: Props) => {
  return (
    <div className="flex items-center gap-x-5 bg-color-3/10 rounded-3xl px-3 py-5">
      <div className="rounded-full mx-auto h-full w-80">
        <Image
          width={170}
          height={170}
          src={testimonial.link}
          alt="testimonial-img"
          loading="lazy"
        />
      </div>
      <div className="text-left text-sm">
        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
        <p className="text-color-4 mt-2">{testimonial.review}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
