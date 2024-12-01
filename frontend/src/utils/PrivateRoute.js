
import { Navigate, Outlet } from "react-router-dom";
import { getLocal } from "./helper";

import Home from '../components/Home';

const PrivateRoute = ({ children, ...rest }) => {
    const token = getLocal("token");
    return token ? <Home /> : <Navigate to="/login" />;
};

const AuthRoute = () => {
    const token = getLocal("token");
    return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export {PrivateRoute, AuthRoute};