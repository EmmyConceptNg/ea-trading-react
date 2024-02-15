import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Home from "../pages/Home";
import Verify from "../pages/auth/Verify";
import PasswordVerify from "../pages/auth/PasswordVerify";
import ChangePassword from "../pages/auth/ChangePassword";
import FullLayout from "../components/userDashboard/layouts/full/FullLayout";
import Dashboard from "../pages/userDashboard/Dashboard";
import Transactions from "../pages/userDashboard/Transactions";
import Subscriptions from "../pages/userDashboard/Subscription";

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
        { path: "transactions", element: <Transactions /> },
        { path: "subscriptions", element: <Subscriptions /> },
      ],
    },
  ]);
  return routes;
};
