import Image from "next/image";
import { useCart } from "@/services/useCart";
import { axiosInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { AuthProvider } from "@/providers/AuthProvider";
import { ApiResponse } from "@/types/types";

interface AddToCartProps {
  productid: string;
}

const AddToCart = ({ productid }: AddToCartProps) => {
  const { token } = AuthProvider();
  const { mutate } = useCart(token);

  const handleAddToCart = async () => {
    try {
      const response = await axiosInstance.post<ApiResponse>(
        `/api/v2/user/cart/add`,
        {
          productid,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data?.success) {
        toast.success("Added to Cart Successfully");
        mutate();
      }
    } catch (err) {
      toast.error("Please Login to Add to Cart");
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-color-3/40 flex items-center gap-x-1 relative rounded-lg h-8 text-black px-3"
    >
      <Image src="/assets/cart.svg" width={20} height={20} alt="cart-img" />
      <span className="text-xs font-medium">Add to Cart</span>
    </button>
  );
};

export default AddToCart;
