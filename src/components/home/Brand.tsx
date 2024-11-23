import { brands } from "@/utils/constants";
import Image from "next/image";
import TopHeading from "@/components/common/TopHeading";

const BrandSection = () => {
  return (
    <section id="brands" className="relative px-10 pb-10 text-center">
      <TopHeading headingText1="Our" headingText2="Brands" showBtn={false} />
      <div className="flex items-center justify-center gap-x-14 flex-wrap mt-12">
        {brands.map((brand) => (
          <div className="brand-img-card" key={brand.id}>
            <Image
              className="object-contain hover:scale-105 transition-transform duration-300 block"
              src={brand.link}
              width={232}
              height={232}
              alt="category"
              loading="lazy"
            />
            <div className="shadow-effect">
              <h3 className="uppercase font-semibold text-lg">{brand.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandSection;
