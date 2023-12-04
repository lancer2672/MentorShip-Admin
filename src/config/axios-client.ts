import axios, { AxiosInstance } from "axios";

const axiosClient: AxiosInstance = axios.create({
  baseURL: "http://localhost:5008",
  headers: {
    "Content-Type": "application/json",
  },
});
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      console.log("Please check your internet connection.", error);
    }

    return Promise.reject(error);
  }
);
export default axiosClient;
