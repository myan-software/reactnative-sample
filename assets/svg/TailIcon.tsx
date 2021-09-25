import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

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
        d="M4.971 0H20c0 7.732-6.268 14-14 14H0v-.33a14 14 0 003.474-4.367C4.596 7.1 4.893 4.397 4.97 0z"
        fill="#F2F2F2"
      />
    </Svg>
  );
}
export default SvgComponent;
