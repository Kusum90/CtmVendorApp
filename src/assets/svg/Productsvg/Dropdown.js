import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Dropdown = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={7}
    height={5}
    fill="none"
    {...props}
  >
    <Path
      fill="#969696"
      fillRule="evenodd"
      d="m.265 1.766 2.32 2.318c.348.35.912.35 1.261 0l2.32-2.318c.563-.564.16-1.531-.636-1.531H.892c-.797 0-1.19.967-.627 1.53Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Dropdown
