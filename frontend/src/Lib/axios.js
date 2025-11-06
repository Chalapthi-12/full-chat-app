import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://full-chat-app-e883.onrender.com/api",
  withCredentials: true,
});
export { axiosInstance };
