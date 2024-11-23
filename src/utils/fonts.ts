import { Poppins } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const atlantic = localFont({
  src: "../styles/fonts/AtlanticInline.ttf",
  variable: "--font-atlantic",
  display: "swap",
});
