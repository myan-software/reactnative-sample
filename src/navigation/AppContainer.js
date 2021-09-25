import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  BackHandler,
  ToastAndroid,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Stack from './Stack';
import * as Modal from '../modals';

export default class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onStateChange = (state) => {
    if (state.index == 0) {
      firstRouter = true;
    } else {
      firstRouter = false;
    }
  };
  onBackButtonPressAndroid = () => {
    if (firstRouter) {
      if (!exit) {
        ToastAndroid.show(helper.t('exitApp'), ToastAndroid.SHORT);
        exit = true;
        setTimeout(() => {
          exit = false;
        }, 2000);
        return true;
      }
      return false;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
        <NavigationContainer onStateChange={this.onStateChange}>
          <Stack />
        </NavigationContainer>
        <Modal.Loading />
        <Modal.Message />
        <Modal.ComfirmBox />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabar: {},
});
