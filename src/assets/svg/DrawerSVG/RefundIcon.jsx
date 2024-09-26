import * as React from "react";
import Svg, { Path } from "react-native-svg";

const RefundIcon = (props) => {
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
        fill={color}
        d="M.875 8A5.631 5.631 0 0 1 6.5 2.375H14v-1.25a.625.625 0 0 1 1.068-.442l1.875 1.875a.624.624 0 0 1 0 .884l-1.875 1.875A.625.625 0 0 1 14 4.875v-1.25H6.5A4.38 4.38 0 0 0 2.124 8a.625.625 0 0 1-1.25 0ZM16.5 7.375a.625.625 0 0 0-.624.625 4.38 4.38 0 0 1-4.375 4.375H4v-1.25a.625.625 0 0 0-1.068-.442l-1.875 1.875a.625.625 0 0 0 0 .884l1.875 1.875A.625.625 0 0 0 4 14.875v-1.25h7.5A5.631 5.631 0 0 0 17.126 8a.625.625 0 0 0-.625-.625Z"
      />
    </Svg>
  );
};

export default RefundIcon;
