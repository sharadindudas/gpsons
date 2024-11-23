"use client";

import { useMemo, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";
import Image from "next/image";
import { ICart } from "@/types/types";
import { Input } from "@/components/ui/input";
import Avatar from "@/components/header/Avatar";
import AuthModals from "@/components/auth/AuthModals";
import { useCart } from "@/services/useCart";
import { AuthProvider } from "@/providers/AuthProvider";

const HeaderRight = () => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const { token } = AuthProvider();

  const { data } = useCart(token);
  const cartItems: ICart[] = useMemo(() => data?.data ?? [], [data?.data]);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCartClick = () => {
    if (!token) {
      setOpenAuthModal(true);
    }
  };

  return (
    <div className="flex items-center justify-center gap-x-4">
      {/* Searchbar */}
      <div className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search for products..."
          className={`rounded-full rounded-r-none outline outline-1 outline-color-3/40 h-7 absolute right-3 transition-all duration-500 ${
            showSearch ? "w-52 opacity-100 px-3" : "w-0 opacity-0 p-0"
          }`}
        />
        <div className="w-8 h-8 absolute right-0 bg-color-3/35 rounded-full"></div>
        <button
          className="absolute right-0 z-[2] w-8 h-8"
          onClick={() => setShowSearch(!showSearch)}
        >
          <Image
            src="/assets/search-icon.svg"
            width={0}
            height={0}
            sizes="100vw"
            alt="search-icon"
            className="w-full h-full"
          />
        </button>
      </div>

      {/* Cart and User */}
      <div className="flex items-center gap-x-4 text-color-3/80 text-2xl">
        {token ? (
          <Link href="/cart" className="relative mt-3">
            <div className="text-xs absolute -top-[18px] left-1 bg-color-3/80 text-white w-5 h-5 rounded-full flex items-center justify-center">
              {totalQuantity}
            </div>
            <FaCartShopping />
          </Link>
        ) : (
          <button onClick={handleCartClick}>
            <FaCartShopping />
          </button>
        )}
        {token ? (
          <Link href="/profile">
            <Avatar />
          </Link>
        ) : (
          <AuthModals open={openAuthModal} onOpenChange={setOpenAuthModal} />
        )}
      </div>
    </div>
  );
};

export default HeaderRight;
