import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"
const NotInStock = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <Rect width={50} height={50} fill="#D1314E" opacity={0.1} rx={10} />
    <G clipPath="url(#a)">
      <G stroke="#A91733" strokeWidth={1.667} clipPath="url(#b)">
        <Path
          strokeLinejoin="round"
          d="M25.167 17 16 32.833h18.333L25.167 17Z"
        />
        <Path strokeLinecap="round" d="M25.166 29.5v.417m0-7.084L25.169 27" />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M15.002 15h20v20h-20z" />
      </ClipPath>
      <ClipPath id="b">
        <Path fill="#fff" d="M15 15h20v20H15z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default NotInStock
