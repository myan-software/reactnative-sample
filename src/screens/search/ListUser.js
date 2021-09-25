import React, {Component} from 'react';
import {View, FlatList, StyleSheet, TextInput, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import AntDesign from 'react-native-vector-icons/AntDesign';
import services from '../../network/services';

import images from '../../assets/images';
import CustomText from '../../components/CustomText';
import colors from '../../constant/color';
import ItemUser from './ItemUser';
import layout from '../../constant/layout';
import {connect} from 'react-redux';
class ListUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      data: [],
      refreshing: false,
      page: 1,
      stopLoad: false,
      keyword: '',
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
      let {page, keyword} = this.state;
      let rs = await services.searchUsers({
        page,
        keyword,
        user_id:this.props.user.id

      });
      this.setState({
        data: rs.data.data,
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
      let {page, data, keyword} = this.state;
      let rs = await services.searchUsers({
        page,
        keyword,
        user_id:this.props.user.id

      });
      this.setState({
        data: data.concat(rs.data.data),
        page: rs.data.next_page_url ? page + 1 : page,
        stopLoad: rs.data.next_page_url ? false : true,
      });
      this.inLoadMore = false;
    } catch (error) {
      console.log(error);
    }
  };
  renderItem = ({item, index}) => (
    <ItemUser item={item} navigation={this.props.navigation} />
  );
  keyExtractor = (item, index) => 'index' + index;
  render() {
    let {scrollY, data, stopLoad, refreshing, keyword} = this.state;
    let clamp = scrollY.interpolate({
      inputRange: [-1, 0, 1],
      outputRange: [0, 0, 1],
    });
    let top = Animated.diffClamp(clamp, 0, 150).interpolate({
      inputRange: [0, 150],
      outputRange: [0, -70],
    });
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.wrapSearch,
            {
              transform: [{translateY: top}],
            },
          ]}>
          <View style={styles.search}>
            <AntDesign name="search1" size={24} color="#000000" />
            <TextInput
              placeholder="検索キーワードを入力してください"
              placeholderTextColor="#828282"
              style={styles.input}
              value={keyword}
              returnKeyLabel="search"
              returnKeyType="search"
              onChangeText={(keyword) => this.setState({keyword})}
              onSubmitEditing={this.onRefresh}
            />
          </View>
        </Animated.View>
        <Animated.FlatList
          ref={(c) => (this.flatList = c)}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {
              useNativeDriver: true,
            },
          )}
          ListFooterComponent={
            !refreshing && !stopLoad ? (
              <CustomText style={styles.txtLoad}>読み込み中...</CustomText>
            ) : null
          }
          ListEmptyComponent={
            stopLoad ? (
              <CustomText style={styles.txtLoad}>ユーザーがいません</CustomText>
            ) : null
          }
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={0.3}
          onEndReached={this.loadMore}
          data={data}
          renderItem={this.renderItem}
          contentContainerStyle={{
            paddingBottom: 50,
            paddingTop: 70,
          }}
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

const mapStateToProps = state =>{
  return {
    user:state.userReducer.user
  }
}
export default connect(mapStateToProps)(ListUser)