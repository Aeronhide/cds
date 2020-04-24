import React from "react";
import {
  DatabaseOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  UserOutlined,
  FileAddOutlined,
} from "@ant-design/icons";

export default [
  { title: "Themes", path: "/themes", icon: <DatabaseOutlined /> },
  { title: "Schedule", path: "/schedule", icon: <CalendarOutlined /> },
  { title: "Setting exams", path: "/setting-exams", icon: <FileAddOutlined /> },
  { title: "Exam", path: "/exam", icon: <ScheduleOutlined /> },
  { title: "Profile", path: "/profile", icon: <UserOutlined /> },
];
