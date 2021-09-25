import React, {Component, PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import colors from '../constant/color';

import CustomText from './CustomText';
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
type props = {
  RightComponent?: Element | Component,
  CenterComponent?: Element | Component,
  title: String,
  navigation: Object,
  onGoBack?: () => void,
};
export default class HeaderScreen extends PureComponent<props> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () =>
    this.props.onGoBack
      ? this.props.onGoBack()
      : this.props.navigation.goBack();
  render() {
    let {title, RightComponent, CenterComponent} = this.props;
    return (
      <LinearGradient {...linerHeader} style={styles.linearGradient}>
        <Ripple style={styles.btBack} onPress={this.goBack}>
          <AntDesign name="arrowleft" color="#fff" size={28} />
        </Ripple>
        {CenterComponent ? (
          CenterComponent
        ) : (
          <CustomText style={styles.title}>{title}</CustomText>
        )}
        {RightComponent ? RightComponent : null}
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
  },
  btBack: {
    width: 52,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    flex: 1,
  },
});
