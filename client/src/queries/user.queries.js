import axios from "../utils/axios";
export const logoutUser = (obj) => {
  const token = obj.queryKey[2];
  return axios.get("/users/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const verifyUser = (data) => {
  const { code, email } = data.meta;
  return axios.get(`/users/verify?code=${code}&email=${email}`);
};

export const resendCode = (data) => {
  const { email } = data.meta;
  return axios.get(`/users/resend-code?email=${email}`);
};
