import * as yup from "yup";

export const updatePasswordSchema = yup.object({
  currentPassword: yup
    .string()
    .trim()
    .required("Please provide the current password")
    .min(8, "Current password must be atleast 8 characters")
    .max(20, "Current password must not exceed 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
      "Password must be exceed 8 characters, includes atleast one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  newPassword: yup
    .string()
    .trim()
    .required("Please provide a new password")
    .min(8, "New password must be atleast 8 characters")
    .max(20, "New password must not exceed 20 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm,
      "Password must be exceed 8 characters, includes atleast one uppercase letter, one lowercase letter, one number, and one special character."
    ),
  confirmNewPassword: yup
    .string()
    .trim()
    .required("Please provide a confirm new password")
    .oneOf(
      [yup.ref("newPassword")],
      "New password and confirm new password does not match"
    ),
});

export type updatePasswordSchemaType = yup.InferType<
  typeof updatePasswordSchema
>;
