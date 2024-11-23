"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import {
  footerConsumer,
  footerInformation,
  footerUsefulLinks,
} from "@/utils/constants";
import { AuthProvider } from "@/providers/AuthProvider";
import AuthModals from "@/components/auth/AuthModals";
import { useRouter } from "next/navigation";
import "@/styles/footer.css";

const Footer = () => {
  const router = useRouter();
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false);
  const { token } = AuthProvider();

  const handleLinkVisit = (link: string) => {
    const protectedRoutes = ["/profile", "/checkout", "/cart"];

    if (!token && protectedRoutes.some((route) => link.startsWith(route))) {
      setOpenAuthModal(true);
    } else {
      router.push(link);
    }
  };

  return (
    <footer id="footer" className="font-poppins mt-auto">
      <div className="hidden">
        <AuthModals open={openAuthModal} onOpenChange={setOpenAuthModal} />
      </div>

      {/* Footer Top */}
      <div className="grid grid-flow-col gap-5 p-5 bg-color-7">
        {/* Col 1 */}
        <div>
          <Link href="/">
            <Image
              src="/assets/footer-logo.png"
              width={470}
              height={43}
              priority
              className="w-auto h-auto"
              alt="footer-logo"
            />
          </Link>
          <div className="flex items-center gap-x-2 mt-5 mb-5 text-3xl text-white">
            <Link
              href="/"
              className="cursor-pointer hover:text-black/30 transition-all duration-300"
            >
              <FaFacebook />
            </Link>
            <Link
              href="/"
              className="cursor-pointer hover:text-black/30 transition-all duration-300"
            >
              <FaInstagram />
            </Link>
            <Link
              href="/"
              className="cursor-pointer hover:text-black/30 transition-all duration-300"
            >
              <FaWhatsapp />
            </Link>
            <Link
              href="/"
              className="cursor-pointer hover:text-black/30 transition-all duration-300"
            >
              <FaYoutube />
            </Link>
          </div>
          <div>
            <h3 className="text-lg uppercase text-white font-semibold mb-2">
              get in touch
            </h3>
            <div className="flex items-center gap-x-2 text-sm">
              <div className="text-white font-medium">Address:</div>
              <Link
                target="_blank"
                className="text-white/70"
                href="https://maps.app.goo.gl/74RVL6ZEa576dtYV7"
              >
                14F/1E Dum Dum Rd. Kolkata, 700030
              </Link>
            </div>
            <div className="flex items-center gap-x-2 text-sm">
              <div className="text-white font-medium">Phone:</div>
              <p className="text-white/70">
                <Link href="tel:25568763">25568763</Link>,{" "}
                <Link href="tel:7439759231">7439759231 (Sale)</Link>
              </p>
            </div>
            <div className="flex items-center gap-x-2 text-sm">
              <div className="text-white font-medium">Phone:</div>
              <p className="text-white/70">
                <Link href="tel:25579656">25579656</Link>,{" "}
                <Link href="tel:9038631844">9038631844 (Fact)</Link>
              </p>
            </div>
            <div className="flex items-center gap-x-2 text-sm">
              <div className="text-white font-medium">Email:</div>
              <Link
                className="text-white/70"
                href="mailto:gourangapual_sons@yahoo.in"
              >
                gourangapaul_sons@yahoo.in
              </Link>
            </div>
          </div>
        </div>

        {/* Col 2 */}
        <div className="mt-5">
          <h3 className="text-lg uppercase text-white font-semibold">
            useful links
          </h3>
          <div className="capitalize text-white/70 flex flex-col items-start gap-3 font-medium tracking-tight text-sm mt-2">
            {footerUsefulLinks.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="cursor-pointer hover:text-black/50 transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 3 */}
        <div className="mt-5">
          <h3 className="text-lg uppercase text-white font-semibold">
            information
          </h3>
          <div className="capitalize text-white/70 flex flex-col items-start gap-3 font-medium tracking-tight text-sm mt-2">
            {footerInformation.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="cursor-pointer hover:text-black/50 transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Col 4 */}
        <div className="mt-5">
          <h3 className="text-lg uppercase text-white font-semibold">
            consumer
          </h3>
          <div className="capitalize text-white/70 flex flex-col items-start gap-3 font-medium tracking-tight text-sm mt-2">
            {footerConsumer.map((item) => (
              <div
                key={item.id}
                className="cursor-pointer hover:text-black/50 transition-all duration-300"
                onClick={() => handleLinkVisit(item.link)}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-color-9 flex flex-col gap-4 text-sm items-center justify-center py-3">
        <ul className="footer-links">
          <li>
            <Link
              href="/about"
              className="cursor-pointer hover:text-color-3 transition-all duration-300"
            >
              About <span className="uppercase">Gouranga Paul</span>
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="cursor-pointer hover:text-color-3 transition-all duration-300"
            >
              Contact us
            </Link>
          </li>
          <li>
            <Link
              href="/faqs"
              className="cursor-pointer hover:text-color-3 transition-all duration-300"
            >
              Faqs
            </Link>
          </li>
          <li>
            <Link
              href="/privacy-policy"
              className="cursor-pointer hover:text-color-3 transition-all duration-300"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="/terms-and-conditions"
              className="cursor-pointer hover:text-color-3 transition-all duration-300"
            >
              Terms & Conditions
            </Link>
          </li>
          <li>
            <Link
              href="/shipping-policy"
              className="cursor-pointer hover:text-color-3 transition-all duration-300"
            >
              Shipping Policy
            </Link>
          </li>
        </ul>
        <p className="text-white">
          Copyright &copy; 2021{" "}
          <Link
            href="/"
            className="hover:text-color-3 transition-all duration-300"
          >
            GOURANGA PAUL.
          </Link>{" "}
          All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
