import { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { Footer } from "../components/Footer";
import { API_BASE_URL } from "../config/api";

export const UserProfile = () => {
  const { user, authorizationtoken, userAuthentication, isHR } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    city: "",
    age: "",
    collage: "",
    cgpa: "",
    companyname: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        email: user.email || "",
        phone: user.phone || "",
        city: user.city || "",
        age: user.age || "",
        collage: user.collage || user.college || "",
        cgpa: user.cgpa || "",
        companyname: user.companyname || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/user/update`, {
        method: "PATCH",
        headers: {
          Authorization: authorizationtoken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Profile updated successfully!");
        setIsEditing(false);
        userAuthentication(); // Refresh user data in AuthContext
      } else {
        toast.error(data.message || "Failed to update profile");
      }
    } catch (error) {
      toast.error("Network error while updating profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const getInitial = () => {
    if (formData.username) return formData.username.charAt(0).toUpperCase();
    if (formData.email) return formData.email.charAt(0).toUpperCase();
    return "U";
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Header Banner */}
      <section className="bg-gradient-to-b from-blue-900 via-slate-900 to-slate-900 text-white py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          {/* Circular Avatar Badge */}
          <div className="relative inline-block">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-600 p-1 shadow-2xl mx-auto">
              <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-3xl sm:text-4xl font-extrabold text-white border-2 border-slate-800">
                {getInitial()}
              </div>
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 shadow-md"></span>
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {formData.username || "User Account"}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm">{formData.email}</p>
            <div className="pt-2">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${isHR
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-400/30"
                    : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
                  }`}
              >
                <i className={`fa-solid ${isHR ? "fa-user-tie" : "fa-user-graduate"} text-xs mr-1.5`}></i>
                {isHR ? "Employer / HR Account" : "Candidate / Job Seeker"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Profile & Edit Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full -mt-6">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-8">
          {/* Card Header & Edit Toggle */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Account Details</h2>
              <p className="text-xs text-slate-500">
                {isEditing ? "Modify your profile information below" : "Your current saved account details"}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center space-x-1.5 transition-all ${isEditing
                  ? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                }`}
            >
              <i className={`fa-solid ${isEditing ? "fa-xmark" : "fa-pen-to-square"}`}></i>
              <span>{isEditing ? "Cancel Edit" : "Edit Information"}</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Username */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name / Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${isEditing
                      ? "border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                      : "border-slate-200 bg-slate-50/80 text-slate-700"
                    }`}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${isEditing
                      ? "border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                      : "border-slate-200 bg-slate-50/80 text-slate-700"
                    }`}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${isEditing
                      ? "border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                      : "border-slate-200 bg-slate-50/80 text-slate-700"
                    }`}
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  City / Location
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${isEditing
                      ? "border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                      : "border-slate-200 bg-slate-50/80 text-slate-700"
                    }`}
                />
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${isEditing
                      ? "border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                      : "border-slate-200 bg-slate-50/80 text-slate-700"
                    }`}
                />
              </div>

              {/* Role-specific fields */}
              {isHR ? (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyname"
                    value={formData.companyname}
                    onChange={handleChange}
                    disabled={!isEditing}
                    required
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${isEditing
                        ? "border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                        : "border-slate-200 bg-slate-50/80 text-slate-700"
                      }`}
                  />
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      College / University
                    </label>
                    <input
                      type="text"
                      name="collage"
                      value={formData.collage}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${isEditing
                          ? "border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                          : "border-slate-200 bg-slate-50/80 text-slate-700"
                        }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                      CGPA / Grade
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="cgpa"
                      value={formData.cgpa}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      className={`w-full px-4 py-2.5 rounded-xl border text-sm transition-all ${isEditing
                          ? "border-slate-300 focus:ring-2 focus:ring-blue-500 bg-white"
                          : "border-slate-200 bg-slate-50/80 text-slate-700"
                        }`}
                    />
                  </div>
                </>
              )}
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 transition-all flex items-center space-x-2"
                >
                  {isSaving ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-floppy-disk text-xs"></i>
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;
