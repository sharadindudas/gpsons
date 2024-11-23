"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  contactUsSchema,
  contactUsSchemaType,
} from "@/schemas/contactUsSchema";
import toast from "react-hot-toast";
import ToolTipTemplate from "@/components/common/ToolTipTemplate";
import { Loader2, X } from "lucide-react";

const Contactus = () => {
  // Local state variables
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isAddingAttachment, setIsAddingAttachment] = useState<boolean>(false);

  // React hook form handler
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors, isValid },
  } = useForm<contactUsSchemaType>({
    resolver: yupResolver(contactUsSchema),
    mode: "onChange",
  });

  // On file drag and drop
  const onFileDragAndDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentFiles = control._formValues.attachment || [];
      const totalFiles = acceptedFiles.length + currentFiles.length;
      if (totalFiles > 4 || totalFiles === 0) {
        toast.error("You can only upload up to 4 files");
        setValue("attachment", [], { shouldValidate: true });
        return;
      }
      setValue("attachment", [...currentFiles, ...acceptedFiles], {
        shouldValidate: true,
      });
    },
    [setValue, control]
  );

  // React dropzone config
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onFileDragAndDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 4,
  });

  // When someone deletes attachment
  const handleDeleteAttachment = (file: File) => {
    const currentFiles = control._formValues.attachment || [];
    const updatedFiles = currentFiles.filter((f: File) => f.name !== file.name);
    setValue("attachment", updatedFiles, { shouldValidate: true });
  };

  // Handle the contact data submit
  const onContactSubmit = async (data: contactUsSchemaType) => {
    setIsSubmitting(true);
    const toastId = toast.loading("Loading...");
    console.log(data);
    const { name, email, phone, message, attachment } = data;
    try {
      toast.success("Sent the contact form successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
      toast.dismiss(toastId);
      reset();
    }
  };

  return (
    <div className="container mx-auto px-10 py-14 flex">
      {/* Contact us left */}
      <div className="flex-1">
        <h2 className="text-black/70 text-[32px] font-semibold underline">
          Contact <span className="text-color-3/70">us</span>
        </h2>

        <div className="mt-5 mb-8">
          <p className="mb-3 text-xl">Gouranga Paul and Sons</p>
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>Contact us</li>
            <li>Health and safety: My Staff wear masks.</li>
            <li>My all products are disinfected and safe.</li>
          </ul>
        </div>

        <ul className="space-y-4">
          <li className="flex items-center gap-4">
            <Image
              src="/assets/contactus/home.svg"
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-auto"
              alt="home"
            />
            <Link
              target="_blank"
              href="https://maps.app.goo.gl/74RVL6ZEa576dtYV7"
            >
              14F/1E Dum Dum Rd. Kolkata, 700030
            </Link>
          </li>
          <li className="flex items-center gap-4">
            <Image
              src="/assets/contactus/phone.svg"
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-auto"
              alt="phone"
            />
            <p>
              <Link href="tel:25568763">25568763</Link>,{" "}
              <Link href="tel:7439759231">7439759231 (Sale)</Link>
            </p>
          </li>
          <li className="flex items-center gap-4">
            <Image
              src="/assets/contactus/phone.svg"
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-auto"
              alt="phone"
            />
            <p>
              <Link href="tel:25579656">25579656</Link>,{" "}
              <Link href="tel:9038631844">9038631844 (Fact)</Link>
            </p>
          </li>
          <li className="flex items-center gap-4">
            <Image
              src="/assets/contactus/mail.svg"
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-auto"
              alt="phone"
            />
            <Link href="mailto:gourangapual_sons@yahoo.in">
              gourangapaul_sons@yahoo.in
            </Link>
          </li>
        </ul>
      </div>

      {/* Contact us right */}
      <div className="flex-1 space-y-4">
        <form
          noValidate
          onSubmit={handleSubmit(onContactSubmit)}
          className="space-y-5 mx-auto p-6"
        >
          <h2 className="text-xl font-semibold">Make an Enquiry</h2>

          <div className="space-y-1">
            <Label
              htmlFor="name"
              className={`${errors?.name?.message && "text-red-500"}`}
            >
              Name
            </Label>
            <div className="relative">
              <Input
                id="name"
                type="text"
                placeholder="Full Name"
                autoComplete="on"
                {...register("name")}
                className={`rounded-[5px] text-sm border-none outline outline-1 outline-black/70 w-full h- text-black/80 focus-visible:ring-transparent focus-visible:outline placeholder:font-normal font-medium ${
                  errors?.name?.message
                    ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                    : "focus-visible:outline-2 focus-visible:outline-black/70"
                }`}
              />
              {errors?.name && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ToolTipTemplate errMsg={errors?.name?.message} />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="email"
              className={`${errors?.email?.message && "text-red-500"}`}
            >
              Email
            </Label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                autoComplete="on"
                {...register("email")}
                className={`rounded-[5px] text-sm border-none outline outline-1 outline-black/70 w-full h- text-black/80 focus-visible:ring-transparent focus-visible:outline placeholder:font-normal font-medium ${
                  errors?.email?.message
                    ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                    : "focus-visible:outline-2 focus-visible:outline-black/70"
                }`}
              />
              {errors?.email && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ToolTipTemplate errMsg={errors?.email?.message} />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="phone"
              className={`${errors?.phone?.message && "text-red-500"}`}
            >
              Phone Number
            </Label>
            <div className="relative">
              <Input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                autoComplete="on"
                {...register("phone")}
                className={`rounded-[5px] text-sm border-none outline outline-1 outline-black/70 w-full h- text-black/80 focus-visible:ring-transparent focus-visible:outline placeholder:font-normal font-medium ${
                  errors?.phone?.message
                    ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                    : "focus-visible:outline-2 focus-visible:outline-black/70"
                }`}
              />
              {errors?.phone && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ToolTipTemplate errMsg={errors?.phone?.message} />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <Label
              htmlFor="message"
              className={`${errors?.message?.message && "text-red-500"}`}
            >
              Message
            </Label>
            <div className="relative">
              <Textarea
                id="message"
                placeholder="Message"
                autoComplete="on"
                {...register("message")}
                className={`rounded-[5px] text-sm border-none outline outline-1 outline-black/70 w-full h- text-black/80 focus-visible:ring-transparent focus-visible:outline placeholder:font-normal font-medium ${
                  errors?.message?.message
                    ? "outline-2 outline-red-500 focus-visible:outline-2 focus-visible:outline-red-500"
                    : "focus-visible:outline-2 focus-visible:outline-black/70"
                }`}
              />
              {errors?.message && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <ToolTipTemplate errMsg={errors?.message?.message} />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="addAttachment"
              checked={isAddingAttachment}
              onCheckedChange={(checked: boolean) =>
                setIsAddingAttachment(checked)
              }
            />
            <Label htmlFor="addAttachment">Add Attachment</Label>
          </div>

          {isAddingAttachment && (
            <div>
              <Controller
                name="attachment"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <div>
                    <div
                      {...getRootProps()}
                      className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
                        isDragActive
                          ? "border-primary bg-primary/10"
                          : "border-gray-300 hover:border-primary"
                      }`}
                    >
                      <input
                        {...getInputProps({
                          onChange,
                          onBlur,
                        })}
                      />
                      <div className="flex justify-center items-center gap-5 text-sm">
                        <div>
                          <Image
                            src="/assets/contactus/upload-icon.svg"
                            width={0}
                            height={0}
                            sizes="100vw"
                            className="w-auto h-auto"
                            alt="upload"
                          />
                        </div>
                        <div className="text-left space-y-2">
                          <p>
                            Drag and drop a file here, or click to select a file
                          </p>
                          <p className="mt-1 text-gray-500 text-xs">
                            Supported formats: JPEG, PNG, PDF (max 5MB)
                          </p>
                        </div>
                      </div>
                    </div>
                    {value && Array.isArray(value) && value.length > 0 && (
                      <div className="mt-2 text-sm text-gray-600">
                        <ul className="flex flex-wrap items-center gap-3">
                          {value.map((file: File, index: number) => (
                            <li
                              key={index}
                              className="border border-black/30 rounded-lg px-2 py-1 flex items-center gap-1"
                            >
                              {file.name}
                              <X
                                size={18}
                                className="cursor-pointer"
                                onClick={() => handleDeleteAttachment(file)}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              />
            </div>
          )}

          <Button
            disabled={!isValid || isSubmitting}
            variant="authBtn"
            className="w-full capitalize"
          >
            {isSubmitting ? <Loader2 /> : <>Send Message</>}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contactus;
