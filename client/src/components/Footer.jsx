import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                <i className="fa-solid fa-briefcase"></i>
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Career<span className="text-blue-400">OnTime</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Connecting exceptional talent with world-class opportunities. Your next career milestone starts right here, right on time.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200">
                <i className="fa-brands fa-linkedin-in text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-400 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200">
                <i className="fa-brands fa-x-twitter text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-pink-600 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200">
                <i className="fa-brands fa-instagram text-sm"></i>
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-blue-700 text-slate-400 hover:text-white flex items-center justify-center transition-all duration-200">
                <i className="fa-brands fa-facebook-f text-sm"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Quick Navigation</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-slate-600 group-hover:text-blue-400 transition-colors"></i>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/jobs" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-slate-600 group-hover:text-blue-400 transition-colors"></i>
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-slate-600 group-hover:text-blue-400 transition-colors"></i>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-slate-600 group-hover:text-blue-400 transition-colors"></i>
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* For Job Seekers & Employers */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Portals</h4>
            <ul className="space-y-2.5">
              <li>
                <Link to="/userregister" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-slate-600 group-hover:text-blue-400 transition-colors"></i>
                  Candidate Sign Up
                </Link>
              </li>
              <li>
                <Link to="/hregister" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-slate-600 group-hover:text-blue-400 transition-colors"></i>
                  Employer / HR Registration
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-slate-600 group-hover:text-blue-400 transition-colors"></i>
                  Account Login
                </Link>
              </li>
              <li>
                <Link to="/applyforjobs" className="text-sm text-slate-400 hover:text-blue-400 transition-colors flex items-center group">
                  <i className="fa-solid fa-chevron-right text-xs mr-2 text-slate-600 group-hover:text-blue-400 transition-colors"></i>
                  Apply for Jobs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-slate-400">
                <i className="fa-solid fa-envelope text-blue-400 mt-1"></i>
                <span>joganiprit2004@gmail.com</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-400">
                <i className="fa-solid fa-phone text-blue-400 mt-1"></i>
                <span>+91 81608 82490</span>
              </li>
              <li className="flex items-start space-x-3 text-sm text-slate-400">
                <i className="fa-solid fa-location-dot text-blue-400 mt-1"></i>
                <span>Ahmedabad, Gujarat, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CareerOnTime. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
