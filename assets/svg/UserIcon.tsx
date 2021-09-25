import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

export default function (props: SvgProps) {
  return (
    <Svg width="17" height="22" viewBox="0 0 17 22" fill="none" {...props}>
      <Circle
        cx={8.579}
        cy={6.278}
        r={4.778}
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        clipRule="evenodd"
        d="M1 17.701a2.214 2.214 0 01.22-.97c.457-.915 1.748-1.4 2.819-1.62a16.793 16.793 0 012.343-.33 25.059 25.059 0 014.385 0c.787.056 1.57.166 2.343.33 1.07.22 2.361.659 2.82 1.62a2.27 2.27 0 010 1.95c-.459.96-1.75 1.4-2.82 1.61-.772.172-1.555.286-2.343.34-1.188.1-2.38.118-3.57.054-.275 0-.54 0-.815-.055a15.43 15.43 0 01-2.334-.338c-1.08-.21-2.361-.65-2.828-1.611A2.28 2.28 0 011 17.7z"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
