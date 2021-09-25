import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ContextType,
  UserProfileType,
} from '@vn.starlingTech/components/AppContext';
import {OpenIDParams} from '@vn.starlingTech/components/openID/OpenID';
import CONSTANTS from '@vn.starlingTech/config/Constant';
import {consoleLog} from '@vn.starlingTech/helpers/logHelper';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import moment from 'moment';
import {Platform} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import handleStore from 'src/redux/handleStore';
import {TypeGoogleSignIn} from 'src/types/signIn';

type SignInProps = {
  params: OpenIDParams;
  fcmToken: string | null;
  context?: ContextType;
};
export const signIn = async (props: SignInProps) => {
  consoleLog(props, 'SignInProps');
  const {accessToken, secretToken, provider} = props.params;
  const networking = new AppNetworking();
  networking.init({
    showErrorType: props.context ? 'ALERT' : 'MANUAL',
    url: API.SIGN_IN,
    params: {
      device_id: getUniqueId(),
      fcm_token: props.fcmToken || '',
      access_token: accessToken,
      access_token_secret: secretToken,
      type: provider,
      platform: Platform.OS,
    },
  });
  const {data, status, message} = await networking.postToServer();
  if (isSuccessResponse(status)) {
    const response: TypeGoogleSignIn = data;
    const userProfile: UserProfileType = {
      id: response.id,
      name: response.name,
      email: response.email,
      token: accessToken,
      avatar: response.avatar,
      subscription: response.expire_date
        ? moment().isBefore(moment(response.expire_date))
        : false,
    };

    AsyncStorage.setItem(CONSTANTS.session.ACCESS_TOKEN, accessToken);
    AsyncStorage.setItem(CONSTANTS.session.SECRET_TOKEN, secretToken || '');
    AsyncStorage.setItem(CONSTANTS.session.SIGN_IN_TYPE, provider);

    //redux store
    handleStore.setToken(accessToken, secretToken);
    handleStore.setTypeLogin(provider);

    if (props.context) {
      props.context.signIn(userProfile);
    }
    return userProfile;
  }
  consoleLog(data, status, message);
  return null;
};
