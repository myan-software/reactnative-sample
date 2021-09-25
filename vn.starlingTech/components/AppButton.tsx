import {isUndefined} from 'lodash';
import {Spinner} from 'native-base';
import React, {ReactElement, useEffect, useState} from 'react';
import {Animated, Platform, StyleSheet, ViewStyle} from 'react-native';
import Ripple from 'react-native-material-ripple';

import colors from '../config/colors';
import {getAppText} from '../helpers/langHelper';
import {consoleLog} from '../helpers/logHelper';
import AppText from './AppText';

type ButtonsProps = {
  onPress?: () => void;
  style?: ViewStyle | ViewStyle[];
  children?: ReactElement;
  block?: boolean;
  processing?: boolean;
  disabled?: boolean;
  radius?: number;
  primary?: boolean;
  default?: boolean;
  width?: number;
  text?: string;
};

function AppButton(props: ButtonsProps) {
  const buttonBlock = props.block && styles.block;
  const buttonStyle = buttonBlock || styles.normal;
  const radiusStyle = !isUndefined(props.radius) && {
    borderRadius: props.radius,
  };
  const primaryStyle = props.primary && {backgroundColor: colors.primary};
  const defaultStyle = props.default && {width: undefined, height: undefined};
  const disabledStyle = props.disabled && {
    backgroundColor: '#e0e0e0',
    color: '#000',
  };
  return (
    <Ripple
      {...props}
      rippleContainerBorderRadius={props.radius || null}
      onPress={props.onPress ? props.onPress : null}
      style={[
        styles.button,
        buttonStyle,
        primaryStyle,
        radiusStyle,
        defaultStyle,
        props.style,
        disabledStyle,
      ]}>
      {props.children || (
        <AppText
          style={[styles.btnText, props.disabled && styles.btnTextDisabled]}>
          {props.text || getAppText().ok}
        </AppText>
      )}
    </Ripple>
  );
}

type LoadingButtonsProps = {width: number} & ButtonsProps;
const AnimatedRipple = Animated.createAnimatedComponent(Ripple);

export function AppProcessingButton(props: LoadingButtonsProps) {
  const borderRadius = props.radius || 14;
  const [loadingValue] = useState({
    width: new Animated.Value(props.width),
    borderRadius: new Animated.Value(borderRadius),
    opacity: new Animated.Value(1),
  });

  const {processing, width} = props;

  useEffect(() => {
    if (processing) {
      Animated.timing(loadingValue.width, {
        toValue: 54,
        duration: 400,
        useNativeDriver: false,
      }).start();
      Animated.timing(loadingValue.borderRadius, {
        toValue: 27,
        duration: 400,
        useNativeDriver: false,
      }).start();
      consoleLog(processing, 'processing');
    } else {
      Animated.timing(loadingValue.width, {
        toValue: width,
        duration: 400,
        useNativeDriver: false,
      }).start();
      Animated.timing(loadingValue.borderRadius, {
        toValue: borderRadius,
        duration: 400,
        useNativeDriver: false,
      }).start();
      consoleLog(processing, 'processing');
      // alert('loaded');
    }
  }, [
    borderRadius,
    loadingValue.borderRadius,
    loadingValue.width,
    processing,
    width,
  ]);

  const buttonBlock = props.block && styles.block;
  const buttonStyle = buttonBlock || styles.normal;
  const radiusStyle = props.radius && {borderRadius: props.radius};
  const primaryStyle = props.primary && {backgroundColor: colors.primary};
  const defaultStyle = props.default && {width: undefined, height: undefined};
  const disabledStyle = props.disabled && {
    backgroundColor: '#e0e0e0',
  };
  const children = props.processing ? (
    <Spinner size="small" color="#FFF" />
  ) : (
    props.children || (
      <AppText
        style={[styles.btnText, props.disabled && styles.btnTextDisabled]}>
        {props.text || getAppText().ok}
      </AppText>
    )
  );
  return (
    <AnimatedRipple
      disabled={props.disabled || props.processing || false}
      rippleContainerBorderRadius={
        props.radius !== undefined ? props.radius : 14
      }
      onPress={() => (props.onPress && props.onPress()) || null}
      style={[
        styles.button,
        buttonStyle,
        primaryStyle,
        radiusStyle,
        defaultStyle,
        props.style,
        disabledStyle,
        {width: loadingValue.width, borderRadius: loadingValue.borderRadius},
      ]}>
      {children}
    </AnimatedRipple>
  );
}

export default AppButton;

const styles = StyleSheet.create({
  block: {
    // flex: 1,
    width: '100%',
  },
  btnText: {color: '#FFF', fontSize: 16},
  btnTextDisabled: {color: '#666'},
  button: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    height: Platform.OS === 'ios' ? 54 : 46,
    justifyContent: 'center',
  },
  normal: {
    width: 237,
  },
});
