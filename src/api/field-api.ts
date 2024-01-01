import axiosClient from "../config/axios-client";

const fieldApi = {
  getAll: async () => {
    try {
      const url = "/field/getAllFields";
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  },
  createField: async (field) => {
    try {
      const url = "/field/createField";
      const res = await axiosClient.post(url, field);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  },
  deleteField: async (id) => {
    try {
      const url = `/field/deleteField/${id}`;
      const res = await axiosClient.delete(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default fieldApi;
