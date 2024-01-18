/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import GuestsFilterMenu from "./GuestsFilterMenu";
import { AppContext } from "../App";
import { Button, Typography } from "@material-tailwind/react";
import { Divider } from "antd";
import moment from "moment";
function ChargeDescription({ chargeText, chargePrice, underlined, heading }) {
  return (
    <div className="flex justify-between items-center font-lato pb-2">
      <Typography
        variant="paragraph"
        className={`text-gray-700 capitalize text-[18px] ${
          underlined && "underline"
        } ${heading && "font-bold text-gray-800"}`}
      >
        {chargeText}
      </Typography>
      <Typography
        variant="paragraph"
        className={`text-gray-500 text-[17px] text-right ${
          heading && "font-bold text-gray-800"
        }`}
      >
        ₦ {chargePrice}
      </Typography>
    </div>
  );
}
export default function ReservationCard({ price, startDate, endDate }) {
  const [guestPickerOpened, setGuestPickerOpened] = useState(false);
  const [toggleGuest, setToggleGuest] = useState(false);
  const { guests, setGuests } = useContext(AppContext);
  useEffect(() => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      adults: 1,
    }));
  }, [setGuests]);
  return (
    <div className="rounded-md flex flex-col bg-white shadow-md shadow-red-50 min-h-[100px] p-5 border-solid border border-red-50 md:px-14 md:py-14">
      <h1 className="font-bold font-lato text-[20px] py-2">
        ₦{price} <span className="font-light text-sm text-gray-500">night</span>
      </h1>
      {/* Checking */}
      <div className="grid grid-cols-2 w-full justify-between shadow-md">
        <div className="flex flex-col col-span-1 border border-solid border-gray-500 p-2 py-1 rounded-tl-md text-[18px]">
          Check in
          <input
            readOnly
            value={
              startDate
                ? moment(startDate).format("DD-MM-yyyy")
                : "Select a date"
            }
            className="checking-date"
          />
        </div>
        <div className="flex flex-col col-span-1 border border-l-none border-solid border-gray-500 p-2 py-1 rounded-tr-md text-[18px]">
          Check out
          <input
            readOnly
            value={
              endDate ? moment(endDate).format("DD-MM-yyyy") : "Select a Date"
            }
            className="checking-date"
          />
        </div>
        <div className="flex flex-col col-span-2 border-t-none border-b border-r border-l border-t-none border-solid border-gray-500 p-2 py-1 rounded-b-md text-[18px] relative">
          Guest
          <input
            readOnly
            value={`${guests["adults"] + guests["children"]} Guests, ${
              guests["infants"]
            } infants`}
            className="border-none outline-none text-[17px] text-gray-800 font-normal font-lato"
          />
          <div
            onClick={() => {
              setGuestPickerOpened(!guestPickerOpened);
            }}
            className="absolute right-5 bottom-1/2 translate-y-1/2 text-[25px] text-gray-700 cursor-pointer"
          >
            {guestPickerOpened ? (
              <FaChevronDown onClick={() => setToggleGuest(!toggleGuest)} />
            ) : (
              <FaChevronUp onClick={() => setToggleGuest(!toggleGuest)} />
            )}
            {toggleGuest && (
              <div className="w-[300px] shadow-md absolute z-40 bg-white right-0 top-12">
                <GuestsFilterMenu />
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        fullWidth
        className="bg-purple-700 accent-red-700 py-4 text-[18px] capitalize mx-auto mt-10"
      >
        Reserve
      </Button>
      <Typography type="paragraph" className="text-center text-gray-500 py-5">
        We won&apos;t charge you yet
      </Typography>
      <ChargeDescription
        underlined
        chargeText="price x 7 nights"
        chargePrice={15000}
      />
      <ChargeDescription chargeText="Weekly stay discount" chargePrice={1000} />
      <ChargeDescription
        underlined
        chargeText="cleaning fee"
        chargePrice={12000}
      />
      <ChargeDescription
        underlined
        chargeText="service fees"
        chargePrice={1000}
      />
      <Divider />
      <ChargeDescription
        heading
        chargeText="Total before deduction"
        chargePrice={15000}
      />
    </div>
  );
}
