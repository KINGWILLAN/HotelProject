/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

export default function StarIcon({ rating }) {
  return (
    <div className="flex h-full items-center">
      <FaStar />
      <span className="text-gray-500 font-normal text-lg">{rating}</span>
    </div>
  );
}
