import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL: "https://shanto-mart-server.vercel.app",
});

const useAxiosSecure = () => {
  useEffect(() => {
    axiosSecure.interceptors.request.use((req) => {
      const token = localStorage.getItem("ShantoMartAuthToken");
      if (token) {
        req.headers.Authorization = `Bearer ${token}`;
      }
      return req;
    });

    axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        return Promise.reject(error);
      }
    );
  }, []);
  return { axiosSecure };
};

export default useAxiosSecure;
