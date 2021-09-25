import React, {Component} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import services from 'src/network/services';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import CustomText from 'src/components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import colors from 'src/constant/color';
import HeaderScreen from 'src/components/HeaderScreen';
import Ripple from 'react-native-material-ripple';
import images from 'src/assets/images';
import handleStore from 'src/redux/handleStore';
import {joinThreadGroup} from 'src/helper/MessageHelper';
class ListUserBlock extends Component {
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
      const {page} = this.state;
      const rs = await services.getListUsersWaitApprove({
        user_id: this.props.user.id,
        page,
      });
      this.setState({
        data: rs.data?.data || [],
        page: rs.data?.data?.next_page_url ? page + 1 : page,
        refreshing: false,
        stopLoad: rs.data?.data.next_page_url ? false : true,
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
      let {data, page} = this.state;
      const rs = await services.getListUsersWaitApprove({
        user_id: this.props.user.id,
        page,
      });
      this.setState({
        data: data.concat(rs.data?.data),
        page: rs.data?.data?.next_page_url ? page + 1 : page,
        stopLoad: rs.data?.data?.next_page_url ? false : true,
      });
      this.inLoadMore = false;
    } catch (error) {
      console.log(error);
    }
  };
  accept = async (item, index) => {
    try {
      let rs = await services.acceptToGroup({
        post_id: item.posts_id,
        user_id: item.id,
      });
      let data = [...this.state.data];
      data[index].join = 'accept';
      this.setState({data});
      joinThreadGroup(item.firebaseKey, item);
    } catch (error) {
      console.log(error);
      handleStore.showMessage({content: error});
    }
  };
  reject = async (item, index) => {
    try {
      let rs = await services.rejectToGroup({
        post_id: item.posts_id,
        user_id: item.id,
      });
      let data = [...this.state.data];
      data[index].join = 'reject';
      this.setState({data});
    } catch (error) {
      console.log(error);
      handleStore.showMessage({content: error});
    }
  };
  renderButton = (item, index) => {
    if (!item.join) {
      return (
        <View style={styles.right}>
          <LinearGradient
            colors={colors.linearGradient}
            start={{x: 0.13, y: 0.1}}
            end={{x: 0.3, y: 2.45}}
            locations={[0, 0.4, 0.9]}
            style={styles.linerBt}>
            <Ripple style={styles.bt} onPress={() => this.accept(item, index)}>
              <CustomText style={styles.txtButton}>承認</CustomText>
            </Ripple>
          </LinearGradient>
          <LinearGradient
            colors={['#4F4F4F', '#4F4F4F']}
            start={{x: 0.13, y: 0.1}}
            end={{x: 0.3, y: 2.45}}
            style={styles.linerBt}>
            <Ripple style={styles.bt} onPress={() => this.reject(item, index)}>
              <CustomText style={styles.txtButton}>拒否</CustomText>
            </Ripple>
          </LinearGradient>
        </View>
      );
    }
    if (item.join === 'accept') {
      return (
        <View style={styles.right}>
          <LinearGradient
            colors={['#4F4F4F', '#4F4F4F']}
            start={{x: 0.13, y: 0.1}}
            end={{x: 0.3, y: 2.45}}
            style={styles.linerBt}>
            <View style={styles.bt}>
              <CustomText style={styles.txtButton}>承認済</CustomText>
            </View>
          </LinearGradient>
        </View>
      );
    }
    if (item.join === 'reject') {
      return (
        <View style={styles.right}>
          <LinearGradient
            colors={colors.linearGradient}
            start={{x: 0.13, y: 0.1}}
            end={{x: 0.3, y: 2.45}}
            style={styles.linerBt}>
            <View style={styles.bt}>
              <CustomText style={styles.txtButton}>拒否済</CustomText>
            </View>
          </LinearGradient>
        </View>
      );
    }
  };
  renderItem = ({item, index}) => (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.overAvatar}
        onPress={() => {
          this.props.navigation.navigate('DetailUser', {user: item});
        }}>
        <FastImage
          source={
            item.avatar
              ? {
                  uri: item.avatar,
                }
              : images.avatar
          }
          style={styles.imgAvatar}
        />
      </TouchableOpacity>
      <View style={styles.center}>
        <CustomText style={styles.name}>{item.name}</CustomText>
        {/* <CustomText style={styles.subName}>{item.email}</CustomText> */}
      </View>
      {this.renderButton(item, index)}
    </View>
  );
  keyExtractor = (item, index) => 'item' + index;
  render() {
    const {data, stopLoad, refreshing} = this.state;
    return (
      <View flex={1} backgroundColor="#fff">
        <FlatList
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
          data={data}
          onRefresh={this.onRefresh}
          refreshing={refreshing}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
    width: 64,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
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
  right: {
    flexDirection: 'row',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps)(ListUserBlock);
