import * as React from "react"
import Svg, { G, Rect, Path, Defs, ClipPath } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Delete = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={20}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect width={24} height={18} x={1} fill="red" rx={5} />
      <Rect
        width={23.229}
        height={17.229}
        x={1.386}
        y={0.386}
        stroke="#E8E8E8"
        strokeWidth={0.771}
        rx={4.614}
      />
    </G>
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      clipPath="url(#b)"
    >
      <Path d="M8.941 5.54h8.915M10.057 5.54h6.685v7.12c0 .21-.078.412-.217.56a.72.72 0 0 1-.525.232h-5.2a.72.72 0 0 1-.526-.232.818.818 0 0 1-.217-.56V5.54ZM11.541 5.54v-.396c0-.525.196-1.028.544-1.399.348-.37.82-.579 1.313-.579s.965.208 1.313.58c.349.37.544.873.544 1.398v.396M12.285 7.914v3.166M14.514 7.914v3.166" />
    </G>
    <Defs>
      <ClipPath id="b">
        <Path fill="#fff" d="M8.2 2.77h10.4v11.078H8.2z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Delete
