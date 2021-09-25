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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.271 6.548a6.52 6.52 0 00-4.603-1.8c-3.13 0-5.79 2.113-6.737 4.957a7.188 7.188 0 000 4.595h.004c.952 2.84 3.607 4.951 6.737 4.951 1.616 0 3.004-.413 4.079-1.143v-.003a5.554 5.554 0 002.399-3.647h-6.482v-4.62h11.319c.14.802.207 1.622.207 2.438 0 3.65-1.304 6.735-3.574 8.825l.002.002C18.634 22.937 15.904 24 12.668 24a12.002 12.002 0 01-10.724-6.61 12.01 12.01 0 010-10.776A11.998 11.998 0 0112.668 0a11.533 11.533 0 018.03 3.122L17.27 6.548z"
          fill="url(#prefix__paint0_linear)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={3.076}
          y1={3.841}
          x2={23.583}
          y2={23.472}
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
