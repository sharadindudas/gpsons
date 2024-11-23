import { IProduct } from "@/types/types";
import TopHeading from "@/components/common/TopHeading";
import ProductCarousel from "@/components/home/common/ProductCarousel";
import { getProducts } from "@/services/getProducts";

const MostPopularSection = async () => {
  const products: IProduct[] = await getProducts(20);
  return (
    <section id="most-popular" className="common-section">
      <TopHeading headingText1="Most" headingText2="Popular" />
      <ProductCarousel products={products} />
    </section>
  );
};

export default MostPopularSection;
