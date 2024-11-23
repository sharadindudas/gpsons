import * as yup from "yup";
import { phoneValidator } from "@/utils/phoneValidator";

export const signupSchema = yup.object({
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
  password: yup
    .string()
    .trim()
    .required("Please provide a password")
    .min(8, "Password must be atleast 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
      "Password must be atleast 8 characters, includes atleast one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmPassword: yup
    .string()
    .trim()
    .required("Please provide a confirm password")
    .min(8, "Confirm password must be atleast 8 characters")
    .max(100, "Confirm password must not exceed 100 characters")
    .oneOf(
      [yup.ref("password")],
      "Password and confirm password does not match"
    ),
});

export const loginSchema = yup.object({
  identity: yup
    .string()
    .trim()
    .required("Please provide an email or phone number")
    .test(
      "is-email-or-phone",
      "Please provide a valid email address or phone number",
      (value) => {
        const isEmail = yup
          .string()
          .email("Please provide a valid email")
          .isValidSync(value);
        const isPhone = phoneValidator(value);
        return isEmail || isPhone;
      }
    ),
  password: yup
    .string()
    .trim()
    .required("Please provide a password")
    .min(8, "Password must be atleast 8 characters")
    .max(100, "Password must not exceed 100 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
      "Password must be atleast 8 characters, includes atleast one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  rememberMe: yup.boolean().optional(),
});

export const verifyotpSchema = yup.object({
  otp: yup
    .string()
    .required("Please provide an otp")
    .length(6, "Otp must be of 6 digits")
    .trim(),
});

export type signupSchemaType = yup.InferType<typeof signupSchema>;
export type loginSchemaType = yup.InferType<typeof loginSchema>;
export type verifyotpSchemaType = yup.InferType<typeof verifyotpSchema>;
