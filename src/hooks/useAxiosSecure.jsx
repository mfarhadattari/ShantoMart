import axios from "axios";
import { useEffect } from "react";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosSecure = () => {
  useEffect(() => {
    const token = localStorage.getItem("ShantoMartAuthToken");
    if (token) {
      axiosSecure.interceptors.request.use((req) => {
        req.headers.Authorization = `Bearer ${token}`;
        return req;
      });
    }

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
