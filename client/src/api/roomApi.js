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

   housekeeperManageRoom: (params) => {
      const url = '/rooms/room/housekeeper/manage';
      return axiosClient.get(url, { params });
   },

   housekeeperUpdateStatusRoom: (data) => {
      const url = '/rooms/room/housekeeper/update';
      return axiosClient.patch(url, data);
   },
};

export default roomApi;
