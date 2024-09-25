import * as React from "react";
import Svg, { Path } from "react-native-svg";

const MyAccount = (props) => {
  const { color, width = 19, height = 22, style } = props;
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19 22"
      width={width}
      height={height}
      style={style}
      fill="none"
    >
      <Path
        fill={color}
        d="M15.042 5.5a5.48 5.48 0 0 1-1.623 3.89A5.563 5.563 0 0 1 9.5 11c-1.47 0-2.88-.58-3.919-1.61A5.48 5.48 0 0 1 3.958 5.5a5.48 5.48 0 0 1 1.623-3.89A5.563 5.563 0 0 1 9.5 0c1.47 0 2.88.58 3.918 1.61a5.48 5.48 0 0 1 1.624 3.89Zm-1.584 0A3.914 3.914 0 0 0 12.3 2.722 3.974 3.974 0 0 0 9.5 1.572c-1.05 0-2.057.413-2.799 1.15A3.914 3.914 0 0 0 5.541 5.5c0 1.042.418 2.041 1.16 2.778A3.974 3.974 0 0 0 9.5 9.428c1.05 0 2.057-.413 2.799-1.15a3.914 3.914 0 0 0 1.16-2.778ZM2.771 12.571c-.735 0-1.44.29-1.96.806A2.74 2.74 0 0 0 0 15.32v.393c0 1.88 1.206 3.47 2.917 4.552C4.638 21.353 6.968 22 9.5 22s4.86-.647 6.583-1.734C17.794 19.185 19 17.595 19 15.714v-.393a2.74 2.74 0 0 0-.812-1.944 2.782 2.782 0 0 0-1.959-.806H2.771Zm-1.188 2.75c0-.312.125-.612.348-.833.223-.221.525-.345.84-.345h13.458c.315 0 .617.124.84.345.223.221.348.52.348.833v.393c0 1.158-.745 2.317-2.185 3.226-1.43.904-3.454 1.489-5.732 1.489s-4.302-.585-5.732-1.489c-1.441-.908-2.185-2.07-2.185-3.226v-.393Z"
      />
    </Svg>
  );
};

export default MyAccount;
