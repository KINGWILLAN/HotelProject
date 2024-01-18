/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa6";
import { MdLogin } from "react-icons/md";
import { useContext, useState } from "react";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import SwiperCard from "./SwiperCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import { AppContext } from "../App";

export default function MediumCard({
  serviceLocation,
  servicePrice,
  serviceRating,
  serviceImages,
  _id,
}) {
  const { handleOpenAuthModal } = useContext(AppContext);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { city, state } = serviceLocation;

  function goToServicePage() {
    navigate(`/services/${_id}`);
  }

  function handleLikes() {
    if (!user) {
      // open authModal
      handleOpenAuthModal();
      return;
    }
    setLiked((cur) => !cur);
  }
  return (
    <div className="flex flex-col max-w-[6=1000px] md:max-w-[500px] xl:max-w-[600px] font-roboto shadow-md shadow-red-50">
      <div className="bg-purple-50 rounded-md relative w-full flex flex-grow h-[300px]  md:h-[300px]">
        <SwiperCard images={serviceImages} />
        <div className="absolute top-3 right-3 left-5 flex items-center justify-between ">
          <div
            className="bg-gray-50 rounded-full px-5 py-2 text-sm text-purple-500 font-bold flex items-center gap-2 cursor-pointer"
            onClick={goToServicePage}
          >
            Book
            <MdLogin className="text-20px" />
          </div>
          <div
            className="w-10 h-10 p-2 bg-purple-50 rounded-full flex items-center hover:scale-105"
            onClick={handleLikes}
          >
            {liked ? (
              <MdFavorite className="text-purple-500 text-[30px] cursor-pointer" />
            ) : (
              <MdFavoriteBorder className="text-purple-500 outline-red-50 stroke-red-50 text-[30px] cursor-pointer" />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center px-2">
        <h3 className="font-bold text-lg md:text-md">
          {city} - {state}
        </h3>
        {serviceRating && (
          <div className="flex h-full justify-end items-center py-2">
            <FaStar />
            <span className="text-gray-500 font-light">{serviceRating}</span>
          </div>
        )}
      </div>
      <p className="text-gray-500 px-2 leading-5">xxx kilometers away</p>
      <p className="text-gray-500 px-2  leading-5">jun 16 - 21</p>
      <p className="text-gray-500 px-2 py-2 font-thin">
        <strong className="text-gray-900 font-bold">₦ {servicePrice}</strong>{" "}
        night
      </p>
    </div>
  );
}
