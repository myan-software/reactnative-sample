const FOR_DEV = false;
const CODE_PUSH = !FOR_DEV && true;

export default {
  FOR_DEV,
  REACTOTRON_ENABLE: FOR_DEV && true,
  CODE_PUSH,
  logSQL: false,
  logAPI: false,
  logAPIHeader: false,
  logAdMob: false,
  timeoutTryAgain: 1000, // time delay after click try again
  sqlName: 'sqlName',
  sqlVersion: '1',
  numPerPage: 50,
  INTERVAL: 0,
  WS_ENABLE: !FOR_DEV || false,
  LANGUAGE: 'vi',
  versionDev: '1.0.0',
};
