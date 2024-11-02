import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"
const Recieved = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={51}
    height={51}
    fill="none"
    {...props}
  >
    <Rect
      width={50}
      height={50}
      x={0.5}
      y={0.449}
      fill="#24D6A5"
      opacity={0.1}
      rx={10}
    />
    <G clipPath="url(#a)">
      <Path
        stroke="#24D6A5"
        strokeLinecap="round"
        strokeWidth={2}
        d="M27.502 20.45v5.215c0 .434.515.784 1.149.784h4.851"
      />
      <Path
        stroke="#24D6A5"
        strokeWidth={2}
        d="M17.502 25.948c0-6.34 5.157-11.499 11.499-11.499 6.341 0 11.501 5.159 11.501 11.499 0 6.34-5.16 11.499-11.499 11.501a11.489 11.489 0 0 1-9.523-5.07"
      />
      <Path
        fill="#24D6A5"
        d="M17.283 27.473a1 1 0 0 1-1.562 0l-1.92-2.4a1 1 0 0 1 .782-1.624h3.838a1 1 0 0 1 .781 1.625l-1.92 2.4Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M9.502 13.45h34v25h-34z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Recieved
