import {Dimensions, Platform} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const CONSTANTS = {
  width: windowWidth,
  height: windowHeight,
  screenWidth,
  screenHeight,
  UI_WIDTH: 375,
  LIST_SIZE: 12,
  IS_IOS: Platform.OS === 'ios',
  SMALL_DEVICE: windowWidth <= 375,
  session: {
    ACCESS_TOKEN: 'ACCESS_TOKEN',
    SECRET_TOKEN: 'SECRET_TOKEN',
    FCM_TOKEN: 'FCM_TOKEN',
    SIGN_IN_TYPE: 'SIGN_IN_TYPE',
  },
  purchase: {
    PRODUCT_ID: 'MONTHLY',
  },
};

export function appSize(size: number) {
  return (CONSTANTS.width * size) / CONSTANTS.UI_WIDTH;
}

export default CONSTANTS;
