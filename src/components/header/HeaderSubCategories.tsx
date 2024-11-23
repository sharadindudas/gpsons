"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { headerSubCategories } from "@/utils/constants";

const HeaderSubCategories = () => {
  const [lastScrollPosition, setLastScrollPosition] = useState<number>(0);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      if (currentScrollPosition - lastScrollPosition > 0) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <div
      className={`absolute flex items-center justify-between px-7 py-1 shadow-md categories bg-white/70 transition-all duration-500 w-full ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <ul className="category-links flex items-center gap-x-14 uppercase font-medium text-sm">
        {headerSubCategories?.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className="relative cursor-pointer hover:text-color-3 duration-300"
          >
            {item.name}
          </Link>
        ))}
      </ul>
      <div className="flex items-center gap-x-3">
        <Image
          src="/assets/help.png"
          alt="help"
          width={32}
          height={32}
          style={{ width: "auto", height: "auto" }}
        />
        <span className="opacity-60">+91 7439759231</span>
      </div>
    </div>
  );
};

export default HeaderSubCategories;
