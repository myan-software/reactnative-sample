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
          d="M7.978 21.75c9.054 0 14.008-7.503 14.008-14.008 0-.211-.004-.427-.014-.638a10 10 0 002.456-2.549c-.898.4-1.85.66-2.826.774a4.95 4.95 0 002.165-2.723A9.897 9.897 0 0120.641 3.8a4.93 4.93 0 00-8.393 4.49A13.985 13.985 0 012.1 3.15a4.93 4.93 0 001.523 6.57 4.93 4.93 0 01-2.23-.614v.06a4.922 4.922 0 003.95 4.829 4.895 4.895 0 01-2.221.084 4.934 4.934 0 004.597 3.422 9.875 9.875 0 01-7.292 2.037 13.969 13.969 0 007.55 2.212z"
          fill="url(#prefix__paint0_linear)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={2.885}
          y1={5.37}
          x2={19.284}
          y2={25.082}
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
