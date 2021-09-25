import AppButton from '@vn.starlingTech/components/AppButton';
import {Header, Left} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import colors from 'src/constant/color';

const bigger = getStatusBarHeight() > 20;

const linerHeader = {
  colors: colors.linearGradient,
  start: bigger ? {x: 0.13, y: 0.1} : {x: 0.14, y: 0.1},
  end: bigger ? {x: 0.5, y: 2.85} : {x: 0.35, y: 2.6},
  locations: bigger ? [0, 0.3, 0.6] : [0, 0.3, 1],
};

export default (params) => {
  return (
    <LinearGradient {...linerHeader} style={styles.linearGradient}>
      <Header transparent>
        <Left>
          <AppButton
            radius={10}
            default
            onPress={() => navigation.navigate('Account')}
            style={styles.headerBtnLeft}>
            <UserIcon />
          </AppButton>
        </Left>
        <
      </Header>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    paddingTop: getStatusBarHeight() + 4,
    paddingBottom: 4,
    width: '100%',
    aspectRatio: 375 / 140,
  },
  headerBtnLeft: {
    backgroundColor: 'transparent',
    alignSelf: 'auto',
    marginLeft: 14,
  },
  container: {
    flex: 1,
  },
});
