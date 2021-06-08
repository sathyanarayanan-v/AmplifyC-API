import axios from 'axios';
const itrAxiosInstance = axios.create({ baseURL: process.env.ITR_BASE_URL });
export default itrAxiosInstance;
