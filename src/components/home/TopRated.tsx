import { IProduct } from "@/types/types";
import TopHeading from "@/components/common/TopHeading";
import TopRatedCarousel from "@/components/home/TopRatedCarousel";
import { getProducts } from "@/services/getProducts";

const TopRatedSection = async () => {
  const products: IProduct[] = await getProducts(20);
  return (
    <section id="top-rated" className="common-section">
      <TopHeading
        headingText1="Top"
        headingText2="Rated"
        headingText3="Products"
      />
      <TopRatedCarousel products={products} />
    </section>
  );
};

export default TopRatedSection;
