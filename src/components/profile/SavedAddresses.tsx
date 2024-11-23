"use client";

import AddressCard from "@/components/profile/AddressCard";
import { useAddress } from "@/services/useAddress";
import { useAppSelector } from "@/store/hooks";
import { IAddress } from "@/types/types";

const SavedAddressesSection = () => {
  const token = useAppSelector((store) => store.auth.token) as string;
  const { data, isLoading, error, mutate } = useAddress(token);

  if (error) return <div className="mt-3">No Address !!</div>;
  if (isLoading) return <div></div>;

  const addresses: IAddress[] = data?.data[0]?.addresses;

  const onAddressDeleted = () => {
    mutate();
  };

  return (
    <div className="grid grid-cols-2 gap-8 my-8">
      {addresses?.map((address) => (
        <AddressCard
          key={address.addressid}
          address={address}
          onAddressDeleted={onAddressDeleted}
        />
      ))}
    </div>
  );
};

export default SavedAddressesSection;
