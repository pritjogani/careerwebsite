import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Footer } from "../components/Footer";
import { API_BASE_URL } from "../config/api";

export const Hrhome = () => {
  const { authorizationtoken, jobs } = useAuth();
  const navigate = useNavigate();

  const [job, setJobs] = useState({
    title: "",
    description: "",
    department: "",
    location: "",
    salary: "",
    jobType: "Full-Time",
    requirements: "",
    responsibilities: "",
    company: "",
    contactEmail: "",
    contactPhone: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setJobs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/hr/addjob`, {
        method: "POST",
        headers: {
          Authorization: authorizationtoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success("Job opening published successfully!");
        setJobs({
          title: "",
          description: "",
          department: "",
          location: "",
          salary: "",
          jobType: "Full-Time",
          requirements: "",
          responsibilities: "",
          company: "",
          contactEmail: "",
          contactPhone: "",
        });
        navigate("/jobs");
      } else {
        toast.error(res_data.message || "Failed to publish job opening");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Dashboard Top Header */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                HR Management Dashboard
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Post & Manage Job Openings
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Publish new vacancies directly to the candidate portal in real-time.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-center">
                <span className="text-xs text-slate-400 font-medium block">Total Portal Jobs</span>
                <span className="text-lg font-bold text-slate-800">{jobs?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Column */}
          <div className="lg:col-span-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Card 1: Job Basics */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    <i className="fa-solid fa-briefcase"></i>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">1. Position & Company Basics</h2>
                    <p className="text-xs text-slate-500">Core details about the role and hiring organization</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={job.title}
                      onChange={handleInput}
                      placeholder="e.g. Senior Frontend Engineer"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Company Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={job.company}
                      onChange={handleInput}
                      placeholder="e.g. Microsoft / Acme Corp"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Department <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={job.department}
                      onChange={handleInput}
                      placeholder="e.g. Engineering / Marketing / Design"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Work Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={job.location}
                      onChange={handleInput}
                      placeholder="e.g. Remote / Ahmedabad / Bangalore"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Employment Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="jobType"
                      value={job.jobType}
                      onChange={handleInput}
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50 cursor-pointer"
                    >
                      <option value="Full-Time">Full-Time</option>
                      <option value="Part-Time">Part-Time</option>
                      <option value="Contract">Contract</option>
                      <option value="Internship">Internship</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Card 2: Compensation & Description */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-sm">
                    <i className="fa-solid fa-file-lines"></i>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">2. Description & Compensation</h2>
                    <p className="text-xs text-slate-500">Pay package and detailed role scope</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Salary Range / Package <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="salary"
                      value={job.salary}
                      onChange={handleInput}
                      placeholder="e.g. $80,000 - $110,000 / ₹8-12 LPA"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Job Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={job.description}
                      onChange={handleInput}
                      placeholder="Provide an overview of the role, the team, and what the candidate will work on..."
                      rows="4"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Key Requirements <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="requirements"
                      value={job.requirements}
                      onChange={handleInput}
                      placeholder="e.g. React, Node.js, 3+ years experience"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Primary Responsibilities <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="responsibilities"
                      value={job.responsibilities}
                      onChange={handleInput}
                      placeholder="e.g. Lead frontend architecture, mentor juniors"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Card 3: Recruiter Contact Info */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-5">
                <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
                  <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-sm">
                    <i className="fa-solid fa-headset"></i>
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">3. Recruiter Contact Details</h2>
                    <p className="text-xs text-slate-500">Contact information displayed to applicants</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Contact Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={job.contactEmail}
                      onChange={handleInput}
                      placeholder="hr@company.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                      Contact Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={job.contactPhone}
                      onChange={handleInput}
                      placeholder="+91 98765 43210"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin text-sm"></i>
                      <span>Publishing Opening...</span>
                    </>
                  ) : (
                    <>
                      <span>Publish Job Opening</span>
                      <i className="fa-solid fa-paper-plane text-sm"></i>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Sidebar: Live Preview */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Card Preview</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-bold">
                    Real-time
                  </span>
                </div>

                <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/70 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                      {job.company ? job.company.charAt(0).toUpperCase() : "C"}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">
                        {job.title || "Job Title Preview"}
                      </h4>
                      <p className="text-xs text-slate-500">
                        {job.company || "Company Name"} • {job.location || "Location"}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[11px] font-semibold">
                      {job.department || "Department"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 text-[11px] font-semibold">
                      {job.jobType || "Full-Time"}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-semibold">
                      {job.salary || "Salary"}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 pt-1">
                    {job.description || "Your job description summary will appear here as you type in the form."}
                  </p>
                </div>
              </div>

              {/* Quick Posting Tips */}
              <div className="bg-indigo-900 text-white rounded-2xl p-6 shadow-sm space-y-3">
                <h4 className="font-bold text-sm flex items-center space-x-2 text-indigo-200">
                  <i className="fa-solid fa-lightbulb text-amber-400"></i>
                  <span>Tips for Attracting Candidates</span>
                </h4>
                <ul className="text-xs text-indigo-200 space-y-2 leading-relaxed">
                  <li>• Include realistic compensation bands to increase application rates by 40%.</li>
                  <li>• Be concise in requirements to encourage diverse applicants.</li>
                  <li>• Provide clear contact details for candidate inquiries.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hrhome;