/* eslint-disable react/prop-types */
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaKitchenSet, FaWarehouse } from "react-icons/fa6";

const environs = [
  {
    id: 1,
    label: "Kitchen",
    image:
      "https://a0.muscache.com/im/pictures/miso/Hosting-608856406800073903/original/813f2279-e2ec-459c-b64f-f6da835eca12.jpeg?im_w=960",
  },
  {
    id: 2,
    label: "Swimming Pool",
    image:
      "https://a0.muscache.com/im/pictures/e17c7207-25e4-4824-a03b-d2b66847ebed.jpg?im_w=960",
  },
  {
    id: 3,
    label: "Reception",
    image:
      "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

function Environ({ label, image }) {
  return (
    <div className="w-[300px] md:w-[350px] rounded-md border border-gray-200 p-5 flex flex-col gap-4">
      <div className="flex gap-3">
        <FaKitchenSet className="text-[33px] text-gray-800" />
        <FaWarehouse className="text-[33px] text-gray-800" />
      </div>
      <h1 className="smaller-heading">{label}</h1>
      <img
        src={image}
        alt={label}
        loading="lazy"
        className="w-full object-cover h-[200px] rounded-md shadow-md hover:scale-105"
      />
    </div>
  );
}
export default function Environs() {
  const environsRef = useRef(null);

  //   Add scroll to carousel
  const handleScrollClick = (direction) => {
    const container = environsRef.current;
    const scrollAmount = 100;
    container.scrollBy({
      left: direction === "left" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative">
      <h1 className="small-heading">Environs</h1>
      <div className="flex justify-between items-center bg-none absolute left-0 right-0 top-1/2 z-20">
        <button onClick={() => handleScrollClick("right")} className="btn-icon">
          <FaChevronLeft />
        </button>
        <button onClick={() => handleScrollClick("left")} className="btn-icon">
          <FaChevronRight />
        </button>
      </div>
      <div
        ref={environsRef}
        className="flex overflow-x-scroll pb-5 mt-5 scrollbar-hide transition-all duration-100 ease-in-out"
      >
        <div className="flex flex-nowrap gap-3">
          {environs.map((environ) => (
            <Environ
              key={environ.id}
              label={environ.label}
              image={environ.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
