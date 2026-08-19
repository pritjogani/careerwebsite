import { Link } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useState, useMemo } from "react";
import { Footer } from "../components/Footer";

export const Jobs = () => {
  const { jobs } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  // Extract unique departments & types
  const departments = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    const depts = new Set(jobs.map((j) => j.department).filter(Boolean));
    return ["All", ...Array.from(depts)];
  }, [jobs]);

  const jobTypes = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    const types = new Set(jobs.map((j) => j.jobType).filter(Boolean));
    return ["All", ...Array.from(types)];
  }, [jobs]);

  // Filtered jobs
  const filteredJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return [];
    return jobs.filter((job) => {
      const matchSearch =
        searchTerm === "" ||
        job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = selectedType === "All" || job.jobType === selectedType;
      const matchDept = selectedDepartment === "All" || job.department === selectedDepartment;

      return matchSearch && matchType && matchDept;
    });
  }, [jobs, searchTerm, selectedType, selectedDepartment]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30">
            <i className="fa-solid fa-briefcase text-xs"></i>
            <span>Explore {jobs?.length || 0} Open Opportunities</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Find Your Next Career Move
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Discover roles across top engineering, management, design, and operations teams with verified employers.
          </p>

          {/* Search & Filter Bar */}
          <div className="max-w-4xl mx-auto pt-6">
            <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col md:flex-row gap-3 items-center">
              {/* Search input */}
              <div className="relative flex-1 w-full">
                <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Job title, keywords, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-slate-800 placeholder-slate-400 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Department filter */}
              <div className="w-full md:w-48">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-slate-700 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
                >
                  <option value="All">All Departments</option>
                  {departments
                    .filter((d) => d !== "All")
                    .map((dept, i) => (
                      <option key={i} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>

              {/* Job type filter */}
              <div className="w-full md:w-44">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl text-slate-700 bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm cursor-pointer"
                >
                  <option value="All">All Job Types</option>
                  {jobTypes
                    .filter((t) => t !== "All")
                    .map((type, i) => (
                      <option key={i} value={type}>
                        {type}
                      </option>
                    ))}
                </select>
              </div>

              {/* Reset button */}
              {(searchTerm || selectedType !== "All" || selectedDepartment !== "All") && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedType("All");
                    setSelectedDepartment("All");
                  }}
                  className="w-full md:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50 transition"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Jobs Listing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Available Positions{" "}
              <span className="text-sm font-normal text-slate-500">
                ({filteredJobs.length} {filteredJobs.length === 1 ? "job" : "jobs"} found)
              </span>
            </h2>
          </div>
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-2xl mx-auto mb-4">
              <i className="fa-solid fa-folder-open"></i>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No Openings Found</h3>
            <p className="text-sm text-slate-500 mb-6">
              We couldn't find any job postings matching your current filter criteria.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedType("All");
                setSelectedDepartment("All");
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => {
              const {
                _id,
                title,
                description,
                department,
                location,
                salary,
                jobType,
                Dateofjoin,
                requirements,
                responsibilities,
                company,
                contactEmail,
                conatactEmail,
                contactPhone,
                contactphone,
                status,
              } = job;

              const email = contactEmail || conatactEmail;
              const phone = contactPhone || contactphone;

              return (
                <div
                  key={_id || Math.random()}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Company & Status */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-lg font-bold shadow-md shadow-blue-500/20">
                          {company ? company.charAt(0).toUpperCase() : "C"}
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-base leading-snug">{company || "Confidential"}</h3>
                          <span className="text-xs text-slate-500 flex items-center mt-0.5">
                            <i className="fa-solid fa-location-dot text-blue-500 mr-1.5 text-xs"></i>
                            {location || "Remote"}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          status === "Closed"
                            ? "bg-slate-100 text-slate-600"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                        }`}
                      >
                        {status || "Open"}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h2 className="text-lg font-extrabold text-slate-900 mb-2 leading-tight hover:text-blue-600 transition-colors">
                      {title}
                    </h2>

                    {/* Description preview */}
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                      {description || "No description provided."}
                    </p>

                    {/* Key Attributes Pills */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {department && (
                        <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold flex items-center">
                          <i className="fa-solid fa-layer-group mr-1.5 text-[10px]"></i>
                          {department}
                        </span>
                      )}
                      {jobType && (
                        <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-xs font-semibold flex items-center">
                          <i className="fa-solid fa-clock mr-1.5 text-[10px]"></i>
                          {jobType}
                        </span>
                      )}
                      {salary && (
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold flex items-center">
                          <i className="fa-solid fa-wallet mr-1.5 text-[10px]"></i>
                          {salary}
                        </span>
                      )}
                      {Dateofjoin && (
                        <span className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-xs font-semibold flex items-center">
                          <i className="fa-solid fa-calendar-check mr-1.5 text-[10px]"></i>
                          Starts: {Dateofjoin}
                        </span>
                      )}
                    </div>

                    {/* Requirements or Responsibilities snippet */}
                    {(requirements?.length > 0 || responsibilities?.length > 0) && (
                      <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl mb-4 space-y-1">
                        {requirements && (
                          <p className="line-clamp-1">
                            <strong className="text-slate-700">Req:</strong>{" "}
                            {Array.isArray(requirements) ? requirements.join(", ") : requirements}
                          </p>
                        )}
                        {responsibilities && (
                          <p className="line-clamp-1">
                            <strong className="text-slate-700">Resp:</strong>{" "}
                            {Array.isArray(responsibilities) ? responsibilities.join(", ") : responsibilities}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Contact Info (if available) */}
                    {(email || phone) && (
                      <div className="pt-2 pb-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        {email && (
                          <span className="flex items-center truncate max-w-[180px]">
                            <i className="fa-solid fa-envelope mr-1 text-slate-400"></i>
                            {email}
                          </span>
                        )}
                        {phone && (
                          <span className="flex items-center">
                            <i className="fa-solid fa-phone mr-1 text-slate-400"></i>
                            {phone}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Apply Button */}
                  <div className="pt-4 mt-2">
                    <Link
                      to="/applyforjobs"
                      state={{ jobTitle: title, company: company }}
                      className="w-full block text-center py-2.5 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/20 hover:shadow-blue-500/30 transition-all duration-200"
                    >
                      Apply Now <i className="fa-solid fa-arrow-right ml-1.5 text-xs"></i>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Jobs;