"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { deleteToken } from "@/store/slices/authSlice";

const Logout = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(deleteToken());
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="w-[236px] h-[53px] bg-color-3/30 rounded-lg text-black/70 font-medium capitalize"
    >
      Log out
    </button>
  );
};

export default Logout;
