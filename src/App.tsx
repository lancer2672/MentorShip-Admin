import type { FC } from "react";
import { useEffect } from "react";
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import FlowbiteWrapper from "./components/flowbite-wrapper";
import DashboardPage from "./pages";
import ApplicationListPage from "./pages/application/list";
import ForgotPasswordPage from "./pages/authentication/forgot-password";
import ProfileLockPage from "./pages/authentication/profile-lock";
import ResetPasswordPage from "./pages/authentication/reset-password";
import SignInPage from "./pages/authentication/sign-in";
import SignUpPage from "./pages/authentication/sign-up";
import CourseListPage from "./pages/course/list";
import MenteeListPage from "./pages/mentee/list";
import MentorListPage from "./pages/mentor/list";
import SkillListPage from "./pages/skill/list";
import TransactionListPage from "./pages/transaction/list";
import firebaseInstance from "./service/firebaseService";

const App: FC = function () {
  useEffect(() => {
    firebaseInstance.getToken();

    firebaseInstance
      .onMessageListener()
      .then((data) => {
        console.log("Receive foreground: ", data);
      })
      .catch((er) => {
        console.log("error", er);
      });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<FlowbiteWrapper />}>
          <Route path="/" element={<DashboardPage />} index />
          <Route path="/application" element={<ApplicationListPage />} />
          <Route path="/course" element={<CourseListPage />} />
          <Route path="/management/mentor" element={<MentorListPage />} />
          <Route path="/management/mentee" element={<MenteeListPage />} />
          <Route path="/management/skill" element={<SkillListPage />} />

          <Route path="/transaction" element={<TransactionListPage />} />
          <Route path="/authentication/sign-in" element={<SignInPage />} />
          <Route path="/authentication/sign-up" element={<SignUpPage />} />
          <Route
            path="/authentication/forgot-password"
            element={<ForgotPasswordPage />}
          />
          <Route
            path="/authentication/reset-password"
            element={<ResetPasswordPage />}
          />
          <Route
            path="/authentication/profile-lock"
            element={<ProfileLockPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
