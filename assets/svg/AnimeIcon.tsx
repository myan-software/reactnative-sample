import * as React from "react"
import Svg, {
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
  SvgProps
} from "react-native-svg"

function SvgComponent(props:SvgProps) {
  return (
    <Svg
      width={25}
      height={24}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M12.75 2c-5.513 0-10 4.487-10 10s4.487 10 10 10 10-4.487 10-10-4.487-10-10-10zm0 1.146c4.637 0 8.45 3.582 8.821 8.124-.496-.171-1.11-.077-1.526.028.223-1.483-.177-3.138-.2-3.23l-.099-.403-6.63 3.04.266.343a9.627 9.627 0 001.499 1.575l-8.174 1.775c-.995.14-1.657.524-1.966 1.144-.02.04-.035.08-.05.12A8.821 8.821 0 013.895 12c0-4.883 3.971-8.854 8.854-8.854zm6.257 9.126c-.218.35-.517.563-.913.648l-.07.023c-.002.002-.194.084-.529.084-.604 0-1.808-.278-3.299-2.06l5.065-2.324c.148.809.379 2.618-.254 3.63zm-3.375.877c.738.435 1.376.564 1.865.564.403 0 .674-.089.775-.129a2.053 2.053 0 001.319-.95c.108-.173.195-.363.265-.564.152-.056.437-.14.739-.184-.676 3.422-1.52 4.06-1.967 4.13-.707.114-1.474-.965-1.707-1.39l-.12-.214-7.96 1.407-.008.28c-.05 1.579-.421 1.853-.577 1.896-.614.175-1.956-1.313-2.701-2.413.258-.257.68-.426 1.262-.507l8.73-1.894a.287.287 0 00.085-.032zm-5.053 7.436c.08-.393.262-.855.472-.911.167-.042.532.164 1.051.878l.131.18 3.692-.777.052-.21c.168-.674.503-1.259.659-1.266.003 0 .276.042.676 1.107a8.805 8.805 0 01-4.564 1.27 8.983 8.983 0 01-2.169-.27z"
          fill="url(#prefix__paint0_linear)"
        />
        <Path
          d="M7.19 13.757c.1.04.371.13.775.13.936 0 2.408-.464 4.114-2.668l.266-.342-6.63-3.04-.1.403c-.029.122-.724 2.997.254 4.567.313.5.756.819 1.32.95zM6.2 8.815l5.064 2.322c-1.492 1.783-2.697 2.061-3.3 2.061-.331 0-.523-.082-.523-.082l-.074-.024a1.374 1.374 0 01-.913-.648c-.63-1.012-.402-2.82-.255-3.63z"
          fill="url(#prefix__paint1_linear)"
        />
        <Path
          d="M10.492 6.832a.233.233 0 00.049-.005c.05-.01 1.226-.278 1.647-1.156.227-.475.188-1.025-.116-1.633a.23.23 0 00-.41.204c.237.474.276.888.113 1.228-.32.676-1.322.907-1.33.908a.23.23 0 00-.175.273c.021.11.115.181.222.181z"
          fill="url(#prefix__paint2_linear)"
        />
        <Path
          d="M10.846 7.716a.23.23 0 00.205.41c.005-.003.595-.291 1.165-.027.45.207.779.705.972 1.482a.227.227 0 00.278.166.23.23 0 00.168-.278c-.23-.918-.643-1.519-1.226-1.788-.767-.353-1.528.02-1.562.035z"
          fill="url(#prefix__paint3_linear)"
        />
        <Path
          d="M13.986 5.313c.257.176.563.265.914.265.299 0 .63-.062.992-.19a.228.228 0 10-.152-.431c-.645.225-1.148.22-1.493-.018-.519-.356-.55-1.138-.55-1.147a.226.226 0 00-.236-.222.231.231 0 00-.224.236c.004.04.039 1.018.75 1.507z"
          fill="url(#prefix__paint4_linear)"
        />
        <Path
          d="M14.804 7.217c-.329.441-.33 1.093-.002 1.933a.23.23 0 10.428-.166c-.262-.672-.283-1.188-.058-1.492.313-.422 1.024-.373 1.029-.372a.23.23 0 00.246-.21.228.228 0 00-.21-.245c-.04-.006-.967-.074-1.433.552z"
          fill="url(#prefix__paint5_linear)"
        />
      </G>
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={4.797}
          y1={5.201}
          x2={21.897}
          y2={21.901}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint1_linear"
          x1={6.065}
          y1={8.805}
          x2={11.2}
          y2={14.605}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint2_linear"
          x1={10.477}
          y1={4.379}
          x2={12.814}
          y2={5.995}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint3_linear"
          x1={11.018}
          y1={7.886}
          x2={12.864}
          y2={10.252}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint4_linear"
          x1={13.525}
          y1={3.891}
          x2={15.163}
          y2={6.127}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <LinearGradient
          id="prefix__paint5_linear"
          x1={14.75}
          y1={7.082}
          x2={16.869}
          y2={8.567}
          gradientUnits="userSpaceOnUse"
        >
          <Stop stopColor="#833AB4" />
          <Stop offset={0.5} stopColor="#FD1D1D" />
          <Stop offset={1} stopColor="#FCB045" />
        </LinearGradient>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" transform="translate(2.75 2)" d="M0 0h20v20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent
