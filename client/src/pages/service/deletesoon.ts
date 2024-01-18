// ImageCompression.js

// ... (previous code)

const ImageCompression = ({ onUpload }) => {
  const fileRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const files = e.target.files;

    const compressedImages = [];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      for (const file of files) {
        const compressedFile = await imageCompression(file, options);

        // Upload the compressed file to S3
        const presignedUrl = await getPresignedUrl(file.name);
        await uploadToS3(presignedUrl, compressedFile);

        setFiles((prev) => [...prev, file]);
        compressedImages.push(compressedFile);
      }

      onUpload(compressedImages);
    } catch (error) {
      console.error("Error uploading files to S3:", error);
    }
  };

  // ... (rest of the code)
};

export default ImageCompression;
