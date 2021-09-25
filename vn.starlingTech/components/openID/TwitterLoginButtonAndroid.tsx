import React from 'react';
import {consoleLog} from '../../helpers/logHelper';
import {showAlertMessage, showMessageError} from '../../helpers/messageHelper';

import {CustomizeOpenIDButtonProps, OpenIDParams, SignInType} from './OpenID';
import AppButton from '../AppButton';
import {NativeModules} from 'react-native';
let accessToken = '';

const {RNTwitterSignIn} = NativeModules;
// const Constants = {
//   //Dev Parse keys
//   TWITTER_CONSUMER_KEY: 'bquBKMO6JF5prow7tLxKYT0Pq',
//   TWITTER_CONSUMER_SECRET: 'GkfoUDYMjknUqg2EkI6cX82OVATKRoeqwWvDdVjAIKuhDW1aUp',
// };
const Constants = {
  //Dev Parse keys
  TWITTER_CONSUMER_KEY: 'k4z3BHuiqPe5C1S0yfCkw6I3t',
  TWITTER_CONSUMER_SECRET: 'e4ePuzIZrSbmpZKyurcTxEQEWI6P6OW8TsLagyYvVNYU7rDEIR',
};

export default (props: CustomizeOpenIDButtonProps) => {
  function successCallback(params: any) {
    props.onFound(params);
  }

  async function handleSignIn() {
    RNTwitterSignIn.init(
      Constants.TWITTER_CONSUMER_KEY,
      Constants.TWITTER_CONSUMER_SECRET,
    );
    RNTwitterSignIn.logIn()
      .then((loginData: any) => {
        //console.log(loginData);
        const {authToken, authTokenSecret} = loginData;

        consoleLog(loginData, 'loginData');

        if (authToken && authTokenSecret) {
          const signInParams: OpenIDParams = {
            accessToken: authToken,
            secretToken: authTokenSecret,
            provider: 'twitter',
            notFound: () => {
              showAlertMessage({message: 'Not found'});
            },
            success: successCallback,
          };
          props.onCheckAccountLink(signInParams);
        }
      })
      .catch((error) => {
        consoleLog(error);
      });
  }
  return (
    <AppButton {...props} onPress={handleSignIn}>
      {props.children}
    </AppButton>
  );
};
