import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Layout/Home";
import About from "../Pages/About";
import NotFoundPage from "../Pages/NotFoundPage";

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
                path: '/about',
                Component: About
            }
        ]
    },
    {
        path: '/*',
        Component: NotFoundPage
    }
])

