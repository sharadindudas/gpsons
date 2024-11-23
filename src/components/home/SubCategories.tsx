import Image from "next/image";
import { subcategories } from "@/utils/constants";
import Marquee from "react-fast-marquee";

const SubCategories = () => {
  return (
    <section id="subcategories" className="common-section mb-7">
      <Marquee pauseOnHover autoFill className="subcategory-marquee">
        {subcategories.map((item) => (
          <div key={item.id} className="subcategory">
            <Image
              src={item.link}
              width={500}
              height={246}
              alt="subcategory-img"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default SubCategories;
