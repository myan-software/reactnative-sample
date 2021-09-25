import React from 'react';
import {Spinner} from 'native-base';
import {View} from 'react-native';
import Styles from './Styles';

export default function Fade({visible}: {visible: boolean}) {
  return (
    (visible && (
      <View style={Styles.fade}>
        <Spinner color="#FFF" />
      </View>
    )) ||
    null
  );
}
