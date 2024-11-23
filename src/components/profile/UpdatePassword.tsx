"use client";

import {
  updatePasswordSchema,
  updatePasswordSchemaType,
} from "@/schemas/updatePasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import ToolTipTemplate from "../common/ToolTipTemplate";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const UpdatePassword = () => {
  const [isSubmitting, setisSubmitting] = useState<boolean>(false);
  const [showCurrentPassword, setShowCurrentPassword] =
    useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<updatePasswordSchemaType>({
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    mode: "onChange",
  });

  const onUpdatePassword = async (data: updatePasswordSchemaType) => {
    setisSubmitting(true);
    const { currentPassword, newPassword, confirmNewPassword } = data;
    const toastId = toast.loading("Loading...");
    try {
    } catch (err) {
      const errMsg = err as AxiosError<ApiResponse>;
    } finally {
      reset();
      setisSubmitting(false);
      toast.dismiss(toastId);
    }
  };

  return (
    <div>
      <h2 className="text-center font-bold text-xl">Update Password</h2>
      <form
        noValidate
        className="flex flex-col items-center justify-center gap-5 my-7"
        onSubmit={handleSubmit(onUpdatePassword)}
      >
        {/* Form Fields */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          {/* Current Password Field */}
          <div className="relative w-[422px]">
            <Label
              htmlFor="currpass"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors.currentPassword?.message && "text-red-500"
              }`}
            >
              Current Password
            </Label>
            <Input
              id="currpass"
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Current Password"
              autoComplete="on"
              {...register("currentPassword")}
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline ${
                errors.currentPassword?.message
                  ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                  : "focus-visible:outline-2 focus-visible:outline-black/70"
              }`}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-9 cursor-pointer"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? (
                <EyeOffIcon className="text-black/80 w-4" />
              ) : (
                <EyeIcon className="text-black/80 w-4" />
              )}
            </div>
            {errors.currentPassword && (
              <ToolTipTemplate errMsg={errors.currentPassword?.message} />
            )}
          </div>
          {/* New Password Field */}
          <div className="relative w-[422px]">
            <Label
              htmlFor="newpass"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors.newPassword?.message && "text-red-500"
              }`}
            >
              New Password
            </Label>
            <Input
              id="newpass"
              type={showNewPassword ? "text" : "password"}
              placeholder="New Password"
              autoComplete="on"
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline ${
                errors.newPassword?.message
                  ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                  : "focus-visible:outline-2 focus-visible:outline-black/70"
              }`}
              {...register("newPassword")}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-9 cursor-pointer"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? (
                <EyeOffIcon className="text-black/80 w-4" />
              ) : (
                <EyeIcon className="text-black/80 w-4" />
              )}
            </div>
            {errors.newPassword && (
              <ToolTipTemplate errMsg={errors.newPassword?.message} />
            )}
          </div>
          {/* Confirm New Password Field */}
          <div className="relative w-[422px]">
            <Label
              htmlFor="confirmnewpass"
              className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base ${
                errors.confirmNewPassword?.message && "text-red-500"
              }`}
            >
              Confirm New Password
            </Label>
            <Input
              id="confirmnewpass"
              type={showConfirmNewPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              autoComplete="on"
              className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline ${
                errors.confirmNewPassword?.message
                  ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                  : "focus-visible:outline-2 focus-visible:outline-black/70"
              }`}
              {...register("confirmNewPassword")}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 right-9 cursor-pointer"
              onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            >
              {showConfirmNewPassword ? (
                <EyeOffIcon className="text-black/80 w-4" />
              ) : (
                <EyeIcon className="text-black/80 w-4" />
              )}
            </div>
            {errors.confirmNewPassword && (
              <ToolTipTemplate errMsg={errors.confirmNewPassword?.message} />
            )}
          </div>
        </div>
        {/* Buttons */}
        <div>
          <Button
            type="submit"
            variant="default"
            className="flex-1 w-48 h-12 text-base"
            disabled={!isValid || isSubmitting}
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
