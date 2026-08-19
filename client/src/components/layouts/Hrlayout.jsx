import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

export const Hrlayout = () => {
  const { user, isloading } = useAuth();

  if (isloading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center space-y-3">
          <i className="fa-solid fa-circle-notch fa-spin text-3xl text-blue-600"></i>
          <p className="text-sm font-medium text-slate-500">Loading HR Workspace...</p>
        </div>
      </div>
    );
  }

  const isHR = user && (user.ishr === true || user.role === "hr");

  if (!isHR) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Sub-header for HR Portal */}
      <div className="bg-indigo-950 text-white border-b border-indigo-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-sm font-bold shadow-sm">
              <i className="fa-solid fa-building-user"></i>
            </span>
            <div>
              <span className="text-xs text-indigo-300 font-semibold tracking-wider uppercase block">Employer Portal</span>
              <span className="text-sm font-bold text-white">{user.companyname || "Corporate Recruiter"}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="px-3 py-1 rounded-full bg-indigo-900 text-indigo-200 border border-indigo-800">
              <i className="fa-solid fa-shield-check text-emerald-400 mr-1"></i> Verified HR Account
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Hrlayout;