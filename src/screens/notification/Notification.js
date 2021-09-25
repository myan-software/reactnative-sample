import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import CustomText from '../../components/CustomText';
import HeaderScreen from '../../components/HeaderScreen';
import colors from '../../constant/color';
import LinearGradient from 'react-native-linear-gradient';
import services from 'src/network/services';
import {connect} from 'react-redux';
import ItemNotification from './ItemNotification';
import handleStore from 'src/redux/handleStore';
class Notification extends Component {
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
      let {page} = this.state;
      let rs = await services.getListNotifications({
        page,
        user_id: this.props.user.id,
      });
      this.setState({
        data: rs.data.data,
        page: rs.data.next_page_url ? page + 1 : page,
        refreshing: false,
        stopLoad: rs.data.next_page_url ? false : true,
      });
    } catch (error) {
      handleStore.showMessage({content: error});
    }
  }
  inLoadMore = false;
  loadMore = async () => {
    try {
      if (this.inLoadMore || this.state.stopLoad) return;
      this.inLoadMore = false;
      let {page, data} = this.state;
      let rs = await services.getListNotifications({
        page,
        user_id: this.props.user.id,
      });
      this.setState({
        data: data.concat(rs.data.data),
        page: rs.data.next_page_url ? page + 1 : page,
        stopLoad: rs.data.next_page_url ? false : true,
      });
      this.inLoadMore = false;
    } catch (error) {
      handleStore.showMessage({content: error});
    }
  };
  keyExtractor = (item, index) => 'indexNoti' + index;
  render() {
    const {data, refreshing, stopLoad} = this.state;
    return (
      <View style={styles.container}>
        <HeaderScreen title="通知" navigation={this.props.navigation} />
        <FlatList
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
          renderItem={({item, index}) => (
            <ItemNotification item={item} navigation={this.props.navigation} />
          )}
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
  },
  txtLoad: {
    textAlign: 'center',
    marginTop: 8,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps)(Notification);
