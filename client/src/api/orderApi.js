import axiosClient from './axiosClient';

const orderApi = {
   createOrder: (data) => {
      const url = '/orders/order/create';
      return axiosClient.post(url, data);
   },

   getOrders: (params) => {
      const url = '/orders';
      return axiosClient.get(url, { params });
   },

   getOrderById: (params) => {
      const url = '/orders/order';
      return axiosClient.get(url, { params });
   },
};

export default orderApi;
