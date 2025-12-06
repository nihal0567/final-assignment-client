import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../Pages/Footer';
import Navbar from '../Components/Shared/Navbar';

const MainLayout = () => {
    return (
        <div className=' '>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;