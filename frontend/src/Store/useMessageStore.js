import { create } from "zustand";
import { axiosInstance } from "../Lib/axios";
import { toast } from "react-hot-toast";

const useMessageStore = create((set) => ({
  messages: [],
  allUsers: [],
  selectedUser: null,
  isMessagesloading: false,
  isUsersLoading: false,
  onlineUsers: [],
  isSendingMessage: false,

  getUsers: async () => {
    try {
      set({
        isUsersLoading: true,
      });
      const res = await axiosInstance.get("/message/users", {
        credentials: true,
      });
      set({
        allUsers: res.data.data,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({
        isUsersLoading: false,
      });
    }
  },
  getMessages: async (userId) => {
    try {
      set({
        isMessagesloading: true,
      });
      const res = await axiosInstance.get(`/message/${userId}`, {
        credentials: true,
      });
      set({
        messages: res.data.data,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({
        isMessagesloading: false,
      });
    }
  },
  sendMessage: async (userId, data) => {
    try {
      set({
        isSendingMessage: true,
      });
      const res = await axiosInstance.post(`/message/send/${userId}`, data, {
        credentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      set((state) => ({
        messages: [...state.messages, res.data.data],
      }));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({
        isSendingMessage: false,
      });
    }
  },
  convertTime: (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    const formattedMinutes = minutes.toString().padStart(2, "0");
    return `${hours}:${formattedMinutes} ${ampm}`;
  },
}));

export { useMessageStore };
