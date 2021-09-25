import React, {Component} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import BottomTab from './BottomTab';
import Notification from '../screens/notification/Notification';
import DetailUser from '../screens/search/DetailUser';
import DetailPost from '../screens/search/DetailPost';
import Account from '../screens/account/Account';
import EditProfile from '../screens/account/EditProfile';
import ListUserAction from '../screens/account/ListUserAction';
import ListPosted from '../screens/account/ListPosted';
import ListPostStatus from '../screens/account/ListPostStatus';
import Question from '../screens/account/Question';
import RulesUse from '../screens/account/RulesUse';
import Terminate from '../screens/account/Terminate';
import MethodTeminate from '../screens/account/MethodTeminate';
import UseContent from '../screens/account/UseContent';
import CommunityCreate from '../screens/community/Create';
import CommunityDetail from '../screens/community/Detail';
import EditPost from '../screens/post/EditPost';
import Subscription from '../screens/subscription/Subscription';
import MessageDetail from '../screens/message/Detail';
import MessageListMembers from '../screens/message/ListMembers';
import MessageSelectMember from '../screens/message/SelectMember';
import ListUserBlock from 'src/screens/account/ListUserBlock';
import Favorites from 'src/screens/account/Favorites';
import ListPostJoin from 'src/screens/account/ListPostJoin';

const MainStack = createStackNavigator();

export default class Stack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <MainStack.Navigator
        headerMode="none"
        initialRouteName="Main"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <MainStack.Screen name="Main" component={BottomTab} />
        <MainStack.Screen name="Notification" component={Notification} />
        <MainStack.Screen name="DetailUser" component={DetailUser} />
        <MainStack.Screen name="DetailPost" component={DetailPost} />
        <MainStack.Screen name="EditPost" component={EditPost} />
        <MainStack.Screen
          initialParams={{
            dispatchApp: this.props.dispatchApp,
          }}
          name="Account"
          component={Account}
        />
        <MainStack.Screen name="EditProfile" component={EditProfile} />
        <MainStack.Screen name="ListUserAction" component={ListUserAction} />
        <MainStack.Screen name="ListUserBlock" component={ListUserBlock} />
        <MainStack.Screen name="ListPosted" component={ListPosted} />
        <MainStack.Screen name="ListPostStatus" component={ListPostStatus} />
        <MainStack.Screen name="ListPostJoin" component={ListPostJoin} />
        <MainStack.Screen name="Favorites" component={Favorites} />
        <MainStack.Screen name="Question" component={Question} />
        <MainStack.Screen name="RulesUse" component={RulesUse} />
        <MainStack.Screen name="Terminate" component={Terminate} />
        <MainStack.Screen name="MethodTeminate" component={MethodTeminate} />
        <MainStack.Screen name="UseContent" component={UseContent} />
        <MainStack.Screen name="CommunityCreate" component={CommunityCreate} />
        <MainStack.Screen name="CommunityDetail" component={CommunityDetail} />
        <MainStack.Screen name="Subscription" component={Subscription} />
        <MainStack.Screen name="MessageDetail" component={MessageDetail} />
        <MainStack.Screen
          name="MessageListMembers"
          component={MessageListMembers}
        />
        <MainStack.Screen
          name="MessageSelectMember"
          component={MessageSelectMember}
        />
      </MainStack.Navigator>
    );
  }
}
const styles = StyleSheet.create({});
