import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_root_api,
});

const useAxios = () => {
  return axiosSecure;
};

export default useAxios;
