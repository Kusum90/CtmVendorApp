import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Calendar = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={13}
    fill="none"
    {...props}
  >
    <Path
      fill="#969696"
      fillRule="evenodd"
      d="M10.5 1.95H10v-.5c0-.276-.225-.5-.5-.5s-.5.224-.5.5v.5H4v-.5c0-.276-.225-.5-.5-.5s-.5.224-.5.5v.5h-.5c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1h8c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1Zm-.5 9H3a.501.501 0 0 1-.5-.5v-6h8v6c0 .274-.225.5-.5.5Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Calendar
