/* eslint-disable react/prop-types */
import { useEffect } from "react";
import ImageUploader from "./ImageUploader";
import { convertToWebP } from "../../utils/convertToWebP";

export default function ImagesUpload({ webpImages, setWebpImages }) {
  const handleUpload = async (files) => {
    const webpArray = [];
    for (const file of files) {
      const webpImage = await convertToWebP(file);
      webpArray.push(webpImage);
    }
    setWebpImages(webpArray);
  };

  useEffect(() => {
    // Now you can upload webpImages to Amazon S3 or perform other actions.
    console.log("WebP images:", webpImages);
  }, [webpImages]);

  return (
    <div>
      <h1>Image Uploader</h1>
      <ImageUploader onUpload={handleUpload} />
    </div>
  );
}
