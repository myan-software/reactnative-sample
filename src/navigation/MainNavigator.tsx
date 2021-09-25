import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import colors from '../../vn.starlingTech/config/colors';
import Default from '../screens/Default';
// import Default from 'screens/Default';
// import colors from 'starling-tech/config/colors';

import {AppHeaderOptions} from './components/AppHeaderOption';
// import DetailComponent from './components/DetailComponent';
import {RootParamList, TabScreenParamList} from './type';

const BottomTab = createBottomTabNavigator<TabScreenParamList>();
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.primary,
        showLabel: false,
      }}>
      <BottomTab.Screen name="Home" component={Default} />
      <BottomTab.Screen name="TabTaskManager" component={Default} />
      <BottomTab.Screen name="TabProducts" component={Default} />
    </BottomTab.Navigator>
  );
}

const Stack = createStackNavigator<RootParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={AppHeaderOptions}>
      <Stack.Screen
        options={{headerShown: false}}
        name="TabScreen"
        component={BottomTabNavigator}
      />
      {/* <Stack.Screen
        // options={({route}) => {
        //   return {headerTitle: getHeaderTitle(route)};
        // }}
        options={{headerShown: false}}
        name="Detail"
        component={DetailComponent}
      /> */}
    </Stack.Navigator>
  );
}

export default MainNavigator;
