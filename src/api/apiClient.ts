import axios from "axios";

export const base_api_url = "http://localhost:5000/api/";
export const base_img_url = "http://localhost:5000/uploads/";

const apiClient = axios.create({
  baseURL: base_api_url,
});

apiClient.interceptors.request.use(
  (config) => {
    const isAdminRequest = window.location.href.includes("/admin");
    const tokenKey = isAdminRequest ? "admin_jwt" : "code_jwt";
    const token = localStorage.getItem(tokenKey);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.data && !(config.data instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      const isAdminRoute = window.location.href.includes("/admin");

      if (status === 401 || status === 403) {
        if (isAdminRoute) {
          localStorage.removeItem("admin_jwt");
        } else {
          localStorage.removeItem("code_jwt");
        }

        if (status === 401) {
          console.warn("Unauthorized: Please log in again.");
        }

        if (status === 403) {
          console.error(
            "Access forbidden: You do not have permission to view this resource."
          );
        }

        window.location.href = isAdminRoute ? "/login/admin" : "/login/code";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
