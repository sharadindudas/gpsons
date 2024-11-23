"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface TopHeadingProps {
  headingText1: string;
  headingText2: string;
  headingText3?: string;
  showBtn?: boolean;
}

const TopHeading = ({
  headingText1,
  headingText2,
  headingText3 = "",
  showBtn = true,
}: TopHeadingProps) => {
  const router = useRouter();

  const handleRouting = () => {
    const title = [headingText1, headingText2, headingText3]
      .filter(Boolean)
      .join("-")
      .toLowerCase();
    router.push(`/filter/${title}`);
  };

  return (
    <div className="relative">
      <h2 className="text-3xl font-bold underline-effect relative inline-block capitalize">
        {headingText1} <span className="text-color-3/80">{headingText2}</span>{" "}
        {headingText3}
      </h2>
      {showBtn && (
        <Button
          onClick={handleRouting}
          className="bg-white text-black items-center border border-black/80 rounded-full px-4 h-10 gap-2 uppercase font-medium tracking-tight absolute right-0 top-0 hover:bg-black/80 hover:text-white transition-all duration-500 text-sm"
        >
          View More
        </Button>
      )}
    </div>
  );
};

export default TopHeading;
