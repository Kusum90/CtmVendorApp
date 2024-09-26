import * as React from "react";
import Svg, { Path } from "react-native-svg";

const SupportIcon = (props) => {
  const { color = "#000", width = 18, height = 16, style } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 16"
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
        d="M9 14.915c4.142 0 7.5-3.053 7.5-6.82 0-3.768-3.358-6.821-7.5-6.821-4.142 0-7.5 3.053-7.5 6.82 0 3.768 3.358 6.821 7.5 6.821Z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.25}
        d="M14 3.547 11.062 6.22m0 0a2.51 2.51 0 0 1 0 3.751m0-3.751c-1.123-1.022-3-1.022-4.124 0M4 12.642 6.938 9.97m0 0a2.51 2.51 0 0 1 0-3.751m0 3.751c1.123 1.022 3 1.022 4.125 0M4 3.547 6.938 6.22M14 12.642 11.062 9.97"
      />
    </Svg>
  );
};

export default SupportIcon;
