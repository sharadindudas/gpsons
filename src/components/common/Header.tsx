import HeaderLeft from "@/components/header/HeaderLeft";
import HeaderMiddle from "@/components/header/HeaderMiddle";
import HeaderRight from "@/components/header/HeaderRight";
import HeaderSubCategories from "@/components/header/HeaderSubCategories";
import "@/styles/header.css";

const Header = () => {
  return (
    <header id="header" className="sticky w-full z-10 top-0 left-0 right-0">
      {/* Header Top */}
      <div className="flex justify-between items-center px-7 h-[57px] border-2 border-l-0 border-r-0 border-t-0 border-color-3/80 bg-white relative z-[1]">
        {/* Header Left */}
        <HeaderLeft />

        {/* Header Middle */}
        <HeaderMiddle />

        {/* Header Right */}
        <HeaderRight />
      </div>

      {/* Header Sub Categories */}
      <HeaderSubCategories />
    </header>
  );
};

export default Header;
