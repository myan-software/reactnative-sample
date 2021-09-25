/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
if (!__DEV__) {
  consoleHolder = console;
  console = {};
  Object.keys(consoleHolder).forEach(function (key) {
    console[key] = function () {};
  });
}
AppRegistry.registerComponent(appName, () => App);
