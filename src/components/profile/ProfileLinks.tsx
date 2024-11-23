"use client";

import Link from "next/link";
import Image from "next/image";
import { profileLinks } from "@/utils/constants";
import { usePathname } from "next/navigation";

const ProfileLinks = () => {
  const pathname = usePathname();

  return (
    <>
      {profileLinks.map((item) => (
        <Link
          key={item.id}
          href={item.link}
          className={`flex px-10 items-center gap-3 w-full h-[73px] ${
            pathname === item.link
              ? "bg-color-3/10 text-black/80"
              : "bg-transparent text-black"
          } `}
          prefetch={false}
        >
          <div className="relative w-5 h-5">
            {pathname === item.link ? (
              <Image src={item.img} fill={true} alt={item.name} />
            ) : (
              <Image
                className="opacity-60"
                src={item.img}
                fill={true}
                alt={item.name}
              />
            )}
          </div>
          <span className="text-base capitalize">{item.name}</span>
        </Link>
      ))}
    </>
  );
};

export default ProfileLinks;
