import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.TASK_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    return Promise.reject(err);
  },
);

export default axiosInstance;
