import axiosClient from './axiosClient';

const orderApi = {
   createOrder: (data) => {
      const url = '/orders/order/create';
      return axiosClient.post(url, data);
   },

   getAllUnpaidOrderItem: (params) => {
      const url = '/orders/orderItem/unpaid/all';
      return axiosClient.get(url, { params });
   },

   getOrderItem: (params) => {
      const url = '/orders/orderItem/detail';
      return axiosClient.get(url, { params });
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
