import { Country, State } from "country-state-city";

export function getCountryCode(countryName) {
  const countries = Country.getAllCountries().map((country) => {
    return { countryName: country.name, countryCode: country.isoCode };
  });

  const country = countries.find(
    (country) => country.countryName.toLowerCase() === countryName.toLowerCase()
  );
  if (!country) {
    return;
  }

  return country.countryCode;
}
export function getStatesOfCountry(countryName) {
  const countryCode = getCountryCode(countryName);
  const states = State.getStatesOfCountry(countryCode).map((state) => ({
    state: state.name,
    stateCode: state.isoCode,
    countryCode: state.countryCode,
  }));

  return states;
}
