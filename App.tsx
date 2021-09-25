import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import moment from 'moment';
import ja from 'moment/locale/ja';
moment.locale('ja', ja);
// import {Root} from 'native-base';
// import AuthNavigator from 'navigation/AuthNavigator';
// import MainNavigator from 'navigation/MainNavigator';
import React, {useEffect} from 'react';
import {ActivityIndicator, LogBox, View, StatusBar} from 'react-native';

import FlashMessage from 'react-native-flash-message';
import {SafeAreaProvider} from 'react-native-safe-area-context';
// import {AppContext, UserProfileType} from 'starling-tech/components/AppContext';
import SplashScreen from 'react-native-splash-screen';

// import {consoleLog} from './vn.starlingTech/helpers/logHelper';
// import { Provider } from "react-native-paper";
import getTheme from '@vn.starlingTech/native-base-theme/components';
import commonColor from '@vn.starlingTech/native-base-theme/variables/commonColor';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

import('./vn.starlingTech/config/ReactotronConfig');

// if (!settings.FOR_DEV) {
LogBox.ignoreLogs(['VirtualizedLists']);
// }

import store from './src/redux/store';
import {
  AppContext,
  UserProfileType,
} from './vn.starlingTech/components/AppContext';
import AuthNavigator from './src/navigation/AuthNavigator';
import Stack from './src/navigation/Stack';
import * as Modals from './src/modals';
import {StyleProvider} from 'native-base';
import CONSTANTS from '@vn.starlingTech/config/Constant';
import {signIn} from 'src/helper/AccountHelper';
import {OpenIDParams} from '@vn.starlingTech/components/openID/OpenID';
import {consoleLog} from '@vn.starlingTech/helpers/logHelper';
import {googleSignOut} from '@vn.starlingTech/components/openID/GoogleLoginButton';
// import MainNavigator from 'navigation/MainNavigator';
// import AuthNavigator from 'navigation/AuthNavigator';

type State = {
  isLoading: boolean;
  isSignOut: boolean;
  notification: number;
  user?: UserProfileType | null;
  allUsers?: UserProfileType[];
  // subscription?: boolean;
};

type ActionType = {
  type:
    | 'NO_TOKEN'
    | 'RESTORE_TOKEN'
    | 'SIGN_IN'
    | 'SIGN_OUT'
    | 'NOTIFICATION_BADGE'
    | 'SUBSCRIPTION';
  user?: UserProfileType | null;
  notification?: number;
  subscription?: boolean;
};

const initialState: State = {
  isLoading: true,
  isSignOut: false,
  notification: 0,
  user: null,
  // subscription: false,
};

function reducer(prevState: State, action: ActionType): State {
  switch (action.type) {
    case 'NO_TOKEN':
      return {
        ...prevState,
        user: null,
        isLoading: false,
      };
    case 'RESTORE_TOKEN':
      return {
        ...prevState,
        user: action?.user,
        isLoading: false,
      };
    case 'NOTIFICATION_BADGE':
      return {
        ...prevState,
        notification: action.notification || 0,
      };
    case 'SIGN_IN':
      return {
        ...prevState,
        isLoading: false,
        isSignOut: false,
        user: action.user,
      };
    case 'SIGN_OUT':
      return {
        ...prevState,
        isLoading: false,
        isSignOut: true,
        user: null,
      };
    case 'SUBSCRIPTION':
      return {
        ...prevState,
        user: prevState.user
          ? {...prevState.user, ...{subscription: action.subscription || false}}
          : null,
      };
    default:
      return prevState;
  }
}

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token: any) {
    consoleLog('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification: any) {
    consoleLog('NOTIFICATION:', notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification: any) {
    consoleLog('ACTION:', notification.action);
    consoleLog('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err: any) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// Register background handler
messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  consoleLog('Message handled in the background!', remoteMessage);
});

function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      consoleLog('A new FCM message arrived!', remoteMessage);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    SplashScreen.hide();
    const bootstrapAsync = async () => {
      const accessToken = await AsyncStorage.getItem(
        CONSTANTS.session.ACCESS_TOKEN,
      );
      const secretToken = await AsyncStorage.getItem(
        CONSTANTS.session.SECRET_TOKEN,
      );
      const signInType = await AsyncStorage.getItem(
        CONSTANTS.session.SIGN_IN_TYPE,
      );
      const fcmToken = await AsyncStorage.getItem(CONSTANTS.session.FCM_TOKEN);

      if (accessToken && signInType) {
        const params: OpenIDParams = {
          accessToken,
          secretToken: secretToken || '',
          provider: signInType,
        };
        const userProfile = await signIn({params, fcmToken});
        if (userProfile) {
          consoleLog('signed');
          dispatch({type: 'SIGN_IN', user: userProfile});
        } else {
          consoleLog('sign in failed');
          dispatch({type: 'NO_TOKEN'});
        }
      } else {
        consoleLog('noToken');
        dispatch({type: 'NO_TOKEN'});
      }
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: (user: UserProfileType) => dispatch({type: 'SIGN_IN', user}),
      signOut: async () => {
        const provider = await AsyncStorage.getItem(
          CONSTANTS.session.SIGN_IN_TYPE,
        );
        //sign out google on device
        if (provider === 'google') {
          googleSignOut();
        }
        AsyncStorage.removeItem(CONSTANTS.session.ACCESS_TOKEN);
        AsyncStorage.removeItem(CONSTANTS.session.SECRET_TOKEN);
        dispatch({type: 'SIGN_OUT'});
      },
      setNotificationBadge: (total: number) => {
        dispatch({type: 'NOTIFICATION_BADGE', notification: total});
      },
      setSubscription: (subscription: boolean) => {
        dispatch({type: 'SUBSCRIPTION', subscription});
      },
    }),
    [],
  );

  if (state.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <AppContext.Provider
      value={{
        ...authContext,
        user: state.user || null,
        notification: state.notification,
        // subscription: state.subscription || false,
      }}>
      {/* <Root> */}
      <SafeAreaProvider>
        <StyleProvider style={getTheme(commonColor)}>
          <Provider store={store}>
            <View style={{flex: 1}}>
              <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle="light-content"
              />
              <NavigationContainer>
                {/* <AppNavigator /> */}
                {state.user ? (
                  <Stack dispatchApp={dispatch} />
                ) : (
                  <AuthNavigator />
                )}
              </NavigationContainer>
              <Modals.ComfirmBox />
              <Modals.Message />
              <Modals.Loading />
            </View>
          </Provider>
        </StyleProvider>
      </SafeAreaProvider>
      <FlashMessage position="top" />
      {/* </Root> */}
    </AppContext.Provider>
  );
}
export default App;
