/* eslint-disable react/prop-types */

export default function ImagePreview({ src, id }) {
  return (
    <div>
      <img
        className={"h-96 w-full object-cover object-center rounded-lg"}
        src={src}
        alt={id}
        loading="lazy"
      />
    </div>
  );
}
