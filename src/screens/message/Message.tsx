import CustomText from '../../components/CustomText';
import React, {useState} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import colors from 'src/constant/color';
import CommunityComponent from './components/Message.Community';
import GroupComponent from './components/Message.Group';
import UserComponent from './components/Message.User';
import HeaderApp from '../../components/HeaderApp';
import layout from '../../constant/layout';
const initialLayout = layout.screen.width;
type Props = {
  navigation: any;
};

const Message = (props: Props) => {
  const {navigation} = props;
  const renderScene = SceneMap({
    0: () => <UserComponent navigation={navigation} />,
    1: () => <GroupComponent navigation={navigation} />,
    2: () => <CommunityComponent navigation={navigation} />,
  });
  const routes = [
    {key: '0', title: '個人'},
    {key: '1', title: 'グループ'},
    {key: '2', title: 'コミュニティ'},
  ];
  const [index, setIndex] = useState(0);

  const renderTabBar = (props: any) => (
    <TabBar
      pressOpacity={0.7}
      pressColor={colors.primary}
      {...props}
      style={{backgroundColor: 'transparent'}}
      indicatorStyle={{backgroundColor: '#fff'}}
      renderLabel={(payload: any) => {
        return (
          <CustomText
            style={{
              color: payload.focused ? '#fff' : '#F9F9F9',
            }}>
            {payload.route.title}
          </CustomText>
        );
      }}
    />
  );
  return (
    <View style={styles.container}>
      <HeaderApp navigation={navigation} aspectRatio={true} />
      <View style={styles.wrapTab}>
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapTab: {
    flex: 1,
    marginTop: -50,
  },
});

export default Message;
