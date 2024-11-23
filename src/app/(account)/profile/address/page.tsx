import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddressLoader from "@/components/profile/AddressLoader";

const SavedAddressesSection = dynamic(
  () => import("@/components/profile/SavedAddresses"),
  {
    ssr: false,
    loading: () => <AddressLoader />,
  }
);

const AddressPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-black/80 text-2xl font-bold">My Saved Addresses</h2>
        <Link href="/profile/address/add">
          <Button variant="outline">Add New Address</Button>
        </Link>
      </div>
      <SavedAddressesSection />
    </div>
  );
};

export default AddressPage;
