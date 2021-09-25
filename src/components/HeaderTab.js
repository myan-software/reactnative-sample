import React, {PureComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ripple from 'react-native-material-ripple';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import colors from '../constant/color';
import CustomText from '../components/CustomText';
var linerHeader = {
  colors: colors.linearGradient,
  start: {x: 0.14, y: 0.1},
  end: {x: 0.35, y: 2.6},
  locations: [0, 0.3, 1],
};
if (getStatusBarHeight() > 20) {
  linerHeader = {
    colors: colors.linearGradient,
    start: {x: 0.13, y: 0.1},
    end: {x: 0.5, y: 2.85},
    locations: [0, 0.3, 0.6],
  };
}
export default class HeaderTab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => this.props.navigation.goBack();
  render() {
    let {title} = this.props;
    return (
      <LinearGradient {...linerHeader} style={styles.linearGradient}>
        <View style={styles.wrapBack}>
          <Ripple style={styles.btBack} onPress={this.goBack}>
            <AntDesign name="arrowleft" color="#fff" size={28} />
          </Ripple>
          <CustomText style={styles.titleBack}>{title || ''}</CustomText>
        </View>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: getStatusBarHeight() + 4,
    paddingBottom: 4,
    width: '100%',
    aspectRatio: 375 / 140,
  },
  btBack: {
    width: 52,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapBack: {
    flexDirection: 'row',
    paddingTop: '2%',
    alignItems: 'center',
  },
  titleBack: {
    fontSize: 12,
    color: '#fff',
  },
});
