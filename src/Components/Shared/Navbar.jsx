import React from 'react';
import { FaUserTie } from 'react-icons/fa';
import { NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {

    const { user, logOut } = useAuth()

    const userLogOut = () => {
        logOut()
            .then()
            .catch(err => {
                console.log(err);
            })
    }

    const navLinks = <>
        <li> <NavLink to="/">Home</NavLink></li>
        <li> <NavLink to="/all-product">All-Product</NavLink></li>
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
                <NavLink to="/" className="btn btn-ghost text-xl bg-amber-50">GOTRACK</NavLink>
            </div>

            <div className="navbar-end pr-1">

                <ul className="menu md:flex hidden menu-horizontal px-1">
                    {
                        navLinks
                    }
                </ul>

                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="bg-gray-300 p-2 m-1 rounded-full"><FaUserTie size={24} />
                        </div>
                        <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                            <li><a onClick={userLogOut}>Log Out</a></li>
                        </ul>
                    </div> : ""
                }
            </div>
        </div>
    );
};

export default Navbar;