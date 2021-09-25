import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Platform} from 'react-native';
import ItemPost from '../../post/ItemPost';
import layout from '../../../constant/layout';
import services from '../../../network/services';
import CustomText from '../../../components/CustomText';
export default class ListPostFavorite extends Component {
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
      let {type, user_id} = this.props;
      let dataPost = {page, type, user_id};
      let rs = await services.getFavorites(dataPost);
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
      let {type, user_id} = this.props;
      let {page, data} = this.state;
      let dataPost = {page, type, user_id};
      let rs = await services.getFavorites(dataPost);
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
  renderItem = ({item, index}) => (
    <ItemPost item={item} navigation={this.props.navigation} />
  );
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
