import Image from "next/image";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/types";
import { axiosInstance } from "@/utils/axiosInstance";
import toast from "react-hot-toast";
import AuthTermsAndCondition from "./AuthTermsAndCondition";
import { Loader2 } from "lucide-react";

interface VerifyOtpModalProps {
  onVerifyOtpSuccess: () => void;
  onCloseModal: () => void;
}

const VerifyOtpModal = ({
  onVerifyOtpSuccess,
  onCloseModal,
}: VerifyOtpModalProps) => {
  const [phoneOtp, setPhoneOtp] = useState<string>("");
  const [emailOtp, setEmailOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    setIsDisabled(phoneOtp.length !== 6 || emailOtp.length !== 6);
  }, [phoneOtp, emailOtp]);

  const onVerifyOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");

    try {
      const user = JSON.parse(localStorage.getItem("user")!);

      let phoneOtpVerified = true,
        emailOtpVerified = false;

      if (phoneOtp.length === 6) {
        try {
          const phoneOtpResponse = await axiosInstance.patch<ApiResponse>(
            `/api/v2/auth/verify/otp`,
            {
              type: "phone",
              id: user.userid,
              otp: Number(phoneOtp),
            }
          );

          if (phoneOtpResponse.data.success) {
            phoneOtpVerified = true;
          }
        } catch (error) {
          const errMsg = error as AxiosError<ApiResponse>;

          if (errMsg.response?.data?.message.includes("already verified")) {
            phoneOtpVerified = true;
          } else {
            throw error;
          }
        }
      }

      if (emailOtp.length === 6) {
        try {
          const emailOtpResponse = await axiosInstance.patch<ApiResponse>(
            `/api/v2/auth/verify/otp`,
            {
              type: "email",
              id: user.userid,
              otp: Number(emailOtp),
            }
          );

          if (emailOtpResponse.data.success) {
            emailOtpVerified = true;
          }
        } catch (error) {
          const errMsg = error as AxiosError<ApiResponse>;

          if (errMsg.response?.data?.message.includes("already verified")) {
            emailOtpVerified = true;
          } else {
            throw error;
          }
        }
      }

      if (phoneOtpVerified && emailOtpVerified) {
        toast.success("Otp has been verified successfully");

        localStorage.removeItem("user");

        onVerifyOtpSuccess();
      } else {
        toast.error("Something went wrong while verifying the OTP");
      }
    } catch (err) {
      toast.error("OTP Verification failed. Please try again");
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      setPhoneOtp("");
      setEmailOtp("");
    }
  };

  return (
    <DialogContent className="max-w-[402px] tracking-tight">
      <DialogHeader className="relative">
        <DialogTitle className="bg-color-3/30 w-full h-20 rounded-tl-lg rounded-tr-lg"></DialogTitle>
        <DialogDescription className="absolute top-1 left-1/2 -translate-x-1/2">
          <Image
            src="/assets/gpaul-logo.png"
            width={128}
            height={89}
            alt="gpaul-logo"
            className="mx-auto"
          />
        </DialogDescription>
      </DialogHeader>
      <div className="my-6 text-center">
        <h2 className="text-black/60 text-sm font-semibold">
          Verify your account
        </h2>

        <form
          noValidate
          className="my-5 text-[13px] space-y-4"
          onSubmit={onVerifyOtp}
        >
          <div>
            <Label htmlFor="phoneOtp" className="mb-2 text-black/60 block">
              We have sent you an OTP on your phone
            </Label>
            <InputOTP
              maxLength={6}
              id="phoneOtp"
              onChange={(val) => setPhoneOtp(val)}
              value={phoneOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div>
            <Label htmlFor="emailOtp" className="mb-2 text-black/60 block">
              We have sent you an OTP on your email
            </Label>
            <InputOTP
              maxLength={6}
              id="emailOtp"
              onChange={(val) => setEmailOtp(val)}
              value={emailOtp}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          <div className="w-4/5 mx-auto">
            <Button
              variant="authBtn"
              type="submit"
              disabled={isDisabled || isSubmitting}
            >
              {isSubmitting ? <Loader2 /> : <>Verify OTP</>}
            </Button>
          </div>
          <AuthTermsAndCondition onCloseModal={onCloseModal} />
        </form>
      </div>
    </DialogContent>
  );
};

export default VerifyOtpModal;
