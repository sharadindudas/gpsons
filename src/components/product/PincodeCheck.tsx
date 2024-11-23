import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { AxiosError } from "axios";
import { axiosInstance } from "@/utils/axiosInstance";
import { Input } from "@/components/ui/input";
import ResponseToolTipTemplate from "@/components/common/ResponseToolTipTemplate";
import { ApiResponse } from "@/types/types";

const PincodeCheck = () => {
  const [pincode, setPincode] = useState<string>("");
  const [isCheckingPincode, setIsCheckingPincode] = useState<boolean>(false);
  const [isPincodeValid, setIsPincodeValid] = useState<boolean | null>(null);

  const fetchPincodeDetails = async () => {
    setIsCheckingPincode(true);
    setIsPincodeValid(null);
    try {
      const response = await axiosInstance.get(
        `/api/v2/user/address/post-offices/fetch/${pincode}`
      );
      if (response.data.success) {
        setIsPincodeValid(true);
      }
    } catch (err) {
      const errMsg = err as AxiosError<ApiResponse>;
      console.error(
        "Failed to fetch pincode data" || errMsg.response?.data?.message
      );
      setIsPincodeValid(false);
    } finally {
      setIsCheckingPincode(false);
    }
  };

  const handlePincodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 6);
    setPincode(value);
  };
  return (
    <div className="text-base">
      <h3 className="font-semibold">Delivery Details:</h3>
      <div className="mt-2 flex gap-2 items-center">
        <div className="relative w-52 h-11">
          <Input
            id="pincode"
            type="text"
            placeholder="Enter your Pincode"
            autoComplete="on"
            onChange={handlePincodeChange}
            value={pincode}
            className={`rounded-[5px] border-none outline outline-1 text-sm outline-black/70 w-full h-full px-4 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-black/70 ${
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
              message="Delivery is available"
              success={true}
            />
          )}
          {!isCheckingPincode && isPincodeValid === false && (
            <ResponseToolTipTemplate
              message="Delivery is not available"
              success={false}
            />
          )}
        </div>
        <div>
          <button
            onClick={fetchPincodeDetails}
            className="rounded-lg w-28 h-11 bg-color-3/40"
          >
            Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default PincodeCheck;
