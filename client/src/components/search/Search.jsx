/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AppContext } from "../../App";
import Filter from "./Filter";
import GuestsFilterMenu from "../GuestsFilterMenu";
import BaseDatePicker from "../BaseDatePicker";
import useScreenSize from "../../hooks/useScreenSize";

function Boundary({ current }) {
  return (
    <div
      className={`w-0 h-5 border-r-2 ${
        current ? "border-red-200" : "border-red-300"
      } mx-[2px] my-auto`}
    />
  );
}
export default function Search() {
  const [search, setSearch] = useState("");
  const { current, setCurrent, toggleDate, toggleGuest, guests } =
    useContext(AppContext);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const { isTabletScreen } = useScreenSize();

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  function handleDateChange(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }
  return (
    <div className="flex justify-center items-center font-roboto flex-col gap-5 relative">
      <div
        className={`flex ${
          current ? "bg-purple-600" : "bg-white text-gray-900"
        } rounded-full p-[1px] shadow-lg`}
      >
        {/* Search Input */}
        <Filter
          placeholder="Search destination"
          label="search"
          value={search}
          handleChange={setSearch}
          width={"200px"}
          title={"Where"}
          current={current}
          setCurrent={setCurrent}
        />
        <Boundary current={current} />
        {/* Check in */}
        <Filter
          placeholder="Add dates"
          label="checkIn"
          value={startDate}
          handleChange={setStartDate}
          width={"300px"}
          title={"Check in"}
          current={current}
          setCurrent={setCurrent}
          readOnly={true}
        />
        <Boundary current={current} />
        {/* Check in */}
        <Filter
          placeholder="Add dates"
          label="checkOut"
          value={endDate}
          handleChange={setEndDate}
          width={"150px"}
          title={"Check in"}
          current={current}
          setCurrent={setCurrent}
          readOnly={true}
        />
        <Boundary current={current} />
        {/* Guest */}
        <Filter
          placeholder="Guests"
          label="guest"
          value={guests}
          handleChange={toggleGuest}
          width={"370px"}
          title={"Who"}
          readOnly
          current={current}
          setCurrent={setCurrent}
        />
        {toggleGuest && (
          <div className="w-[300px] shadow-md absolute z-40 bg-white right-0 sm:right-52 lg:right-52  top-20">
            {/* {guestData.map((datum) => (
              <MenuItem key={datum.guestGroup} {...datum} />
            ))} */}
            <GuestsFilterMenu />
          </div>
        )}
        <div className="absolute top-20 left-0 right-0 flex items-center justify-center">
          {toggleDate && (
            <BaseDatePicker
              selectionRange={selectionRange}
              handleDateChange={handleDateChange}
              isTabletScreen={isTabletScreen}
              startDate={startDate}
            />
          )}
        </div>
      </div>
    </div>
  );
}
