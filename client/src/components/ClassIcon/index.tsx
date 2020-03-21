import * as React from "react";
import druidIcon from "../../assets/druid.png";
import hunterIcon from "../../assets/hunter.png";
import mageIcon from "../../assets/mage.png";
import priestIcon from "../../assets/priest.png";
import rogueIcon from "../../assets/rogue.png";
import shamanIcon from "../../assets/shaman.png";
import warlockIcon from "../../assets/warlock.png";
import warriorIcon from "../../assets/warrior.png";
import styled from "styled-components";

interface ClassIconProps {
  class: string;
}

const getIcon = (wowClass: string): string => {
  switch (wowClass) {
    case "Druid":
      return druidIcon;
    case "Hunter":
      return hunterIcon;
    case "Mage":
      return mageIcon;
    case "Priest":
      return priestIcon;
    case "Rogue":
      return rogueIcon;
    case "Shaman":
      return shamanIcon;
    case "Warlock":
      return warlockIcon;
    case "Warrior":
      return warriorIcon;
  }
  return "";
};

const StyledImg = styled.img `width: 16px; height: 16px;`;

export const ClassIcon: React.FC<ClassIconProps> = props => {
  const icon = getIcon(props.class);
  return <StyledImg src={icon} alt={props.class} />
};
