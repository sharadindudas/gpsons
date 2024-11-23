import { addressSchema, addressSchemaType } from "@/schemas/addressSchema";
import { ApiResponse, IAddress, IPincode, IPostOffice } from "@/types/types";
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
import { useCallback, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAppDispatch } from "@/store/hooks";
import {
  setCurrentStep,
  setDeliveryCharges,
  setShippingAddress,
} from "@/store/slices/checkoutSlice";
import toast from "react-hot-toast";
import { Loader2, LoaderCircle } from "lucide-react";
import ToolTipTemplate from "@/components/common/ToolTipTemplate";
import ResponseToolTipTemplate from "@/components/common/ResponseToolTipTemplate";

interface NewShippingAddressFormProps {
  token: string;
  onAddingAddress: () => void;
}

const NewShippingAddressForm = ({
  token,
  onAddingAddress,
}: NewShippingAddressFormProps) => {
  const dispatch = useAppDispatch();

  const [pincodeData, setPincodeData] = useState<IPincode>({
    city: [],
    district: [],
    state: [],
    postoffice: [],
  });
  const [hasPincodeData, setHasPincodeData] = useState<boolean>(false);
  const [isCheckingPincode, setIsCheckingPincode] = useState<boolean>(false);
  const [isPincodeValid, setIsPincodeValid] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // React hook form handler
  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<addressSchemaType>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      country: "India",
    },
    mode: "onChange",
  });

  // Reset the pincode details
  const resetPincodeDetails = useCallback(() => {
    setPincodeData({
      city: [],
      district: [],
      state: [],
      postoffice: [],
    });
    setHasPincodeData(false);
    setIsPincodeValid(null);
    setValue("city", "");
    setValue("state", "");
    setValue("district", "");
    setValue("postoffice", "");
  }, [setValue]);

  // Fetch the pincode details when the pincode data changes
  const fetchPincodeDetails = useCallback(
    async (pincode: string) => {
      setIsCheckingPincode(true);
      setIsPincodeValid(null);
      setHasPincodeData(false);

      try {
        const response = await axiosInstance.get<ApiResponse<IPostOffice[]>>(
          `/api/v2/user/address/post-offices/fetch/${pincode}`
        );
        const data = response.data.data as IPostOffice[];
        const pincodeData: IPincode = {
          city: Array.from(new Set(data.map((item) => item.city))),
          district: Array.from(new Set(data.map((item) => item.district))),
          state: Array.from(new Set(data.map((item) => item.state))),
          postoffice: Array.from(new Set(data.map((item) => item.name))),
        };
        setPincodeData(pincodeData);
        setValue("city", pincodeData.city[0]);
        setValue("state", pincodeData.state[0]);
        setValue("district", pincodeData.district[0]),
          setValue("postoffice", pincodeData.postoffice[0]);
        setHasPincodeData(true);
        setIsPincodeValid(true);
      } catch (err: any) {
        console.error(err?.response?.data?.message);
        resetPincodeDetails();
        setIsPincodeValid(false);
      } finally {
        setIsCheckingPincode(false);
      }
    },
    [setValue, resetPincodeDetails]
  );

  // Handle when the pincode data is changed
  const handlePincodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pincodeValue = e.target.value.slice(0, 6);
    setValue("pincode", pincodeValue);

    // If the pincode value is less than 6 then reset the pincode details
    if (pincodeValue.length < 6) {
      resetPincodeDetails();
    }
    // If the pincode value is exact 6 characters then fetch the pincode details
    else if (pincodeValue.length === 6) {
      await fetchPincodeDetails(pincodeValue);
    }
  };

  // Submit the new shipping address form
  const onNewShippingAddress = async (data: addressSchemaType) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");
    try {
      const addAddressResponse = await axiosInstance.post<
        ApiResponse<IAddress>
      >(`/api/v2/user/address/add`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (addAddressResponse.data.success) {
        const chargeResponse = await axiosInstance.get<ApiResponse<number>>(
          `/api/v2/checkout/delivery-charge/fetch?pincode=${data.pincode}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (chargeResponse.data.success) {
          toast.success("Added the shipping address");
          dispatch(
            setShippingAddress(addAddressResponse.data.data as IAddress)
          );
          dispatch(setDeliveryCharges(chargeResponse.data.data as number));
          dispatch(setCurrentStep(2));
          onAddingAddress();
        }
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onNewShippingAddress)}>
      <div className="space-y-5 mt-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="relative">
            <Label
              htmlFor="shippingName"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors?.name?.message && "text-red-500"
              }`}
            >
              Name
            </Label>
            <Input
              id="shippingName"
              type="text"
              placeholder="Name"
              autoComplete="on"
              {...register("name")}
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline ${
                errors?.name?.message
                  ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                  : "focus-visible:outline-2 focus-visible:outline-black/70"
              }`}
            />
            {errors?.name && <ToolTipTemplate errMsg={errors?.name?.message} />}
          </div>
          <div className="relative">
            <Label
              htmlFor="shippingPhoneNo"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors?.phone?.message && "text-red-500"
              }`}
            >
              Phone Number
            </Label>
            <Input
              id="shippingPhoneNo"
              type="text"
              {...register("phone")}
              placeholder="Phone Number"
              autoComplete="on"
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline ${
                errors?.phone?.message
                  ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                  : "focus-visible:outline-2 focus-visible:outline-black/70"
              }`}
            />
            {errors?.phone && (
              <ToolTipTemplate errMsg={errors?.phone?.message} />
            )}
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
              readOnly
              className={`rounded-[5px] border-none outline outline-1 outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline text-base`}
            />
          </div>
          <div className="relative">
            <Label
              htmlFor="shippingPincode"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors?.pincode?.message && "text-red-500"
              } ${
                !isCheckingPincode &&
                isPincodeValid === true &&
                "text-green-500"
              } ${
                !isCheckingPincode && isPincodeValid === false && "text-red-500"
              }`}
            >
              Pincode
            </Label>
            <Input
              id="shippingPincode"
              type="text"
              {...register("pincode")}
              placeholder="Pincode"
              onChange={handlePincodeChange}
              autoComplete="on"
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline ${
                errors?.pincode?.message
                  ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                  : "focus-visible:outline-2 focus-visible:outline-black/70"
              } ${
                !isCheckingPincode &&
                isPincodeValid === true &&
                "outline-2 outline-green-500 focus-visible:outline-2 focus-visible:outline-green-500"
              } ${
                !isCheckingPincode &&
                isPincodeValid === false &&
                "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
              }`}
            />
            <span className="absolute top-1/2 -translate-y-1/2 right-4">
              {isCheckingPincode && <LoaderCircle className="animate-spin" />}
            </span>
            {!isCheckingPincode && isPincodeValid === true && (
              <ResponseToolTipTemplate
                message="Pincode is correct"
                success={true}
              />
            )}
            {!isCheckingPincode && isPincodeValid === false && (
              <ResponseToolTipTemplate
                message="Incorrect Pincode"
                success={false}
              />
            )}
          </div>
        </div>
        <div className="relative">
          <Label
            htmlFor="shippingHouseNo"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
              errors?.houseno?.message && "text-red-500"
            }`}
          >
            House No./Apartment
          </Label>
          <Input
            id="shippingHouseNo"
            type="text"
            {...register("houseno")}
            placeholder="House No./Apartment"
            autoComplete="on"
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline ${
              errors?.houseno?.message
                ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                : "focus-visible:outline-2 focus-visible:outline-black/70"
            }`}
          />
          {errors?.houseno && (
            <ToolTipTemplate errMsg={errors?.houseno?.message} />
          )}
        </div>
        <div className="relative">
          <Label
            htmlFor="shippingStreet"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
              errors?.street?.message && "text-red-500"
            }`}
          >
            Street/Area
          </Label>
          <Input
            id="shippingStreet"
            type="text"
            {...register("street")}
            placeholder="Street/Area"
            autoComplete="on"
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline ${
              errors?.street?.message
                ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                : "focus-visible:outline-2 focus-visible:outline-black/70"
            }`}
          />
          {errors?.street && (
            <ToolTipTemplate errMsg={errors?.street?.message} />
          )}
        </div>
        <div className="relative">
          <Label
            htmlFor="shippingLandmark"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
              errors?.landmark?.message && "text-red-500"
            }`}
          >
            Landmark
          </Label>
          <Input
            id="shippingLandmark"
            type="text"
            {...register("landmark")}
            placeholder="Landmark"
            autoComplete="on"
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline ${
              errors?.landmark?.message
                ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                : "focus-visible:outline-2 focus-visible:outline-black/70"
            }`}
          />
          {errors?.landmark && (
            <ToolTipTemplate errMsg={errors?.landmark?.message} />
          )}
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
                  disabled={!hasPincodeData}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="shippingCity"
                    className="w-full h-[51px] text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "City"}
                  </SelectTrigger>
                  <SelectContent>
                    {pincodeData.city.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
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
                  disabled={!hasPincodeData}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="shippingState"
                    className="w-full h-[51px] text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "State"}
                  </SelectTrigger>
                  <SelectContent>
                    {pincodeData.state.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
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
                  disabled={!hasPincodeData}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="shippingDistrict"
                    className="w-full h-[51px] text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "District"}
                  </SelectTrigger>
                  <SelectContent>
                    {pincodeData.district.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
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
                  disabled={!hasPincodeData}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="shippingPostOffice"
                    className="w-full h-[51px]  text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "Post Office"}
                  </SelectTrigger>
                  <SelectContent>
                    {pincodeData.postoffice.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        </div>
      </div>

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

export default NewShippingAddressForm;
