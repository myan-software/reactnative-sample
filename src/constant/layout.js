import {Dimensions, Platform} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import colors from './color';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
// window: reports width/height without the soft menu bar
// screen: reports entire screen's width/height
export default {
  window: {
    width,
    height,
  },
  screen: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  isSmallDevice: width < 375,
  isLageDevice: Platform.isPad,
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  masterSize: (size) => {
    return RFValue(size, Dimensions.get('screen').height);
  },
  linearButton: {
    colors: colors.linearGradient,
    start: {x: 0.13, y: 0.1},
    end: {x: 0.3, y: 3},
    locations: [0, 0.3, 0.6],
  },
};
