import { IProduct } from "@/types/types";
import ProductCard from "@/components/common/ProductCard";

interface Props {
  products: IProduct[];
}

const FilteredProducts = ({ products }: Props) => {
  return (
    <section id="most-popular" className="mt-5">
      <div className="flex items-center flex-wrap gap-6">
        {products?.map((item) => (
          <ProductCard key={item.productid} item={item} />
        ))}
      </div>
    </section>
  );
};

export default FilteredProducts;
