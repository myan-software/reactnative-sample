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
import ListUserAwaitAppove from './component_user/ListUserAwaitAppove';
import {connect} from 'react-redux';
const initialLayout = layout.screen.width;
class ListPostStatus extends Component {
  constructor(props) {
    super(props);
    var index = 0;
    if (props.route.params?.index) index = props.route.params?.index;
    this.state = {
      index,
      routes: [
        {key: 'postApplied', title: '申請中'},
        {key: 'candidates', title: '応募者'},
      ],
    };
  }

  goBack = () => this.props.navigation.goBack();
  handleIndexChange = (index) => this.setState({index});

  ListPost = () => (
    <ListPost
      hideAds={true}
      appove
      navigation={this.props.navigation}
      user_id={this.props.user.id}
    />
  );
  ListUser = () => <ListUserAwaitAppove navigation={this.props.navigation} />;

  renderScene = SceneMap({
    postApplied: this.ListPost,
    candidates: this.ListUser,
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
        <HeaderTab navigation={this.props.navigation} title="申請 / 応募状況" />
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
const mapStateToProp = (state) => ({
  user: state.userReducer.user,
});
export default connect(mapStateToProp)(ListPostStatus);
