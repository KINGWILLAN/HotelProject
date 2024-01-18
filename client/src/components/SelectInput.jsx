/* eslint-disable react/prop-types */
import { Option, Select } from "@material-tailwind/react";

export function SelectInput({ data, label, value, setValue }) {
  return (
    <div className="w-80">
      <Select
        label={label}
        value={value}
        onChange={(datum) => {
          console.log(datum);
          setValue(datum);
        }}
      >
        {data?.map((datum) => (
          <Option
            key={datum.stateCode}
            value={datum.state}
            className="text-lg text-gray-500 font-lato hover:!bg-purple-50 active:bg-purple-50 focus:bg-purple-50"
          >
            {datum.state}
          </Option>
        ))}
      </Select>
    </div>
  );
}
