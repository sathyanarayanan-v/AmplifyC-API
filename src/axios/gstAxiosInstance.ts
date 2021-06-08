import axios from 'axios';
const gstAxiosInstance = axios.create({ baseURL: process.env.GST_BASE_URL });

export default gstAxiosInstance;
