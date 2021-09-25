import React, {Component} from 'react';
import {View, StyleSheet, FlatList, TextInput, Animated} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import ItemPost from '../post/ItemPost';
import layout from '../../constant/layout';
import services from '../../network/services';
import handleStore from '../../redux/handleStore';
import CustomText from '../../components/CustomText';
export default class ListPostSearch extends Component {
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
      let dataPost = {page, keyword};
      let rs = await services.searchPost(dataPost);
      this.setState({
        data: rs.data.data,
        page: rs.data.next_page_url ? page + 1 : page,
        refreshing: false,
        stopLoad: rs.data.next_page_url ? false : true,
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
      let {page, data, keyword} = this.state;
      let dataPost = {page, keyword};
      let rs = await services.searchPost(dataPost);
      this.setState({
        data: data.concat(rs.data.data),
        page: rs.data.next_page_url ? page + 1 : page,
        stopLoad: rs.data.next_page_url ? false : true,
      });
      this.inLoadMore = false;
    } catch (error) {
      //console.log(error);
    }
  };
  renderItem = ({item, index}) => {
    return <ItemPost item={item} navigation={this.props.navigation} />;
  };
  keyExtractor = (item, index) => 'itemPost' + index;
  render() {
    let {scrollY, data, stopLoad, refreshing} = this.state;
    let {hideSearch} = this.props;
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
        {hideSearch ? null : (
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
                returnKeyLabel="search"
                returnKeyType="search"
                onChangeText={(keyword) => this.setState({keyword})}
                onSubmitEditing={(e) => {
                  this.onRefresh();
                }}
              />
            </View>
          </Animated.View>
        )}
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
              <CustomText style={styles.txtLoad}>投稿がありません</CustomText>
            ) : null
          }
          refreshing={refreshing}
          onRefresh={this.onRefresh}
          onEndReachedThreshold={0.3}
          onEndReached={this.loadMore}
          data={data}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          contentContainerStyle={{
            paddingBottom: 50,
            paddingTop: hideSearch ? 0 : 70,
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
