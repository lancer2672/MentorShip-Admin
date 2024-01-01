import create from "zustand";
import memberApi from "../api/member-api";
import { RoleType } from "../types";

type Mentor = {
  id: string;
  createdAt: Date;
  status: string;
  imageUrls: string[];
  description: string;
};
type MentorState = {
  mentors: Mentor[];
  setMentors: (mentors: Mentor[]) => void;
  fetchMentors: () => Promise<void>;
  fetchMentorById: (id: string) => Promise<void>;
};

export const useMentorStore = create<MentorState>((set) => ({
  mentors: [],
  setMentors: (mentors) => set({ mentors }),
  fetchMentors: async () => {
    try {
      const mentors = await memberApi.getAll(RoleType.Mentor);
      console.log("MentorData", mentors);
      set((state) => ({
        mentors,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  fetchMentorById: async (id: string) => {
    try {
      const mentor = await memberApi.getById(RoleType.Mentor, id);
      console.log("MentorData", mentor);
      set((state) => ({
        mentors: state.mentors.map((m) => (m.id === id ? mentor : m)),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
