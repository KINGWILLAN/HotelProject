/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function HorizontalScroll({
  title,
  description,
  children,
  top,
}) {
  const horizontalScrollRef = useRef(null);

  //   Add scroll to carousel
  const handleScrollClick = (direction) => {
    const container = horizontalScrollRef.current;
    const scrollAmount = 100;
    container.scrollBy({
      left: direction === "left" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };
  return (
    <div className="relative">
      <h1 className="small-heading">{title}</h1>
      {description && <p className="small-paragraph">{description}</p>}
      <div
        className={`flex justify-between items-center bg-none absolute left-0 right-0 ${
          top ? top : "top-1/2"
        } z-20`}
      >
        <button onClick={() => handleScrollClick("right")} className="btn-icon">
          <FaChevronLeft />
        </button>
        <button onClick={() => handleScrollClick("left")} className="btn-icon">
          <FaChevronRight />
        </button>
      </div>
      <div
        ref={horizontalScrollRef}
        className="flex overflow-x-scroll pb-5 mt-5 scrollbar-hide transition-all duration-100 ease-in-out"
      >
        <div className="flex flex-nowrap gap-3">{children}</div>
      </div>
    </div>
  );
}
