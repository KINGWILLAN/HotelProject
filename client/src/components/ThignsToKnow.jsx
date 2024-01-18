/* eslint-disable react/prop-types */
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const information = [
  {
    id: 1,
    label: "House rules",
    data: [
      "Check-in after 2:00 PM",
      "Checkout before 11:00 AM",
      "2 guests maximum",
    ],
  },
  {
    id: 2,
    label: "Safety & property",
    data: [
      "Security camera/recording device",
      "Carbon monoxide alarm",
      "Smoke alarm",
      "Fire Alarm",
    ],
  },
  {
    id: 3,
    label: "Cancellation policy",
    data: [
      "Free cancellation for 48 hours.",
      "Review the Host’s full cancellation policy which applies even if you cancel for illness or disruptions caused by COVID-19.",
    ],
  },
];

function Info({ label, data }) {
  const subData = data.slice(0, 3);
  return (
    <div className="max-w-[280px]">
      <h2 className="text-[20px] text-black font-bold font-lato">{label}</h2>
      {subData.map((datum, index) => (
        <div key={index}>
          <p className="font-roboto font-normal text-md text-gray-900 text-justify py-1">
            {datum}
          </p>
        </div>
      ))}
      {data.length > 3 && (
        <Link className="underline font-semibold flex items-center">
          Show More <FaChevronRight className="text-xs" />
        </Link>
      )}
    </div>
  );
}

export default function ThingsToKnow() {
  return (
    <div className="">
      <h1 className="small-heading">Things to Know</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 pt-5 items-start">
        {information.map(({ id, label, data }, index) => (
          <Info key={id + index} label={label} data={data} />
        ))}
      </div>
    </div>
  );
}
