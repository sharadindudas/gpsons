import type { Metadata } from "next";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import StoreProvider from "@/providers/StoreProvider";
import { poppins } from "@/utils/fonts";
import { Toaster } from "react-hot-toast";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Gouranga Paul Group",
  description: "Gouranga Paul Group is an ecommerce website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className}`}>
        <StoreProvider>
          <Header />
          {children}
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 3000,
              className: "font-poppins",
            }}
          />
        </StoreProvider>
      </body>
    </html>
  );
}
