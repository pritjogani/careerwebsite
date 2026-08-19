import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export const Page404 = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 max-w-xl mx-auto px-4 py-20 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-24 h-24 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center text-5xl shadow-sm">
          <i className="fa-solid fa-compass-drafting"></i>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-extrabold uppercase tracking-widest text-blue-600">Error 404</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Oops! The page or career resource you are looking for might have been moved, removed, or doesn't exist.
          </p>
        </div>

        <div className="pt-2 flex items-center space-x-4">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center space-x-2"
          >
            <i className="fa-solid fa-house text-xs"></i>
            <span>Return to Home</span>
          </Link>
          <Link
            to="/jobs"
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm border border-slate-200 transition-all"
          >
            Browse Jobs
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Page404;
