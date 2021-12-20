import axiosClient from './axiosClient';

const roomApi = {
   getRooms: (params) => {
      const url = '/rooms';
      return axiosClient.get(url, { params });
   },

   getRoomById: (params) => {
      const url = '/rooms/room';
      return axiosClient.get(url, { params });
   },

   createRoom: (data) => {
      const url = '/rooms/room/create';
      return axiosClient.post(url, data);
   },
};

export default roomApi;
