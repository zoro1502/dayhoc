/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import UserPage from "./pages/user/UserPage";
import CoursePage from "./pages/course/CoursePage";
import ClassroomsPage from "pages/accessory/ClassroomsPage";
import { Error403 } from "pages/auth/error-403";
import Icons from "views/Icons";
import ExercisesStudentPage from "pages/exercises/ExerciseStudentPage";
import ExercisesPage from "pages/exercises/ExercisePage";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
	role: [1,2,3]
  },
  {
    path: "/user/:role",
    name: "Quản lý giáo viên",
    icon: "nc-icon nc-circle-09",
	param: "/user/teacher",
    component: UserPage,
    layout: "/admin",
	role: [1]
  },
  {
    path: "/user/:role",
    name: "Quản lý học sinh",
	param: "/user/student",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
	role: [1]
  },
  {
    path: "/course",
    name: "Khóa học",
    icon: "nc-icon nc-paper-2",
    component: CoursePage,
    layout: "/admin",
	role: [1,2,3]
  },
//   {
//     path: "/provider",
//     name: "Provider",
//     icon: "nc-icon nc-app",
//     component: ProviderPage,
//     layout: "/admin",
// 	role: [1,2]
//   },
//   {
//     path: "/device",
//     name: "Device",
//     icon: "nc-icon nc-bullet-list-67",
//     component: DevicePage,
//     layout: "/admin",
// 	role: [1,2,3]
//   },
  {
    path: "/class",
    name: "Class",
    icon: "nc-icon nc-backpack",
    component: ClassroomsPage,
    layout: "/admin", role: [1,2,3]
  },

  {
    path: "/exercise",
    name: "Exercise",
    icon: "nc-icon nc-notes",
    component: ExercisesPage,
    layout: "/admin", role: [1,2,3]
  },
  {
    path: "/student-exercise",
    name: "Exercise Student",
    icon: "nc-icon nc-single-copy-04",
    component: ExercisesStudentPage,
    layout: "/admin", role: [1,2,3]
  },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "nc-icon nc-air-baloon",
    component: UserProfile,
    layout: "/admin",
	role: [1,2,3]
  },

  {
    path: "/error/403",
    name: "Error",
    icon: "nc-icon nc-air-baloon",
    component: Error403,
    layout: "/admin",
	  not_show: true
  },
];

export default dashboardRoutes;
