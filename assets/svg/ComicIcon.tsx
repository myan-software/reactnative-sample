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
        d="M6.82 15.478h2.867v2.867H6.82v-2.867z"
        fill="url(#prefix__paint0_linear)"
      />
      <Path
        d="M10.834 15.478h2.867v2.867h-2.867v-2.867z"
        fill="url(#prefix__paint1_linear)"
      />
      <Path
        d="M20.599 5.97a.573.573 0 00-.375-.396 4.598 4.598 0 01-1.835-1.129c-.52-.52-.9-1.137-1.129-1.835a.573.573 0 00-.927-.248 4.644 4.644 0 01-4.048 1.085.574.574 0 00-.679.678 4.6 4.6 0 01-.06 2.154 4.597 4.597 0 01-1.025 1.895.573.573 0 00.249.927 4.597 4.597 0 011.835 1.128c.52.52.9 1.138 1.128 1.835a.573.573 0 00.927.249 4.648 4.648 0 014.048-1.085.573.573 0 00.68-.679 4.598 4.598 0 01.06-2.153c.19-.71.535-1.348 1.024-1.895a.574.574 0 00.127-.531z"
        fill="url(#prefix__paint2_linear)"
      />
      <Path
        d="M13.7 13.505c-.5-.178-.89-.574-1.057-1.084a3.466 3.466 0 00-.407-.841H6.82v2.752h6.88v-.827z"
        fill="url(#prefix__paint3_linear)"
      />
      <Path
        d="M9.287 9.001a1.715 1.715 0 01.051-1.052H6.82v2.484h4.16a3.5 3.5 0 00-.568-.243 1.715 1.715 0 01-1.125-1.189z"
        fill="url(#prefix__paint4_linear)"
      />
      <Path
        d="M15.425 13.167c-.17.152-.367.267-.578.341v5.41a.573.573 0 01-.573.573H6.247a.573.573 0 01-.573-.573V7.375c0-.316.257-.573.573-.573h3.856c.146-.256.258-.53.335-.82.13-.487.155-.981.073-1.473H3.954a.573.573 0 00-.573.573v16.13c0 .316.257.572.573.572h12.613a.573.573 0 00.573-.573v-8.88a3.461 3.461 0 00-1.715.836z"
        fill="url(#prefix__paint5_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={7.114}
          y1={15.937}
          x2={9.565}
          y2={18.33}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={11.127}
          y1={15.937}
          x2={13.578}
          y2={18.33}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={11.424}
          y1={3.855}
          x2={20.181}
          y2={12.408}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={7.525}
          y1={12.02}
          x2={9.175}
          y2={16.051}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint4_linear"
          x1={7.246}
          y1={8.346}
          x2={9.138}
          y2={11.439}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint5_linear"
          x1={4.789}
          y1={7.274}
          x2={19.11}
          y2={18.413}
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
