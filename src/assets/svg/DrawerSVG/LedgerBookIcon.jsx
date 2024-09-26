import * as React from "react";
import Svg, { Path } from "react-native-svg";

const LedgerBookIcon = (props) => {
  const { color = "#000", width = 15, height = 17, style } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 15 17"
      width={width}
      height={height}
      style={style}
      fill="none"
    >
      <Path
        stroke={color}
        strokeWidth={1.25}
        d="M1 5.547c0-2.143 0-3.215.732-3.88C2.465 1 3.643 1 6 1h3.333c2.357 0 3.536 0 4.268.666.732.666.732 1.738.732 3.881v6.063c0 2.144 0 3.216-.732 3.881-.732.666-1.911.666-4.268.666H6c-2.357 0-3.536 0-4.268-.666C1 14.826 1 13.754 1 11.611V5.546Z"
      />
      <Path
        stroke={color}
        strokeWidth={1.25}
        d="M14.248 11.61h-10c-.775 0-1.162 0-1.48.078-.424.103-.81.306-1.121.588-.31.283-.534.634-.647 1.02"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.25}
        d="M4.334 4.79h6.667M4.334 7.441h4.167"
      />
    </Svg>
  );
};

export default LedgerBookIcon;
