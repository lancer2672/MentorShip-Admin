import { Skill } from "../../types";
import axiosClient from "../config/axios-client";

const skillApi = {
  getById: async (id: string) => {
    try {
      const url = `/skill/getSkillById/${id}`;
      const res = await axiosClient.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getAll: async () => {
    try {
      const url = `/skill/getAllSkills`;
      const res = await axiosClient.get(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  create: async (skill: Skill) => {
    try {
      const url = `/skill/createSkill`;
      const res = await axiosClient.post(url, skill);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  delete: async (id: string) => {
    try {
      const url = `/skill/deleteSkill/${id}`;
      const res = await axiosClient.delete(url);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default skillApi;
