import axiosClient from './axiosClient';

const orderApi = {
   createOrder: (data) => {
      const url = '/orders/order/create';
      return axiosClient.post(url, data);
   },
};

export default orderApi;
