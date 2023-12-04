import create from "zustand";
import applicationApi from "../api/application";

type Application = {
  id: string;
  mentorId: string;
  createdAt: Date;
  status: string;
  imageUrls: string[];
  description: string;
};

type ApplicationState = {
  applications: Application[];
  setApplications: (applications: Application[]) => void;
  fetchApplications: () => Promise<void>;
  createApplication: (application: Application) => Promise<void>;
  updateApplicationStatus: (id: string, status: number) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
};

export const useApplicationStore = create<ApplicationState>((set) => ({
  applications: [],
  setApplications: (applications) => set({ applications }),
  fetchApplications: async () => {
    try {
      const applications = await applicationApi.getAll();
      console.log("ApplicationData", applications);
      set((state) => ({
        applications,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  createApplication: async (application) => {
    try {
      const newApplication = await applicationApi.createApplication(
        application
      );
      set((state) => ({
        applications: [...state.applications, newApplication],
      }));
    } catch (error) {
      console.error(error);
    }
  },
  updateApplicationStatus: async (id, status) => {
    try {
      const updatedApplication = await applicationApi.updateApplicationStatus(
        id,
        status
      );
      set((state) => ({
        applications: state.applications.map((app) =>
          app.id === id ? updatedApplication : app
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
  deleteApplication: async (id) => {
    try {
      await applicationApi.deleteApplication(id);
      set((state) => ({
        applications: state.applications.filter((app) => app.id !== id),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
