import Image from "next/image";
import Link from "next/link";

const EmptyWishlistPage = () => {
  return (
    <div className="flex flex-col items-center">
      <Image
        src="/assets/profile/wishlist.png"
        width={475.159}
        height={330.171}
        alt="orderlist"
        className="opacity-80"
      />

      <h2 className="uppercase text-xl font-semibold">
        Nothing In the WishList
      </h2>
      <p className="uppercase font-light mt-2.5 mb-6">
        find something you like
      </p>
      <div className="text-center">
        <Link
          href="/"
          className="bg-color-3/30 w-[299px] h-[58px] rounded-[5px] font-normal flex items-center justify-center"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default EmptyWishlistPage;
