import axios from "./axios";

export const getPresignedUrl = async (fileType, token) => {
  // Replace 'your-server-endpoint' with your server's endpoint that generates presigned URLs
  const response = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/uploads`,
    { fileType },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const uploadToS3 = async (presignedUrl, file, cb) => {
  const options = {
    headers: {
      "Content-Type": file.type,
    },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) / progressEvent.total
      );
      // console.log(`Upload Progress: ${percentCompleted}%`);
      cb(percentCompleted);
    },
  };

  await axios.put(presignedUrl, file, options);
};
