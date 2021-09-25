import { Spinner } from 'native-base';
import React, { ReactElement } from 'react';
import { StyleSheet, View } from 'react-native';

import { getAppText } from '../helpers/langHelper';
import AppButton from './AppButton';
import AppText from './AppText';
import Styles from './Styles';

type ProcessingType = {
  color?: string;
  size?: 'small' | 'large';
};

export function OnProcessing(props: ProcessingType) {
  return (
    <View style={styles.center}>
      <Spinner size={props.size} color={props.color || '#ccc'} />
    </View>
  );
}

type ResponseErrorType = {
  message: string;
  tryAgain?: () => void;
};
export function OnErrorContainer(props: ResponseErrorType) {
  return (
    <View style={styles.error}>
      {props.message && (
        <AppText note center>
          {props.message}
        </AppText>
      )}
      {props.tryAgain && (
        <AppButton onPress={props.tryAgain} style={Styles.buttonTryAgain}>
          <AppText>{getAppText().tryAgain}</AppText>
        </AppButton>
      )}
    </View>
  );
}

type ResponseContainerType = {
  processing: boolean;
  message?: string | null;
  successComponent: ReactElement | null;
  tryAgain?: () => void;
};
export function ResponseContainer(props: ResponseContainerType) {
  if (props.processing) {
    return <OnProcessing />;
  }
  return (
    (props.message && <OnErrorContainer message={props.message} tryAgain={props.tryAgain} />) ||
    props.successComponent ||
    null
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', flex: 1, justifyContent: 'center' },
  error: { alignItems: 'center', flex: 1, justifyContent: 'center', padding: 30 }
});
