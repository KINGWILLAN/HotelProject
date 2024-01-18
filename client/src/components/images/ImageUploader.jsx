/* eslint-disable react/prop-types */
// import { useState } from 'react';
import { Input } from "@material-tailwind/react";

export default function ImageUploader({ onUpload }) {
  const handleUpload = (e) => {
    const files = e.target.files;
    onUpload(files);
  };

  return <Input type="file" multiple onChange={handleUpload} />;
}
