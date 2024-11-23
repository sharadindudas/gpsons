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
import { ApiResponse, IAddress, IPincode, IPostOffice } from "@/types/types";
import { useCallback, useState } from "react";
import { axiosInstance } from "@/utils/axiosInstance";
import ToolTipTemplate from "@/components/common/ToolTipTemplate";
import ResponseToolTipTemplate from "@/components/common/ResponseToolTipTemplate";
import { Loader2, LoaderCircle } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import {
  setBillingAddress,
  setCurrentStep,
} from "@/store/slices/checkoutSlice";
import toast from "react-hot-toast";

interface NewBillingAddressFormProps {
  token: string;
  address: IAddress;
  onAddingAddress: () => void;
}

const NewBillingAddressForm = ({
  token,
  address,
  onAddingAddress,
}: NewBillingAddressFormProps) => {
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
    register,
    handleSubmit,
    setValue,
    control,
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
      postoffice: [],
      state: [],
    });
    setHasPincodeData(false);
    setIsPincodeValid(null);
    setValue("city", "");
    setValue("district", "");
    setValue("state", "");
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

  // Submit the new billing address form
  const onNewBillingAddress = async (data: addressSchemaType) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");
    try {
      const addAddressResponse = await axiosInstance.post<
        ApiResponse<IAddress>
      >(`/api/v2/user/address/add`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (addAddressResponse.data.success) {
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
        toast.success("Added the billing address");
        dispatch(setBillingAddress(addAddressResponse.data.data as IAddress));
        dispatch(setCurrentStep(3));
        onAddingAddress();
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit(onNewBillingAddress)}>
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div className="relative">
            <Label
              htmlFor="billingName"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors?.name?.message && "text-red-500"
              }`}
            >
              Name
            </Label>
            <Input
              id="billingName"
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
              htmlFor="billingPhoneNo"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors?.phone?.message && "text-red-500"
              }`}
            >
              Phone Number
            </Label>
            <Input
              id="billingPhoneNo"
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
              id="billingPincode"
              type="text"
              {...register("pincode")}
              placeholder="Pincode"
              autoComplete="on"
              onChange={handlePincodeChange}
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
            htmlFor="billingHouseno"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
              errors?.houseno?.message && "text-red-500"
            }`}
          >
            House No./Apartment
          </Label>
          <Input
            id="billingHouseno"
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
            htmlFor="billingStreet"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
              errors?.street?.message && "text-red-500"
            }`}
          >
            Street/Area
          </Label>
          <Input
            id="billingStreet"
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
            htmlFor="billingLandmark"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
              errors?.landmark?.message && "text-red-500"
            }`}
          >
            Landmark
          </Label>
          <Input
            id="billingLandmark"
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
                  disabled={!hasPincodeData}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="billingCity"
                    className="w-full h-[51px] font-poppins text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "City"}
                  </SelectTrigger>
                  <SelectContent className="font-poppins">
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
                  disabled={!hasPincodeData}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="billingState"
                    className="w-full h-[51px] font-poppins text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "State"}
                  </SelectTrigger>
                  <SelectContent className="font-poppins">
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
                  disabled={!hasPincodeData}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="billingDistrict"
                    className="w-full h-[51px] font-poppins text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "District"}
                  </SelectTrigger>
                  <SelectContent className="font-poppins">
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
                  disabled={!hasPincodeData}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="billingPostOffice"
                    className="w-full h-[51px] font-poppins text-base pl-5 text-black border border-black/70"
                  >
                    {field.value || "Post Office"}
                  </SelectTrigger>
                  <SelectContent className="font-poppins">
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

export default NewBillingAddressForm;
