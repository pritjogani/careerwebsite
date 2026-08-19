import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { Footer } from "../components/Footer";

export const Home = () => {
  const { user, isLoggedIn } = useAuth();

  const features = [
    {
      icon: "fa-solid fa-users-viewfinder",
      title: "Work Community",
      desc: "Connect with verified peers, mentors, and hiring managers in your domain.",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      icon: "fa-solid fa-paper-plane",
      title: "Instant Job Applications",
      desc: "Apply directly to vetted tech, finance, and creative roles in a few clicks.",
      color: "from-emerald-500 to-teal-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      icon: "fa-solid fa-building-circle-check",
      title: "Verified Companies",
      desc: "Direct access to authenticated HR recruiters with zero middle-man spam.",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600",
    },
    {
      icon: "fa-solid fa-money-bill-trend-up",
      title: "Transparent Salaries",
      desc: "Explore accurate compensation ranges and benchmark your market value.",
      color: "from-purple-500 to-pink-600",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  const stats = [
    { label: "Active Job Listings", value: "2,500+" },
    { label: "Partner Companies", value: "850+" },
    { label: "Successful Hires", value: "12,000+" },
    { label: "Candidate Match Rate", value: "98%" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-blue-50/60 via-slate-50 to-white">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {user ? (
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs sm:text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span>Welcome back, {user.username}!</span>
                </div>
              ) : (
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 text-blue-800 text-xs sm:text-sm font-semibold">
                  <i className="fa-solid fa-sparkles text-blue-600 text-xs"></i>
                  <span>Elevate Your Professional Journey</span>
                </div>
              )}

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Find your dream job at just the{" "}
                <span className="gradient-text">right moment.</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                At CareerOnTime, we believe that career growth is all about timing and the right opportunity match. Explore curated openings from industry-leading companies and start applying in seconds.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/jobs"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Explore All Jobs</span>
                  <i className="fa-solid fa-arrow-right text-sm"></i>
                </Link>

                {!isLoggedIn && (
                  <Link
                    to="/register"
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-base border border-slate-200 shadow-sm transition-all flex items-center justify-center"
                  >
                    Create Free Account
                  </Link>
                )}
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-slate-500 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-base"></i>
                  <span>100% Free for Candidates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <i className="fa-solid fa-circle-check text-emerald-500 text-base"></i>
                  <span>Verified Employers</span>
                </div>
              </div>
            </div>

            {/* Right Graphic / Illustration Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl transform rotate-2 scale-105 opacity-20 blur-xl"></div>
                <div className="relative bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
                  {/* Card Header Preview */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold shadow-md shadow-blue-500/20">
                        <i className="fa-solid fa-code"></i>
                      </div>
                      <div>
                        <h2 className="font-bold text-slate-900 text-base">Senior Full-Stack Developer</h2>
                        <p className="text-xs text-slate-500">TechCorp Global • Remote</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                      Open
                    </span>
                  </div>

                  {/* Highlights */}
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-slate-400 font-medium">Annual Salary</p>
                      <p className="font-bold text-slate-800 text-sm mt-0.5">$95,000 - $130,000</p>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl">
                      <p className="text-slate-400 font-medium">Experience</p>
                      <p className="font-bold text-slate-800 text-sm mt-0.5">3+ Years (MERN)</p>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold">React.js</span>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold">Node.js</span>
                    <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold">MongoDB</span>
                    <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold">Tailwind</span>
                  </div>

                  {/* Mock Action */}
                  <div className="pt-2">
                    <Link
                      to="/jobs"
                      className="block text-center w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:opacity-95 transition"
                    >
                      View Live Opportunities
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((item, idx) => (
              <div key={idx} className="text-center p-4">
                <p className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">{item.value}</p>
                <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Why CareerOnTime
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
              Everything you need to accelerate your career
            </h2>
            <p className="text-base text-slate-600 mt-3 leading-relaxed">
              We provide trusted insights, instant employer connectivity, and streamlined application management in one unified portal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map((feat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${feat.bgColor} ${feat.textColor} flex items-center justify-center text-2xl mb-6`}>
                    <i className={feat.icon}></i>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-bg text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to take the next step in your career?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
            Join thousands of professionals and top hiring companies who trust CareerOnTime for fast, transparent hiring.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/jobs"
              className="px-8 py-3.5 rounded-xl bg-white text-blue-700 font-bold text-base hover:bg-blue-50 shadow-lg transition-all"
            >
              Search Jobs Now
            </Link>
            <Link
              to="/hregister"
              className="px-8 py-3.5 rounded-xl bg-blue-800/80 hover:bg-blue-800 text-white font-semibold text-base border border-blue-400/40 transition-all"
            >
              Post a Job as HR
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;