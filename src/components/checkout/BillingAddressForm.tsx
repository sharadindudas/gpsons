import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CheckoutProvider } from "@/providers/CheckoutProvider";
import { useAppDispatch } from "@/store/hooks";
import ExistingBillingAddressForm from "./ExistingBillingAddressForm";
import NewBillingAddressForm from "./NewBillingAddressForm";
import { setSameAsShippingAddress } from "@/store/slices/checkoutSlice";

interface BillingAddressFormProps {
  token: string;
  onAddingAddress: () => void;
}

const BillingAddressForm = ({
  token,
  onAddingAddress,
}: BillingAddressFormProps) => {
  const dispatch = useAppDispatch();
  const { shippingAddress, sameAsShippingAddress } = CheckoutProvider();

  const handleSameAsShippingAddress = (checked: boolean) => {
    dispatch(setSameAsShippingAddress(checked));
  };

  return (
    <>
      {/* Same as shipping address checkbox */}
      <div className="flex items-center space-x-2 pb-8">
        <Checkbox
          id="sameAsShippingAddress"
          checked={sameAsShippingAddress}
          onCheckedChange={(checked: boolean) =>
            handleSameAsShippingAddress(checked)
          }
        />
        <Label htmlFor="sameAsShippingAddress">Same as shipping address</Label>
      </div>

      {/* Check if the address is same as shipping address or not */}
      {sameAsShippingAddress ? (
        <ExistingBillingAddressForm
          token={token}
          address={shippingAddress}
          sameAsShippingAddress={sameAsShippingAddress}
        />
      ) : (
        <NewBillingAddressForm
          token={token}
          address={shippingAddress}
          onAddingAddress={onAddingAddress}
        />
      )}
    </>
  );
};

export default BillingAddressForm;
