import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.TASK_BASE_URL,
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err);
    return err;
  },
);

export default axiosInstance;
