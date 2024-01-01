import create from 'zustand';
import applicationApi from '../api/application-api';
import {ApprovalStatus} from '../constants';
import sendMail from '../service/sendMail';
import firebaseInstance from '../service/firebaseService';
import {generateRandomPassword} from '../utils/dataHelper';
import {Application} from '../types';

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
  setApplications: (applications) => set({applications}),
  fetchApplications: async () => {
    try {
      const applications = await applicationApi.getAll();
      console.log('ApplicationData', applications);
      set((state) => ({
        applications: applications || [],
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
      if (status === ApprovalStatus.APPROVED) {
        const application = await applicationApi.getApplicationById(id);
        const password = generateRandomPassword();
        const mentor = await firebaseInstance.createAccount(
          application.mentorProfile.email,
          password
        );
        await firebaseInstance.addUser(mentor.uid, {
          id: application.mentorProfile.id,
          role: 'mentor',
        });
        const subject = 'Đơn đăng kí được chấp nhận';
        const content =
          'Đơn đăng kí của bạn đã được chấp nhận. Hãy đăng nhập để xem chi tiết<br>' +
          '<br>' +
          'Đây là thông tin tài khoản của bạn:<br>' +
          '<br>' +
          'Email: ' +
          application.mentorProfile.email +
          '<br>' +
          'Password: ' +
          password +
          '<br>';
        sendMail(updatedApplication.mentorProfile.email, subject, content);
      } else if (status === ApprovalStatus.REJECTED) {
        const subject = 'Đơn đăng kí bị từ chối';
        const content = 'Đơn đăng kí của bạn đã bị từ chối. ';
        sendMail(updatedApplication.mentorProfile.email, subject, content);
      }
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
