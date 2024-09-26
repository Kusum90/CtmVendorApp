import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FollowersIcon = (props) => {
  const { color = "#000", width = 20, height = 19, style } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 19"
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
        d="M15.704 5.968c-.115 1.445-1.293 2.558-2.579 2.558-1.285 0-2.465-1.113-2.578-2.558-.117-1.503 1.03-2.558 2.578-2.558 1.549 0 2.696 1.082 2.579 2.558Z"
      />
      <Path
        stroke={color}
        strokeMiterlimit={10}
        strokeWidth={1.25}
        d="M13.125 10.8c-2.546 0-4.994 1.15-5.607 3.39a.46.46 0 0 0 .458.589h10.299a.46.46 0 0 0 .457-.59c-.613-2.275-3.061-3.39-5.607-3.39Z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.25}
        d="M7.813 6.606C7.722 7.76 6.77 8.668 5.743 8.668c-1.027 0-1.98-.908-2.07-2.062-.094-1.2.833-2.059 2.07-2.059 1.237 0 2.163.88 2.07 2.059Z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={1.25}
        d="M8.047 10.87c-.705-.293-1.481-.406-2.304-.406-2.032 0-3.989.918-4.479 2.707a.367.367 0 0 0 .366.47h4.386"
      />
    </Svg>
  );
};

export default FollowersIcon;
