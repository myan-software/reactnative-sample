import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import colors from '../config/colors';

type Props = {style?: ViewStyle};

export default function Line({style}: Props) {
  return <View style={[styles.line, style]} />;
}

const styles = StyleSheet.create({
  line: {height: 0.5, flex: 1, backgroundColor: colors.border},
});
