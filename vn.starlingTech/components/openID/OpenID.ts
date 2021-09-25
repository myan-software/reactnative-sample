import {ReactElement} from 'react';
import {ViewStyle} from 'react-native';

export type SignInType = {
  accessToken: string;
  provider: 'facebook' | 'google';
  notFound: () => void;
  success: (params: any) => void;
};

export type OpenIDButtonProps = {
  style?: ViewStyle;
  onCancel?: () => void;
  onPress: () => void;
  onNotFound?: (params: any) => void;
  onFound?: (params: any) => void;
};

export type CustomizeOpenIDButtonProps = OpenIDButtonProps & {
  onCheckAccountLink: (params: OpenIDParams) => void;
  children: ReactElement;
};

export type OpenIDParams = {
  accessToken: string;
  secretToken?: string;
  provider: 'google' | 'twitter' | 'apple' | 'line';
  notFound?: () => void;
  success?: (_params: any) => void;
};
