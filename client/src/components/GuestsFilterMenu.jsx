import { guestData } from "../data/data";
import MenuItem from "./MenuItem";

export default function GuestsFilterMenu() {
  return (
    <>
      {guestData.map((guest) => (
        <MenuItem key={guest.guestGroup} {...guest} />
      ))}
    </>
  );
}
