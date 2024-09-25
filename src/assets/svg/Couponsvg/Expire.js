import * as React from "react"
import Svg, { Path, Rect } from "react-native-svg"
const Expire = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={50}
    height={50}
    fill="none"
    {...props}
  >
    <Path
      fill="#4524F8"
      d="M32.895 17h4.096a1 1 0 0 1 .994.9l.61 6.1h-2.012l-.5-5h-3.188v3a1 1 0 1 1-2 0v-3h-8v3a1 1 0 1 1-2 0v-3h-3.19l-1.6 16h10.79v2H14.999a.999.999 0 0 1-.994-1.1l1.8-18a1 1 0 0 1 .994-.9h4.096v-.698c0-3.468 2.672-6.302 6-6.302s6 2.834 6 6.302v.7V17Zm-2 0v-.698c0-2.388-1.804-4.302-4-4.302-2.196 0-4 1.914-4 4.302v.7h8V17Zm6.294 14.88a1 1 0 1 1 1.414 1.412l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414l2.292 2.294V27a1 1 0 0 1 2 0v7.172l2.294-2.294v.002Z"
    />
    <Rect width={50} height={50} fill="#4524F8" opacity={0.1} rx={10} />
  </Svg>
)
export default Expire
