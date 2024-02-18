import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Verify from "../pages/auth/Verify";
import PasswordVerify from "../pages/auth/PasswordVerify";
import ChangePassword from "../pages/auth/ChangePassword";
import FullLayout from "../components/layouts/full/FullLayout";
import Dashboard from "../pages/userDashboard/Dashboard";
import Withdrawals from "../pages/userDashboard/Withdrawals";
import Subscriptions from "../pages/userDashboard/Subscription";
import Profile from "../pages/userDashboard/Profile";
import KYC from "../pages/userDashboard/KYC";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import AdminLayout from "../components/layouts/full/AdminLayout";
import Users from "../pages/adminDashboard/Users";
import AdminSubscriptions from "../pages/adminDashboard/AdminSubscription";
import AdminWithdrawals from "../pages/adminDashboard/AdminWithdrawals";
import Settings from "../pages/adminDashboard/Settings";
import UsersProfile from "../pages/adminDashboard/UserProfile";

export const Router = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/password/verify",
      element: <PasswordVerify />,
    },
    {
      path: "/password/change",
      element: <ChangePassword />,
    },

    {
      path: "/dashboard",
      element: <FullLayout />,
      children: [
        { element: <Navigate to="app" />, index: true },
        { path: "app", element: <Dashboard /> },
        { path: "withdrawals", element: <Withdrawals /> },
        { path: "subscriptions", element: <Subscriptions /> },
        { path: "profile", element: <Profile /> },
        { path: "kyc", element: <KYC /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { element: <Navigate to="dashboard" />, index: true },
        { path: "dashboard", element: <AdminDashboard /> },
        { path: "users", element: <Users /> },
        { path: "subscriptions", element: <AdminSubscriptions /> },
        { path: "withdrawals", element: <AdminWithdrawals /> },
        { path: "profile/:id", element: <UsersProfile /> },
        { path: "settings", element: <Settings /> },
      ],
    },
  ]);
  return routes;
};
