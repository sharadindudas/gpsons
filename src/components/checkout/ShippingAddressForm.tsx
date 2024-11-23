import { IAddress } from "@/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { CirclePlus } from "lucide-react";
import ExistingShippingAddressForm from "./ExistingShippingAddressForm";
import NewShippingAddressForm from "./NewShippingAddressForm";
import { useAppDispatch } from "@/store/hooks";
import { setShippingAddress } from "@/store/slices/checkoutSlice";
import { CheckoutProvider } from "@/providers/CheckoutProvider";

interface ShippingAddressFormProps {
  token: string;
  addresses: IAddress[];
  onAddingAddress: () => void;
}

const ShippingAddressForm = ({
  token,
  addresses,
  onAddingAddress,
}: ShippingAddressFormProps) => {
  const dispatch = useAppDispatch();

  const { shippingAddress } = CheckoutProvider();

  const [existingShippingAddress, setExistingShippingAddress] =
    useState<IAddress | null>(shippingAddress ?? addresses[0]);
  const [isNewShippingAddress, SetIsNewShippingAddress] =
    useState<boolean>(false);

  // Handle the shipping address selection
  const handleSelectExistingShippingAddress = (addressid: string) => {
    // Check if the address is existing
    if (addressid !== "new") {
      const existingAddress = addresses.find(
        (address) => address.addressid === addressid
      ) as IAddress;
      SetIsNewShippingAddress(false);
      setExistingShippingAddress(existingAddress);
    }
    // Check if the address is new
    else {
      SetIsNewShippingAddress(true);
      dispatch(setShippingAddress(null));
      setExistingShippingAddress(null);
    }
  };

  return (
    <>
      {/* Select your address */}
      <Select
        value={existingShippingAddress?.addressid ?? "new"}
        onValueChange={handleSelectExistingShippingAddress}
      >
        <SelectTrigger className="w-full h-[51px] text-base pl-5 text-black border border-black/70">
          <SelectValue placeholder="Select your shipping address" />
        </SelectTrigger>
        <SelectContent>
          {addresses?.map((address) => (
            <SelectItem key={address.addressid} value={address.addressid}>
              {address.street}
            </SelectItem>
          ))}
          <SelectItem value="new">
            <div className="flex items-center gap-2">
              <CirclePlus className="w-5" />
              Add a new address
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Check if the address is existing or new */}
      {existingShippingAddress && (
        <ExistingShippingAddressForm
          token={token}
          selectedAddress={existingShippingAddress}
        />
      )}

      {isNewShippingAddress && (
        <NewShippingAddressForm
          token={token}
          onAddingAddress={onAddingAddress}
        />
      )}
    </>
  );
};

export default ShippingAddressForm;
