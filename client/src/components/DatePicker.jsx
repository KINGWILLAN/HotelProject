/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";
import { DateRange, DateRangePicker } from "react-date-range";

export default function DatePicker({
  handleDateChange,
  selectionRange,
  setStartDate,
  setEndDate,
  startDate,
}) {
  return (
    <div className="font-lato">
      <h1 className="small-heading">Select check-in date</h1>
      <p className="small-paragraph">
        Add the number of days you wish to spend with us.
      </p>
      <div className="flex items-center">
        {/* very small Screens */}
        <div className="block xl:hidden">
          {
            <DateRange
              ranges={[selectionRange]}
              onChange={handleDateChange}
              rangeColors={startDate ? ["#FD5B51"] : ["#ccc"]}
              minDate={new Date()}
              months={1}
              direction="horizontal"
              retainEndDateOnFirstSelection={true}
              moveRangeOnFirstSelection={false}
            />
          }
        </div>
        {/* small Screens */}
        <div className="hidden xl:block 2xl:hidden">
          {
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleDateChange}
              rangeColors={startDate ? ["#FD5B51"] : ["#ccc"]}
              direction="horizontal"
              showDateDisplay={false}
              minDate={new Date()}
              retainEndDateOnFirstSelection={true}
              months={1}
              moveRangeOnFirstSelection={false}
            />
          }
        </div>
        {/* large screen */}
        <div className={`hidden 2xl:block 3xl:hidden`}>
          {
            <DateRange
              ranges={[selectionRange]}
              onChange={handleDateChange}
              rangeColors={startDate ? ["#FD5B51"] : ["#ccc"]}
              showDateDisplay={false}
              minDate={new Date()}
              months={2}
              direction="horizontal"
              retainEndDateOnFirstSelection={true}
              moveRangeOnFirstSelection={false}
            />
          }
        </div>
        {/* extralarge screen */}
        <div className={`hidden 3xl:block`}>
          {
            <DateRangePicker
              ranges={[selectionRange]}
              onChange={handleDateChange}
              rangeColors={startDate ? ["#FD5B51"] : ["#ccc"]}
              months={2}
              direction="horizontal"
              minDate={new Date()}
              retainEndDateOnFirstSelection={true}
              moveRangeOnFirstSelection={false}
            />
          }
        </div>
      </div>
      <Button
        className="bg-purple-700 text-white hover:scale-105 cursor-pointer"
        onClick={() => {
          setStartDate(null);
          setEndDate(null);
        }}
      >
        Clear Dates
      </Button>
    </div>
  );
}
