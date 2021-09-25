// // import WebSocket from 'ws';
// import { Toast } from 'native-base';
// // import _ from 'lodash';
// // import Constants from 'expo-constants';
// import { consoleLogWS } from '../../core/components/AppLog';
// import { WS_URL } from '../config/server';

// // const clientId = Constants.deviceId;
// // const url = 'ws://42.112.17.55:8080/';

// // const url = 'wss://mustgo.vn:9443/';

// let timers = [];
// // let userId;

// // export function setUserId(pUserId) {
// //   userId = pUserId;
// // }

// export default class WebSocketClient {
//   // constructor() {
//   // this.socket = new WebSocket(url);
//   // this.open();
//   // }
//   instance = null;
//   socket = null;
//   // static connected;

//   // static connectedListener;

//   number = 1;
//   autoReconnectInterval = 5 * 1000; // ms

//   static createInstance = () => {
//     this.instance = new WebSocketClient();
//   };

//   static getInstance = () => {
//     if (!this.instance) {
//       this.instance = new WebSocketClient();
//     }
//     return this.instance;
//   };

//   open = () => {
//     // console.log('open websocket...');
//     this.socket = new WebSocket(WS_URL);
//     this.socket.onopen = () => {
//       // console.log('websocket ready Openned');
//       this.onopen();
//     };
//     // this.socket.onmessage = data => {
//     //   this.number++;
//     //   this.onmessage(data, this.number);
//     // };
//     // this.socket.onclose = e => {
//     //   switch (e.code) {
//     //     case 1000: // CLOSE_NORMAL
//     //       consoleLogWS('WebSocket: closed');
//     //       break;
//     //     default:
//     //       // Abnormal closure
//     //       this.reconnect(e);
//     //       break;
//     //   }
//     //   // this.onclose(e);
//     // };
//     // this.socket.onerror = e => {
//     //   // consoleLogWS('WebSocket: closed', e);
//     //   consoleLogWS('WebSocket: onerror');
//     //   switch (e.code) {
//     //     case 'ECONNREFUSED':
//     //       this.reconnect(e);
//     //       break;
//     //     default:
//     //       this.onerror(e);
//     //       break;
//     //   }
//     // };
//   };

//   reconnect = userId => {
//     // consoleLogWS('WebSocketClient: open', e);
//     Toast.show({
//       text: 'Không thể kết nối tới máy chủ',
//       duration: 30000,
//       position: 'top',
//       type: 'danger',
//     });
//     consoleLogWS(`WebSocketClient: retry in ${this.autoReconnectInterval}ms`);
//     // this.socket.removeAllListeners();
//     const that = this;
//     setTimeout(() => {
//       consoleLogWS('WebSocketClient: reconnecting...');
//       that.open();
//       // that.socket.onopen = () => {
//       //   that.send({
//       //     event: 'connect',
//       //     user_id: userId,
//       //     fingerprint: clientId
//       //   });
//       // };
//     }, this.autoReconnectInterval);
//   };

//   onopen = () => {
//     consoleLogWS('WebSocketClient: open');
//     // this.send({
//     //   event: 'connect',
//     //   user_id: userId,
//     //   fingerprint: clientId
//     // });
//   };
//   // onmessage = (message, number) => {
//   //   consoleLogWS('WebSocketClient: message', message.data);
//   //   const data = JSON.parse(message.data);
//   //   const { event } = data;
//   //   if (_.isEqual(event, 'connected')) {
//   //     this.connectedListener(data);
//   //   }
//   // };
//   onerror = e => {
//     consoleLogWS('WebSocketClient: error', e);
//   };
//   onclose = e => {
//     consoleLogWS('WebSocketClient: closed', e);
//   };

//   startTimer(name, duration, fun) {
//     if (!timers.has(name)) {
//       timers = timers.set(name, setInterval(fun, duration));
//     }
//   }

//   stopTimer(name) {
//     if (timers.has(name)) {
//       clearInterval(timers.get(name));
//       timers = timers.delete(name);
//     }
//   }
// }
