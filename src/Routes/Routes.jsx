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
import ProductDetailsPage from "../Pages/ProductDetails";
import Loading from "../Components/Loading";
import PrivateRoute from "../Pages/PrivateRoute";
import DashboardLayout from "../Layout/DashboardLayout";
import AddProduct from "../Layout/DashboardLayout/Manager/AddProduct";
import BookingForm from "../Pages/BookingForm";
import ManageProducts from "../Layout/DashboardLayout/Manager/ManageProducts";
import PendingOrders from "../Layout/DashboardLayout/Manager/PendingOrders";
import ApproveOrders from "../Layout/DashboardLayout/Manager/ApproveOrders";
import MyProfile from "../Layout/DashboardLayout/Buyer/MyProfile";
import ManageUsers from "../Layout/DashboardLayout/Admin/ManageUsers";
import AllOrders from "../Layout/DashboardLayout/Admin/AllOrders";
import AllProducts from "../Layout/DashboardLayout/Admin/AllProducts";
import UpdateProduct from "../Layout/DashboardLayout/Manager/UpdateProduct";
import PaymentSuccess from "../Pages/Payments/PaymentSuccess";
import MyOrders from "../Layout/DashboardLayout/Buyer/MyOrders";
import TrackOrder from "../Layout/DashboardLayout/Buyer/TrackOrder";
import Profile from "../Layout/DashboardLayout/Buyer/Profile";
import Statistics from "../Layout/DashboardLayout/Statistics";
import AdminRoute from "../Layout/DashboardLayout/Admin/AdminRoute";


export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFoundPage />,
        Component: MainLayout,
        children: [
            {
                index: true,
                Component: Home,
                loader: () => fetch('http://localhost:9000/limit-products'),
                hydrateFallbackElement: <Loading />
            },
            {
                path: '/all-product',
                Component: AllProduct,
                loader: () => fetch('http://localhost:9000/products'),
                hydrateFallbackElement: <Loading />
            },
            {
                path: '/product-details/:id',
                element: <PrivateRoute><ProductDetailsPage /></PrivateRoute>,
            },
            {
                path: 'add-product',
                element: <AddProduct />
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/contact',
                Component: ContactPage
            },
            {
                path: '/booking-form/:id',
                element: <PrivateRoute><BookingForm /></PrivateRoute>
            },
        ]
    },
    {
        path: '/',
        Component: AuthLayout,
        children: [
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
        path: 'dashboard',
        Component: DashboardLayout,
        children: [

            {
                path: 'all-products',
                element: <AllProducts />
            },
            
            {
                path: 'statistics',
                element: <Statistics />
            },
            {
                path: 'manage-products',
                element: <AdminRoute><ManageProducts /></AdminRoute>
            },
            {
                path: 'update-products/:id',
                element: <UpdateProduct />
            },
            {
                path: 'pending-orders',
                element: <PendingOrders />
            },
            {
                path: 'approve-orders',
                element: <ApproveOrders />
            },
            {
                path: 'my-profile',
                element: <MyProfile />
            },
            {
                path: 'manage-users',
                element: <ManageUsers />
            },
            {
                path: 'all-orders',
                Component: AllOrders,
            },
            {
                path: 'payment-success',
                Component: PaymentSuccess,
            },
            {
                path: 'payment-cancel',
                Component: PaymentSuccess,
            },
            {
                path: 'my-orders',
                Component: MyOrders,
            },
            {
                path: "track-order/:orderId",
                element: <TrackOrder />,
            },
            {
                path: 'profile',
                Component: Profile,
            },
        ]
    },
    {
        path: '/*',
        Component: NotFoundPage
    }
])

