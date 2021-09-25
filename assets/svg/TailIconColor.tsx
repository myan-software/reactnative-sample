import * as React from 'react';
import Svg, {Path, SvgProps} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width="20"
      height="14"
      viewBox="0 0 20 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.028 0H0c0 7.732 6.268 14 14 14h6v-.33a14 14 0 01-3.474-4.367C15.404 7.1 15.107 4.397 15.028 0z"
        fill="#833AB4"
      />
    </Svg>
  );
}

export default SvgComponent;
