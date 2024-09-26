import * as React from "react";
import Svg, { Path, Defs, Pattern, Use, Image } from "react-native-svg";

const ArrowIcon = (props) => {
  const { width = 33, height = 33, style, imageHref } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      style={style}
      fill="none"
    >
      <Path fill="url(#a)" d="M0 0h33v33H0z" />
      <Defs>
        <Pattern
          id="a"
          width={1}
          height={1}
          patternContentUnits="objectBoundingBox"
        >
          <Use xlinkHref="#b" transform="scale(.01563)" />
        </Pattern>
        <Image
          xlinkHref={
            imageHref ||
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAwklEQVR4nO3YQQ6CMBRF0bsVmTlh4s50teoCTCRxCxiTkhgGggotbe9JOv59j5JAQZIkSZIkSZIkzbQDrsAZaInnNesSVkNCJ6APq4tUQhtmDXOPJNSMNrN2CePwXTiFSe2B29umHsAhQvh75NcuaQmbDr92CVmEX6uErMIvXUKW4ZcqIevw/5ZQRPhfSygq/LclFBl+bglFh58qoYrwn77lY/5LbPIk9DU8+akSqgo/aMNFSuzLFEmSJEmSJEmSqNQTh4SDyNXmTzAAAAAASUVORK5CYII="
          }
          id="b"
          width={64}
          height={64}
        />
      </Defs>
    </Svg>
  );
};

export default ArrowIcon;
