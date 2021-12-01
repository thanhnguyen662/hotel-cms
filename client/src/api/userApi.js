import axiosClient from './axiosClient';

const userApi = {
  getAllPins: () => {
    const url = '/user/get/all';
    return axiosClient.get(url);
  },
};

export default userApi;
