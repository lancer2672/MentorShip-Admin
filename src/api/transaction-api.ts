import axiosClient from "../config/axios-client";

const transactionApi = {
  getAll: async () => {
    try {
      const url = `/payment`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getByUserId: async (userId: string) => {
    try {
      const url = `/payment/user/${userId}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  // Add more methods as needed
};

export default transactionApi;
