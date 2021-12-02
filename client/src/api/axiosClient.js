import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
   withCredentials: true,
   baseURL: 'http://localhost:9000/api/',
   headers: {
      'content-type': 'application/json',
   },
   paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
   return config;
});

axiosClient.interceptors.response.use((response) => {
   if (response && response.data) {
      return response.data;
   }

   return response;
});

export default axiosClient;
