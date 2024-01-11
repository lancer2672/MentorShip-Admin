import axiosClient from '../config/axios-client';

const mentorApi = {
  getAllMentors: async () => {
    try {
      const url = '/api/mentor/get';
      const res = await axiosClient.get(url);
      console.log('mentor res data', res.data.data);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  createMentor: async (mentor) => {
    try {
      const url = '/api/mentor/create';
      const res = await axiosClient.post(url, mentor);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  searchMentor: async (name = '', skillIds = []) => {
    try {
      let url = '/api/mentor/search';
      if (name) url += `?name=${name}`;
      if (skillIds.length > 0)
        url += `${name ? '&' : '?'}skillIds=${skillIds.join(',')}`;
      const res = await axiosClient.get(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  updateLockStatus: async (mentorId) => {
    try {
      const url = `/api/mentor/updateLockStatus/${mentorId}`;
      const res = await axiosClient.put(url);
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default mentorApi;
