import { IProduct } from "@/types/types";
import { quickFilters } from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import FilterSidebar from "./FilterSidebar";
import SortByPrice from "./SortByPrice";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  products: IProduct[];
  sortPrice: string;
  setSortPrice: (value: string) => void;
}

const FilterMiddleSection = ({ products, sortPrice, setSortPrice }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => {
    const size = searchParams.get("size");
    const color = searchParams.get("color");
    setActiveFilter(size || color || null);
  }, [searchParams]);

  const toggleFilter = (value: string) => {
    if (activeFilter === value) {
      setActiveFilter(null);
      updateURL(null);
    } else {
      setActiveFilter(value);
      updateURL(value);
    }
  };

  const updateURL = (filter: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("size");
    params.delete("color");

    if (filter) {
      if (!isNaN(Number(filter))) {
        params.set("size", filter);
      } else {
        params.set("color", filter);
      }
    }

    router.push(`/filter/most-popular?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center my-4">
          <FilterSidebar />
          <SortByPrice sortPrice={sortPrice} setSortPrice={setSortPrice} />
        </div>
        <div>
          <span className="mr-1 text-color-3/70 font-semibold text-2xl">
            {products?.length}
          </span>
          <span className="text-color-7">Products</span>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <h3 className="text-color-4 font-semibold pr-3 text-lg">
          Quick Filters
        </h3>
        <div className="flex gap-7 items-center text-sm">
          {quickFilters.map((filter) => (
            <Button
              key={filter.id}
              onClick={() => toggleFilter(filter.name)}
              className={`border border-color-1 min-w-24 h-[30px] flex items-center justify-center gap-2 rounded-2xl text-color-4 capitalize ${
                activeFilter === filter.name
                  ? "bg-color-4 text-white"
                  : "bg-transparent hover:bg-color-4 hover:text-white"
              } relative`}
            >
              {filter.name}
              {activeFilter === filter.name && <X size={18} />}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default FilterMiddleSection;
