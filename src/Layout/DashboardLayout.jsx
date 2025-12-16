import React from 'react';
import { Link, Outlet } from 'react-router';
import { FaCalculator, FaCartArrowDown, FaFirstOrderAlt, FaTasks  } from 'react-icons/fa';
import Footer from '../Pages/Footer';
import { MdInventory2 } from "react-icons/md";
import { FaFirstOrder } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUserShield } from "react-icons/fa6";

const DashboardLayout = () => {
    return (
        <div>
        <div className=' flex container mx-auto min-h-screen'>
           
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Navbar */}
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4 text-3xl">Welcome to Our Dashboard</div>
                    </nav>
                    {/* Page content here */}
                    <div className="">
                      <Outlet />
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex  flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">
                            {/* List item */}
                            <Link to="/">
                                <li>
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Go back Home">
                                    {/* Home icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path></svg>
                                    <span className="is-drawer-close:hidden text-3xl">GOTRACK </span>
                                </button>
                                </li>
                            </Link>

                            {/* List item */}
                            
                            
                            <Link to="manage-users">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Users">
                                    {/* Product icon */}
                                    <FaUserShield />
                                    <span className="is-drawer-close:hidden">Manage Users</span>
                                </button>
                            </li>
                            </Link>
                            <Link to="add-product">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Add Products">
                                    {/* Product icon */}
                                    <FaCartArrowDown />
                                    <span className="is-drawer-close:hidden">Add Products</span>
                                </button>
                            </li>
                            </Link>
                            <Link to="all-products">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Products">
                                    {/* Product icon */}
                                    <FaCalculator />
                                    <span className="is-drawer-close:hidden">All Products</span>
                                </button>
                            </li>
                            </Link>
                            <Link to="my-inventory">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Inventory">
                                    {/* Product icon */}
                                    <MdInventory2 />
                                    <span className="is-drawer-close:hidden">My Inventory</span>
                                </button>
                            </li>
                            </Link>
                            <Link to="manage-products">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Manage Products">
                                    {/* Product icon */}
                                    <FaFirstOrder />
                                    <span className="is-drawer-close:hidden">Manage Products</span>
                                </button>
                            </li>
                            </Link>
                            <Link to="pending-orders">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Pending Orders">
                                    {/* Product icon */}
                                    <FaTasks />
                                    <span className="is-drawer-close:hidden">Pending Orders</span>
                                </button>
                            </li>
                            </Link>
                            <Link to="approve-orders">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="Approve Orders">
                                    {/* Product icon */}
                                    <FaArrowRightToBracket />
                                    <span className="is-drawer-close:hidden">Approve Orders</span>
                                </button>
                            </li>
                            </Link>
                            <Link to="my-profile">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="My Profile">
                                    {/* Product icon */}
                                    <ImProfile />
                                    <span className="is-drawer-close:hidden">My Profile</span>
                                </button>
                            </li>
                            </Link>
                            <Link to="all-orders">
                            <li>
                                <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right" data-tip="All Orders">
                                    {/* Product icon */}
                                    <AiOutlineProduct />
                                    <span className="is-drawer-close:hidden">All Orders</span>
                                </button>
                            </li>
                            </Link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </div>
    );
};

export default DashboardLayout;