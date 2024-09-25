import * as React from "react"
import Svg, { Path } from "react-native-svg"

const HomeIcon = (props) => {
    const {color, width = 20, height = 14} = props;
    return(
    
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 26 23"
    
    fill="none"
    width={width}
    height={height}
  >
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 13.071 13.071 1l12.072 12.071"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.714 9.357v13H21.43v-13M13.071 22.357v-5.571"
    />
    <Path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13.071 12.143a2.322 2.322 0 1 0 0-4.643 2.322 2.322 0 0 0 0 4.643Z"
    />
  </Svg>
    )
}
export default HomeIcon
