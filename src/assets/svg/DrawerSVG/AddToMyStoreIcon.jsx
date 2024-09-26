import * as React from "react";
import Svg, { Path } from "react-native-svg";

const AddToMyStoreIcon = (props) => {
  const { color = "#000", width = 22, height = 22, style } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      width={width}
      height={height}
      style={style}
      fill="none"
    >
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.25}
        d="M13.308 3.222c0-.59-.243-1.154-.675-1.571A2.353 2.353 0 0 0 11 1c-.612 0-1.198.234-1.631.65a2.182 2.182 0 0 0-.676 1.572M19.376 8.44l1.597 10c.05.316.03.64-.062.948-.09.308-.25.593-.466.836a2.3 2.3 0 0 1-.787.572c-.302.134-.63.204-.963.204H3.307c-.332 0-.661-.07-.963-.203a2.302 2.302 0 0 1-.788-.572 2.198 2.198 0 0 1-.467-.837 2.143 2.143 0 0 1-.062-.948l1.597-10c.084-.525.36-1.004.779-1.35a2.36 2.36 0 0 1 1.503-.534h12.19c.551 0 1.084.19 1.503.535a2.2 2.2 0 0 1 .777 1.349Z"
      />
      <Path
        fill={color}
        d="M7 13.16a.625.625 0 0 1 .625-.624h2.91V9.625a.625.625 0 0 1 1.25 0v2.91h2.912a.625.625 0 0 1 0 1.25h-2.911v2.912a.625.625 0 1 1-1.25 0v-2.911H7.625A.625.625 0 0 1 7 13.16Z"
      />
    </Svg>
  );
};

export default AddToMyStoreIcon;
