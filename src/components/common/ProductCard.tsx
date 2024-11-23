"use client";

import Image from "next/image";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Link from "next/link";
import { IProduct } from "@/types/types";
import { truncateString } from "@/utils/truncateString";
import AddToCart from "./AddToCart";

interface ProductCardProps {
  item: IProduct;
}

const ProductCard = ({ item }: ProductCardProps) => {
  return (
    <div className="w-72 p-2 rounded-lg border">
      <Link href={`/product/${item.code}`} className="block h-[400px]">
        <Image
          width={0}
          height={0}
          src={item.images[0]}
          sizes="100vw"
          alt="product-img"
          priority
          className="w-auto h-full rounded-lg object-cover"
        />
      </Link>

      <div className="flex flex-col gap-1 justify-center items-start text-left px-1 py-1.5">
        <h3 className="uppercase text-color-3/70 font-bold text-xl">
          {item.code}
        </h3>

        <div className="text-[13px]">
          <p>{truncateString(item.desc, 75)}</p>
        </div>

        <div className="flex items-center gap-x-5 justify-between w-full h-9 mt-2">
          <p className="flex items-center text-xl text-black font-bold tracking-tight">
            <FaIndianRupeeSign className="text-sm" />

            {item.price.toFixed(2)}
          </p>

          <AddToCart productid={item.productid} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
