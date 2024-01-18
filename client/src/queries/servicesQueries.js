import axios from "../utils/axios";

export const getServices = (data) => {
  const { query } = data.meta;
  return axios.get(`/services`, {
    params: {
      ...query,
    },
  });
};

export const getServiceQuery = (data) => {
  const { serviceId } = data.meta;
  return axios.get(`/services/${serviceId}`);
};
