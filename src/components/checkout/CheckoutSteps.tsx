import { AuthProvider } from "@/providers/AuthProvider";
import { CheckoutProvider } from "@/providers/CheckoutProvider";
import StepIndicator from "./StepIndicator";
import { useAddress } from "@/services/useAddress";
import { IAddress } from "@/types/types";
import { useMemo } from "react";
import ShippingAddressForm from "./ShippingAddressForm";
import NewShippingAddressForm from "./NewShippingAddressForm";
import BillingAddressForm from "./BillingAddressForm";
import OtpVerificationForm from "./OtpVerificationForm";

const CheckoutSteps = () => {
  // Providers
  const { token } = AuthProvider();
  const { currentStep } = CheckoutProvider();

  // Get all the addresses data
  const { data, isLoading, mutate } = useAddress(token);
  const addresses: IAddress[] = useMemo(
    () => data?.data[0]?.addresses ?? [],
    [data?.data]
  );

  const onAddingAddress = () => {
    mutate();
  };

  const RenderMultiStepForm = () => {
    switch (currentStep) {
      case 1:
        if (addresses?.length > 0) {
          return (
            <ShippingAddressForm
              token={token}
              addresses={addresses}
              onAddingAddress={onAddingAddress}
            />
          );
        } else {
          return (
            <>
              <h2 className="text-xl font-semibold pb-2">Add a new Address</h2>
              <NewShippingAddressForm
                token={token}
                onAddingAddress={onAddingAddress}
              />
            </>
          );
        }
      case 2:
        return (
          <BillingAddressForm token={token} onAddingAddress={onAddingAddress} />
        );
      case 3:
        return <OtpVerificationForm token={token} />;
    }
  };

  if (isLoading) return <div>Loading your addresses...</div>;

  return (
    <div>
      {/* Current Form */}
      <StepIndicator />

      {/* Multistep Forms */}
      {RenderMultiStepForm()}
    </div>
  );
};

export default CheckoutSteps;
