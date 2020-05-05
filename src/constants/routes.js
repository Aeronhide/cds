import { Exam, Home, NotFound, Profile, Schedule, Themes } from "../views";
import { Main, Minimal } from "../layouts";
import Questions from "../views/themes/components/questions";
import ExamSetUp from "../views/exam/components/examSetUp";
import SettingExams from "../views/exam/components/settingExams";

export const routes = [
  {
    title: "Home",
    path: "/",
    component: Home,
    layout: Minimal,
    exact: true,
  },
  {
    title: "Themes",
    path: "/themes",
    component: Themes,
    layout: Main,
    exact: true,
  },
  {
    title: "Questions",
    path: "/themes/:id",
    component: Questions,
    layout: Main,
    exact: true,
  },
  {
    title: "Exam",
    path: "/exam",
    component: Exam,
    layout: Minimal,
    exact: true,
  },
  {
    title: "Setting exams",
    path: "/setting-exams",
    component: SettingExams,
    layout: Main,
    exact: true,
  },
  {
    title: "Exam set-up",
    path: "/setting-exams/set-up",
    component: ExamSetUp,
    layout: Main,
    exact: true,
  },
  {
    title: "Schedule",
    path: "/schedule",
    component: Schedule,
    layout: Main,
    exact: true,
  },
  {
    title: "Profile",
    path: "/profile",
    component: Profile,
    layout: Main,
    exact: true,
  },
  {
    title: "NotFound",
    path: "/not-found",
    component: NotFound,
    layout: Minimal,
    exact: true,
  },
];
