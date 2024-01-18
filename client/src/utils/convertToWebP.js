import { convert } from "image-conversion";

export const convertToWebP = async (file) => {
  const result = await convert({
    data: file,
    format: "webp",
  });
  return result.data;
};
