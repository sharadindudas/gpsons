import CartProducts from "@/components/cart/CartProducts";
import CartSection from "@/components/cart/CartSection";

const CartPage = () => {
  return (
    <div className="font-poppins tracking-tight">
      <div className="flex mt-14 mb-14 relative">
        <div className="mx-5 pl-5 pr-10 h-[800px] overflow-y-scroll">
          <CartProducts />
        </div>
        <div className="flex-1 justify-center items-center px-16">
          <CartSection />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
