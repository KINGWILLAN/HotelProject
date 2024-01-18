export const errorFormat = (error) => {
  return {
    status: error?.response?.data?.status,
    message: error?.response?.data?.message || error.message,
  };
};
