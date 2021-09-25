import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TextInput,
  Animated,
  Easing,
  Platform,
} from 'react-native';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-firebase/admob';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ItemPost from '../post/ItemPost';
import layout from '../../constant/layout';
import services from '../../network/services';
import handleStore from '../../redux/handleStore';
import CustomText from '../../components/CustomText';
export default class ListPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      refreshing: false,
      page: 1,
      stopLoad: false,
    };
  }
  componentDidMount() {
    this.getData();
  }
  onRefresh = () => {
    this.setState({refreshing: true, page: 1}, () => {
      this.getData();
    });
  };
  async getData() {
    try {
      let {categoryId, user_id, appove, type} = this.props;
      let {page} = this.state;
      let dataPost = {page};
      if (categoryId) {
        dataPost.category_id = categoryId;
      }
      if (user_id) {
        dataPost.user_id = user_id;
      }
      if (type) dataPost.type = type;
      let rs;
      if (appove) {
        rs = await services.getListGroupWaitApprove(dataPost);
      } else {
        rs = await services.getPosts(dataPost);
      }
      let dataAdmob = [];
      let dataServer = rs.data.data;
      for (var i = 0, length = dataServer.length; i < length; i++) {
        dataAdmob.push(dataServer[i]);
        if ((i % 4 == 0 && i !== 0) || (length < 5 && i == length - 1)) {
          dataAdmob.push('admob');
        }
      }
      this.setState({
        data: dataAdmob,
        page: rs.data.next_page_url ? page + 1 : page,
        refreshing: false,
        stopLoad: rs.data.next_page_url ? false : true,
      });
    } catch (error) {
      console.log(error);
    }
  }
  inLoadMore = false;
  loadMore = async () => {
    try {
      if (this.inLoadMore || this.state.stopLoad) return;
      this.inLoadMore = false;
      let {page, data} = this.state;
      let dataPost = {page};
      if (this.props.category_id) dataPost.category_id = this.props.categoryId;
      if (this.props.user_id) dataPost.user_id = this.props.user_id;
      if (this.props.type) dataPost.type = this.props.type;
      let rs;
      if (this.props.appove) {
        rs = await services.getListGroupWaitApprove(dataPost);
      } else {
        rs = await services.getPosts(dataPost);
      }
      let dataAdmob = [];
      let dataServer = rs.data.data;
      for (var i = 0, length = dataServer.length; i < length; i++) {
        dataAdmob.push(dataServer[i]);
        if (i % 4 == 0 || i == length - 1) {
          dataAdmob.push('admob');
        }
      }
      this.setState({
        data: data.concat(dataAdmob),
        page: rs.data.next_page_url ? page + 1 : page,
        stopLoad: rs.data.next_page_url ? false : true,
      });
      this.inLoadMore = false;
    } catch (error) {
      console.log(error);
    }
  };
  renderItem = ({item, index}) => {
    if (item === 'admob' && !this.props.hideAds) {
      return (
        <View style={{alignItems: 'center'}}>
          <BannerAd size={BannerAdSize.LARGE_BANNER} unitId={TestIds.BANNER} />
        </View>
      );
    }
    return (
      <ItemPost
        item={item}
        navigation={this.props.navigation}
        appove={this.props.appove}
      />
    );
  };
  keyExtractor = (item, index) => 'itemPost' + index;
  render() {
    let {search} = this.props;
    let {data, stopLoad, refreshing} = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          ref={(c) => (this.flatList = c)}
          ListFooterComponent={
            !refreshing && !stopLoad ? (
              <CustomText style={styles.txtLoad}>読み込み中...</CustomText>
            ) : null
          }
          ListEmptyComponent={
            stopLoad ? (
              <CustomText style={styles.txtLoad}>投稿がありません</CustomText>
            ) : null
          }
          removeClippedSubviews={Platform.OS == 'android'}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={0.3}
          onEndReached={this.loadMore}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={{
            paddingBottom: 50,
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapSearch: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#fff',
  },
  search: {
    width: layout.screen.width - 20,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 56,
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 6,
    borderRadius: 14,
    backgroundColor: '#F2F2F2',
  },
  input: {
    flex: 1,
    height: 36,
    paddingLeft: 20,
  },
  txtLoad: {
    textAlign: 'center',
    marginTop: 8,
  },
});
