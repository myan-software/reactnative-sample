import React, {Component} from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import colors from '../constant/color';

export default class CustomInput extends Component<TextInputProps> {
  render() {
    const {children, style, ...props} = this.props;
    return (
      <TextInput {...props} style={[styles.font, style]}>
        {children}
      </TextInput>
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
