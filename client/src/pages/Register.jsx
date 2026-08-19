import { useNavigate, Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col justify-center items-center">
        {/* Header Title */}
        <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            Join CareerOnTime
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How would you like to join?
          </h1>
          <p className="text-slate-600 text-sm sm:text-base">
            Select your account type to personalize your experience and access tailored tools.
          </p>
        </div>

        {/* Dual Option Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          {/* Candidate Card */}
          <div
            onClick={() => navigate("/userregister")}
            className="group relative bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <i className="fa-solid fa-user-graduate"></i>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  I'm a Job Seeker
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Discover curated job opportunities, submit quick applications, and connect with verified recruiters.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center space-x-2.5">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
                  <span>Browse thousands of verified openings</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
                  <span>Direct application to hiring managers</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
                  <span>Track application status & salary insights</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                type="button"
                className="w-full py-3 rounded-xl bg-blue-50 group-hover:bg-blue-600 text-blue-700 group-hover:text-white font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Register as Candidate</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>

          {/* Employer / HR Card */}
          <div
            onClick={() => navigate("/hregister")}
            className="group relative bg-white rounded-3xl p-8 border-2 border-slate-200 hover:border-indigo-500 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <i className="fa-solid fa-building-user"></i>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                  I'm an Employer / HR
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Post job openings, manage candidates, and hire top-tier talent for your company quickly.
                </p>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-center space-x-2.5">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
                  <span>Post unlimited verified job listings</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
                  <span>Receive complete candidate profiles & CVs</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-xs"></i>
                  <span>Dedicated corporate HR dashboard</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <button
                type="button"
                className="w-full py-3 rounded-xl bg-indigo-50 group-hover:bg-indigo-600 text-indigo-700 group-hover:text-white font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <span>Register as Employer / HR</span>
                <i className="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Existing account login link */}
        <div className="mt-12 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700 hover:underline">
            Sign in here
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Register;
