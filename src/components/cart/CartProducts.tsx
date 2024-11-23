import { getProducts } from "@/services/getProducts";
import { IProduct } from "@/types/types";
import CartProductCard from "./CartProductCard";

const CartProducts = async () => {
  const products: IProduct[] = await getProducts(5);
  return (
    <div className="flex flex-wrap flex-col gap-7">
      {products?.length !== 0 &&
        products?.map((item) => (
          <CartProductCard key={item.productid} item={item} />
        ))}
    </div>
  );
};

export default CartProducts;
