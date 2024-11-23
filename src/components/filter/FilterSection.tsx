"use client";

import { ApiResponse, IProduct } from "@/types/types";
import TopHeading from "@/components/common/TopHeading";
import FilteredProducts from "./FilteredProducts";
import FilterMiddleSection from "./FilterMiddle";
import { useCallback, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import Loader from "@/components/common/Loader";

interface Props {
  title: string;
}

const FilterSection = ({ title }: Props) => {
  const searchParams = useSearchParams();
  const [headingText1, headingText2, headingText3] = title.split("-");
  const [sortPrice, setSortPrice] = useState<string>("High to Low");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [noProductsFound, setNoProductsFound] = useState<boolean>(false);

  const fetchProducts = useCallback(async () => {
    setIsSubmitting(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", "50");
    params.set("type", "unique");
    try {
      const response = await axiosInstance.get(
        `/api/v2/product/fetch/all?${params.toString()}`
      );
      if (response.data.success) {
        setFilteredProducts(response?.data?.data[0]?.products);
        setNoProductsFound(false);
      }
    } catch (err) {
      const errMsg = err as AxiosError<ApiResponse>;
      console.error(
        errMsg?.response?.data?.message || "Failed to fetch products"
      );
      setNoProductsFound(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSortChange = useCallback((value: string) => {
    setSortPrice(value);
  }, []);

  const sortedProducts = useMemo(() => {
    if (sortPrice === "High to Low") {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    }
    if (sortPrice === "Low to High") {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    }
    return filteredProducts;
  }, [sortPrice, filteredProducts]);

  return (
    <div className="py-16 font-poppins container mx-auto px-5">
      <TopHeading
        headingText1={headingText1}
        headingText2={headingText2}
        headingText3={headingText3}
        showBtn={false}
      />
      <FilterMiddleSection
        sortPrice={sortPrice}
        setSortPrice={handleSortChange}
        products={sortedProducts}
      />
      {isSubmitting ? (
        <Loader />
      ) : noProductsFound ? (
        <div className="text-center py-8">
          <p className="text-xl font-semibold">
            No products found for the selected filters.
          </p>
          <p className="mt-1">Please try different filter options.</p>
        </div>
      ) : (
        <FilteredProducts products={sortedProducts} />
      )}
    </div>
  );
};

export default FilterSection;
