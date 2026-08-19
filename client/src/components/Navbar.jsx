import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useState, useRef, useEffect } from "react";

export const Navbar = () => {
  const { isLoggedIn, user, isHR } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setIsProfileOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getInitial = () => {
    if (user && user.username) return user.username.charAt(0).toUpperCase();
    if (user && user.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const navLinkClasses = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
      isActive
        ? "text-blue-600 bg-blue-50/80 font-bold"
        : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
    }`;

  const mobileNavLinkClasses = ({ isActive }) =>
    `block px-4 py-2.5 rounded-lg text-base font-medium transition-all ${
      isActive
        ? "text-blue-600 bg-blue-50 font-semibold"
        : "text-slate-700 hover:text-blue-600 hover:bg-slate-50"
    }`;

  return (
    <header className="sticky top-0 z-50 glass-nav border-b border-slate-200/80 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group" onClick={closeMenu}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <i className="fa-solid fa-briefcase text-lg"></i>
            </div>
            <div className="flex flex-col">
              <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Career<span className="text-blue-600">OnTime</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-0.5">
                Job Portal
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/jobs" className={navLinkClasses}>
              Jobs
            </NavLink>
            <NavLink to="/about" className={navLinkClasses}>
              About
            </NavLink>
            <NavLink to="/contact" className={navLinkClasses}>
              Contact
            </NavLink>

            {/* HR Dashboard Pill */}
            {isHR && (
              <NavLink
                to="/hr/hrhome"
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-lg text-sm font-semibold flex items-center space-x-1.5 transition-all shadow-sm ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-indigo-500/20"
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60"
                  }`
                }
              >
                <i className="fa-solid fa-user-tie text-xs"></i>
                <span>HR Dashboard</span>
              </NavLink>
            )}
          </nav>

          {/* User Actions / Profile Circle */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                {/* Circular Profile Avatar Button */}
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-3 p-1.5 rounded-full hover:bg-slate-100/80 border border-slate-200/80 transition-all focus:outline-none"
                  aria-expanded={isProfileOpen}
                >
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
                      {getInitial()}
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white"></span>
                  </div>

                  <span className="text-xs font-bold text-slate-800 pr-1 truncate max-w-[100px]">
                    {user ? user.username || "Account" : "Account"}
                  </span>
                  <i
                    className={`fa-solid fa-chevron-down text-[10px] text-slate-400 pr-2 transition-transform duration-200 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/90 py-2 space-y-1 animate-fadeIn z-50">
                    {/* User Header */}
                    <div className="px-4 py-3 border-b border-slate-100 space-y-1">
                      <p className="text-sm font-extrabold text-slate-900 truncate">
                        {user.username || "User Account"}
                      </p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      <div className="pt-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                            isHR
                              ? "bg-indigo-100 text-indigo-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {isHR ? "HR Recruiter" : "Job Candidate"}
                        </span>
                      </div>
                    </div>

                    {/* Menu Options */}
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={closeMenu}
                        className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      >
                        <i className="fa-solid fa-user-pen text-slate-400"></i>
                        <span>View & Edit Profile</span>
                      </Link>

                      {isHR && (
                        <Link
                          to="/hr/hrhome"
                          onClick={closeMenu}
                          className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors"
                        >
                          <i className="fa-solid fa-building-user text-indigo-500"></i>
                          <span>Manage HR Postings</span>
                        </Link>
                      )}
                    </div>

                    {/* Logout Option */}
                    <div className="pt-1 border-t border-slate-100">
                      <Link
                        to="/logout"
                        onClick={closeMenu}
                        className="flex items-center space-x-2.5 px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <i className="fa-solid fa-arrow-right-from-bracket text-red-400"></i>
                        <span>Sign Out</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-100/80 transition-colors"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all"
                >
                  Get Started
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              className="w-10 h-10 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center focus:outline-none transition-colors"
            >
              <i className={`fa-solid ${isOpen ? "fa-xmark" : "fa-bars"} text-lg`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fadeIn">
          {/* User Mobile Profile Card */}
          {isLoggedIn && user && (
            <Link
              to="/profile"
              onClick={closeMenu}
              className="flex items-center space-x-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 mb-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                {getInitial()}
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-bold text-slate-900 truncate">{user.username}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <span className="text-xs text-blue-600 font-semibold flex items-center">
                Edit <i className="fa-solid fa-chevron-right text-[10px] ml-1"></i>
              </span>
            </Link>
          )}

          <NavLink to="/" onClick={closeMenu} className={mobileNavLinkClasses}>
            <i className="fa-solid fa-house mr-2.5 text-slate-400"></i>
            Home
          </NavLink>
          <NavLink to="/jobs" onClick={closeMenu} className={mobileNavLinkClasses}>
            <i className="fa-solid fa-briefcase mr-2.5 text-slate-400"></i>
            Jobs
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className={mobileNavLinkClasses}>
            <i className="fa-solid fa-circle-info mr-2.5 text-slate-400"></i>
            About
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu} className={mobileNavLinkClasses}>
            <i className="fa-solid fa-envelope mr-2.5 text-slate-400"></i>
            Contact
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/profile" onClick={closeMenu} className={mobileNavLinkClasses}>
              <i className="fa-solid fa-user-pen mr-2.5 text-slate-400"></i>
              Edit Profile Information
            </NavLink>
          )}

          {/* HR Mobile Link */}
          {isHR && (
            <NavLink
              to="/hr/hrhome"
              onClick={closeMenu}
              className="block px-4 py-2.5 rounded-lg text-base font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200/50"
            >
              <i className="fa-solid fa-user-tie mr-2.5 text-indigo-600"></i>
              HR Dashboard (Post Jobs)
            </NavLink>
          )}

          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            {isLoggedIn ? (
              <NavLink
                to="/logout"
                onClick={closeMenu}
                className="w-full text-center px-4 py-2.5 rounded-lg font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                Sign Out
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2.5 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Sign In
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={closeMenu}
                  className="w-full text-center px-4 py-2.5 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-colors"
                >
                  Get Started
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;