/* eslint-disable react/prop-types */
import { Button } from "@material-tailwind/react";

export default function IconStyle({ label, Icon, isVerySmallScreen }) {
  return (
    <Button
      variant="outlined"
      className="flex justify-start items-center gap-1 h-10 hover:bg-gray-50 text-purple-500 outline-none border-none shadow-md shadow-red-50 text-[16px] md:text[20px] font-normal"
    >
      <Icon className="text-[20px]" />
      {!isVerySmallScreen && label}
    </Button>
  );
}
