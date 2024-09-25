import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const Pushed = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <Rect width={50} height={50} fill="#0090FF" opacity={0.1} rx={10} />
    <Path
      stroke="#248CD8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="M25 40c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15-8.284 0-15 6.716-15 15 0 8.284 6.716 15 15 15Z"
    />
    <Path
      stroke="#248CD8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.125}
      d="M20 17.5h10m-10 4.63h10m-2.917 12.037L20 26.76h2.5c5.557 0 5.557-9.26 0-9.26"
    />
  </Svg>
)
export default Pushed
