"use client";

import { IUser } from "@/types/types";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUser } from "@/services/useUser";
import { useAppSelector } from "@/store/hooks";

const EditProfile = () => {
  const token = useAppSelector((store) => store.auth.token) as string;
  const { data } = useUser(token);
  const user: IUser = data?.data[0];

  return (
    <div>
      <h2 className="text-center font-bold text-xl">Basic Details</h2>
      <form className="flex flex-wrap justify-center gap-5 my-7">
        <div className="relative w-[422px]">
          <Label
            htmlFor="name"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
          >
            Name
          </Label>
          <Input
            id="name"
            type="text"
            value={user?.name || ""}
            placeholder="Name"
            readOnly
            disabled={true}
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
          />
        </div>
        <div className="relative w-[422px]">
          <Label
            htmlFor="email"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
          >
            Email
          </Label>
          <Input
            id="email"
            type="email"
            value={user?.email || ""}
            placeholder="Email"
            readOnly
            disabled={true}
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
          />
        </div>
        <div className="relative w-[422px]">
          <Label
            htmlFor="phone"
            className={`absolute z-[1] -top-3 left-3 inline-block bg-white px-1 font-medium text-black/70 text-base`}
          >
            Phone Number
          </Label>
          <Input
            id="phone"
            type="text"
            value={user?.phone || ""}
            placeholder="Phone Number"
            readOnly
            disabled={true}
            className={`rounded-[5px] border-none outline outline-1 text-base outline-black/70 w-full h-[51px] px-5 py-0 placeholder:font-normal text-black/80 font-medium focus-visible:ring-transparent focus-visible:outline`}
          />
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
