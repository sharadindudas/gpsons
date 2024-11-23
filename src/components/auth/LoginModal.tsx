import Image from "next/image";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import ToolTipTemplate from "../common/ToolTipTemplate";
import { useState } from "react";
import { ApiResponse, IUser } from "@/types/types";
import toast from "react-hot-toast";
import { loginSchema, loginSchemaType } from "@/schemas/authSchema";
import Cookies from "js-cookie";
import { usePathname, useRouter } from "next/navigation";
import { EyeOffIcon, EyeIcon, Loader2 } from "lucide-react";
import { setToken, setUser } from "@/store/slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import { axiosInstance } from "@/utils/axiosInstance";
import AuthTermsAndCondition from "./AuthTermsAndCondition";

interface LoginModalProps {
  onShowSignup: () => void;
  onCloseModal: () => void;
}

const LoginModal = ({ onShowSignup, onCloseModal }: LoginModalProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberme] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<loginSchemaType>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const onLogin = async (data: loginSchemaType) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");
    const { identity, password } = data;
    const loginData = { identity, password };

    try {
      const response = await axiosInstance.post<ApiResponse<IUser>>(
        `/api/v2/auth/signin`,
        loginData
      );

      if (response.data.success) {
        toast.success("User signed in successfully");

        const cookieExpiry = rememberMe
          ? 72 * 60 * 60 * 1000
          : 24 * 60 * 60 * 1000;

        const token = response.data?.data?.token as string;

        Cookies.set("token", token, {
          secure: true,
          sameSite: "strict",
          expires: new Date(Date.now() + cookieExpiry),
          path: "/",
        });

        dispatch(setToken(token));

        dispatch(setUser(response.data?.data));

        router.push(pathname);

        onCloseModal();
      }
    } catch (err) {
      toast.error("Signin failed. Please try again.");
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
          Login your Account
        </h2>

        <form
          noValidate
          className="my-5 text-[13px]"
          onSubmit={handleSubmit(onLogin)}
        >
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Email or Phone Number"
                autoComplete="on"
                {...register("identity")}
                className={`border-none py-0 outline outline-1 outline-black/40 focus-visible:ring-offset-1 focus-visible:ring-color-3/40 ${
                  errors.identity?.message &&
                  "focus-visible:ring-offset-1 focus-visible:ring-red-500 outline-2 outline-red-500"
                }`}
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-3">
                {errors.identity && (
                  <ToolTipTemplate errMsg={errors.identity?.message} />
                )}
              </div>
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
                className="absolute top-2 right-8 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="text-color-3 w-4" />
                ) : (
                  <EyeIcon className="text-color-3 w-4" />
                )}
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 right-3">
                {errors.password && (
                  <ToolTipTemplate errMsg={errors.password?.message} />
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2 relative">
                <input
                  type="checkbox"
                  id="remember"
                  {...register("rememberMe")}
                  onChange={(e) => setRememberme(e.target.checked)}
                  className="absolute z-[1] opacity-0"
                />
                <div className="custom-checkbox">
                  <Image
                    src="/assets/tick.png"
                    width={12}
                    height={12}
                    className="hidden"
                    style={{ width: "auto", height: "auto" }}
                    alt="tick"
                    loading="lazy"
                  />
                </div>
                <Label htmlFor="remember" className="text-black/70 text-[13px]">
                  Remember me
                </Label>
              </div>
              <span className="text-color-3/50 font-semibold cursor-pointer">
                Forgot password?
              </span>
            </div>
            <p className="text-black/80">
              Not Registered yet ? {""}{" "}
              <span
                className="cursor-pointer font-semibold"
                onClick={onShowSignup}
              >
                Signup
              </span>
            </p>
          </div>
          <div className="mt-2">
            <Button
              variant="authBtn"
              type="submit"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? <Loader2 /> : <>Login</>}
            </Button>
          </div>
          <AuthTermsAndCondition onCloseModal={onCloseModal} />
        </form>
      </div>
    </DialogContent>
  );
};

export default LoginModal;
