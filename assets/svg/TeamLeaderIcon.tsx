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
        d="M6.094 9.367a2.137 2.137 0 01-2.135-2.135c0-1.177.957-2.134 2.135-2.134 1.177 0 2.134.957 2.134 2.134a2.137 2.137 0 01-2.134 2.135z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M17.906 9.367a2.137 2.137 0 01-2.134-2.135c0-1.177.957-2.134 2.134-2.134 1.178 0 2.135.957 2.135 2.134a2.137 2.137 0 01-2.135 2.135z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M12 8.229A2.672 2.672 0 019.33 5.56 2.672 2.672 0 0112 2.892a2.672 2.672 0 012.669 2.668A2.672 2.672 0 0112 8.23z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        d="M12.533 8.282v3.682a.533.533 0 11-1.067 0V8.282c-1.806.262-3.202 1.805-3.202 3.682v3.202c0 .295.238.534.533.534h1.196l.407 4.92a.533.533 0 00.532.488h2.135a.533.533 0 00.531-.489l.408-4.919H15.2a.533.533 0 00.534-.534v-3.202c0-1.877-1.396-3.42-3.202-3.682z"
        fill="url(#prefix__paint3_linear)"
      />
      <Path
        d="M7.161 15.238v-3.202c0-.8.215-1.544.563-2.208a3.167 3.167 0 00-1.63-.46 3.206 3.206 0 00-3.202 3.201v2.669c0 .295.238.533.533.533h.585l.485 4.857c.027.272.257.48.531.48h2.135a.534.534 0 00.531-.48l.395-3.944a1.6 1.6 0 01-.926-1.446z"
        fill="url(#prefix__paint4_linear)"
      />
      <Path
        d="M21.108 12.57a3.206 3.206 0 00-3.202-3.203c-.598 0-1.15.175-1.63.461.347.664.563 1.408.563 2.208v3.202a1.6 1.6 0 01-.926 1.446l.395 3.944c.027.272.256.48.53.48h2.135a.534.534 0 00.531-.48l.486-4.857h.584a.533.533 0 00.534-.533v-2.669z"
        fill="url(#prefix__paint5_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={4.396}
          y1={5.781}
          x2={8.046}
          y2={9.346}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={16.209}
          y1={5.781}
          x2={19.859}
          y2={9.346}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={9.877}
          y1={3.746}
          x2={14.44}
          y2={8.202}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={9.028}
          y1={10.335}
          x2={18.457}
          y2={15.7}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint4_linear"
          x1={3.423}
          y1={11.246}
          x2={10.736}
          y2={14.406}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint5_linear"
          x1={16.445}
          y1={11.246}
          x2={23.758}
          y2={14.406}
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
