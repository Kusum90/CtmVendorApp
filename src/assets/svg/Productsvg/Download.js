import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"
const Download = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={34}
    fill="none"
    {...props}
  >
    <Rect width={45.781} height={33} x={1.063} y={0.5} fill="#fff" rx={11.5} />
    <Rect
      width={45.781}
      height={33}
      x={1.063}
      y={0.5}
      stroke="#006CEB"
      rx={11.5}
    />
    <G clipPath="url(#a)">
      <Path
        stroke="#006CEB"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M29.787 22a2.917 2.917 0 0 0 0-5.833h-.834c.122-.542.124-1.1.006-1.642a3.987 3.987 0 0 0-.693-1.52 4.468 4.468 0 0 0-1.287-1.164 4.971 4.971 0 0 0-1.683-.633 5.187 5.187 0 0 0-1.825-.005 4.976 4.976 0 0 0-1.687.624c-1.033.618-1.752 1.579-1.997 2.673a3.953 3.953 0 0 0-2.472.738 3.658 3.658 0 0 0-1.417 2.073 3.523 3.523 0 0 0 .284 2.461 3.76 3.76 0 0 0 1.855 1.728m5.916-3.667v7.5m0 0-2.5-2.5m2.5 2.5 2.5-2.5"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M13.953 7h20v20h-20z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Download
