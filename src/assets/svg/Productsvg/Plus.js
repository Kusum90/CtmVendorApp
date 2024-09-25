import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const Plus = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <Rect width={45.781} height={33} x={0.5} y={0.5} fill="#0EAB3D" rx={11.5} />
    <Rect
      width={45.781}
      height={33}
      x={0.5}
      y={0.5}
      stroke="#59B262"
      rx={11.5}
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M23.39 10v14M16.39 17h14"
    />
  </Svg>
)
export default Plus
