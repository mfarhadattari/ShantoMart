import axios from "axios";

// !Create a instance for axios req
const axiosPublic = axios.create({
  baseURL: "http://localhost:3000",
});

const useAxiosPublic = () => {
  return {
    axiosPublic,
  };
};

export default useAxiosPublic;
