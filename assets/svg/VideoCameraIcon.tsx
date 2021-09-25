import * as React from 'react';
import Svg, {
  SvgProps,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

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
        d="M21.912 12.277a.819.819 0 00-1.133-.289l-2.75 1.592-.699.41v3.81l.651.386c.024 0 .024.024.048.024l2.701 1.567c.121.097.29.145.459.145.458 0 .82-.362.82-.82v-3.231l.024-3.184a.631.631 0 00-.12-.41z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M5.85 11.047a3.88 3.88 0 003.883-3.882 3.88 3.88 0 00-3.882-3.883 3.88 3.88 0 00-3.883 3.883c-.024 2.146 1.736 3.882 3.883 3.882zm0-5.474a1.59 1.59 0 011.592 1.592 1.59 1.59 0 01-1.591 1.592 1.606 1.606 0 01-1.592-1.592c-.024-.892.7-1.592 1.592-1.592z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M15.69 11.265a4.621 4.621 0 01-2.074.506 4.509 4.509 0 01-2.508-.748h-2.75a4.509 4.509 0 01-2.508.748 4.327 4.327 0 01-2.074-.506c-.554.313-.94.94-.94 1.615v5.885a1.96 1.96 0 001.953 1.953h9.912a1.96 1.96 0 001.953-1.953V12.88a1.961 1.961 0 00-.964-1.615z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        d="M13.616 11.047a3.88 3.88 0 003.883-3.882 3.88 3.88 0 00-3.883-3.883 3.88 3.88 0 00-3.883 3.883 3.88 3.88 0 003.883 3.882zm0-5.474a1.59 1.59 0 011.592 1.592 1.59 1.59 0 01-1.592 1.592 1.606 1.606 0 01-1.592-1.592c0-.892.7-1.592 1.592-1.592z"
        fill="url(#prefix__paint3_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={17.811}
          y1={13.159}
          x2={23.739}
          y2={16.54}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={2.763}
          y1={4.525}
          x2={9.402}
          y2={11.009}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={4.25}
          y1={12.575}
          x2={12.108}
          y2={23.513}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={10.528}
          y1={4.525}
          x2={17.168}
          y2={11.009}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default SvgComponent;
