import React, {useEffect, useState} from 'react';
import {consoleLog} from '../../helpers/logHelper';
import {showAlertMessage, showMessageError} from '../../helpers/messageHelper';

import {CustomizeOpenIDButtonProps, OpenIDParams, SignInType} from './OpenID';
import AppButton from '../AppButton';
// import {Alert, NativeModules} from 'react-native';
import {useTwitter} from './react-native-simple-twitter/dist';
import {Alert} from 'react-native';
import {Spinner} from 'native-base';
// let accessToken = '';
// import {useTwitter} from 'react-native-simple-twitter';

// const {RNTwitterSignIn} = NativeModules;
// const Constants = {
//   //Dev Parse keys
//   TWITTER_CONSUMER_KEY: 'GE5BTKUIwUu6SIqxNyd6jC9QG',
//   TWITTER_CONSUMER_SECRET: 'idSkDyFhkgGISapYWdvR32uPsdA7oBSiopEoyrKZ5X0eixIwZI',
// };
const Constants = {
  //Dev Parse keys
  TWITTER_CONSUMER_KEY: 'k4z3BHuiqPe5C1S0yfCkw6I3t',
  TWITTER_CONSUMER_SECRET: 'e4ePuzIZrSbmpZKyurcTxEQEWI6P6OW8TsLagyYvVNYU7rDEIR',
};

export default (props: CustomizeOpenIDButtonProps) => {
  const [token, setToken] = useState<{
    oauth_token: string;
    oauth_token_secret: string;
  }>({oauth_token: null, oauth_token_secret: null});

  const {twitter, TWModal} = useTwitter({
    onSuccess: (user, accessToken) => {
      // console.log(user, 'user');
      // console.log(accessToken, 'accessToken');
      // consoleLog(user, 'user');
      // consoleLog(accessToken, 'accessToken');
      setToken(accessToken);
    },
    onError: () => {
      // consoleLog('error');
      // Alert.alert('error');
    },
    onCancel: () => {
      showAlertMessage({message: 'ログインがキャンセルされました'});
    },
  });

  twitter.setConsumerKey(
    Constants.TWITTER_CONSUMER_KEY,
    Constants.TWITTER_CONSUMER_SECRET,
  );

  useEffect(() => {
    if (token.oauth_token && token.oauth_token_secret) {
      const signInParams: OpenIDParams = {
        accessToken: token.oauth_token,
        secretToken: token.oauth_token_secret,
        provider: 'twitter',
        notFound: () => {
          showAlertMessage({message: 'Not found'});
        },
        // success: successCallback,
      };
      props.onCheckAccountLink(signInParams);
    }
  }, [token]);

  // twitter.setConsumerKey(
  //   Constants.TWITTER_CONSUMER_KEY,
  //   Constants.TWITTER_CONSUMER_SECRET,
  // );

  // useEffect(() => {
  //   RNTwitterSignIn.init(
  //     Constants.TWITTER_CONSUMER_KEY,
  //     Constants.TWITTER_CONSUMER_SECRET,
  //   );
  //   // twitter.setConsumerKey(
  //   //   Constants.TWITTER_CONSUMER_KEY,
  //   //   Constants.TWITTER_CONSUMER_SECRET,
  //   // );
  // }, []);

  // useEffect(() => {
  //   if (token.oauth_token && token.oauth_token_secret) {
  //     const saveToAsyncStorage = async () => {
  //       Alert.alert('Success', 'ログインできました', [
  //         {
  //           text: 'Go HomeScreen',
  //           onPress: () => {
  //             // props.navigation.replace('Home', {user: me});
  //           },
  //         },
  //       ]);
  //     };

  //     saveToAsyncStorage();
  //   }
  // }, [token]);

  // function successCallback(params: any) {
  //   props.onFound(params);
  // }

  const onLoginPress = async () => {
    try {
      await twitter.login();
    } catch (e) {
      consoleLog(e.errors, 'twitterError');
    }
  };

  // async function handleSignIn() {
  //   // Perform the login request
  //   // try {
  //   const {authToken, authTokenSecret} = await RNTwitterSignIn.logIn();
  //   // RNTwitterSignIn.logIn()
  //   //   .then((loginData: any) => {
  //   //     console.log(loginData);
  //   //     const {authToken, authTokenSecret} = loginData;

  //   consoleLog(authToken, 'authToken');

  //   // const twitterCredential = auth.TwitterAuthProvider.credential(
  //   //   authToken,
  //   //   authTokenSecret,
  //   // );

  //   // const abc = auth().signInWithCredential(twitterCredential);
  //   // console.log(abc, 'abc');

  //   if (authToken && authTokenSecret) {
  //     const signInParams: OpenIDParams = {
  //       accessToken: authToken,
  //       secretToken: authTokenSecret,
  //       provider: 'twitter',
  //       notFound: () => {
  //         showAlertMessage({message: 'Not found'});
  //       },
  //       // success: successCallback,
  //     };
  //     props.onCheckAccountLink(signInParams);
  //   }
  //   // } catch (error) {
  //   //   consoleLog(error, 'twitter error!');
  //   // }
  // }
  return (
    <>
      <AppButton {...props} onPress={onLoginPress}>
        {props.children}
      </AppButton>
      <TWModal />
    </>
  );
};
