import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ListPostSearch from './ListPostSearch';
import ListUser from './ListUser';
import colors from '../../constant/color';
import CustomText from '../../components/CustomText';
import layout from '../../constant/layout';
import HeaderApp from '../../components/HeaderApp';
const initialLayout = layout.screen.width;
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'posts', title: '募集'},
        {key: 'users', title: 'ユーザー'},
      ],
    };
  }

  goBack = () => this.props.navigation.goBack();
  handleIndexChange = (index) => this.setState({index});

  ListPost = () => <ListPostSearch navigation={this.props.navigation} />;
  ListUser = () => <ListUser navigation={this.props.navigation} />;

  renderScene = SceneMap({
    posts: this.ListPost,
    users: this.ListUser,
  });
  renderTabBar = (props) => (
    <TabBar
      pressOpacity={0.7}
      pressColor={colors.primary}
      {...props}
      style={{backgroundColor: 'transparent'}}
      indicatorStyle={{backgroundColor: '#fff'}}
      renderLabel={(payload) => {
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

  render() {
    return (
      <View style={styles.container}>
        <HeaderApp navigation={this.props.navigation} aspectRatio={true} />
        {/* <HeaderTab navigation={this.props.navigation} title="検索" /> */}
        <View style={styles.wrapTab}>
          <TabView
            navigationState={this.state}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
            onIndexChange={this.handleIndexChange}
            initialLayout={initialLayout}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapTab: {
    flex: 1,
    marginTop: -50,
  },
});
