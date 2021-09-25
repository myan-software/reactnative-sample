import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import Ripple from 'react-native-material-ripple';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ListPost from '../post/ListPost';
import colors from '../../constant/color';
import CustomText from '../../components/CustomText';
import layout from '../../constant/layout';
import HeaderTab from '../../components/HeaderTab';
import {connect} from 'react-redux';
import ListPostFavorite from './component_post/ListPostFavorite';
const initialLayout = layout.screen.width;
class ListPostJoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'posted', title: '募集中'},
        {key: 'postExpies', title: '募集終了'},
      ],
    };
  }

  goBack = () => this.props.navigation.goBack();
  handleIndexChange = (index) => this.setState({index});

  ListPost = () => (
    <ListPostFavorite
      type={1}
      user_id={this.props.user.id}
      navigation={this.props.navigation}
    />
  );
  ListPostExpies = () => (
    <ListPostFavorite
      type={2}
      user_id={this.props.user.id}
      navigation={this.props.navigation}
    />
  );

  renderScene = SceneMap({
    posted: this.ListPost,
    postExpies: this.ListPostExpies,
  });
  renderTabBar = (props) => (
    <TabBar
      pressOpacity={0.1}
      pressColor={colors.Primary}
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
        <HeaderTab navigation={this.props.navigation} title="お気に入りリスト" />
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
  linearGradient: {
    paddingTop: getStatusBarHeight() + 4,
    paddingBottom: 4,
    width: '100%',
    aspectRatio: 375 / 140,
  },
  btBack: {
    width: 46,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapBack: {
    flexDirection: 'row',
    paddingTop: '2%',
    alignItems: 'center',
  },
  titleBack: {
    fontSize: 12,
    color: '#fff',
  },
  wrapTab: {
    flex: 1,
    marginTop: -50,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps)(ListPostJoin);
