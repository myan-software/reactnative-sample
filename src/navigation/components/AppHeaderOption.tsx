import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../../../vn.starlingTech/config/colors';
// import {HeaderAccount, HeaderNotification} from '../../components/AppHeader';

export const AppHeaderOptions: StackHeaderOptions = {
  headerStyle: {backgroundColor: colors.primary},
  headerTintColor: '#FFF',
  headerBackTitleVisible: false,
  // headerTitleAlign: 'center',
  headerRight: () => (
    <View style={styles.headerRight}>
      {/* <HeaderNotification />
      <HeaderAccount /> */}
    </View>
  ),
};

const styles = StyleSheet.create({
  headerRight: {alignItems: 'center', flexDirection: 'row', marginRight: 16},
});
