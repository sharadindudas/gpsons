import Link from "next/link";
import Image from "next/image";
import { atlantic } from "@/utils/fonts";

const HeaderLeft = () => {
  return (
    <Link href="/" className="flex items-center gap-x-2">
      <div className="w-14">
        <Image
          src="/assets/logo.png"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          alt="logo"
        />
      </div>
      <div className={`${atlantic.className} uppercase tracking-tighter`}>
        <span className="text-2xl">gouranga paul</span>{" "}
        <span className="font-poppins font-semibold text-sm tracking-wide">
          group
        </span>
      </div>
    </Link>
  );
};

export default HeaderLeft;
