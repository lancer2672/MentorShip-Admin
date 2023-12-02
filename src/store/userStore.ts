import create from "zustand";

type User = {
  id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
};

type UserState = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
    id: "6545fadf162346b2815226b5",
    displayName: "Default User",
    email: "default.user@example.com",
    phoneNumber: "123-456-7890",
  },
  setUser: (user) => set({ user }),
}));
