import { Skeleton } from "@/components/ui/skeleton";

const ProfileSidebarLoader = () => {
  return (
    <div className="sticky top-24 w-[337px] h-[500px]">
      <Skeleton className="w-full h-full" />
    </div>
  );
};

export default ProfileSidebarLoader;
