import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa';
import { Link, NavLink } from 'react-router';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/10 relative overflow-hidden">
      {/* Subtle Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Logo + Description */}
          <aside className="space-y-6">
            <NavLink to="/" className="inline-block">
              <h1 className="text-4xl font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-90 transition">
                GOTRACK
              </h1>
            </NavLink>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Garments Order & Production Tracker — The smartest way for Bangladeshi factories to manage orders, track production, control inventory, and deliver on time.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-amber-500 hover:border-amber-500 text-white hover:text-black transition-all duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-cyan-500 hover:border-cyan-500 text-white hover:text-black transition-all duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 text-white hover:text-white transition-all duration-300">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-sky-500 hover:border-sky-500 text-white hover:text-black transition-all duration-300">
                <FaTwitter size={20} />
              </a>
            </div>
          </aside>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3 text-gray-400">
              {['Home', 'Features', 'Pricing', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-amber-400 transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5">Company</h3>
            <ul className="space-y-3 text-gray-400">
              {['Privacy Policy', 'Terms of Service', 'Support', 'Blog', 'Careers'].map((item) => (
                <li key={item}>
                  <Link to="#" className="hover:text-cyan-400 transition">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-white mb-5">Get in Touch</h3>
            <div className="space-y-4 text-gray-400">
              <p className="flex items-center gap-3">
                <span className="text-amber-400">Email</span> support@gotrack.com
              </p>
              <p className="flex items-center gap-3">
                <span className="text-cyan-400">Phone</span> +880 1877-123456
              </p>
              <p className="flex items-center gap-3">
                <span className="text-amber-400">Address</span> Dhaka, Bangladesh
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {currentYear} <span className="text-amber-400 font-bold">GOTRACK</span> • All rights reserved
          </p>
          <p className="mt-4 md:mt-0">
            Made with <span className="text-red-500">Love</span> in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;