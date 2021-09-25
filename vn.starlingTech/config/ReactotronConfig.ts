import Reactotron from 'reactotron-react-native';

Reactotron
  // .configure()
  .configure({host: '192.168.1.169'}) // controls connection & communication settings
  // .configure({ host: '192.168.1.169' }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
