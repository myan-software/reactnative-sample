import * as React from "react"
import Svg, { Path, SvgProps } from "react-native-svg"

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M6.5 14c-.827 0-1.5-.673-1.5-1.5 0-.826.673-1.5 1.5-1.5.829 0 1.501.674 1.501 1.5 0 .827-.672 1.5-1.5 1.5zM12.112 14c-.828 0-1.5-.673-1.5-1.5 0-.826.672-1.5 1.5-1.5s1.5.674 1.5 1.5c0 .827-.672 1.5-1.5 1.5zM17.722 14c-.828 0-1.5-.673-1.5-1.5 0-.826.672-1.5 1.5-1.5s1.5.674 1.5 1.5c0 .827-.672 1.5-1.5 1.5z"
        fill="#fff"
      />
    </Svg>
  );
}

export default SvgComponent;
