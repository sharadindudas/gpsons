import {
  isValidPhoneNumber,
  parsePhoneNumberWithError,
  PhoneNumber,
} from "libphonenumber-js";

const phoneParser = (phone: string): PhoneNumber | null => {
  try {
    return parsePhoneNumberWithError(phone, { defaultCountry: "IN" });
  } catch {
    return null;
  }
};

const phoneValidator = (phone: string): boolean => {
  const parsedPhoneNumber: PhoneNumber | null = phoneParser(phone);
  return parsedPhoneNumber
    ? isValidPhoneNumber(parsedPhoneNumber.number, "IN")
    : false;
};

export { phoneParser, phoneValidator };
