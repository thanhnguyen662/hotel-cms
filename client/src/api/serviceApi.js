import axiosClient from './axiosClient';

const serviceApi = {
   addService: (data) => {
      const url = '/service/add';
      return axiosClient.post(url, data);
   },

   getAllService: (params) => {
      const url = '/service/getAll';
      return axiosClient.get(url, { params });
   },

   deleteService: (data) => {
      const url = '/service/delete';
      return axiosClient.delete(url, { data });
   },

   editService: (data) => {
      const url = '/service/edit';
      return axiosClient.patch(url, data);
   },
};

export default serviceApi;
