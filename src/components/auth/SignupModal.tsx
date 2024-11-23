import { useState } from "react";
import Image from "next/image";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ToolTipTemplate from "@/components/common/ToolTipTemplate";
import { ApiResponse, IUser } from "@/types/types";
import toast from "react-hot-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { axiosInstance } from "@/utils/axiosInstance";
import { signupSchema, signupSchemaType } from "@/schemas/authSchema";
import { phoneParser } from "@/utils/phoneValidator";

interface SignupModalProps {
  onSignupSuccess: () => void;
  onShowLogin: () => void;
  onCloseModal: () => void;
}

const SignupModal = ({
  onSignupSuccess,
  onShowLogin,
  onCloseModal,
}: SignupModalProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid },
    register,
  } = useForm<signupSchemaType>({
    resolver: yupResolver(signupSchema),
    mode: "onChange",
  });

  const onSignup = async (data: signupSchemaType) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");
    const { name, email, phone, password } = data;
    const signupData = {
      name,
      email,
      phone: phoneParser(phone)!.number,
      password,
    };

    try {
      const response = await axiosInstance.post<ApiResponse<IUser>>(
        `/api/v2/auth/signup`,
        signupData
      );

      if (response.data.success) {
        toast.success("User is registered successfully");

        localStorage.setItem("user", JSON.stringify(response.data?.data));

        await axiosInstance.get<ApiResponse>(`/api/v2/auth/get/otp`, {
          params: {
            type: "email",
            id: response.data?.data?.userid,
          },
        });

        await axiosInstance.get<ApiResponse>(`/api/v2/auth/get/otp`, {
          params: {
            type: "phone",
            id: response.data?.data?.userid,
          },
        });

        onSignupSuccess();
      }
    } catch (err) {
      toast.error("Signup failed. Please try again.");
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      reset();
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
      <div className="my-6 text-center max-w-[300px] mx-auto">
        <h2 className="text-black/60 text-sm font-semibold">
          Create an Account
        </h2>

        <form
          noValidate
          className="my-5 text-[13px]"
          onSubmit={handleSubmit(onSignup)}
        >
          <div className="space-y-2">
            <div className="flex justify-center border border-black/40 rounded-lg relative">
              <div className="w-20 text-black/60 font-medium bg-color-3/10 flex items-center justify-center">
                <span>IN (+91)</span>
              </div>
              <Input
                type="text"
                placeholder="Phone Number"
                autoComplete="on"
                {...register("phone")}
                className={`border-none py-0 outline outline-1 rounded-l-none outline-black/15 focus-visible:ring-offset-1 focus-visible:ring-color-3/40 ${
                  errors.phone?.message &&
                  "focus-visible:ring-offset-1 focus-visible:ring-red-500 outline-2 outline-red-500"
                }`}
              />
              {errors.phone && (
                <ToolTipTemplate errMsg={errors.phone?.message} />
              )}
            </div>

            <div className="relative">
              <Input
                type="text"
                placeholder="Full Name"
                autoComplete="on"
                {...register("name")}
                className={`border-none py-0 outline outline-1 outline-black/40 focus-visible:ring-offset-1 focus-visible:ring-color-3/40 ${
                  errors.name?.message &&
                  "focus-visible:ring-offset-1 focus-visible:ring-red-500 outline-2 outline-red-500"
                }`}
              />
              {errors.name && <ToolTipTemplate errMsg={errors.name?.message} />}
            </div>

            <div className="relative">
              <Input
                type="email"
                placeholder="Email Address"
                autoComplete="on"
                {...register("email")}
                className={`border-none py-0 outline outline-1 outline-black/40 focus-visible:ring-offset-1 focus-visible:ring-color-3/40 ${
                  errors.email?.message &&
                  "focus-visible:ring-offset-1 focus-visible:ring-red-500 outline-2 outline-red-500"
                }`}
              />
              {errors.email && (
                <ToolTipTemplate errMsg={errors.email?.message} />
              )}
            </div>

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="on"
                {...register("password")}
                className={`border-none py-0 outline outline-1 outline-black/40 focus-visible:ring-offset-1 focus-visible:ring-color-3/40 ${
                  errors.password?.message &&
                  "focus-visible:ring-offset-1 focus-visible:ring-red-500 outline-2 outline-red-500"
                }`}
              />
              <div
                className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="text-color-3/70 w-4" />
                ) : (
                  <EyeIcon className="text-color-3/70 w-4" />
                )}
              </div>
              {errors.password && (
                <ToolTipTemplate errMsg={errors.password?.message} />
              )}
            </div>

            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                autoComplete="on"
                {...register("confirmPassword")}
                className={`border-none py-0 outline outline-1 outline-black/40 focus-visible:ring-offset-1 focus-visible:ring-color-3/40 ${
                  errors.confirmPassword?.message &&
                  "focus-visible:ring-offset-1 focus-visible:ring-red-500 outline-2 outline-red-500"
                }`}
              />
              <div
                className="absolute right-8 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOffIcon className="text-color-3/70 w-4" />
                ) : (
                  <EyeIcon className="text-color-3/70 w-4" />
                )}
              </div>
              {errors.confirmPassword && (
                <ToolTipTemplate errMsg={errors.confirmPassword?.message} />
              )}
            </div>
          </div>
          <p className="text-black/80 mt-4 mb-1">
            Already have an account ? {""}{" "}
            <span className="cursor-pointer font-medium" onClick={onShowLogin}>
              Login
            </span>
          </p>
          <div>
            <Button
              variant="authBtn"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              send otp via sms
            </Button>
          </div>
          <p className="text-xs mt-3 text-black/60 font-semibold capitalize">
            By proceeding, you agree to Gouranga paul&apos;s{" "}
            <Link
              href="/privacy-policy"
              className="text-blue-400"
              onClick={onCloseModal}
            >
              Privacy Policy
            </Link>{" "}
            And{" "}
            <Link
              href="/terms-and-conditions"
              className="text-blue-400"
              onClick={onCloseModal}
            >
              Terms of Use
            </Link>
          </p>
        </form>
      </div>
    </DialogContent>
  );
};

export default SignupModal;
