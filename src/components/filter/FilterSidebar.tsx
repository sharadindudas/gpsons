import { useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MdKeyboardArrowRight } from "react-icons/md";
import {
  filterCategories,
  filterColors,
  filterPrices,
  filterProductTypes,
  filterSizes,
} from "@/utils/constants";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { DualRangeSlider } from "@/components/ui/dual-range-slider";

const FilterSidebar = () => {
  const [prices, setPrices] = useState<number[]>([0, 10000]);
  const [price, setPrice] = useState<number>(0);

  return (
    <Sheet>
      <SheetTrigger className="flex items-center gap-1 text-color-4 -mr-2 border-none outline-none">
        <Image src="/assets/filter.svg" width={15} height={15} alt="filter" />
        <div className="flex items-center">
          Filter
          <MdKeyboardArrowRight />
        </div>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="font-poppins flex flex-col justify-between"
      >
        <SheetHeader>
          <SheetTitle className="text-[22px] font-medium">
            Filter Results
          </SheetTitle>
          <SheetDescription>
            <Accordion type="single" collapsible className="w-full mt-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Product Type</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-wrap justify-center items-center gap-3 list-none">
                    {filterProductTypes.map((elem) => (
                      <li key={elem.id} className="cursor-pointer">
                        <Image
                          src={elem.name}
                          width={116}
                          height={57}
                          alt="product-type"
                        />
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-wrap justify-center items-center gap-5">
                    {filterCategories.map((elem) => (
                      <li
                        key={elem.id}
                        className={`w-44 h-10 relative border border-black/40 cursor-pointer rounded-lg bg-black/[0.04]`}
                      >
                        <Label
                          htmlFor={elem.name}
                          className="min-w-44 min-h-10"
                        >
                          <div className="p-2 flex items-center justify-center">
                            <input
                              type="checkbox"
                              id={elem.name}
                              className="hidden"
                              value={elem.name}
                            />
                            <div className="custom-checkbox">
                              <Image
                                src="/assets/tick.svg"
                                width={7}
                                height={5}
                                className="hidden"
                                style={{
                                  width: "auto",
                                  height: "auto",
                                }}
                                alt="tick"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex items-center justify-center w-full -ml-2">
                              {elem.name}
                            </div>
                          </div>
                        </Label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Color</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-wrap justify-center items-center gap-4">
                    {filterColors.map((elem) => (
                      <li
                        key={elem.id}
                        className={`relative w-11 h-11 rounded-md cursor-pointer ${
                          elem.name === "#FFFFFF" && "border border-black/70"
                        }`}
                        style={{
                          backgroundColor: `${elem.name}`,
                        }}
                      >
                        <Label
                          htmlFor={elem.name}
                          className="min-w-11 h-full flex items-center justify-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            id={elem.name}
                            className="hidden"
                            value={elem.name}
                          />
                          <div className="custom-tick">
                            <Image
                              className="hidden"
                              src="/assets/big-tick.svg"
                              width={25}
                              height={25}
                              style={{ width: "auto", height: "auto" }}
                              loading="lazy"
                              alt="tick"
                            />
                          </div>
                        </Label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Sizes</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-wrap justify-center items-center gap-4">
                    {filterSizes.map((elem) => (
                      <li
                        key={elem.id}
                        className={`relative w-16 h-9 rounded-md cursor-pointer bg-[#D9D9D9] text-black`}
                      >
                        <Label
                          htmlFor={elem.name}
                          className="w-full h-full flex items-center justify-center cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            id={elem.name}
                            className="hidden"
                            value={elem.name}
                          />
                          <div>{elem.name}</div>
                        </Label>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Price</AccordionTrigger>
                <AccordionContent>
                  <div className="mb-10 mt-5 ml-2 mr-5">
                    <DualRangeSlider
                      label={(value) => <span>₹{value}</span>}
                      value={prices}
                      onValueChange={setPrices}
                      min={0}
                      max={10000}
                      step={1}
                      labelPosition="bottom"
                    />
                  </div>
                  <ul className="flex flex-wrap justify-center items-center gap-4 py-4">
                    {filterPrices.map((elem) => (
                      <li
                        key={elem.id}
                        className={`rounded-lg cursor-pointer border border-black/70 w-[120px] h-10 flex items-center justify-center ${
                          elem.name === price
                            ? "bg-color-3/30"
                            : "bg-transparent"
                        }`}
                      >
                        Under {elem.name}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <Button className="w-40 h-12 bg-transparent hover:bg-black/70 hover:text-white text-black border border-black font-normal duration-500">
            Clear All
          </Button>
          <Button className="w-40 h-12 bg-color-3/40 hover:bg-color-3/70 text-black border border-transparent font-normal duration-500">
            Apply Changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSidebar;
