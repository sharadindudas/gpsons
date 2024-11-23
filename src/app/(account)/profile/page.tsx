import dynamic from "next/dynamic";
import UserDetailsLoader from "@/components/profile/UserDetailsLoader";

const EditProfile = dynamic(() => import("@/components/profile/EditProfile"), {
  ssr: false,
  loading: () => <UserDetailsLoader />,
});
const UpdatePassword = dynamic(
  () => import("@/components/profile/UpdatePassword"),
  { ssr: false }
);

export default function ProfilePage() {
  return (
    <>
      <EditProfile />
      <UpdatePassword />
    </>
  );
}
