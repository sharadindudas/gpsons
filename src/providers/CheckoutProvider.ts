"use client";

import { useAppSelector } from "@/store/hooks";
import { IAddress } from "@/types/types";

export const CheckoutProvider = () => {
  const currentStep = useAppSelector((store) => store.checkout.currentStep);
  const shippingAddress: IAddress = useAppSelector(
    (store) => store.checkout.shippingAddress
  );
  const billingAddress: IAddress = useAppSelector(
    (store) => store.checkout.billingAddress
  );
  const sameAsShippingAddress: boolean = useAppSelector(
    (store) => store.checkout.sameAsShippingAddress
  );
  const deliveryCharges: number = useAppSelector(
    (store) => store.checkout.deliveryCharges
  );

  return {
    currentStep,
    shippingAddress,
    billingAddress,
    sameAsShippingAddress,
    deliveryCharges,
  };
};
