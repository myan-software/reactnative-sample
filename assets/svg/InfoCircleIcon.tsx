import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        clipRule="evenodd"
        d="M16 3.667c6.812 0 12.334 5.523 12.334 12.333 0 6.811-5.522 12.334-12.334 12.334C9.19 28.334 3.667 22.81 3.667 16 3.667 9.19 9.19 3.667 16 3.667z"
        stroke="#F71E24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.994 10.939v5.892M15.994 21.062h.013"
        stroke="#F71E24"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
