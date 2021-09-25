import React from 'react';
import {consoleLog} from '../../helpers/logHelper';
import {showMessageError} from '../../helpers/messageHelper';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {CustomizeOpenIDButtonProps, OpenIDParams, SignInType} from './OpenID';
import AppButton from '../AppButton';

GoogleSignin.configure();

let accessToken = '';

export async function googleSignOut() {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    // this.setState({user: null}); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
}

export default function GoogleLoginButton(props: CustomizeOpenIDButtonProps) {
  function successCallback(params: any) {
    props.onFound(params);
  }

  async function handleGoogleLogin() {
    props.onPress();
    try {
      await GoogleSignin.hasPlayServices();
      let currentUser = await GoogleSignin.getCurrentUser();
      // consoleLog(currentUser, 'currentUser');
      if (!currentUser) {
        currentUser = await GoogleSignin.signIn();
        // consoleLog(userInfo, 'userInfo');
      }

      const {
        email,
        givenName: firstName,
        familyName: lastName,
      } = currentUser.user;
      const params = {
        email,
        firstName,
        lastName,
        provider: 'google',
        accessToken,
      };

      const dataToken = await GoogleSignin.getTokens();
      const signInParams: OpenIDParams = {
        accessToken: dataToken.accessToken,
        provider: 'google',
        notFound: () => props.onNotFound && props.onNotFound(params),
        success: successCallback,
      };
      props.onCheckAccountLink(signInParams);
      // consoleLog(dataToken, 'userInfo');
      // this.setState({ userInfo });
    } catch (error) {
      props.onCancel();
      consoleLog(error, 'handleGoogleLogin');
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        //   // user cancelled the login flow
        showMessageError('ログインがキャンセルされました');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        //   // operation (e.g. sign in) is in progress already
        showMessageError('IN_PROGRESS');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        //   // play services not available or outdated
        showMessageError('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
        //   // some other error happened
        showMessageError('Other Error');
      }
    }
  }
  return (
    <AppButton {...props} onPress={handleGoogleLogin}>
      {props.children}
    </AppButton>
  );
}
