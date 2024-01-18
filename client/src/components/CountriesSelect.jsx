/* eslint-disable react/prop-types */
import { Select, Option } from "@material-tailwind/react";
import React from "react";
import { useCountries } from "use-react-countries";

export default function CountriesSelect({ country, setCountry }) {
  const { countries } = useCountries();

  return (
    <div className="w-80">
      <Select
        size="lg"
        label="Select Country"
        value={country}
        onChange={(e) => setCountry(e)}
        selected={(element) =>
          element &&
          React.cloneElement(element, {
            disabled: true,
            className:
              "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
          })
        }
      >
        {countries.map(({ name, flags }) => (
          <Option key={name} value={name} className="flex items-center gap-2">
            <img
              src={flags.svg}
              alt={name}
              className="h-5 w-5 rounded-full object-cover"
            />
            {name}
          </Option>
        ))}
      </Select>
    </div>
  );
}
