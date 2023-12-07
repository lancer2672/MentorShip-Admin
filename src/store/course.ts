import create from "zustand";
import courseApi from "../api/course-api";
import { Course } from "../../types";

type CourseState = {
  courses: Course[];
  setCourses: (courses: Course[]) => void;
  fetchCourses: () => Promise<void>;
  fetchCourseById: (id: string) => Promise<void>;
};

export const useCourseStore = create<CourseState>((set) => ({
  courses: [],
  setCourses: (courses) => set({ courses }),
  fetchCourses: async () => {
    try {
      const courses = await courseApi.getAll();
      console.log("CourseData", courses);
      set((state) => ({
        courses,
      }));
    } catch (error) {
      console.error(error);
    }
  },
  fetchCourseById: async (id: string) => {
    try {
      const course = await courseApi.getById(id);
      console.log("CourseData", course);
      set((state) => ({
        courses: state.courses.map((c) => (c.id === id ? course : c)),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
