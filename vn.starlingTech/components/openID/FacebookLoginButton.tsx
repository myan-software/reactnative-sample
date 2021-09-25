import React from 'react';
import {
  LoginManager,
  AccessToken,
  GraphRequestManager,
  GraphRequest,
} from 'react-native-fbsdk';
import {consoleLog} from '../../helpers/logHelper';
import {showMessageError} from '../../helpers/messageHelper';
import Ripple from 'react-native-material-ripple';
import {CustomizeOpenIDButtonProps, SignInType} from './OpenID';

let accessToken = '';

export default function FacebookLoginButton(props: CustomizeOpenIDButtonProps) {
  function getProfileCallback(error?: Object, profile?: any) {
    if (error) {
      showMessageError(error.toString());
    } else if (profile) {
      const {email, first_name: firstName, last_name: lastName} = profile;
      const params = {
        email,
        firstName,
        lastName,
        provider: 'facebook',
        accessToken,
      };
      props.onNotFound && props.onNotFound(params);
      // consoleLog(profile, 'result');
      // alert('Success fetching data: ' + result.toString());
    }
  }

  function notFoundCallback() {
    const infoRequest = new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email,first_name,last_name,middle_name',
          },
        },
      },
      getProfileCallback,
    );
    // Start the graph request.
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  function successCallback(params: any) {
    props.onFound(params);
  }

  function handleFacebookLogin() {
    props.onPress();
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      // 'user_friends',
    ]).then(
      function (result) {
        // consoleLog(result, 'handleFacebookLogin');
        if (result.isCancelled) {
          props.onCancel();
          // console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            if (data) {
              accessToken = data.accessToken;
              const signInParams: SignInType = {
                accessToken,
                provider: 'facebook',
                notFound: notFoundCallback,
                success: successCallback,
              };
              props.onCheckAccountLink(signInParams);
            }
            // consoleLog(data?.accessToken, 'AccessToken');
          });
        }
      },
      function (error) {
        showMessageError(error);
        // console.log('Login fail with error: ' + error);
      },
    );
  }
  return (
    <Ripple {...props} onPress={handleFacebookLogin}>
      {props.children}
    </Ripple>
  );
}
