import { addressSchema, addressSchemaType } from "@/schemas/addressSchema";
import { ApiResponse, IAddress } from "@/types/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
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
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAppDispatch } from "@/store/hooks";
import {
  setCurrentStep,
  setDeliveryCharges,
  setShippingAddress,
} from "@/store/slices/checkoutSlice";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

interface ExistingShippingAddressFormProps {
  token: string;
  selectedAddress: IAddress;
}

const ExistingShippingAddressForm = ({
  token,
  selectedAddress,
}: ExistingShippingAddressFormProps) => {
  const dispatch = useAppDispatch();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // React hook form handler
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { isValid },
  } = useForm<addressSchemaType>({
    resolver: yupResolver(addressSchema),
    defaultValues: selectedAddress,
    mode: "onChange",
  });

  // Change the form fields whenever the selected address changes
  useEffect(() => {
    if (selectedAddress) {
      reset(selectedAddress);
    }
  }, [selectedAddress, reset]);

  // Submit the existing shipping address form
  const onExistingShippingAddress = async (data: addressSchemaType) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");
    try {
      const deliveryChargeResponse = await axiosInstance.get<ApiResponse>(
        `/api/v2/checkout/delivery-charge/fetch?pincode=${data?.pincode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (deliveryChargeResponse.data.success) {
        dispatch(setDeliveryCharges(deliveryChargeResponse.data?.data!));
        dispatch(setShippingAddress(data as IAddress));
        dispatch(setCurrentStep(2));
        toast.success("Added the shipping address");
      } else {
        toast.error("Failed to add the shipping address");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onExistingShippingAddress)}>
      {/* Form fields */}
      <div className="space-y-5 mt-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="relative">
            <Label
              htmlFor="shippingName"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              Name
            </Label>
            <Input
              id="shippingName"
              type="text"
              placeholder="Name"
              disabled
              {...register("name")}
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="shippingPhoneNo"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              Phone Number
            </Label>
            <Input
              id="shippingPhoneNo"
              type="text"
              {...register("phone")}
              placeholder="Phone Number"
              disabled
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="shippingCountry"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              Country
            </Label>
            <Input
              id="shippingCountry"
              type="text"
              {...register("country")}
              placeholder="Country"
              disabled
              className={`rounded-[5px] border-none outline outline-1 outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline text-base`}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="shippingPincode"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
            >
              Pincode
            </Label>
            <Input
              id="shippingPincode"
              type="text"
              {...register("pincode")}
              placeholder="Pincode"
              disabled
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
            />
          </div>
        </div>
        <div className="relative">
          <Label
            htmlFor="shippingHouseno"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
          >
            House No./Apartment
          </Label>
          <Input
            id="shippingHouseno"
            type="text"
            {...register("houseno")}
            placeholder="House No./Apartment"
            disabled
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="shippingStreet"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
          >
            Street/Area
          </Label>
          <Input
            id="shippingStreet"
            type="text"
            {...register("street")}
            placeholder="Street/Area"
            disabled
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
          />
        </div>
        <div className="relative">
          <Label
            htmlFor="shippingLandmark"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
          >
            Landmark
          </Label>
          <Input
            id="shippingLandmark"
            type="text"
            {...register("landmark")}
            placeholder="Landmark"
            disabled
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
          />
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div className="relative">
            <Label
              htmlFor="shippingCity"
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
                    id="shippingCity"
                    className="w-full h-[51px] font-poppins text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "City"}
                  </SelectTrigger>
                  <SelectContent className="font-poppins">
                    <SelectItem value={field.value || "City"}>
                      {field.value || "City"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="shippingState"
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
                    id="shippingState"
                    className="w-full h-[51px] font-poppins text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "State"}
                  </SelectTrigger>
                  <SelectContent className="font-poppins">
                    <SelectItem value={field.value || "State"}>
                      {field.value || "State"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="shippingDistrict"
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
                    id="shippingDistrict"
                    className="w-full h-[51px] font-poppins text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "District"}
                  </SelectTrigger>
                  <SelectContent className="font-poppins">
                    <SelectItem value={field.value || "District"}>
                      {field.value || "District"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="shippingPostOffice"
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
                    id="shippingPostOffice"
                    className="w-full h-[51px] font-poppins text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "Post Office"}
                  </SelectTrigger>
                  <SelectContent className="font-poppins">
                    <SelectItem value={field.value || "Post Office"}>
                      {field.value || "Post Office"}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="text-base mt-5 flex items-center justify-end">
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

export default ExistingShippingAddressForm;
