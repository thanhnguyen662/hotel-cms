import axiosClient from './axiosClient';

const restaurantApi = {
   addFood: (data) => {
      const url = '/restaurant/addFood';
      return axiosClient.post(url, data);
   },

   getAllFood: (params) => {
      const url = '/restaurant/getAll';
      return axiosClient.get(url, { params });
   },

   deleteFood: (data) => {
      const url = '/restaurant/delete';
      return axiosClient.delete(url, data);
   },

   edit: (data) => {
      const url = '/restaurant/edit';
      return axiosClient.patch(url, data);
   },
};

export default restaurantApi;
