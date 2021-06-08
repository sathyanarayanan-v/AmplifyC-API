import axios from 'axios';

const mcaAxiosInstance = axios.create({
  baseURL: process.env.MCA_BASE_URL,
});

mcaAxiosInstance.interceptors.response.use((res) => res.data);

export default mcaAxiosInstance;
