import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { CheckoutProvider } from "@/providers/CheckoutProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyotpSchema, verifyotpSchemaType } from "@/schemas/authSchema";
import { useAppDispatch } from "@/store/hooks";
import {
  setCurrentStep,
  setShippingAddress,
} from "@/store/slices/checkoutSlice";
import ToolTipTemplate from "@/components/common/ToolTipTemplate";
import { axiosInstance } from "@/utils/axiosInstance";
import { ApiResponse } from "@/types/types";
import toast from "react-hot-toast";
import Image from "next/image";

interface OtpVerificationFormProps {
  token: string;
}

const OtpVerificationForm = ({ token }: OtpVerificationFormProps) => {
  const dispatch = useAppDispatch();
  const { shippingAddress } = CheckoutProvider();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isValid },
  } = useForm<verifyotpSchemaType>({
    resolver: yupResolver(verifyotpSchema),
    mode: "onChange",
  });

  const onOtpVerification = async (data: verifyotpSchemaType) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");
    try {
      const response = await axiosInstance.patch<ApiResponse>(
        `/api/v2/user/address/verify/otp`,
        {
          type: "phone",
          id: shippingAddress.addressid,
          otp: Number(data.otp),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Otp is verified successfully");
        dispatch(setShippingAddress({ ...shippingAddress, isVerified: true }));
      }
    } catch (err: any) {
      toast.error("Failed to verify the otp");
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      reset();
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-6">
        <div className="mb-6">
          <CardTitle className="text-lg font-semibold text-gray-700 mb-1">
            Phone Number
          </CardTitle>
          <p className="text-lg text-gray-600">{shippingAddress?.phone}</p>
        </div>

        {/* Check if the shipping address is verified or not */}
        {shippingAddress.isVerified ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center bg-green-100 rounded-lg p-4">
              <CheckCircle className="text-green-500 mr-2" size={24} />
              <p className="text-green-700 font-medium">
                Phone Number is Verified
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Your phone number has been successfully verified. You can proceed
              with your order.
            </p>
            <Button
              variant="authBtn"
              onClick={() => dispatch(setCurrentStep(2))}
              className="bg-color-3/30 rounded flex items-center justify-center gap-3 font-semibold text-black/60 capitalize text-base"
            >
              <span>Back</span>
              <div className="relative w-5 h-5">
                <Image
                  className="rotate-180"
                  src="/assets/next-arrow.svg"
                  fill={true}
                  alt="next-arrow"
                />
              </div>
            </Button>
          </div>
        ) : (
          <form noValidate onSubmit={handleSubmit(onOtpVerification)}>
            <div className="mb-6">
              <CardTitle className="text-lg font-semibold text-gray-700 mb-2">
                Verify OTP
              </CardTitle>
              <div className="flex items-center relative">
                <div
                  className={`flex-grow flex items-center border border-input rounded-l-md bg-background ${
                    errors.otp?.message && "border-red-500"
                  }`}
                >
                  <Input
                    type="number"
                    {...register("otp")}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base pl-4"
                    placeholder="Enter the OTP"
                    maxLength={6}
                  />
                  {errors?.otp && (
                    <div className="absolute right-20">
                      <ToolTipTemplate errMsg={errors?.otp?.message} />
                    </div>
                  )}
                </div>
                <Button
                  variant="authBtn"
                  disabled={!isValid || isSubmitting}
                  className="rounded-l-none bg-color-3/30 text-pink-700 hover:bg-pink-300 text-base font-semibold h-[42px] w-20 capitalize"
                >
                  Verify
                </Button>
              </div>
            </div>

            <p className="text-color-3 text-sm mb-6">
              * Will Be Used To Assist Delivery
            </p>

            <Button
              variant="authBtn"
              onClick={() => dispatch(setCurrentStep(2))}
              className="bg-color-3/30 rounded flex items-center justify-center gap-3 font-semibold text-black/60 capitalize text-base"
            >
              <span>Back</span>
              <div className="relative w-5 h-5">
                <Image
                  className="rotate-180"
                  src="/assets/next-arrow.svg"
                  fill={true}
                  alt="next-arrow"
                />
              </div>
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default OtpVerificationForm;
