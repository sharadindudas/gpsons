import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addressSchema, addressSchemaType } from "@/schemas/addressSchema";
import { ApiResponse, IAddress } from "@/types/types";
import { useAppDispatch } from "@/store/hooks";
import {
  setBillingAddressFromShipping,
  setCurrentStep,
} from "@/store/slices/checkoutSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { Loader2 } from "lucide-react";

interface ExistingBillingAddressFormProps {
  token: string;
  address: IAddress;
  sameAsShippingAddress: boolean;
}

const ExistingBillingAddressForm = ({
  token,
  address,
  sameAsShippingAddress,
}: ExistingBillingAddressFormProps) => {
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<addressSchemaType>({
    resolver: yupResolver(addressSchema),
    defaultValues: address,
    mode: "onChange",
  });

  // Submit the existing billing address form
  const onExistingBillingAddress = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");
    try {
      if (sameAsShippingAddress) {
        dispatch(setBillingAddressFromShipping());
        toast.success("Added the billing address");

        if (!address.isVerified) {
          await axiosInstance.get<ApiResponse>(
            `/api/v2/user/address/send/otp`,
            {
              params: {
                type: "phone",
                id: address.addressid,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
        dispatch(setCurrentStep(3));
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onExistingBillingAddress)}>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="relative">
            <Label
              htmlFor="billingName"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              Name
            </Label>
            <Input
              id="billingName"
              type="text"
              placeholder="Name"
              autoComplete="on"
              disabled
              {...register("name")}
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="billingPhoneNo"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              Phone Number
            </Label>
            <Input
              id="billingPhoneNo"
              type="text"
              {...register("phone")}
              placeholder="Phone Number"
              autoComplete="on"
              disabled
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="billingCountry"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              Country
            </Label>
            <Input
              id="billingCountry"
              type="text"
              {...register("country")}
              placeholder="Country"
              disabled
              readOnly
              className={`rounded-[5px] border-none outline outline-1 outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline text-base`}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="billingPincode"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              Pincode
            </Label>
            <Input
              id="billingPincode"
              type="text"
              {...register("pincode")}
              placeholder="Pincode"
              disabled
              autoComplete="on"
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
            />
          </div>
        </div>
        <div className="relative">
          <Label
            htmlFor="billingHouseno"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
          >
            House No./Apartment
          </Label>
          <Input
            id="billingHouseno"
            type="text"
            {...register("houseno")}
            placeholder="House No./Apartment"
            disabled
            autoComplete="on"
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="billingStreet"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
          >
            Street/Area
          </Label>
          <Input
            id="billingStreet"
            type="text"
            {...register("street")}
            placeholder="Street/Area"
            disabled
            autoComplete="on"
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="billingLandmark"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
          >
            Landmark
          </Label>
          <Input
            id="billingLandmark"
            type="text"
            {...register("landmark")}
            placeholder="Landmark"
            disabled
            autoComplete="on"
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="relative">
            <Label
              htmlFor="billingCity"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              City
            </Label>
            <Controller
              control={control}
              name="city"
              render={({ field }) => (
                <Select
                  disabled
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="billingCity"
                    className="w-full h-[51px] text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "City"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={field.value}>{field.value}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="billingState"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              State
            </Label>
            <Controller
              control={control}
              name="state"
              render={({ field }) => (
                <Select
                  disabled
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="billingState"
                    className="w-full h-[51px] text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "State"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={field.value}>{field.value}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="billingDistrict"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              District
            </Label>
            <Controller
              control={control}
              name="district"
              render={({ field }) => (
                <Select
                  disabled
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="billingDistrict"
                    className="w-full h-[51px] text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "District"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={field.value}>{field.value}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="billingPostOffice"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              Post Office
            </Label>
            <Controller
              control={control}
              name="postoffice"
              render={({ field }) => (
                <Select
                  disabled
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="billingPostOffice"
                    className="w-full h-[51px] text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "Post Office"}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={field.value}>{field.value}</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      <div className="text-base mt-5 flex items-center justify-between">
        <Button
          type="button"
          variant="authBtn"
          onClick={() => dispatch(setCurrentStep(1))}
          className="bg-color-3/30 rounded flex items-center justify-center gap-3 w-28 h-9 font-medium text-black/60 capitalize"
        >
          Back
          <div className="relative w-5 h-5">
            <Image
              className="rotate-180"
              src="/assets/next-arrow.svg"
              fill={true}
              alt="next-arrow"
            />
          </div>
        </Button>
        <Button
          variant="authBtn"
          disabled={!isValid || isSubmitting}
          className="bg-color-3/30 rounded flex items-center justify-center gap-3 w-28 h-9 font-medium text-black/60 capitalize"
        >
          {isSubmitting ? (
            <Loader2 />
          ) : (
            <>
              Next
              <div className="relative w-5 h-5">
                <Image
                  src="/assets/next-arrow.svg"
                  fill={true}
                  alt="next-arrow"
                />
              </div>
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ExistingBillingAddressForm;
