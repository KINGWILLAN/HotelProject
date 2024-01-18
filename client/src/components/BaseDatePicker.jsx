/* eslint-disable react/prop-types */
import { DateRange, DateRangePicker } from "react-date-range";
// import useScreenSize from "../hooks/useScreenSize";

export default function BaseDatePicker({
  selectionRange,
  handleDateChange,
  isTabletScreen,
  startDate,
}) {
  return (
    <>
      {isTabletScreen ? (
        <DateRange
          ranges={[selectionRange]}
          onChange={handleDateChange}
          rangeColors={startDate ? ["#FD5B51"] : ["#ccc"]}
          minDate={new Date()}
          months={isTabletScreen ? 2 : 1}
          direction="horizontal"
          retainEndDateOnFirstSelection={true}
          moveRangeOnFirstSelection={false}
        />
      ) : (
        <DateRangePicker
          ranges={[selectionRange]}
          onChange={handleDateChange}
          rangeColors={startDate ? ["#FD5B51"] : ["#ccc"]}
          direction="horizontal"
          showDateDisplay={false}
          minDate={new Date()}
          retainEndDateOnFirstSelection={true}
          months={!isTabletScreen ? 2 : 1}
          moveRangeOnFirstSelection={false}
        />
      )}
    </>
  );
}
