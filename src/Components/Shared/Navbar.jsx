import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import {  Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Dropdown from './Dropdown';
import Logo from './Logo';

const Navbar = () => {

    const { user } = useAuth()



    const navLinks = <>
        <li> <NavLink to="/">Home</NavLink></li>
        <li> <NavLink to="/all-product">All-Products</NavLink></li>
        <li> <NavLink to="/about">About Us</NavLink></li>
        <li> <NavLink to="/contact">Contact</NavLink></li>
        {
            !user && <>
                <li> <NavLink to="/login">Login</NavLink></li>
                <li> <NavLink to="/register">Register</NavLink></li>
            </>
        }
    </>


    return (
        <div className="navbar bg-base-100 shadow-sm bg-gradient-to-r from-gray-800 to-cyan-900/50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navLinks}
                    </ul>
                </div>
                <Logo/>
            </div>

            <div className="navbar-end pr-1">

                <ul className="menu md:flex hidden menu-horizontal px-1">
                    {
                        navLinks
                    }
                </ul>

                {
                    user ? <Dropdown/> : ""
                }
            </div>
        </div>
    );
};

export default Navbar;