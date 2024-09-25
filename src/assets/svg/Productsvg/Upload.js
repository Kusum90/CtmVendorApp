import * as React from "react"
import Svg, { Rect, G, Path, Defs, ClipPath } from "react-native-svg"
const Upload = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={34}
    fill="none"
    {...props}
  >
    <Rect width={45.781} height={33} x={1.281} y={0.5} fill="#fff" rx={11.5} />
    <Rect
      width={45.781}
      height={33}
      x={1.281}
      y={0.5}
      stroke="#EB7F00"
      rx={11.5}
    />
    <G clipPath="url(#a)">
      <Path
        stroke="#EB7F00"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.667}
        d="M18.338 12a2.917 2.917 0 0 0 0 5.833h.834a3.796 3.796 0 0 0-.006 1.642c.118.543.354 1.059.693 1.52.34.46.777.855 1.287 1.164.51.308 1.081.523 1.683.633.602.11 1.222.11 1.825.005a4.976 4.976 0 0 0 1.687-.624c1.033-.618 1.752-1.579 1.997-2.673a3.953 3.953 0 0 0 2.472-.738 3.658 3.658 0 0 0 1.417-2.073 3.523 3.523 0 0 0-.284-2.461 3.76 3.76 0 0 0-1.855-1.728m-5.916 3.667v-7.5m0 0 2.5 2.5m-2.5-2.5-2.5 2.5"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M34.172 27h-20V7h20z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default Upload
