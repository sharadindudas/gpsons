import { useUser } from "@/services/useUser";
import { useAppSelector } from "@/store/hooks";
import { IUser } from "@/types/types";

const Avatar = () => {
  const token = useAppSelector((store) => store.auth.token) as string;
  const { data } = useUser(token);
  const user: IUser = data?.data[0];

  const getInitials = (name: string | undefined): string | undefined => {
    return name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase();
  };
  const initials = getInitials(user?.name);

  return (
    <div className="bg-color-3/80 text-white rounded-full w-8 h-8 flex items-center justify-center text-base">
      {initials}
    </div>
  );
};

export default Avatar;
