import axiosClient from './axiosClient';

const eventApi = {
   addEvent: (data) => {
      const url = '/event/add';
      return axiosClient.post(url, data);
   },

   getAllEvent: (params) => {
      const url = '/event/getAll';
      return axiosClient.get(url, { params });
   },

   deleteEvent: (data) => {
      const url = '/event/delete';
      return axiosClient.delete(url, { data });
   },

   editEvent: (data) => {
      const url = '/event/edit';
      return axiosClient.put(url, data);
   },
};

export default eventApi;
