import { create } from "zustand";
import {
  userSignInSchemaType,
  userSignUpSchemaType,
} from "@shashankpandey/blogscommon";
import axios from "axios";
import { ToastStore } from "./Toast";
interface authStore {
  token: string | null;
  loading: boolean;
  userId: number | null;
  name: string | null;
  SignUp: (payload: userSignUpSchemaType) => Promise<void>;
  login: (payload: userSignInSchemaType) => Promise<void>;
  logout: () => void;
}
const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create<authStore>((set) => ({
  token: null,
  loading: false,
  userId: null,
  name: null,
  SignUp: async (payload) => {
    try {
      set({ loading: true });
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        payload
      );
      const data = res.data;

      set({
        token: data.token,
        loading: false,
        userId: Number(res.data?.user?.id),
        name: data?.user?.name,
      });
      ToastStore.getState().showToast({
        message: "User created Successfully",
        variant: "success",
        duration: 3000,
      });
    } catch (error: any) {
      console.log("error usermight", error.message);
    }
  },
  login: async (payload) => {
    try {
      set({ loading: true });
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        payload
      );
      const data = res.data;

      set({
        token: data.token,
        loading: false,
        userId: Number(res.data?.user?.id),
        name: data?.user?.name,
      });
    } catch (error: any) {
      console.log("error", error.message);
      set({ loading: false });
    }
  },
  logout: () => set({ token: null, loading: false }),
}));
