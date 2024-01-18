import Axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const axios = Axios.create({
  baseURL,
  withCredentials: true,
});
export default axios;
