import { Input } from "antd";
import { TiInfoLarge } from "react-icons/ti";

/* eslint-disable react/prop-types */
export default function LocationTracker({ lat, long }) {
  return (
    <div className="flex gap-5 items-center justify-center w-80 flex-col">
      <Input value={lat || 0} label="Latitude" readOnly className="w-full" />
      <Input value={long || 0} label="Longitude" readOnly className="w-full" />
      <p className="font-lato font-normal italic text-md text-gray-700 flex items-center">
        <TiInfoLarge /> Lat and Long let&apos;s know your exact location on the
        map.
      </p>
    </div>
  );
}
