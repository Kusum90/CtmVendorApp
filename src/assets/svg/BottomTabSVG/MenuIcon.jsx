import * as React from "react";
import Svg, { Rect } from "react-native-svg";

const MenuIcon = (props) => {
  const { color, width = 23, height = 21 } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 23 21"
      width={width}
      height={height}
      fill="none"
    >
      <Rect width={23} height={2.986} fill={color} rx={1.493} />
      <Rect width={16.727} height={2.986} y={8.642} fill={color} rx={1.493} />
      <Rect width={23} height={2.986} y={17.285} fill={color} rx={1.493} />
    </Svg>
  );
};

export default MenuIcon;
