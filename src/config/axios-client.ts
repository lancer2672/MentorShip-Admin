import axios, { AxiosInstance } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
