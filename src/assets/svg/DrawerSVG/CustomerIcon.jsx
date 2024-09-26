import * as React from "react";
import Svg, { Path } from "react-native-svg";

const CustomerIcon = (props) => {
  const { color = "#000", width = 16, height = 16, style } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width={width}
      height={height}
      style={style}
      fill="none"
    >
      <Path
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M1 12.667a3.333 3.333 0 0 1 3.333-3.334H11a3.333 3.333 0 0 1 3.333 3.334 1.667 1.667 0 0 1-1.666 1.666h-10A1.667 1.667 0 0 1 1 12.667Z"
      />
      <Path
        stroke={color}
        strokeWidth={1.667}
        d="M7.666 6a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
      />
    </Svg>
  );
};

export default CustomerIcon;
