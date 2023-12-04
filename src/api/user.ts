import axiosClient from "../config/axios-client";

const userApi = {
  getUserById: async (id) => {
    try {
      const url = `/user/${id}`;
      const res = await axiosClient.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default userApi;
