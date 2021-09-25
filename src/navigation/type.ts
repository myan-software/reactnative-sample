import {NavigatorScreenParams} from '@react-navigation/native';

// export type AppScreenName =
//   | 'TabScreen'
//   // | 'TabProjects'
//   // | 'TabProducts'
//   // | 'Account'
//   // | 'Notification'
//   | 'SignIn'
//   | 'SignUp'
//   | 'ForgotPass'
//   // | 'UpdateProfile'
//   // | 'ChangePass'
//   | 'ProductsList'
//   | 'ProductsByProject'
//   | 'Product'
//   | 'Project'
//   | 'News'
//   | 'NewsDetail'
//   | 'CartScreen'
//   | 'CheckOutStep1'
//   | 'CheckOutStep1Confirm'
//   | 'CheckOutStep2'
//   | 'CheckOutStep2Confirm'
//   | 'CheckOutStep2Success'
//   | 'Meeting'
//   | 'MeetingSuccess'
//   | 'Order'
//   | 'Favorite'
//   | 'AppWebview';
// | undefined;

// export const getHeaderTitle = (route) => {
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

//   switch (routeName) {
//     case 'Account':
//       return 'Tài khoản';
//     case 'Home':
//       return 'Trang chủ';
//     case 'Account':
//       return 'My account';
//   }
// };

// export type DetailComponentParams = {
//   Account: undefined;
//   Notification: undefined;
//   ChangePass: undefined;
//   SendMail: {email?: string; taskId: number};
//   SMSMessage: {phone?: string; taskId: number};
//   TaskDetail: {id: number; title?: string; comment?: string; billing?: string};
// };

export type AuthParamList = {
  SignIn: undefined;
  Policy: undefined;
};

export type RootParamList = {
  // Policy: undefined;
};

// export type TabScreenParamList = {
//   Home: undefined;
//   TabTaskManager: undefined;
//   TabProducts: {title?: string};
//   Account: undefined;
//   Notification: undefined;
//   SearchStack: {screen: string; params: {type: string}};
// };

// export type HomeScreenParamList = {
//   Home: undefined;
// };

// export type TabProductScreenParamList = {
//   TabProducts: {title?: string; status?: string};
// };

// export type TabManagerParamList = {
//   TaskManager: undefined;
//   // VideoRecord: undefined;
// };

// export type TabNotificationScreenParamList = {
//   Notification: undefined;
// };

// export type AccountScreenParamList = {
//   Account: undefined;
//   UpdateProfile: undefined;
//   ChangePass: undefined;
// };

// export type SearchScreenParamList = {
//   Search: {type: 'project' | 'product' | 'home'};
// };

// export type ProfileParams = {
//   email: string;
//   firstName: string;
//   lastName: string;
//   accessToken: string;
//   provider: 'facebook' | 'google';
// };
