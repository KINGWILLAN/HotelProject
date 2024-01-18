import axios from "../utils/axios";

export const authMutation = (userData) => {
  const route = userData.route ? `/${userData.route}` : "";
  delete userData.route;
  return axios.post("/users" + route, userData);
};

export const updateRegistrationMutation = (userData) => {
  const { token } = userData;
  delete userData.token;
  return axios.post("/users/registration", userData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};

export const serviceMutation = (serviceData) => {
  const { token } = serviceData;
  delete serviceData.token;
  return axios.post("/services", serviceData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
