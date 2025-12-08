import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-300 py-8 px-6 mt-10">
  <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-sm">

    <aside className="max-w-lg">
      <NavLink to="/" className="btn btn-ghost text-2xl font-bold text-amber-400 hover:bg-transparent">
        GOTRACK
      </NavLink>
      
      <p className="mt-3 text-gray-700 leading-relaxed">
        Garments Order & Production Tracker – Simple web system for small & medium factories to track orders, manage production stages, control inventory, and deliver on time.
      </p>
    </aside>

    <div className="text-left md:text-right">
      <div className="text-gray-800">
        Copyright © {new Date().getFullYear()} - All rights reserved by <span className="text-amber-600 font-medium">GOTRACK Industries Ltd</span>
      </div>
      <div className="flex gap-2 mt-3 items-center">
        <Link to="#"><FaLinkedinIn size={24}/></Link>
        <Link to="#"><FaInstagram size={24}/></Link>
        <Link to="#"><FaFacebookF size={24}/></Link>
      </div>
    </div>

  </div>
</footer>
  );
};

export default Footer;