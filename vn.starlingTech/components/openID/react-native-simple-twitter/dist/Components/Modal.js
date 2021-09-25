import { getAppText } from '@vn.starlingTech/helpers/langHelper';
import React from 'react';
import {Modal, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';
import Header from './Header';

function TWLoginModal(props) {
  return (
    <Modal
      visible={props.visible}
      animationType="slide"
      onRequestClose={() => {}}>
      <SafeAreaView style={{flex: 1, backgroundColor: props.headerColor}}>
        {props.renderHeader ? (
          props.renderHeader({onClose: props.onClosePress})
        ) : (
          <Header
            headerColor={props.headerColor}
            onClose={props.onClosePress}
            closeText={props.closeText}
          />
        )}
        <WebView
          originWhitelist={['*']}
          startInLoadingState={true}
          javaScriptEnabledAndroid={true}
          javaScriptEnabled={true}
          incognito={props.incognito}
          source={{uri: props.authURL}}
          onNavigationStateChange={props.onWebViewStateChanged}
        />
      </SafeAreaView>
    </Modal>
  );
}
TWLoginModal.defaultProps = {
  incognito: false,
  headerColor: '#f7f7f7',
  closeText: getAppText().cancel,
  renderHeader: null,
};
export default TWLoginModal;
