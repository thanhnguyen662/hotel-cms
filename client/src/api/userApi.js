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

   resetPassword: (data) => {
      const url = '/users/reset';
      return axiosClient.patch(url, data);
   },

   editProfile: (data) => {
      const url = '/users/profile/edit';
      return axiosClient.patch(url, data);
   },

   my: () => {
      const url = '/users/profile/my';
      return axiosClient.get(url);
   },

   userProfile: (params) => {
      const url = '/users/profile/user';
      return axiosClient.get(url, { params });
   },

   manageAllUser: (params) => {
      const url = '/users/manage/all';
      return axiosClient.get(url, { params });
   },
};

export default userApi;
