import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {AppContext} from '@vn.starlingTech/components/AppContext';
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import Message from 'src/screens/message/Message';
import images from '../assets/images';
import CustomText from '../components/CustomText';
import Community from '../screens/community/Community';
import CommunityList from '../screens/community/ListAll';
import Home from '../screens/home/Home';
import CreatePost from '../screens/post/CreatePost';
import Search from '../screens/search/Search';

const stackOptions = {
  headerShown: false,
  ...TransitionPresets.SlideFromRightIOS,
};

const CommunityStack = createStackNavigator();

function CommunityStackScreen() {
  return (
    <CommunityStack.Navigator
      initialRouteName={'Community'}
      screenOptions={stackOptions}>
      <CommunityStack.Screen name="Community" component={Community} />
      <CommunityStack.Screen name="CommunityList" component={CommunityList} />
    </CommunityStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function textTab(focused) {
  var style = {
    fontSize: 10,
    marginTop: 2,
  };
  if (focused) {
    style.color = '#F71E24';
  } else {
    style.color = '#BDBDBD';
  }
  return style;
}

const BottomTab = () => {
  const context = useContext(AppContext);

  return (
    <Tab.Navigator
      tabBarOptions={{
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={!focused ? images.iconHome : images.iconHomeActive}
              style={styles.icon}
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <CustomText style={textTab(focused)}>Top</CustomText>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={!focused ? images.iconSearch : images.iconSearchActive}
              style={styles.icon}
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <CustomText style={textTab(focused)}>検索</CustomText>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={CreatePost}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={!focused ? images.iconPost : images.iconPostActive}
              style={styles.icon}
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <CustomText style={textTab(focused)}>投稿</CustomText>
          ),
        }}
      />
      <Tab.Screen
        name="Communicate"
        component={CommunityStackScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={
                !focused ? images.iconCommunicate : images.iconCommunicateActive
              }
              style={styles.icon}
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <CustomText style={textTab(focused)}>コミュニティ</CustomText>
          ),
        }}
      />
      <Tab.Screen
        name="Message"
        component={Message}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <FastImage
              source={!focused ? images.iconChat : images.iconChatActive}
              style={styles.icon}
            />
          ),
          tabBarLabel: ({color, focused}) => (
            <CustomText
              style={{
                color: !focused ? '#BDBDBD' : '#F71E24',
                fontSize: 10,
                marginTop: 2,
              }}>
              メッセージ
            </CustomText>
          ),
        }}
        listeners={({navigation, route}) => ({
          tabPress: (e) => {
            e.preventDefault();
            if (!context.user.subscription) {
              navigation.navigate('Subscription', {fromTabMessage: true});
            } else {
              navigation.navigate('Message');
            }
          },
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
export default BottomTab;
