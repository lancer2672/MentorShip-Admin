import create from "zustand";
import skillApi from "../api/skill-api";
import { Skill } from "../types";

type SkillState = {
  skills: Skill[];
  setSkills: (skills: Skill[]) => void;
  fetchSkills: () => Promise<void>;
  fetchSkillById: (id: string) => Promise<void>;
};

export const useSkillStore = create<SkillState>((set) => ({
  skills: [],
  setSkills: (skills) => set({ skills }),
  fetchSkills: async () => {
    try {
      const skills = await skillApi.getAll();
      console.log("SkillData", skills);
      set((state) => ({
        skills,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  fetchSkillById: async (id: string) => {
    try {
      const skill = await skillApi.getById(id);
      console.log("SkillData", skill);
      set((state) => ({
        skills: state.skills.map((s) => (s.id === id ? skill : s)),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
