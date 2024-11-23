"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { addressSchema, addressSchemaType } from "@/schemas/addressSchema";
import { Loader2, LoaderCircle } from "lucide-react";
import { axiosInstance } from "@/utils/axiosInstance";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiResponse, IAddress, IPincode, IPostOffice } from "@/types/types";
import ToolTipTemplate from "@/components/common/ToolTipTemplate";
import ResponseToolTipTemplate from "@/components/common/ResponseToolTipTemplate";
import { AuthProvider } from "@/providers/AuthProvider";

const AddAddressPage = () => {
  const router = useRouter();
  const { token } = AuthProvider();

  const [pincodeData, setPincodeData] = useState<IPincode>({
    city: [],
    district: [],
    state: [],
    postoffice: [],
  });
  const [isCheckingPincode, setIsCheckingPincode] = useState<boolean>(false);
  const [hasPincodeData, setHasPincodeData] = useState<boolean>(false);
  const [isPincodeValid, setIsPincodeValid] = useState<boolean | null>(null);
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);

  // React hook form handler
  const {
    register,
    handleSubmit,
    reset,
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

  // On adding the address details
  const onAddAddress = async (data: addressSchemaType) => {
    setisSubmitting(true);
    const toastId = toast.loading("Loading...");

    try {
      const response = await axiosInstance.post<ApiResponse<IAddress>>(
        `/api/v2/user/address/add`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        toast.success("Added the Address Successfully");
        router.push("/profile/address");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setisSubmitting(false);
      toast.dismiss(toastId);
      reset();
    }
  };

  return (
    <div className="mx-12">
      <h2 className="font-semibold text-xl flex items-center gap-3">
        Add a new Address
      </h2>

      <form noValidate className="mt-7" onSubmit={handleSubmit(onAddAddress)}>
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="relative">
              <Label
                htmlFor="name"
                className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                  errors?.name?.message && "text-red-500"
                }`}
              >
                Name
              </Label>
              <Input
                id="name"
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
              {errors?.name && (
                <ToolTipTemplate errMsg={errors?.name?.message} />
              )}
            </div>
            <div className="relative">
              <Label
                htmlFor="phoneNo"
                className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                  errors?.phone?.message && "text-red-500"
                }`}
              >
                Phone Number
              </Label>
              <Input
                id="phone"
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
                htmlFor="country"
                className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
              >
                Country
              </Label>
              <Input
                id="country"
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
                htmlFor="pincode"
                className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                  errors?.pincode?.message && "text-red-500"
                } ${
                  !isCheckingPincode &&
                  isPincodeValid === true &&
                  "text-green-500"
                } ${
                  !isCheckingPincode &&
                  isPincodeValid === false &&
                  "text-red-500"
                }`}
              >
                Pincode
              </Label>
              <Input
                id="pincode"
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
              htmlFor="houseno"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors?.houseno?.message && "text-red-500"
              }`}
            >
              House No./Apartment
            </Label>
            <Input
              id="houseno"
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
              htmlFor="street"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors?.street?.message && "text-red-500"
              }`}
            >
              Street/Area
            </Label>
            <Input
              id="street"
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
              htmlFor="landmark"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors?.landmark?.message && "text-red-500"
              }`}
            >
              Landmark
            </Label>
            <Input
              id="landmark"
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
            {errors.landmark && (
              <ToolTipTemplate errMsg={errors.landmark?.message} />
            )}
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative">
              <Label
                htmlFor="city"
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
                      id="city"
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
                htmlFor="state"
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
                      id="state"
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
                htmlFor="district"
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
                      id="district"
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
                htmlFor="postoffice"
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
                      id="postoffice"
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
        <div className="flex items-center justify-center mt-10 gap-5">
          <Button
            type="button"
            variant="outline"
            className="flex-1 h-14 border border-black/70 text-black/70 text-base"
            onClick={() => {
              router.push("/profile/address");
              reset();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="authBtn"
            className="flex-1 h-14 text-base capitalize"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? <Loader2 /> : <>Save address</>}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddAddressPage;
