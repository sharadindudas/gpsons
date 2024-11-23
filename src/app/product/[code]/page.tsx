"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSpecificProduct } from "@/services/useSpecificProduct";
import { IProduct } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import ProductDetailsLoader from "@/components/product/ProductDetailsLoader";
import ProductDetailsSection from "@/components/product/ProductDetails";
import "@/styles/productdetails.css";

interface ProductDetailsProps {
  params: {
    code: string;
  };
}

const ProductDetailsPage = ({ params: { code } }: ProductDetailsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useSpecificProduct(code);
  const products: IProduct[] = useMemo(
    () => data?.data[0]?.products ?? [],
    [data?.data]
  );

  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    searchParams.get("color") || undefined
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    searchParams.get("size") || undefined
  );

  const updateURL = useCallback(
    (color: string, size: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("color", color);
      params.set("size", size);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  useEffect(() => {
    if (products?.length > 0) {
      const defaultColor = selectedColor || products[0].color;
      const defaultSize = selectedSize || products[0].size;
      updateURL(defaultColor, defaultSize);
    }
  }, [products, selectedColor, selectedSize, updateURL]);

  const handleColorChange = useCallback(
    (color: string) => {
      setSelectedColor(color);
      setSelectedSize(undefined);
      updateURL(color, "");
    },
    [updateURL]
  );

  const handleSizeChange = useCallback(
    (size: string) => {
      setSelectedSize(size);
      updateURL(selectedColor || "", size);
    },
    [selectedColor, updateURL]
  );

  if (isLoading) return <ProductDetailsLoader />;
  if (error) return <div>Failed to load the product: {error.message}</div>;

  return (
    <div className="font-poppins tracking-tight py-16 px-16 container mx-auto">
      <ProductDetailsSection
        products={products}
        initialColor={selectedColor}
        initialSize={selectedSize}
        onColorChange={handleColorChange}
        onSizeChange={handleSizeChange}
      />
    </div>
  );
};

export default ProductDetailsPage;
