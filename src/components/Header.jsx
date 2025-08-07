import React, { useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import ScrollProgress from "@/components/ui/scroll-progress";
import Logo1 from "../assets/LOGO5.png";

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 text-white sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Branding */}
          <div className="flex-shrink-0 flex items-center space-x-3">
            <img 
              src={Logo1} 
              alt="Institute Logo" 
              className="w-12 h-12 sm:w-12 sm:h-12 rounded-full transform transition duration-300 hover:scale-110" 
            />
            <HashLink 
              to="/#" 
              className="text-xl sm:text-2xl font-bold tracking-tight hover:text-gray-200 transition duration-300"
              onClick={closeNav}
            >
              YugTech Academy
            </HashLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex space-x-6">
            <HashLink
              to="/#"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition duration-300"
              onClick={closeNav}
            >
              Home
            </HashLink>
            <HashLink
              to="/#courses"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition duration-300"
              onClick={closeNav}
            >
              Courses
            </HashLink>
            <HashLink
              to="/#contact"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition duration-300"
              onClick={closeNav}
            >
              Contact
            </HashLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleNav}
            className="sm:hidden p-2 rounded-md hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Toggle navigation"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${isNavOpen ? 'rotate-90' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`sm:hidden overflow-hidden transition-all duration-300 ${isNavOpen ? 'max-h-40' : 'max-h-0'}`}>
          <nav className="pt-2 pb-4 space-y-2">
            <HashLink
              to="/#"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300"
              onClick={closeNav}
            >
              Home
            </HashLink>
            <HashLink
              to="/#courses"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300"
              onClick={closeNav}
            >
              Courses
            </HashLink>
            <HashLink
              to="/#contact"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/10 transition duration-300"
              onClick={closeNav}
            >
              Contact
            </HashLink>
          </nav>
        </div>
      </div>
      <ScrollProgress className="top-[64px] sm:top-[64px]" />
    </header>
  );
};

export default Header;