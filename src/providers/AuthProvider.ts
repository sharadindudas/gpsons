"use client";

import { useAppSelector } from "@/store/hooks";
import { IUser } from "@/types/types";

export const AuthProvider = () => {
  const token = useAppSelector((store) => store.auth.token) as string;
  const user = useAppSelector((store) => store.auth.user) as IUser;

  return { token, user };
};
