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

   oderService: (data) => {
      const url = `/service/oder/${data.orderId}`;
      return axiosClient.post(url, data);
   },

   deleteOrderService: (params) => {
      const url = `/service/deleteService`;
      return axiosClient.delete(url, { params });
   },

   editOrderService: (data) => {
      const url = `/service/editOrderService`;
      return axiosClient.patch(url, data);
   },
};

export default serviceApi;
