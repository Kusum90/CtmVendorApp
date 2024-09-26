import * as React from "react";
import Svg, { Path } from "react-native-svg";

const FinanceIcon = (props) => {
  const { color = "#000", width = 18, height = 17, style } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 17"
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
        d="M4 6.579h3.333"
      />
      <Path
        stroke={color}
        strokeWidth={1.25}
        d="M16.36 7.337h-2.167c-1.488 0-2.693 1.017-2.693 2.273 0 1.256 1.206 2.274 2.692 2.274h2.169c.07 0 .104 0 .133-.002.45-.025.808-.327.838-.707l.001-.112V8.157l-.001-.112c-.03-.38-.388-.682-.838-.707l-.133-.001Z"
      />
      <Path
        stroke={color}
        strokeWidth={1.25}
        d="M16.47 7.336c-.065-1.418-.273-2.288-.947-2.9-.976-.889-2.548-.889-5.69-.889h-2.5c-3.143 0-4.714 0-5.69.888C.666 5.323.666 6.752.666 9.61c0 2.858 0 4.287.977 5.175.976.888 2.547.888 5.69.888h2.5c3.142 0 4.714 0 5.69-.888.674-.613.883-1.482.947-2.901"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeWidth={1.25}
        d="M4 3.547 7.112 1.67a2.895 2.895 0 0 1 1.471-.397c.522 0 1.033.138 1.471.397l3.113 1.877"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M13.992 9.61H14"
      />
    </Svg>
  );
};

export default FinanceIcon;
