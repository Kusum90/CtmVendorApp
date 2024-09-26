import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ReportIcon = (props) => {
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
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.25}
        d="M4.333 7.063H11m-6.667 6.063H11m-6.667-3.031h3.334M1 15.703V1.455c0-.12.053-.237.146-.322A.526.526 0 0 1 1.5 1h9.71c.133 0 .26.048.353.133l2.624 2.386a.454.454 0 0 1 .108.148.418.418 0 0 1 .038.175v11.86a.42.42 0 0 1-.038.175.456.456 0 0 1-.108.147.545.545 0 0 1-.354.133H1.5a.545.545 0 0 1-.354-.133.455.455 0 0 1-.108-.147.42.42 0 0 1-.038-.174Z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.25}
        d="M11 1v2.577c0 .12.053.236.146.321a.527.527 0 0 0 .354.134h2.833"
      />
    </Svg>
  );
};

export default ReportIcon;
