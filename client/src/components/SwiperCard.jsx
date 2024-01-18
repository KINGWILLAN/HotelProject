/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Carousel } from "@material-tailwind/react";

export default function SwiperCard({ images }) {
  return (
    <Carousel className="rounded-xl">
      {images.map((image, index) => (
        <img
          key={image + index}
          src={
            image.includes("http")
              ? image
              : `${import.meta.env.VITE_S3_IMAGE_URL + image}`
          }
          loading="lazy"
          alt="test Image"
          className="rounded-md object-cover shadow-md w-full h-full"
        />
      ))}
    </Carousel>
  );
}
