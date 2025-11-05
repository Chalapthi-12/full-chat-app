import { create } from "zustand";
import { axiosInstance } from "../Lib/axios";
import { toast } from "react-hot-toast";

const useAuthStore = create((set) => ({
  authUser: null,
  isDisabled: true,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  toggleDisabled: () =>
    set((state) => ({
      isDisabled: !state.isDisabled,
    })),
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      const user = res.data;
      set({ authUser: user });
    } catch (error) {
      console.log("Error At checkAuth", error);
    } finally {
      set({
        isCheckingAuth: false,
      });
    }
  },

  signUp: async (data) => {
    try {
      set({
        isSigningUp: true,
      });
      const res = await axiosInstance.post("/auth/signup", data);
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      set({ authUser: res.data.data });
      toast.success("Account created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({
        isSigningUp: false,
      });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout", {
        credentials: true,
      });
      if (res.data.success === true) {
        set({
          authUser: null,
        });
        toast.success(res.data.message);
        return;
      }
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  },
  login: async (data) => {
    try {
      set({
        isLoggingIn: true,
      });
      const res = await axiosInstance.post("/auth/login", data);
      if (res.data.success === false) {
        return toast.error(res.data.message);
      }
      const user = res.data.data;
      set({
        authUser: user,
      });
      toast.success(`Welcome Back! ${user.userName}`);
    } catch (error) {
      console.log("error at logout function", error);
      toast.error(error.response.data.message);
    } finally {
      set({
        isLoggingIn: false,
      });
    }
  },
  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", data, {
        credentials: true,
      });
      if (res.success === "false") {
        return toast.error(res.data.messages);
      }
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
      set({ isDisabled: true });
    }
  },
}));

export { useAuthStore };
