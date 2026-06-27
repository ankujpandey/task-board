import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest.url?.includes("/auth/logout")
    ) {
      try {
        await api.post("/auth/logout");
      } catch {}

      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);