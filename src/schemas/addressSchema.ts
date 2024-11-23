import { phoneValidator } from "@/utils/phoneValidator";
import * as yup from "yup";

export const addressSchema = yup.object({
  name: yup
    .string()
    .trim()
    .min(6, "Name must be atleast 6 characters")
    .max(100, "Name must not exceed 100 characters")
    .required("Please provide a full name"),
  phone: yup
    .string()
    .trim()
    .required("Please provide a phone number")
    .test("Validate", "Please provide a valid phone number", (value) =>
      phoneValidator(value)
    )
    .min(10, "Phone number must be atleast 10 characters")
    .max(13, "Phone number must not exceed 13 characters"),
  country: yup
    .string()
    .trim()
    .equals(["India"], "Country must be India")
    .required("Please provide the country"),
  pincode: yup
    .string()
    .trim()
    .matches(/^[1-9][0-9]{5}$/g, "Please provide a valid pincode")
    .required("Please provide the pincode"),
  houseno: yup
    .string()
    .trim()
    .min(1, "House No./Apartment must be atleast 1 character")
    .required("Please provide the house number or apartment"),
  street: yup
    .string()
    .trim()
    .min(1, "Street/Area must be atleast 1 character")
    .required("Please provide the street or area"),
  landmark: yup
    .string()
    .trim()
    .min(1, "Landmark must be atleast 1 character")
    .required("Please provide the landmark"),
  city: yup
    .string()
    .trim()
    .min(1, "City must be atleast 1 character")
    .required("Please provide the city"),
  state: yup
    .string()
    .trim()
    .min(1, "State must be atleast 1 character")
    .required("Please provide the state"),
  district: yup
    .string()
    .trim()
    .min(1, "District must be atleast 1 character")
    .required("Please provide the district"),
  postoffice: yup
    .string()
    .trim()
    .min(1, "PostOffice must be atleast 1 character")
    .required("Please provide the post office"),
});

export type addressSchemaType = yup.InferType<typeof addressSchema>;
