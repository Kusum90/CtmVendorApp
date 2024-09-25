import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"
const Active = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <Rect width={50} height={50} fill="#F09028" opacity={0.1} rx={10} />
    <Path
      stroke="#F29425"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M36.768 19.667 25.435 13l-11.333 6.667V33l11.333 6.667L36.768 33V19.667Z"
    />
    <Path
      stroke="#F29425"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M25.435 24.667V30m5.333-8v8m-10.666-2.667V30"
    />
  </Svg>
)
export default Active
