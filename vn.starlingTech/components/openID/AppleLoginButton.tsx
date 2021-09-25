import React from 'react';
import {consoleLog} from '../../helpers/logHelper';
import {showAlertMessage, showMessageError} from '../../helpers/messageHelper';
import {
  appleAuth,
  appleAuthAndroid,
} from '@invertase/react-native-apple-authentication';

import {CustomizeOpenIDButtonProps, OpenIDParams, SignInType} from './OpenID';
import AppButton from '../AppButton';
import {Platform} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
let accessToken = '';

export default (props: CustomizeOpenIDButtonProps) => {
  function successCallback(params: any) {
    props.onFound(params);
  }

  async function handleSignIn() {
    props.onPress();

    if (Platform.OS === 'ios') {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      // console.log(appleAuthRequestResponse, 'appleAuthRequestResponse');

      consoleLog(appleAuthRequestResponse, 'appleAuthRequestResponse');

      // get current authentication state for user
      // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      // console.log(credentialState, 'credentialState');
      consoleLog(credentialState, 'credentialState');
      console.log(credentialState, 'credentialState');

      // // use credentialState response to ensure the user is authenticated
      if (credentialState === appleAuth.State.AUTHORIZED) {
        // user is authenticated
        const {identityToken, authorizationCode} = appleAuthRequestResponse;
        console.log(identityToken, 'identityToken');
        // console.log(identityToken);
        if (identityToken) {
          const signInParams: OpenIDParams = {
            accessToken: identityToken,
            secretToken: '',
            provider: 'apple',
            notFound: () => {
              showAlertMessage({message: 'Apple account Not found'});
            },
            success: successCallback,
          };
          props.onCheckAccountLink(signInParams);
        } else {
          showAlertMessage({message: 'Apple - can not get authorizationCode'});
        }
      }
    } else {
      if (!appleAuthAndroid.isSupported) {
        showAlertMessage({message: 'Apple authentication requires API 19+'});
        return;
      }
      // Configure the request
      appleAuthAndroid.configure({
        // The Service ID you registered with Apple
        clientId: 'com.selfproject.service',

        // Return URL added to your Apple dev console. We intercept this redirect, but it must still match
        // the URL you provided to Apple. It can be an empty route on your backend as it's never called.
        redirectUri: 'https://myan-soft.com/',

        // The type of response requested - code, id_token, or both.
        responseType: appleAuthAndroid.ResponseType.ALL,

        // The amount of user information requested from Apple.
        scope: appleAuthAndroid.Scope.ALL,

        // Random nonce value that will be SHA256 hashed before sending to Apple.
        nonce: getUniqueId(),

        // Unique state value used to prevent CSRF attacks. A UUID will be generated if nothing is provided.
        state: getUniqueId(),
      });

      // Open the browser window for user sign in
      const response = await appleAuthAndroid.signIn();
      consoleLog(response, 'Android:appleAuthRequestResponse');
      // console.log(response, 'Android:appleAuthRequestResponse');
      // console.log(response, 'response');

      // Send the authorization code to your backend for verification
      if (response) {
        const {id_token: identityToken} = response;
        // console.log(identityToken, 'identityToken');
        if (identityToken) {
          
          const signInParams: OpenIDParams = {
            accessToken: identityToken,
            secretToken: '',
            provider: 'apple',
            notFound: () => {
              showAlertMessage({message: 'Apple account Not found'});
            },
            success: successCallback,
          };
          props.onCheckAccountLink(signInParams);
        } else {
          showAlertMessage({message: 'Apple - can not get authorizationCode'});
        }
      }
    }
  }
  return (
    <AppButton {...props} onPress={handleSignIn}>
      {props.children}
    </AppButton>
  );
};
