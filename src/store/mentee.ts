import create from 'zustand';
import memberApi from '../api/member-api';
import {RoleType} from '../types';

type Mentee = {
  id: string;
  createdAt: Date;
  status: string;
  imageUrls: string[];
  description: string;
};
type MenteeState = {
  mentees: Mentee[];
  setMentees: (mentees: Mentee[]) => void;
  fetchMentees: () => Promise<void>;
  fetchMenteeById: (id: string) => Promise<void>;
};

export const useMenteeStore = create<MenteeState>((set) => ({
  mentees: [],
  setMentees: (mentees) => set({mentees}),
  fetchMentees: async () => {
    try {
      const mentees = await memberApi.getAll(RoleType.Mentee);
      console.log('MenteeData', mentees);
      set((state) => ({
        mentees,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  fetchMenteeById: async (id: string) => {
    try {
      const mentee = await memberApi.getById(RoleType.Mentee, id);
      console.log('MenteeData', mentee);
      set((state) => ({
        mentees: state.mentees.map((m) => (m.id === id ? mentee : m)),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
