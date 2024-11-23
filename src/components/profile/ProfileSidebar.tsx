"use client";

import Link from "next/link";
import Image from "next/image";
import { IUser } from "@/types/types";
import ProfileLinks from "./ProfileLinks";
import { useAppSelector } from "@/store/hooks";
import Logout from "./Logout";

const ProfileSidebar = () => {
  const user: IUser = useAppSelector((store) => store.auth.user);

  return (
    <div className="sticky top-24 w-[337px] h-full">
      <div className="border border-black/15 rounded-lg h-[568px] bg-white">
        <div className="capitalize bg-color-3/15 rounded-tl-lg rounded-tr-lg text-sm p-3">
          <p>Welcome !!</p>
          <div className="ml-5">
            <div className="text-lg font-medium">{user?.name}</div>
            <div className="text-black/50">loggedin via: {user?.phone}</div>
          </div>
        </div>
        <h2 className="p-3 text-black/50 text-base font-medium">
          Orders and Wishlist
        </h2>
        <div className="grid text-black/80 divide-y">
          <ProfileLinks />
        </div>
        <h2 className="px-3 py-1 text-black/50 text-base font-medium">
          Help and Services
        </h2>
        <Link
          href="/contact"
          className="flex items-start justify-center p-4 gap-4"
        >
          <div className="relative w-6 h-6">
            <Image
              className="opacity-60"
              src="/assets/profile/help-profile.svg"
              fill={true}
              alt="help-profile"
            />
          </div>
          <div className="text-black/60">
            <div className="text-base capitalize font-semibold">
              Help and Support
            </div>
            <span className="text-xs">
              Get help from FAQs and raise a concern
            </span>
          </div>
        </Link>
      </div>

      <div className="flex items-center justify-center mt-6">
        <Logout />
      </div>
    </div>
  );
};

export default ProfileSidebar;
