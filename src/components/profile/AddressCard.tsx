"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IAddress } from "@/types/types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAppSelector } from "@/store/hooks";
import toast from "react-hot-toast";

interface Props {
  address: IAddress;
  onAddressDeleted: () => void;
}

const AddressCard = ({ address, onAddressDeleted }: Props) => {
  const token = useAppSelector((store) => store.auth.token) as string;

  const handleDeleteAddress = async () => {
    try {
      const response = await axiosInstance.delete(
        `/api/v2/user/address/remove?addressid=${address.addressid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Deleted the Address Successfully");
        onAddressDeleted();
      }
    } catch (err) {
      console.error("Failed to delete the address");
      toast.error("Failed to delete the address");
    }
  };

  return (
    <Card className="p-6 border border-black/15">
      <div className="space-y-4">
        <h4 className="text-xl font-medium leading-none">{address.name}</h4>
        <p className="text-sm">{address.street}</p>
        <div className="flex items-center gap-3">
          <Link href={`/profile/address/edit/${address.addressid}`}>
            <Button size="sm" variant="outline">
              Edit
            </Button>
          </Link>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline">
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="font-poppins">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your address from this account.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAddress}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </Card>
  );
};

export default AddressCard;
