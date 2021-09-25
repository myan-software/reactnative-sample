import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import colors from '../constant/color';
import layout from '../constant/layout';
import images from '../assets/images';
var linerHeader = {
  colors: colors.linearGradient,
  start: {x: 0.14, y: 0.1},
  end: {x: 0.3, y: 3},
  locations: [0, 0.3, 1],
};
if (getStatusBarHeight() > 20) {
  linerHeader = {
    colors: colors.linearGradient,
    start: {x: 0.13, y: 0.1},
    end: {x: 0.3, y: 3},
    locations: [0, 0.3, 0.6],
  };
}
export default class HeaderApp extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goToNotification = () => this.props.navigation.navigate('Notification');
  goToAccount = () => this.props.navigation.navigate('Account');
  render() {
    return (
      <LinearGradient {...linerHeader} style={this.props.aspectRatio ? styles.linearGradient2 : styles.linearGradient}>
        <Ripple style={styles.btProfile} onPress={this.goToAccount}>
          <FastImage source={images.iconProfile} style={styles.icon} />
        </Ripple>
        <FastImage source={images.logoHeader} style={styles.logo} />
        <Ripple style={styles.btNoti} onPress={this.goToNotification}>
          <FastImage source={images.iconNoti} style={styles.icon} />
        </Ripple>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: getStatusBarHeight() + 4,
    paddingBottom: 4,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  linearGradient2: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    aspectRatio: 425 / 140,
    paddingBottom: 0
    ,
  },
  icon: {
    width: 24,
    aspectRatio: 1,
  },
  logo: {
    width: '45.33%',
    aspectRatio: 511 / 102,
  },
  btProfile: {
    width: 42,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btNoti: {
    width: 42,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
