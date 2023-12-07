import { Course } from "../../types";
import axiosClient from "../config/axios-client";

const courseApi = {
  getById: async (id: string) => {
    try {
      const url = `/course/${id}`;
      const res = await axiosClient.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAll: async () => {
    try {
      const url = `/course`;
      const res = await axiosClient.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  create: async (course: Course) => {
    try {
      const url = `/course`;
      const res = await axiosClient.post(url, course);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  update: async (id: string, course: Course) => {
    try {
      const url = `/course/${id}`;
      const res = await axiosClient.put(url, course);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  delete: async (id: string) => {
    try {
      const url = `/course/${id}`;
      const res = await axiosClient.delete(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default courseApi;
