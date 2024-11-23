"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import OrderReviewSection from "@/components/checkout/OrderReview";
import Loader from "@/components/common/Loader";
import { useCart } from "@/services/useCart";
import { AuthProvider } from "@/providers/AuthProvider";
import { ICart } from "@/types/types";

const CheckoutPage = () => {
  const router = useRouter();
  const { token } = AuthProvider();
  const { data, isLoading } = useCart(token);

  const cartItems: ICart[] = useMemo(() => data?.data ?? [], [data?.data]);

  useEffect(() => {
    if (!isLoading && (!cartItems || cartItems.length === 0)) {
      router.back();
    }
  }, [cartItems, isLoading, router]);

  if (isLoading || !cartItems || cartItems.length === 0) {
    return <Loader />;
  }

  return (
    <div className="font-poppins tracking-tight">
      <div className="container mx-auto flex mt-14 mb-14 gap-10">
        <CheckoutSteps />
        <div className="flex-1">
          <OrderReviewSection />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
