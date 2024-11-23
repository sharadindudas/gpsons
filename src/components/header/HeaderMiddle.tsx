"use client";

import { navLinks } from "@/utils/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMiddle = () => {
  const pathname = usePathname();

  return (
    <div className="text-sm font-bold text-color-2 absolute left-1/2 -translate-x-1/2">
      <ul className="uppercase flex justify-center items-center gap-x-8 tracking-tight">
        {navLinks.map((item) => (
          <Link
            key={item.id}
            className={`nav-link ${pathname === item.link ? "active" : ""}`}
            href={item.link}
          >
            {item.name}
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HeaderMiddle;
