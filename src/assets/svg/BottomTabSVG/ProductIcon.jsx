import * as React from "react";
import Svg, { Path } from "react-native-svg";

const ProductIcon = (props) => {
  const { color, width = 17, height = 19 } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 19"
      width={width}
      height={height}
      fill="none"
    >
      <Path
        fill={color}
        d="m8.125 0 8.125 4.063v10.156l-8.125 4.053L0 14.218V4.063L8.125 0Zm6.104 4.453L8.125 1.406 5.771 2.578l6.065 3.067 2.393-1.192ZM8.125 7.5l2.324-1.152L4.375 3.28 2.021 4.453 8.125 7.5ZM1.25 5.469v7.968l6.25 3.126v-7.97L1.25 5.47Zm7.5 11.093L15 13.438V5.47L8.75 8.594v7.969Z"
      />
    </Svg>
  );
};

export default ProductIcon;
