import axiosClient from './axiosClient';

const userApi = {
   register: (data) => {
      const url = '/users/register';
      return axiosClient.post(url, data);
   },

   login: (data) => {
      const url = '/users/login';
      return axiosClient.post(url, data);
   },

   logout: () => {
      const url = '/users/logout';
      return axiosClient.post(url);
   },

   my: () => {
      const url = '/users/my';
      return axiosClient.get(url);
   },
};

export default userApi;
