import AppText from '@vn.starlingTech/components/AppText';
import AppleLoginButton from '@vn.starlingTech/components/openID/AppleLoginButton';
import GoogleLoginButton from '@vn.starlingTech/components/openID/GoogleLoginButton';
import LineLoginButton from '@vn.starlingTech/components/openID/LineLoginButton';
import TwitterLoginButton from '@vn.starlingTech/components/openID/TwitterLoginButton';
import CONSTANTS, {appSize} from '@vn.starlingTech/config/Constant';
import {consoleLog} from '@vn.starlingTech/helpers/logHelper';
import React, {useContext, useEffect} from 'react';
import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  Platform,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AppleIcon from '../../../assets/svg/AppleIcon';
import GoogleIcon from '../../../assets/svg/GoogleIcon';
import LineIcon from '../../../assets/svg/LineIcon';
import TwitterIcon from '../../../assets/svg/TwitterIcon';
import {AppContext} from '@vn.starlingTech/components/AppContext';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {OpenIDParams} from '@vn.starlingTech/components/openID/OpenID';
import {signIn} from 'src/helper/AccountHelper';
import TwitterLoginButtonAndroid from '@vn.starlingTech/components/openID/TwitterLoginButtonAndroid';

// import AppButton from '../../../vn.starlingTech/components/AppButton';
// import AppText from '../../../vn.starlingTech/components/AppText';
// import AppleLoginButton from '../../../vn.starlingTech/components/openID/AppleLoginButton';
// import GoogleLoginButton, {
//   GoogleParams,
// } from '../../../vn.starlingTech/components/openID/GoogleLoginButton';
// import LineLoginButton from '../../../vn.starlingTech/components/openID/LineLoginButton';
// import TwitterLoginButton from '../../../vn.starlingTech/components/openID/TwitterLoginButton';
// import CONSTANTS, {appSize} from '../../../vn.starlingTech/config/Constant';
// import {consoleLog} from '../../../vn.starlingTech/helpers/logHelper';
// import AppNetworking from '../../../vn.starlingTech/network/AppNetworking';

async function requestUserPermission() {
  let fcmToken = '';
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    // consoleLog('Authorization status:', authStatus);
    fcmToken = await messaging().getToken();
    consoleLog('fcmToken', fcmToken);
  }
  return fcmToken;
}

const PADDING_TOP = appSize(81); //(81 * CONSTANTS.width) / 375;

let fcmToken: string | null = '';

export default ({navigation}) => {
  const insets = useSafeAreaInsets();
  const context = useContext(AppContext);

  useEffect(() => {
    (async () => {
      fcmToken = await AsyncStorage.getItem(CONSTANTS.session.FCM_TOKEN);
      if (fcmToken) {
      } else {
        fcmToken = await requestUserPermission();
        if (fcmToken) {
          AsyncStorage.setItem(CONSTANTS.session.FCM_TOKEN, fcmToken);
        }
      }
    })();
  }, []);

  const checkAccountLink = async (params: OpenIDParams) => {
    signIn({params, fcmToken, context});
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require('../../../assets/images/loginBg.png')}
        style={{width: CONSTANTS.width, height: CONSTANTS.screenHeight}}
        resizeMode="cover">
        <ScrollView>
          <View style={[styles.container, {paddingTop: PADDING_TOP, flex: 1}]}>
            <View>
              <View
                style={{
                  minHeight:
                    CONSTANTS.height -
                    PADDING_TOP -
                    insets.bottom -
                    appSize(69.24),
                }}>
                <Image
                  resizeMode="contain"
                  source={require('../../../assets/images/logo.png')}
                  style={{
                    width: (196 * CONSTANTS.width) / 375,
                    height: (99 * CONSTANTS.width) / 375,
                    alignSelf: 'center',
                  }}
                />
                <View
                  style={{
                    height: appSize(83),
                    marginTop: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AppText center style={{color: 'white'}}>
                    <>
                      {'1人ではなく、誰かと一緒に始めてみませんか？'}
                      {'\n'}
                      {
                        'ここでは、活動を共にする「誰か」を見つけることができます。'
                      }
                    </>
                  </AppText>
                </View>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {Platform.OS === 'ios' ? (
                    <TwitterLoginButton
                      onCheckAccountLink={checkAccountLink}
                      onCancel={() => {}}
                      onFound={() => {}}
                      onPress={() => {}}
                      onNotFound={() => {}}
                      style={styles.btn}>
                      <>
                        <TwitterIcon />
                        <AppText style={styles.btnText}>
                          {'Twitter でログイン'}
                        </AppText>
                      </>
                    </TwitterLoginButton>
                  ) : (
                    <TwitterLoginButtonAndroid
                      onCheckAccountLink={checkAccountLink}
                      onCancel={() => {}}
                      onFound={() => {}}
                      onPress={() => {}}
                      onNotFound={() => {}}
                      style={styles.btn}>
                      <>
                        <TwitterIcon />
                        <AppText style={styles.btnText}>
                          {'Twitter でログイン'}
                        </AppText>
                      </>
                    </TwitterLoginButtonAndroid>
                  )}
                  <LineLoginButton
                    onCheckAccountLink={checkAccountLink}
                    onCancel={() => {}}
                    onFound={() => {}}
                    onPress={() => {}}
                    onNotFound={() => {}}
                    style={styles.btn}>
                    <>
                      <LineIcon />
                      <AppText style={styles.btnText}>
                        {'LINE でログイン'}
                      </AppText>
                    </>
                  </LineLoginButton>
                  <AppleLoginButton
                    onCheckAccountLink={checkAccountLink}
                    onCancel={() => {}}
                    onFound={(params) => {
                      consoleLog(params, 'params');
                    }}
                    onPress={() => {}}
                    onNotFound={() => {}}
                    style={styles.btn}>
                    <>
                      <AppleIcon />
                      <AppText style={styles.btnText}>
                        {'Apple でログイン'}
                      </AppText>
                    </>
                  </AppleLoginButton>
                  <GoogleLoginButton
                    onCheckAccountLink={checkAccountLink}
                    onCancel={() => {}}
                    onFound={() => {}}
                    onPress={() => {}}
                    onNotFound={() => {}}
                    style={styles.btn}>
                    <>
                      <GoogleIcon />
                      <AppText style={styles.btnText}>
                        {'Google でログイン'}
                      </AppText>
                    </>
                  </GoogleLoginButton>
                </View>
              </View>
              <View style={styles.bottomView}>
                <AppText center style={{color: 'white'}}>
                  <>
                    {'※個人のSNSに利用状況等が投稿されることはありません'}
                    {'\n'}
                    {'※ログインした時点で利用規約に同意したものとみなします'}
                  </>
                </AppText>
                <Pressable onPress={() => navigation.navigate('Policy')}>
                  <AppText center style={{color: '#FFF', marginTop: 16}}>
                    {'利用規約'}
                  </AppText>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    height: appSize(69.24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {marginLeft: 11, color: '#F71E24'},
  btn: {
    width: 233,
    height: 60,
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  container: {
    // alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    flex: 1,
  },
});
