import * as React from "react";
import Svg, { Path } from "react-native-svg";

const OrderIcon = (props) => {
  const { color = "#000", width = 19, height = 19 } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 19"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        fill={color}
        d="M0 .625A.625.625 0 0 1 .625 0H2.5a.625.625 0 0 1 .606.474L3.612 2.5h14.513a.625.625 0 0 1 .614.74l-1.875 10a.626.626 0 0 1-.614.51H5a.625.625 0 0 1-.614-.51L2.513 3.259l-.5-2.009H.625A.625.625 0 0 1 0 .625ZM3.877 3.75 5.52 12.5H15.73l1.641-8.75H3.877Zm2.373 10a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm8.75 0a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM6.25 15a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM15 15a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"
      />
    </Svg>
  );
};

export default OrderIcon;
