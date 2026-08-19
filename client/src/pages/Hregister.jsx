import { useState } from "react";
import { useAuth } from "../store/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Footer } from "../components/Footer";
import { API_BASE_URL } from "../config/api";

export const Hregister = () => {
  const { storeTokenInLs } = useAuth();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    phone: "",
    city: "",
    role: "hr",
    age: "",
    companyname: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLs(res_data.token);
        setUser({
          username: "",
          password: "",
          email: "",
          role: "hr",
          phone: "",
          city: "",
          age: "",
          companyname: "",
        });
        toast.success("HR Account registered successfully!");
        navigate("/hr/hrhome");
      } else {
        toast.error(res_data.extradetails || res_data.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Unable to connect to the server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col justify-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl space-y-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl mx-auto shadow-sm">
              <i className="fa-solid fa-building-user"></i>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Register Employer / HR Account
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Create an official recruiter profile to post jobs, review candidates, and manage your hiring pipeline.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  HR / Recruiter Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                  placeholder="e.g. Sarah Jenkins"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Work / Corporate Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="sarah@company.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Company / Organization Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyname"
                  value={user.companyname}
                  onChange={handleInput}
                  placeholder="e.g. Microsoft / Infotech"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={handleInput}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none text-sm"
                  >
                    <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Contact Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleInput}
                  placeholder="+91 98765 43210"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Company Headquarters / City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={user.city}
                  onChange={handleInput}
                  placeholder="e.g. Bangalore, Mumbai"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={user.age}
                  onChange={handleInput}
                  placeholder="e.g. 28"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm bg-slate-50/50"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                    <span>Creating HR Account...</span>
                  </>
                ) : (
                  <>
                    <span>Complete Employer Registration</span>
                    <i className="fa-solid fa-arrow-right text-xs"></i>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Looking for a job instead?{" "}
            <Link to="/userregister" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
              Register as Candidate
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hregister;
