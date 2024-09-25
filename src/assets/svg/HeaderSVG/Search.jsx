import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg";

const Search = (props) => {
  const { color = "#232A37", width = 20, height = 20, style } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      width={width}
      height={height}
      style={style}
      fill="none"
      {...props}
    >
      <G clipPath="url(#a)">
        <G clipPath="url(#b)">
          <Mask
            id="c"
            width={318}
            height={157}
            x={-50}
            y={0}
            maskUnits="userSpaceOnUse"
            style={{
              maskType: "luminance",
            }}
          >
            <Path fill="#fff" d="M-50 0h318v157H-50V0Z" />
          </Mask>
          <G mask="url(#c)">
            <Path
              fill={color}
              fillRule="evenodd"
              d="M14.294 12.579h-.904l-.32-.31a7.4 7.4 0 0 0 1.796-4.836 7.433 7.433 0 1 0-7.433 7.433 7.4 7.4 0 0 0 4.837-1.796l.309.32v.904L18.296 20 20 18.296l-5.706-5.717Zm-6.861 0a5.139 5.139 0 0 1-5.146-5.146 5.139 5.139 0 0 1 5.146-5.146 5.139 5.139 0 0 1 5.146 5.146 5.139 5.139 0 0 1-5.146 5.146Z"
              clipRule="evenodd"
            />
          </G>
        </G>
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h20v20H0z" />
        </ClipPath>
        <ClipPath id="b">
          <Path fill="#fff" d="M-50 0h318v157H-50z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default Search;
