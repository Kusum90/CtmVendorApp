import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Notification = (props) => {
  const { color, width = 20, height = 20 } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Zm6-6V9a6 6 0 1 0-12 0v6l-1 1v1h14v-1l-1-1Z"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5v.75m-9-0.75v.75"
      />
    </Svg>
  );
};

export default Notification;
