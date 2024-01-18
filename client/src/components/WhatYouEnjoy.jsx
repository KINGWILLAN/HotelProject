/* eslint-disable react/prop-types */
import DynamicIcons from "./DynamicIcons";

const offers = [
  {
    Icon: "TbSunElectricity",
    label: "24/7 Electricity",
    id: 1,
  },
  {
    Icon: "AiOutlineEnvironment",
    label: "Serene View",
    id: 1,
  },
  {
    Icon: "MdOutlineSecurity",
    label: "Maximum Security",
    id: 1,
  },
  {
    Icon: "MdNoMealsOuline",
    label: "Sumptuous Meal",
    id: 1,
  },
];

export default function WhatYouEnjoy() {
  return (
    <div>
      <h1 className="small-heading">What it offers</h1>
      {/* offers */}
      <div
        className={`grid grid-cols-1 ${
          offers.length > 10 && "md:grid-cols-2"
        } py-5`}
      >
        {offers.map(({ id, label, Icon }, index) => (
          <div
            key={id + index}
            className="flex justify-start items-center gap-1 pb-2 text-lg md:text-xl"
          >
            <DynamicIcons
              // iconSetsList={IconSetList}
              iconName={Icon}
              className="text-gray-800 text-[25px]"
            />
            <p className="capitalize text-gray-700"> {label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
