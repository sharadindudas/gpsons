import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="font-poppins relative overflow-hidden py-24">
      <Image
        src="/assets/planets.png"
        width={1085}
        height={657}
        alt="planets"
        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
      />
      <div className="flex flex-col items-center justify-center gap-4 relative z-[1]">
        <Image
          src="/assets/astronaut.png"
          width={571}
          height={390}
          alt="astronaut-img"
          className="ml-44"
        />
        <div className="tracking-tighter flex flex-col gap-3 items-center justify-center">
          <h2 className="text-color-3 uppercase text-4xl font-bold leading-7">
            oops!
          </h2>
          <p className="text-color-3 uppercase text-2xl font-thin">
            Page not found
          </p>
          <Link
            href="/"
            className="bg-color-3/70 hover:bg-color-3 text-white w-32 h-10 flex items-center justify-center mt-2 mx-auto rounded-md font-medium text-base transition-all duration-500"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
