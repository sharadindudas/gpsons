import { IUser } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface AuthState {
  token: string | null;
  user: IUser | null;
}

const initialState: AuthState = {
  token: Cookies.get("token") ? (Cookies.get("token") as string) : null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    deleteToken: (state) => {
      Cookies.remove("token");
      state.token = null;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setToken, deleteToken, setUser } = authSlice.actions;
export default authSlice.reducer;
