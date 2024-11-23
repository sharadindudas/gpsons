"use client";

import EmptyWishlistPage from "@/components/profile/EmptyWishlistPage";
import WishlistCard from "@/components/profile/WishlistCard";
import { useWishlist } from "@/services/useWishlist";
import { useAppSelector } from "@/store/hooks";
import { IWishlist } from "@/types/types";
import { useMemo } from "react";

const WishlistPage = () => {
  const token = useAppSelector((store) => store.auth.token) as string;
  const { data, isLoading, error, mutate } = useWishlist(token);
  const wishlist: IWishlist[] = useMemo(
    () => data?.data[0]?.wishlist ?? [],
    [data?.data]
  );

  const onProductDeletion = () => {
    mutate();
  };

  if (isLoading) return <div>Loading your wishlist...</div>;
  if (error) return <EmptyWishlistPage />;

  return (
    <div>
      <h2 className="text-black/80 text-2xl font-bold">My Wishlist</h2>
      <div className="flex items-center flex-wrap gap-4 my-5">
        {wishlist?.map((item) => (
          <WishlistCard
            key={item.productid}
            item={item}
            onProductDeletion={onProductDeletion}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
