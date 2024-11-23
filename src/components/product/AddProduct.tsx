import Image from "next/image";
import { useAppSelector } from "@/store/hooks";
import { useCart } from "@/services/useCart";
import { axiosInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { ApiResponse } from "@/types/types";

const AddProduct = ({
  productid,
  quantity,
}: {
  productid: string;
  quantity: number;
}) => {
  const token = useAppSelector((store) => store.auth.token) as string;
  const { mutate } = useCart(token);

  const handleAddToCart = async () => {
    try {
      const response = await axiosInstance.post<ApiResponse>(
        `/api/v2/user/cart/add`,
        {
          productid,
          quantity,
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
      className="bg-color-3/40 flex items-center justify-center gap-x-1 relative rounded-md w-36 h-10 text-black px-3 text-base font-medium"
    >
      <Image src="/assets/cart.svg" width={20} height={20} alt="cart-img" />
      <span>Add to Cart</span>
    </button>
  );
};

export default AddProduct;
