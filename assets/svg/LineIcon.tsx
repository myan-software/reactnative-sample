import * as React from 'react';
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from 'react-native-svg';

export default function (props: SvgProps) {
  return (
    <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M12.428 1c-6.615 0-12 4.398-12 9.803 0 4.841 4.27 8.897 10.035 9.668.391.083.923.26 1.058.594.12.303.079.771.038 1.087l-.164 1.026c-.045.303-.24 1.193 1.049.649 1.291-.542 6.916-4.104 9.436-7.019 1.724-1.9 2.548-3.847 2.548-6.005 0-5.405-5.385-9.803-12-9.803zM7.731 14.017H5.345a.636.636 0 01-.63-.633V8.583c0-.347.285-.634.63-.634.348 0 .63.287.63.634v4.167h1.756a.634.634 0 010 1.267zm2.466-.633a.634.634 0 01-.631.633.633.633 0 01-.627-.633V8.583c0-.347.282-.634.63-.634.346 0 .628.287.628.634v4.801zm5.741 0a.633.633 0 01-1.141.379l-2.443-3.338v2.958a.632.632 0 01-.631.633.632.632 0 01-.626-.633v-4.8a.63.63 0 01.624-.632c.195 0 .375.105.495.256l2.462 3.351V8.583c0-.347.282-.634.63-.634.345 0 .63.287.63.634v4.801zm3.855-3.035a.634.634 0 010 1.269h-1.755v1.132h1.755a.633.633 0 010 1.267h-2.386a.633.633 0 01-.627-.633V8.583c0-.347.282-.634.63-.634h2.386c.346 0 .627.287.627.634a.63.63 0 01-.63.634h-1.755v1.132h1.755z"
          fill="url(#prefix__paint0_linear)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={2.885}
          y1={4.681}
          x2={22.551}
          y2={24.723}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(.428)" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
