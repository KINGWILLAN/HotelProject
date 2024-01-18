import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

/* eslint-disable react/prop-types */
export default function MenuItem({
  id,
  guestGroup,
  description,
  borderBottom,
}) {
  const { guests, setGuests } = useContext(AppContext);
  const [counter, setCounter] = useState(guests[id]);
  const { setToggleGuest } = useContext(AppContext);
  useEffect(() => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      [id]: counter,
    }));
  }, [counter, id, setGuests]);
  function increment() {
    setCounter((prevCount) => prevCount + 1);
  }
  function decrement() {
    setCounter((prevCount) => prevCount - 1);
  }
  function Icon({ label, handleClick, disabled }) {
    return (
      <button
        className="hover:scale-105 w-8 h-8 rounded-full bg-gray-100 p-1 hover:border-black text-gray-500 border-solid border-gray-500 flex items-center justify-center"
        onClick={handleClick}
        disabled={disabled}
      >
        <p className="text-xl text-bold font-roboto">{label}</p>
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <div
        className="flex justify-between items-center font-roboto"
        onClick={() => setToggleGuest(true)}
      >
        <div className="flex flex-col gap-3">
          <h3>{guestGroup}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        {/* Counter */}
        <div className="flex gap-3 items-center">
          <Icon label="-" handleClick={decrement} disabled={counter <= 0} />
          <p className="font-bold text-2xl text-gray-800">{counter}</p>
          <Icon label="+" handleClick={increment} />
        </div>
      </div>
      {borderBottom && (
        <div className="w-full h-0 border-solid border-b border-gray-100" />
      )}
    </div>
  );
}
