import * as React from "react"
import Svg, { Path} from 'react-native-svg'
const  BackArrow = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000001"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22.252 8.5H.846M6.197 1 .846 8.5 6.197 16"
    />
  </Svg>
)
export default BackArrow