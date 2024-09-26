import * as React from "react";
import Svg, { Path } from "react-native-svg";

const LogoutIcon = (props) => {
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
        d="m9.166 2.274-.552.177c-2.149.69-3.224 1.035-3.835 1.821-.612.787-.613 1.824-.613 3.896v1.853c0 2.072 0 3.108.613 3.895.611.788 1.686 1.132 3.835 1.822l.552.177m8.333-6.82H9.166m8.333 0c0-.531-1.661-1.522-2.083-1.895m2.083 1.895c0 .53-1.661 1.521-2.083 1.894"
      />
    </Svg>
  );
};

export default LogoutIcon;
