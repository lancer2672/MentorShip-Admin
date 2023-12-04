import create from "zustand";
import userApi from "../api/user";

type User = {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
  getUserById: (id: string) => Promise<void>;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "6545fadf162346b2815226b5",
    avatar: "https://picsum.photos/200/300",
    displayName: "Default User",
    email: "default.user@example.com",
    phoneNumber: "123-456-7890",
  },
  setUser: (user) => set({ user }),
  getUserById: async (id) => {
    try {
      const user = await userApi.getUserById(id);
      set({ user });
    } catch (error) {
      console.error(error);
    }
  },
}));
