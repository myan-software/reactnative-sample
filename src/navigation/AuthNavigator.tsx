import {createStackNavigator} from '@react-navigation/stack';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import React from 'react';
import Policy from 'src/screens/authentication/Policy';
import SignIn from '../screens/authentication/SignIn';
import {AuthParamList} from './type';
// import SignIn from 'screens/authentication/SignIn';

const AuthStack = createStackNavigator<AuthParamList>();
function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={AuthenticationHeaderOptions}
        name="SignIn"
        component={SignIn}
      />
      <AuthStack.Screen
        options={{
          headerShown: false,
        }}
        name="Policy"
        component={Policy}
      />
    </AuthStack.Navigator>
  );
}

export default AuthNavigator;

const AuthenticationHeaderOptions: StackHeaderOptions = {
  headerTransparent: true,
  headerTitle: () => null,
  headerBackTitleVisible: false,
  headerTintColor: '#FFF',
  // headerBackImage: () => (
  //   <Icon
  //     type="MaterialIcons"
  //     name="keyboard-arrow-left"
  //     style={{marginLeft: 0, fontSize: 40}}
  //   />
  // ),
};
