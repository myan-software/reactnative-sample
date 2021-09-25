import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../components/CustomText';
import HeaderScreen from '../../components/HeaderScreen';
import colors from '../../constant/color';
import services from 'src/network/services';
import {connect} from 'react-redux';
import images from 'src/assets/images';
import ItemUserAction from './ItemUserAction';
class ListUserAction extends Component {
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
  getDataByType = async () => {
    const {page} = this.state;
    var rs;
    switch (this.props.route.params.type) {
      case 'followed':
        rs = await services.getFollows({user_id: this.props.user.id, page});
        break;
      case 'followMe':
        rs = await services.getFollower({user_id: this.props.user.id, page});
        break;
      case 'block':
        rs = await services.getListBlocks({user_id: this.props.user.id, page});
        break;
      default:
        rs = await services.getFollows({user_id: this.props.user.id, page});
        break;
    }
    return rs;
  };
  onRefresh = () => {
    this.setState({refreshing: true, page: 1}, () => {
      this.getData();
    });
  };
  async getData() {
    try {
      const {page} = this.state;
      const rs = await this.getDataByType();
      this.setState({
        data: rs.data?.data || [],
        page: rs.data?.data?.next_page_url ? page + 1 : page,
        refreshing: false,
        stopLoad: rs.data?.data.next_page_url ? false : true,
      });
    } catch (error) {
      //console.log(error);
    }
  }
  inLoadMore = false;
  loadMore = async () => {
    try {
      if (this.inLoadMore || this.state.stopLoad) return;
      this.inLoadMore = false;
      let {data} = this.state;
      const rs = await this.getDataByType();
      this.setState({
        data: data.concat(rs.data?.data),
        page: rs.data?.data?.next_page_url ? page + 1 : page,
        stopLoad: rs.data?.data?.next_page_url ? false : true,
      });
      this.inLoadMore = false;
    } catch (error) {
      //console.log(error);
    }
  };
  renderItem = ({item, index}) => (
    <ItemUserAction
      navigation={this.props.navigation}
      type={this.props.route.params.type}
      item={item}
    />
  );
  keyExtractor = (item, index) => 'item' + index;
  render() {
    const {title} = this.props.route.params;
    const {data, stopLoad, refreshing} = this.state;
    return (
      <View style={styles.container}>
        <HeaderScreen navigation={this.props.navigation} title={title || ''} />
        <FlatList
          data={data}
          ListFooterComponent={
            !refreshing && !stopLoad ? (
              <CustomText style={styles.txtLoad}>読み込み中...</CustomText>
            ) : null
          }
          ListEmptyComponent={
            !refreshing && stopLoad ? (
              <CustomText style={styles.txtLoad}>ユーザーがいません</CustomText>
            ) : null
          }
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.3}
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          contentContainerStyle={{paddingTop: 10, paddingBottom: 50}}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
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
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  overAvatar: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    borderRadius: 25,
  },
  imgAvatar: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  center: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '700',
    fontSize: 17,
  },
  subName: {
    fontSize: 12,
    color: '#828282',
  },
  linerBt: {
    width: 112,
    height: 24,
    borderRadius: 12,
  },
  bt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    fontSize: 10,
    color: '#fff',
  },
  txtSubButton: {
    fontSize: 12,
    color: '#828282',
    marginTop: 2,
    textAlign: 'right',
    paddingRight: 2,
  },
  txtLoad: {
    textAlign: 'center',
    marginTop: 12,
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps)(ListUserAction);
