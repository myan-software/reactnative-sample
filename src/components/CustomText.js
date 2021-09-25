import React, {Component} from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import colors from '../constant/color';

export default class CustomText extends Component<TextProps> {
  render() {
    const {children, style, ...props} = this.props;
    return (
      <Text {...props} style={[styles.font, style]}>
        {children}
      </Text>
    );
  }
}
const styles = StyleSheet.create({
  font: {
    fontFamily: 'notosans',
    color: colors.fontBlack,
    fontSize: 14,
  },
});
