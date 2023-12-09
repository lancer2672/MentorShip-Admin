import axiosClient from "../config/axios-client";
import { RoleType } from "../../types";

const memberApi = {
  getById: async (role: RoleType, id: string) => {
    try {
      const url = `/api/${role}/get/${id}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAll: async (role: RoleType) => {
    try {
      console.log("role", role);
      const url = `/api/${role}/get`;
      const res = await axiosClient.get(url);
      console.log("response", res);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default memberApi;
