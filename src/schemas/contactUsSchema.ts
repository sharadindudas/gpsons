import { phoneValidator } from "@/utils/phoneValidator";
import * as yup from "yup";

export const contactUsSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(6, "Name must be atleast 6 characters")
    .max(100, "Name must not exceed 100 characters")
    .required("Please provide a full name"),
  email: yup
    .string()
    .email("Please provide a valid email")
    .trim()
    .min(6, "Email must be atleast 6 characters")
    .max(100, "Email must not exceed 100 characters")
    .required("Please provide an email address"),
  phone: yup
    .string()
    .trim()
    .required("Please provide a phone number")
    .test("Validate", "Please provide a valid phone number", (value) =>
      phoneValidator(value)
    )
    .min(10, "Phone number must be atleast 10 characters")
    .max(13, "Phone number must not exceed 13 characters"),
  message: yup
    .string()
    .trim()
    .required("Please provide a message")
    .min(6, "Message must be atleast 6 characters"),
  attachment: yup
    .mixed()
    .nullable()
    .test("fileSize", "Attachment size is too large", (value) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return true;
      return (value as File[]).every((file) => file.size <= 5000000);
    })
    .test("fileType", "Unsupported file format for attachment", (value) => {
      if (!value || (Array.isArray(value) && value.length === 0)) return true;
      return (value as File[]).every((file) =>
        ["image/jpg", "image/jpeg", "image/png"].includes(file.type)
      );
    }),
});

export type contactUsSchemaType = yup.InferType<typeof contactUsSchema>;
