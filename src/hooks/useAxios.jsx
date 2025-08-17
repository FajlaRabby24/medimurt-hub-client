import axios from "axios";

const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_root_api,
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
