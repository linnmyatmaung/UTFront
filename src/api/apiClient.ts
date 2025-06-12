import axios from "axios";

export const base_api_url = "http://localhost:5000/api/";

const apiClient = axios.create({
  baseURL: base_api_url,
});

apiClient.interceptors.request.use(
  (config) => {
    // Check the endpoint to determine which token to use
    const isAdminRequest = window.location.href.includes("/admin");
    const tokenKey = isAdminRequest ? "admin_jwt" : "code_jwt";
    const token = localStorage.getItem(tokenKey);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401 || status === 403) {
        // Handle token removal for both code and admin
        localStorage.removeItem("code_jwt");
        // localStorage.removeItem("admin_jwt");

        if (status === 401) {
          console.warn("Unauthorized: Please log in again.");
        }

        if (status === 403) {
          console.error(
            "Access forbidden: You do not have permission to view this resource."
          );
        }

        // Redirect to login page
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
