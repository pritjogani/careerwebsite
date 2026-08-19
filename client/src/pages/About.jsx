import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { Footer } from "../components/Footer";

export const About = () => {
  const { user } = useAuth();

  const values = [
    {
      icon: "fa-solid fa-bullseye",
      title: "Precision Matching",
      desc: "Our smart taxonomy matches candidate competencies with job requirements with highest relevance.",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: "fa-solid fa-shield-halved",
      title: "Verified Trust",
      desc: "Every employer account and opening is verified to maintain a spam-free ecosystem.",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: "fa-solid fa-bolt",
      title: "Speed & Agility",
      desc: "Applications are delivered directly to hiring team dashboards for faster feedback cycles.",
      color: "bg-amber-50 text-amber-600",
    },
    {
      icon: "fa-solid fa-hand-holding-heart",
      title: "Candidate First",
      desc: "Zero hidden charges for applicants. Transparent salary metrics and seamless career progression.",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <i className="fa-solid fa-sparkles text-xs"></i>
            <span>Our Mission & Vision</span>
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Empowering Careers, <span className="text-blue-400">Right on Time</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            CareerOnTime bridges the gap between ambitious talent and industry-leading teams through modern technology and transparent recruitment.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 space-y-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
              Why We Exist
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
              We believe great opportunities shouldn’t be hard to find.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Finding the right job isn't just about sending hundreds of resumes into a void. It's about finding the exact match where your skills, aspirations, and timing align perfectly.
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              CareerOnTime offers a wide range of job opportunities across diverse industries and locations. Designed with modern user experience, advanced filters, and direct recruiter connectivity, our platform accelerates your hiring cycle.
            </p>

            <div className="pt-2 flex items-center space-x-4">
              <Link
                to="/jobs"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 transition-all"
              >
                Browse All Openings
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-sm border border-slate-200 transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
            <h3 className="text-2xl font-bold">The CareerOnTime Impact</h3>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-3xl font-extrabold text-white">100%</p>
                <p className="text-xs text-blue-200 mt-1">Verified Employers</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-3xl font-extrabold text-white">2.5k+</p>
                <p className="text-xs text-blue-200 mt-1">Active Positions</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-3xl font-extrabold text-white">24h</p>
                <p className="text-xs text-blue-200 mt-1">Average Response</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                <p className="text-3xl font-extrabold text-white">4.9/5</p>
                <p className="text-xs text-blue-200 mt-1">Candidate Rating</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Our Core Pillars</h3>
            <p className="text-slate-500 text-sm">The foundational values guiding our platform design and service delivery</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-200 space-y-3">
                <div className={`w-12 h-12 rounded-xl ${v.color} flex items-center justify-center text-xl`}>
                  <i className={v.icon}></i>
                </div>
                <h4 className="font-bold text-slate-900 text-base">{v.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;