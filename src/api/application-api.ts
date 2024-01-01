import axiosClient from "../config/axios-client";

const applicationApi = {
  getAll: async () => {
    try {
      const url = "/application/getAllApplication";
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getApplicationById: async (id) => {
    try {
      const url = `/application/getApplicationById/${id}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  updateApplicationStatus: async (id, status) => {
    try {
      const url = `/application/updateApplicationStatus/${id}`;
      const res = await axiosClient.put(url, status);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  deleteApplication: async (id) => {
    try {
      const url = `/application/deleteApplication/${id}`;
      const res = await axiosClient.delete(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createApplication: async (application) => {
    try {
      const url = "/application/createApplication";
      const res = await axiosClient.post(url, application);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default applicationApi;
