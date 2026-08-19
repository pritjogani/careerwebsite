import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { API_BASE_URL } from "../config/api";

const defaultJobForm = {
  username: "",
  email: "",
  firstname: "",
  lastname: "",
  education: "",
  skills: "",
  achievement: "",
  expextedsalary: "",
  privioussalary: "",
  refrences: "",
  expirence: "",
  collagename: "",
};

export const Applyforjobs = () => {
  const [applyJob, setApplyJob] = useState(defaultJobForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setApplyJob((prev) => ({
        ...prev,
        email: user.email || "",
        username: user.username || "",
        collagename: user.collage || user.college || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplyJob((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/job/applyforjob`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applyJob),
      });

      const data = await response.json();

      if (response.ok) {
        setApplyJob(defaultJobForm);
        toast.success("Application submitted successfully!");
        navigate("/jobs");
      } else {
        toast.error(data.message || "Failed to submit application");
      }
    } catch (error) {
      toast.error("Network error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <i className="fa-solid fa-file-signature text-xs"></i>
            <span>Candidate Application Portal</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Submit Your Job Application</h1>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Fill out the details below carefully. Your application will be delivered directly to the hiring manager.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full -mt-4">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Card 1: Personal Profile */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <i className="fa-solid fa-user text-base"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
                <p className="text-xs text-slate-500">Basic contact information and account identification</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  value={applyJob.username}
                  onChange={handleChange}
                  placeholder="e.g. johndoe"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={applyJob.email}
                  onChange={handleChange}
                  placeholder="e.g. john@example.com"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstname"
                  value={applyJob.firstname}
                  onChange={handleChange}
                  placeholder="e.g. John"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastname"
                  value={applyJob.lastname}
                  onChange={handleChange}
                  placeholder="e.g. Doe"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Academic & Education */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                <i className="fa-solid fa-graduation-cap text-base"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Education & Background</h2>
                <p className="text-xs text-slate-500">Degree, university, and formal qualifications</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Highest Degree / Education <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="education"
                  value={applyJob.education}
                  onChange={handleChange}
                  placeholder="e.g. B.Tech in Computer Science"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  College / University Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="collagename"
                  value={applyJob.collagename}
                  onChange={handleChange}
                  placeholder="e.g. Gujarat Technological University"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Skills, Experience & Compensation */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            <div className="flex items-center space-x-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <i className="fa-solid fa-laptop-code text-base"></i>
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Experience & Compensation</h2>
                <p className="text-xs text-slate-500">Skills, career history, salary expectations, and references</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Key Skills <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="skills"
                  value={applyJob.skills}
                  onChange={handleChange}
                  placeholder="e.g. React, Node.js, TypeScript, SQL"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Total Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="expirence"
                  value={applyJob.expirence}
                  onChange={handleChange}
                  placeholder="e.g. 2.5 Years / Fresher"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Previous / Current Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="privioussalary"
                  value={applyJob.privioussalary}
                  onChange={handleChange}
                  placeholder="e.g. $45,000 / ₹4.5 LPA"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Expected Salary <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="expextedsalary"
                  value={applyJob.expextedsalary}
                  onChange={handleChange}
                  placeholder="e.g. $65,000 / ₹7 LPA"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Key Achievements / Projects <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="achievement"
                  value={applyJob.achievement}
                  onChange={handleChange}
                  placeholder="Summarize notable projects, awards, or key achievements..."
                  rows="3"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  References / Portfolio Link <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="refrences"
                  value={applyJob.refrences}
                  onChange={handleChange}
                  placeholder="e.g. GitHub link, portfolio URL, or reference contact"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                />
              </div>
            </div>
          </div>

          {/* Submit CTA */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <i className="fa-solid fa-paper-plane text-sm"></i>
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default Applyforjobs;
