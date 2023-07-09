import axios from "axios";

// !Create a instance for axios req
const axiosPublic = axios.create({
  baseURL: "https://shanto-mart-server.vercel.app",
});

const useAxiosPublic = () => {
  return {
    axiosPublic,
  };
};

export default useAxiosPublic;
