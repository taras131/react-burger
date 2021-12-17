import {
    ROUTE_FORGOT_PASSWORD, ROUTE_INGREDIENTS,
    ROUTE_LOGIN,
    ROUTE_MAIN,
    ROUTE_PROFILE,
    ROUTE_REGISTER,
    ROUTE_RESET_PASSWORD
} from "../utils/const";
import Main from "../pages/main/main";
import Auth from "../pages/auth/auth";
import ForgotPassword from "../pages/forgot-password/forgot-password";
import ResetPassword from "../pages/reset-password/reset-password";
import Profile from "../pages/profile/profile";
import Ingredients from "../pages/ingredients/ingredients";

export const authRoutes = [
    {
        path: ROUTE_MAIN,
        component: <Main/>
    },
    {
        path: ROUTE_INGREDIENTS,
        component: <Ingredients/>
    },
    {
        path: ROUTE_RESET_PASSWORD,
        component: <ResetPassword/>
    },
    {
        path: ROUTE_PROFILE,
        component: <Profile/>
    },
]

export const notAuthRoutes = [
    {
        path: ROUTE_MAIN,
        component: <Main/>
    },
    {
        path: ROUTE_INGREDIENTS,
        component: <Ingredients/>
    },
    {
        path: ROUTE_LOGIN,
        component: <Auth/>
    },
    {
        path: ROUTE_REGISTER,
        component: <Auth/>
    },
    {
        path: ROUTE_FORGOT_PASSWORD,
        component: <ForgotPassword/>
    },
]