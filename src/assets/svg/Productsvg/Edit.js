import * as React from "react"
import Svg, { G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const Edit = (props) => (
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
      d="m15.293 10.582-2.313.415.386-2.337 4.416-4.39a.77.77 0 0 1 1.094 0l.817.814a.77.77 0 0 1 0 1.092l-4.4 4.406Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M18.761 10.966v2.307a.768.768 0 0 1-.77.769h-7.322a.771.771 0 0 1-.77-.77V5.969a.768.768 0 0 1 .77-.769h2.312"
    />
    <Defs></Defs>
  </Svg>
)
export default Edit
