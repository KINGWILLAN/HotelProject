/* eslint-disable react/prop-types */
import { MdHouseSiding, MdOutlineLocationOn } from "react-icons/md";
import { FaFire } from "react-icons/fa";
import { IoCarSportOutline } from "react-icons/io5";
import { useState } from "react";

const filters = [
  {
    id: "nearby",
    Icon: MdOutlineLocationOn,
    title: "Nearby",
  },
  {
    id: "trending",
    Icon: FaFire,
    title: "Trending",
  },
  {
    id: "hotels",
    Icon: MdHouseSiding,
    title: "Hotels",
  },
  {
    id: "cars",
    Icon: IoCarSportOutline,
    title: "Cars",
  },
];

function SubFilter({ id, Icon, title, handleClick, active }) {
  return (
    <div
      className={`flex items-center justify-center gap-1 flex-col  cursor-pointer h-full hover:scale-105 ${
        active === id
          ? "text-purple-500 hover:text-gray-500 border-solid border-b-2  border-b-red-500"
          : "text-gray-500 hover:text-purple-500"
      }`}
      onClick={handleClick}
    >
      <Icon className={`text-[20px]`} />
      <h4>{title}</h4>
    </div>
  );
}

export default function SubFilters() {
  const [active, setActive] = useState("nearby");

  return (
    <div className="flex gap-8 justify-start items-center overflow-x-scroll scrollbar-hide h-[85px]">
      {filters.map(({ id, Icon, title }) => (
        <SubFilter
          key={id}
          id={id}
          Icon={Icon}
          title={title}
          active={active}
          handleClick={() => setActive(id)}
        />
      ))}
    </div>
  );
}
