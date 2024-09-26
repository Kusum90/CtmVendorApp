import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ShopIcon = (props) => {
  const { color = "#000", width = 17, height = 17, style } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
      width={width}
      height={height}
      style={style}
      fill="none"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.25}
        d="M9.892 2.667a1.667 1.667 0 0 0-3.333 0m7.716 3.913 1.154 7.5A1.667 1.667 0 0 1 13.783 16H2.668a1.666 1.666 0 0 1-1.648-1.92l1.155-7.5a1.667 1.667 0 0 1 1.648-1.413h8.806a1.667 1.667 0 0 1 1.647 1.413Z"
      />
    </Svg>
  );
};

export default ShopIcon;