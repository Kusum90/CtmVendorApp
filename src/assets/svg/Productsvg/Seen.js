import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Seen = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={20}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect width={24} height={18} x={1} fill="#14A823" rx={5} />
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
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.565 7.146c-2.99 0-4.247 2.42-4.247 2.47 0 .05 1.256 2.472 4.247 2.472 2.99 0 4.247-2.421 4.247-2.472 0-.05-1.256-2.47-4.247-2.47ZM9.113 8.552 8 7.55M11.231 7.321 10.777 6M16.016 8.552l1.113-1.002M13.896 7.321 14.35 6"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.287 10.706c.668.138 1.334-.238 1.487-.84.153-.601-.265-1.2-.933-1.338-.668-.138-1.334.238-1.487.84-.153.6.264 1.2.933 1.338Z"
    />
    <Defs></Defs>
  </Svg>
)
export default Seen
