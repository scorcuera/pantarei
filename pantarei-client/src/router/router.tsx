import { createBrowserRouter } from "react-router-dom";
import SignIn from "../pages/SignIn";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/signin",
        element: <SignIn />
    },
    {
        path: "/dashboard",
        element: <Dashboard />
    }
]);