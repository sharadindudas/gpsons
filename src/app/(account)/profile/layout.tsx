"use client";

import dynamic from "next/dynamic";
import ProfileSidebarLoader from "@/components/profile/ProfileSidebarLoader";

const ProfileSidebar = dynamic(
  () => import("@/components/profile/ProfileSidebar"),
  {
    ssr: false,
    loading: () => <ProfileSidebarLoader />,
  }
);

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex relative gap-10 px-10 font-poppins pt-20 pb-10 tracking-tight">
      <ProfileSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default ProfileLayout;
