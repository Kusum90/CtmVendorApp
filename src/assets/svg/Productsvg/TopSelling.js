import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"
const TopSelling = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <Rect width={50} height={50} fill="#24D6A5" opacity={0.1} rx={10} />
    <G clipPath="url(#a)">
      <Path
        stroke="#8CCCBA"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M24 21.683v7.367M33 18v11.05m-18-3.683v3.683"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M15.002 18h20v17h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default TopSelling
