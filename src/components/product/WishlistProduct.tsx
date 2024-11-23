import Image from "next/image";
import toast from "react-hot-toast";
import { axiosInstance } from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/types";
import { AuthProvider } from "@/providers/AuthProvider";

const WishlistProduct = ({ productid }: { productid: string }) => {
  const { token } = AuthProvider();

  const handleAddToWishlist = async (productid: string) => {
    try {
      const response = await axiosInstance.patch<ApiResponse>(
        `/api/v2/user/wishlist/add`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { productid },
        }
      );

      if (response.data.success) {
        toast.success("Added to Wishlist successfully");
      }
    } catch (err) {
      toast.error("Please Login to Add to Wishlist");
    }
  };

  return (
    <button onClick={() => handleAddToWishlist(productid)}>
      <Image
        src="/assets/wishlist-btn.svg"
        width="0"
        height="0"
        sizes="100vw"
        className="w-full h-auto rounded-lg"
        alt="wishlist-btn"
      />
    </button>
  );
};

export default WishlistProduct;
