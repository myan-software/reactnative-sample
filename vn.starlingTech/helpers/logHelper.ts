import Reactotron from 'reactotron-react-native';

import settings from '../config/settings';

function logThis(str1, ...str2) {
  if (settings.REACTOTRON_ENABLE) {
    Reactotron.log(str1, ...str2);
  } else {
    console.log(str1, ...str2);
  }
}

/**
 * custom console log
 * chi show log khi trang thai la DEBUG (=true)
 *
 * @memberof AppComponent
 */
export const consoleLog = (str1, ...str2) => {
  // console.log(settings.FOR_DEV, 'logEnabled');
  if (settings.FOR_DEV) {
    logThis(' --------- --------------- -------------- ----------');
    if (str2) {
      logThis(str1, ...str2);
    } else {
      logThis(str1);
    }
    logThis('----------------------------------------------------');
  }
};

export const consoleLogSqlite = (str1, ...str2) => {
  if (settings.FOR_DEV && settings.logSQL) {
    logThis(' --------- --------------- -------------- ----------');
    if (str2) {
      logThis(str1, ...str2);
    } else {
      logThis(str1);
    }
    logThis('----------------------------------------------------');
  }
};

export const consoleLogAPI = (str1, ...str2) => {
  if (settings.FOR_DEV && settings.logAPI) {
    logThis(' --------- --------------- -------------- ----------');
    if (str2) {
      logThis(str1, ...str2);
    } else {
      logThis(str1);
    }
    logThis('----------------------------------------------------');
  }
};

export const consoleLogAPIHeader = (str1, ...str2) => {
  if (settings.FOR_DEV && settings.logAPIHeader) {
    logThis(' --------- --------------- -------------- ----------');
    if (str2) {
      logThis(str1, ...str2);
    } else {
      logThis(str1);
    }
    logThis('----------------------------------------------------');
  }
};

export const consolelogAdMob = (str1, ...str2) => {
  if (settings.FOR_DEV && settings.logAdMob) {
    logThis(' --------- --------------- -------------- ----------');
    if (str2) {
      logThis(str1, ...str2);
    } else {
      logThis(str1);
    }
    logThis('----------------------------------------------------');
  }
};
