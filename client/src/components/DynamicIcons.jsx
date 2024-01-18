/* eslint-disable react/prop-types */
import { IconContext } from "react-icons";
import * as FontAwesomeIcons from "react-icons/fa";
import * as FeatherIcons from "react-icons/fi";
import * as MaterialIcons from "react-icons/md";
import * as GameIcons from "react-icons/gi";
import * as TablerIcons from "react-icons/tb";
import * as AntIcons from "react-icons/ai";
import * as ThemifyIcons from "react-icons/tfi";
const iconSets = {
  fa: FontAwesomeIcons,
  fi: FeatherIcons,
  md: MaterialIcons,
  gi: GameIcons,
  tb: TablerIcons,
  ai: AntIcons,
  tfi: ThemifyIcons,
};

export default function DynamicIcons({ iconName, className }) {
  // Get the Icon set
  const currentIconSet = iconName.substring(0, 2).toLowerCase();
  const Icons = currentIconSet ? iconSets[currentIconSet] : null;
  const Icon = Icons ? Icons[iconName] : null;
  return Icon ? (
    <IconContext.Provider value={{ size: "1.5em" }}>
      <Icon className={className} />
    </IconContext.Provider>
  ) : null;
}
