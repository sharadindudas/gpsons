import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IProduct } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import ProductImageCarousel from "./ProductImageCarousel";
import PincodeCheck from "./PincodeCheck";
import ShareProduct from "./ShareProduct";
import WishlistProduct from "./WishlistProduct";
import AddProduct from "./AddProduct";

interface ProductDetailsSectionProps {
  products: IProduct[];
  initialColor?: string;
  initialSize?: string;
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
}
const ProductDetailsSection = ({
  products,
  initialColor,
  initialSize,
  onColorChange,
  onSizeChange,
}: ProductDetailsSectionProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const colors = useMemo(
    () => Array.from(new Set(products?.map((p) => p.color))),
    [products]
  );

  const [selectedColor, setSelectedColor] = useState<string>(
    initialColor || colors[0]
  );
  const [selectedSize, setSelectedSize] = useState(initialSize || "");
  const [quantity, setQuantity] = useState<number>(1);

  const filteredProducts = useMemo(
    () => products?.filter((p) => p.color === selectedColor),
    [products, selectedColor]
  );
  const sizes = useMemo(
    () => Array.from(new Set(filteredProducts?.map((p) => p.size))),
    [filteredProducts]
  );
  const selectedProduct = useMemo(
    () => filteredProducts?.find((p) => p.size === selectedSize),
    [filteredProducts, selectedSize]
  );

  useEffect(() => {
    if (filteredProducts?.length > 0 && !sizes.includes(selectedSize)) {
      const newSize = filteredProducts[0].size;
      setSelectedSize(newSize);
      onSizeChange(newSize);
    }
  }, [filteredProducts, sizes, selectedSize, onSizeChange]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedColor) params.set("color", selectedColor);
    if (selectedSize) params.set("size", selectedSize);
    router.replace(`?${params.toString()}`, { scroll: false });
  }, [searchParams, router, selectedColor, selectedSize]);

  const handleColorChange = useCallback(
    (color: string) => {
      setSelectedColor(color);
      onColorChange(color);
      setSelectedSize("");
      onSizeChange("");
      setQuantity(1);
    },
    [onColorChange, onSizeChange]
  );

  const handleSizeChange = useCallback(
    (size: string) => {
      setSelectedSize(size);
      onSizeChange(size);
      setQuantity(1);
    },
    [onSizeChange]
  );

  const handleIncreaseQuantity = () => {
    if (selectedProduct && quantity < selectedProduct.inStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <div>
      <h2 className="text-[32px] text-black/70 font-semibold">
        {selectedProduct?.code}
      </h2>

      <div className="flex justify-center gap-20 mt-2">
        <div className="w-1/2">
          <ProductImageCarousel images={selectedProduct?.images!} />
        </div>

        <div className="space-y-5 flex-1">
          <div className="flex items-center justify-between">
            <h3 className="text-black text-base font-medium w-80">
              {selectedProduct?.title}
            </h3>
            <div className="flex items-center gap-x-2">
              <WishlistProduct productid={selectedProduct?.productid!} />
              <ShareProduct selectedProduct={selectedProduct!} />
            </div>
          </div>
          <div className="space-x-1">
            <span className="text-xl text-color-3/70 font-semibold">
              ₹ {selectedProduct?.price.toFixed(2)}
            </span>
            <span>(Incl. Of All Taxes)</span>
          </div>
          <div className="text-base">
            <h3 className="font-semibold">
              Color:{" "}
              <span className="text-black/70 font-thin capitalize">
                {selectedProduct?.color}
              </span>
            </h3>
            <div className="mt-2 flex items-center gap-4">
              {colors.map((color) => (
                <button
                  onClick={() => handleColorChange(color)}
                  key={color}
                  style={{
                    backgroundColor: color,
                  }}
                  className={`w-11 h-11 rounded-xl border-2 ${
                    color === selectedColor
                      ? "border-black"
                      : " border-transparent"
                  }`}
                ></button>
              ))}
            </div>
          </div>
          <div className="text-base">
            <h3 className="font-semibold">
              Size:{" "}
              <span className="text-black/70 font-thin">{selectedSize}</span>
            </h3>
            <div className="mt-2">
              <Select value={selectedSize} onValueChange={handleSizeChange}>
                <SelectTrigger className="w-56 border-color-3/50">
                  <SelectValue placeholder="Please Select your size" />
                </SelectTrigger>
                <SelectContent className="font-poppins">
                  {sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="flex items-center text-sm">
            <Image
              src="/assets/tape.svg"
              width={24}
              height={24}
              className="w-auto h-auto"
              alt="tape"
            />
            <span className="ml-2 mr-5">Not sure about your size?</span>
            <button className="bg-color-3/70 text-white h-6 px-2 rounded font-thin">
              How To Measure Your Self
            </button>
          </p>
          <div className="flex items-center gap-x-5">
            <div className="flex items-center">
              <button
                onClick={handleDecreaseQuantity}
                className="border border-r-0 border-color-3/50 h-10 w-9 text-base cursor-pointer text-color-3/50 flex items-center justify-center rounded-[4px] rounded-r-none bg-transparent p-0 hover:bg-transparent"
              >
                <Minus />
              </button>
              <div className="h-10 w-9 text-base border border-color-3/50 border-l-0 border-r-0 flex items-center justify-center pointer-events-none">
                {quantity}
              </div>
              <button
                onClick={handleIncreaseQuantity}
                className="border border-l-0 border-color-3/50 h-10 w-9 text-base cursor-pointer text-color-3/50 flex items-center justify-center rounded-[4px] rounded-l-none bg-transparent p-0 hover:bg-transparent"
              >
                <Plus />
              </button>
            </div>
            <AddProduct
              productid={selectedProduct?.productid!}
              quantity={quantity}
            />
          </div>
          <div className="flex items-center text-sm">
            <Image
              src="/assets/return.svg"
              width={30}
              height={30}
              alt="return"
              className="w-auto h-auto"
            />
            <span className="ml-2 capitalize text-black/50 font-semibold">
              return policy
            </span>
            <Link
              href="/return-policy"
              className="text-[#428BC1] font-semibold ml-2 flex items-center gap-2"
            >
              Know More
              <Image
                src="/assets/right-big-arrow.svg"
                width="0"
                height="0"
                sizes="100vw"
                className="w-auto h-auto"
                alt="arrow"
              />
            </Link>
          </div>
          <PincodeCheck />
          <div className="flex items-center gap-x-2">
            <span className="font-semibold">Country of Origin:</span>{" "}
            <button className="flex items-center gap-x-2 bg-color-3/30 px-2 rounded-lg py-1 text-sm">
              <Image
                src="/assets/indian-flag.svg"
                width={29}
                height={18}
                alt="indian-flag"
                className="w-auto h-auto"
              />
              <span>India</span>
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-2 mt-10">Product Description</h2>
      <p className="w-full">{selectedProduct?.longdesc}</p>
    </div>
  );
};

export default React.memo(ProductDetailsSection);
