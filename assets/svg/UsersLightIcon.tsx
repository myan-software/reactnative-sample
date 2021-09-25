import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M17.845 10.932a2.902 2.902 0 100-5.803M19.179 14.085c.478.033.954.1 1.422.206.651.128 1.434.394 1.713.978.177.374.177.81 0 1.185-.278.584-1.062.85-1.713.983M6.54 10.932a2.902 2.902 0 110-5.803M5.206 14.085c-.479.033-.955.1-1.423.206-.65.128-1.434.394-1.711.978-.18.374-.18.81 0 1.185.276.584 1.06.85 1.711.983"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M12.188 14.71c3.246 0 6.02.49 6.02 2.457 0 1.965-2.755 2.475-6.02 2.475-3.248 0-6.021-.491-6.021-2.457 0-1.967 2.755-2.475 6.02-2.475zM12.187 11.905a3.845 3.845 0 01-3.858-3.86 3.845 3.845 0 013.858-3.857 3.845 3.845 0 013.859 3.858 3.845 3.845 0 01-3.859 3.859z"
        stroke="#000"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SvgComponent;
