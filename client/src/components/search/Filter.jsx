/* eslint-disable react/prop-types */
import { useContext } from "react";
import moment from "moment";
import { AppContext } from "../../App";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";

export default function Filter({
  placeholder,
  label,
  value,
  handleChange,
  width,
  title,
  current,
  setCurrent,
  readOnly,
}) {
  const { setToggleDate, setToggleGuest } = useContext(AppContext);
  //   Values to be displayed in the filter box
  let display;
  if (label === "checkIn" || label === "checkOut") {
    display = value ? moment(value).format("DD-MM-yyyy") : "";
  } else if (label === "guest") {
    if (value.adults || value.children || value.infants) {
      display = "";
      for (let obj in value) {
        if (value[obj]) {
          display += `${obj.substring(0, 2)}:${value[obj]}`;
        }
      }
    } else {
      display = "";
    }
  } else {
    display = value;
  }

  //   When one of the search field is clicked.
  function handleFilterClick() {
    setCurrent(label);
    if (label === "checkIn" || label === "checkOut") {
      setToggleDate(true);
      setToggleGuest(false);
    } else if (label === "guest") {
      setToggleGuest(true);
      setToggleDate(false);
    }
  }

  return (
    <div
      className={`${
        !current
          ? "hover:bg-purple-500 hover:text-white"
          : current === label
          ? "bg-white text-purple-500"
          : "bg-transparent hover:bg-purple-500 hover:cursor-pointer"
      } shadow-sm rounded-full w-[${width}] pl-5 pt-3 relative font-roboto`}
      onClick={handleFilterClick}
    >
      <p className={`text-[14px] leading-3`}>{title}</p>
      <input
        placeholder={placeholder}
        value={display}
        readOnly={readOnly}
        onChange={(ev) => handleChange(ev.target.value)}
        className={`${
          !current
            ? "hover:placeholder-white placeholder-gray-700 text-gray-700 hover:text-white"
            : current === label
            ? "text-gray-700 placeholder:text-gray-700"
            : "bg-none hover:bg-purple-500 hover:cursor-pointer"
        } bg-transparent outline-none border-none py-2 w-full pr-4  ${
          label === "guest" && "text-xs"
        }`}
      />
      {/*  */}
      {!!value && (
        <CloseOutlined
          className="text-xs text-gray-400 hover:bg-gray-100 w-5 h-5 my-auto rounded-full  flex items-center justify-center  absolute right-5 top-0 bottom-0 cursor-pointer"
          onClick={() => handleChange("")}
        />
      )}
      {label === "guest" && (
        <div className="w-10 h-10 rounded-full p-3 bg-purple-500 absolute top-3 hover:bg-white bottom-0 right-3 flex items-center justify-center">
          <SearchOutlined className="text-white text-xl hover:text-purple-500 flex items-center" />
        </div>
      )}
    </div>
  );
}
