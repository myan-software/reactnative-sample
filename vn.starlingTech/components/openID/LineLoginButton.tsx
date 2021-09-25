import React from 'react';
import {consoleLog} from '../../helpers/logHelper';
import {showAlertMessage, showMessageError} from '../../helpers/messageHelper';

import {CustomizeOpenIDButtonProps, OpenIDParams, SignInType} from './OpenID';
import AppButton from '../AppButton';
import Line from '@xmartlabs/react-native-line';

let accessToken = '';

export default (props: CustomizeOpenIDButtonProps) => {
  function successCallback(params: any) {
    props.onFound(params);
  }

  async function handleSignIn() {
    try {
      const loginResult = await Line.login();
      if (loginResult) {
        const {access_token} = loginResult.accessToken;
        if (access_token) {
          const signInParams: OpenIDParams = {
            accessToken: access_token,
            secretToken: '',
            provider: 'line',
            notFound: () => {
              showAlertMessage({message: 'LINE アカウントを見つかれません'});
            },
            success: successCallback,
          };
          props.onCheckAccountLink(signInParams);
        } else {
          showAlertMessage({message: 'LINE - access_token不在'});
        }
      } else {
        showAlertMessage({message: 'ログインエラー'});
      }
      consoleLog(loginResult, 'Line');
    } catch (error) {
      consoleLog(error, 'Line Error');
      showAlertMessage({message: 'ログインがキャンセルされました'});
    }
  }
  return (
    <AppButton {...props} onPress={handleSignIn}>
      {props.children}
    </AppButton>
  );
};
