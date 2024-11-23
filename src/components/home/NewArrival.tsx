import { IProduct } from "@/types/types";
import TopHeading from "@/components/common/TopHeading";
import ProductCarousel from "@/components/home/common/ProductCarousel";
import { getProducts } from "@/services/getProducts";

const NewArrivalSection = async () => {
  const products: IProduct[] = await getProducts(20);
  return (
    <section id="new-arrival" className="common-section">
      <TopHeading headingText1="New" headingText2="Arrival" />
      <ProductCarousel products={products} />
    </section>
  );
};

export default NewArrivalSection;
