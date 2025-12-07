import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Layout/Home";
import About from "../Pages/About";
import NotFoundPage from "../Pages/NotFoundPage";
import ContactPage from "../Pages/ContactPage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import AllProduct from "../Pages/AllProduct";
import AuthLayout from "../Layout/Auth/AuthLayout";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: MainLayout,
        children:[
            {
                index: true,
                Component: Home
            },
            {
                path: '/all-product',
                Component: AllProduct
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/contact',
                Component: ContactPage
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children:[
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            },
        ]
    },
    {
        path: '/*',
        Component: NotFoundPage
    }
])

