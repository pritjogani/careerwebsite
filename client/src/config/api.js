// Centralized API Base URL configuration for Local & Production Deployment
export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const API_ENDPOINTS = {
  AUTH: `${API_BASE_URL}/api/auth`,
  HR: `${API_BASE_URL}/api/hr`,
  JOB: `${API_BASE_URL}/api/job`,
};
