// import {createStackNavigator} from '@react-navigation/stack';
// import React from 'react';
// import {View} from 'react-native';
// import {getAppText} from '../../../vn.starlingTech/helpers/langHelper';
// import {HeaderAccount, HeaderNotification} from '../../components/AppHeader';
// import Account from '../../screens/stack/Account/Account';
// import ChangePass from '../../screens/stack/Account/ChangePass';
// import Notification from '../../screens/stack/Notification/Notification';
// import SMSMessage from '../../screens/stack/SMSMessage';
// import SendMail from '../../screens/stack/SendMail';
// import BillingUpdate from '../../screens/stack/Task/BillingUpdate';
// import CommentUpdate from '../../screens/stack/Task/CommentUpdate';
// import TaskDetail from '../../screens/stack/Task/TaskDetail';
// import {DetailComponentParams} from '../type';
// import {AppHeaderOptions} from './AppHeaderOption';

// const Stack = createStackNavigator<DetailComponentParams>();

// export default function () {
//   return (
//     <Stack.Navigator screenOptions={AppHeaderOptions}>
//       <Stack.Screen
//         options={{
//           headerTitle: getAppText().account,
//           headerRight: () => <HeaderNotification />,
//         }}
//         name="Account"
//         component={Account}
//       />
//       <Stack.Screen
//         options={{
//           headerTitle: getAppText().notification,
//           headerRight: () => (
//             <View style={{marginRight: 16}}>
//               <HeaderAccount />
//             </View>
//           ),
//         }}
//         name="Notification"
//         component={Notification}
//       />
//       <Stack.Screen
//         options={{
//           headerTitle: getAppText().changePassword,
//           headerRight: () => null,
//         }}
//         name="ChangePass"
//         component={ChangePass}
//       />
//       <Stack.Screen
//         name="SendMail"
//         options={{headerTitle: getAppText().sendMail}}
//         component={SendMail}
//       />
//       <Stack.Screen
//         name="SMSMessage"
//         options={{headerTitle: getAppText().sendSMS}}
//         component={SMSMessage}
//       />
//       <Stack.Screen
//         name="TaskDetail"
//         options={{headerTitle: getAppText().sendMail}}
//         component={TaskDetail}
//       />
//       <Stack.Screen
//         name="CommentUpdate"
//         options={{
//           headerTitle: getAppText().updateComment,
//           headerRight: () => null,
//         }}
//         component={CommentUpdate}
//       />
//       <Stack.Screen name="BillingUpdate" component={BillingUpdate} />
//       {/* <Stack.Screen
//         name="VideoRecord"
//         options={{headerTransparent: true, title: ''}}
//         component={VideoRecord}
//       /> */}
//     </Stack.Navigator>
//   );
// }
