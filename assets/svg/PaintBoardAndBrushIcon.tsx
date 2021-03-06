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
        d="M21.17 4.737a.265.265 0 00-.462-.057c-.336.47-.776.627-1.286.809-.41.146-.836.297-1.296.627-.65.467-.947 1.103-.798 1.705l-.016.02a8.207 8.207 0 00-6.746-3.597c-2.338.001-4.576 1.046-6.14 2.869-1.556 1.813-2.245 4.173-1.892 6.475.03.193.067.387.11.578.575 2.531 2.044 4.456 4.03 5.282.49.204.983.307 1.467.307 1.203 0 2.253-.643 2.882-1.765.24-.427.394-.868.459-1.312.038-.262.012-.524-.014-.777-.026-.261-.05-.508-.011-.756.09-.57.488-.91 1.064-.91.164 0 .331.027.498.08a25.91 25.91 0 00-.528 1.02c-.33.673-.556 1.23-.675 1.656-.074.263-.268.961.206 1.29a.71.71 0 00.54.105c.18-.033.725-.134 2.274-1.898.416-.473.864-1.02 1.332-1.628 1.202-.405 2.138-1.412 2.385-2.57.062-.29.088-.6.077-.92a41.1 41.1 0 001.265-2.086c.576-.158 1.073-.606 1.364-1.234.426-.915.394-2.092-.088-3.313zm-6.498 4.336a1.127 1.127 0 01-1.56.355 1.124 1.124 0 01-.501-.708 1.124 1.124 0 01.146-.853 1.127 1.127 0 011.56-.355c.256.16.434.412.501.707s.015.598-.146.854zm1.47 2.05a50.454 50.454 0 011.752-2.426c.093.084.197.166.31.245.187.13.383.23.582.298a44.573 44.573 0 01-1.639 2.583c-1.038 1.53-2.117 2.95-3.039 4.001-.515.587-.966 1.04-1.313 1.32.134-.428.39-1.017.747-1.714.637-1.247 1.56-2.776 2.6-4.306zm-10.048-.006a1.128 1.128 0 01-1.103-.882 1.125 1.125 0 01.146-.854 1.127 1.127 0 011.561-.354 1.133 1.133 0 01-.604 2.09zm-1.187 2.492a1.127 1.127 0 011.561-.355c.256.162.434.412.5.707.068.295.016.598-.145.854a1.127 1.127 0 01-1.561.355 1.124 1.124 0 01-.5-.707 1.125 1.125 0 01.145-.854zm3.625-6.723a1.127 1.127 0 011.561-.355 1.133 1.133 0 01-.604 2.09 1.128 1.128 0 01-1.102-.88 1.124 1.124 0 01.145-.855z"
        fill="url(#prefix__paint0_linear)"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={4.4}
          y1={6.728}
          x2={17.44}
          y2={22.422}
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
