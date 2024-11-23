import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Link from "next/link";
import { IWishlist } from "@/types/types";
import AddToCart from "../common/AddToCart";
import { axiosInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import { useAppSelector } from "@/store/hooks";

interface Props {
  item: IWishlist;
  onProductDeletion: () => void;
}

const WishlistCard = ({ item, onProductDeletion }: Props) => {
  const token = useAppSelector((store) => store.auth.token as string);

  const handleDeleteWishlist = async (productid: string) => {
    try {
      const response = await axiosInstance.patch(
        `/api/v2/user/wishlist/remove`,
        null,
        {
          params: {
            productid,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Removed from Wishlist successfully");
        onProductDeletion();
      }
    } catch (err) {
      toast.error("Failed to remove from wishlist");
    }
  };

  return (
    <div className="w-52 p-2 rounded-lg border shadow-md">
      <div className="relative">
        <Link href={`/product/${item.code}`}>
          <Image
            width={298}
            height={444}
            src={item.images[0]}
            alt="product-img"
            priority
            className="product-img rounded-lg mx-auto"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
        <button
          onClick={() => handleDeleteWishlist(item.productid)}
          className="bg-black/10 text-white/85 w-11 h-11 rounded-full absolute top-1 left-1 flex items-center justify-center"
        >
          <Image
            src="/assets/profile/cross.svg"
            width={13.2}
            height={13.2}
            alt="close"
          />
        </button>
      </div>

      <div className="flex flex-col gap-1 justify-center items-start text-left py-1">
        <h3 className="uppercase text-color-3/70 font-bold text-lg">
          {item.code}
        </h3>

        <div className="text-xs mb-1">
          <p>Lorem ipsum, dolor sit amet consectetur</p>
        </div>

        <div className="flex items-center justify-between w-full">
          <p className="flex items-center text-base text-black font-bold tracking-tight">
            <FaIndianRupeeSign className="text-sm" />

            {item?.price.toFixed(2)}
          </p>

          <AddToCart productid={item.productid} />
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
