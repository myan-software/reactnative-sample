import {find, isObject} from 'lodash';
import {Alert} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {getAppText} from './langHelper';

export function hideAllMessage() {
  hideMessage();
}

export function showMessageError(message: string | null) {
  Alert.alert('ログインエラー', message || getAppText().error);
}
export function showMessageSuccess(message: string, autoHide = true) {
  showMessage({message, type: 'success', position: 'top', autoHide});
}

export function showFlashMessageError(
  message?: string | object | null,
  autoHide = true,
) {
  let msg = message; //getAppText().error;
  if (isObject(message)) {
    msg = find(message) || getAppText().error;
  }

  showMessage({
    message: msg,
    type: 'danger',
    position: 'top',
    autoHide,
  });
}
export function showFlashMessageSuccess(message: string, autoHide = true) {
  showMessage({message, type: 'success', position: 'top', autoHide});
}

type AlertMessageTypes = {
  title?: string;
  message: string;
  onPress?: () => void;
  positiveTitle?: string;
  positiveOnPress?: (...params: any) => void;
  negativeTitle?: string;
  negativeOnPress?: (...params: any) => void;
  cancelable?: boolean;
};

// let alertMessageOnShowing = false;

export function showAlertMessage(props: AlertMessageTypes) {
  const {
    title,
    message,
    onPress,
    positiveTitle: pPositiveTitle,
    positiveOnPress,
    negativeTitle: pNegativeTitle,
    negativeOnPress,
    cancelable = false,
  } = props;
  const positiveTitle = pPositiveTitle || getAppText().ok;
  let buttonOptions = [{text: positiveTitle, onPress: positiveOnPress}];
  if (onPress) {
    buttonOptions = [{text: positiveTitle, onPress}];
  } else if (positiveOnPress || negativeOnPress) {
    const negativeTitle = pNegativeTitle || getAppText().cancel;
    buttonOptions = [
      {
        text: negativeTitle,
        onPress: negativeOnPress,
      },
      {
        text: positiveTitle,
        onPress: positiveOnPress,
      },
    ];
  } else {
    buttonOptions = [{text: positiveTitle, onPress: positiveOnPress}];
  }
  Alert.alert(title || getAppText().errorTitle, message, buttonOptions, {
    cancelable,
  });
  // alertMessageOnShowing = true;
}
