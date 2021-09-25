import CONSTANTS from '@vn.starlingTech/config/Constant';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from 'src/components/CustomText';
import HeaderScreen from 'src/components/HeaderScreen';
import UsersIcon from '../../../assets/svg/UsersIcon';
import SearchComponent from './components/Community.Search';

type Props = {
  navigation: any;
  route: any;
};

const ListCommunity = (props: Props) => {
  const {navigation, route} = props;
  const [keyword, setKeyword] = useState<string>('');
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    onRefresh();
  }, [keyword]);

  useEffect(() => {
    if (refreshing) {
      getData(page);
    }
  }, [refreshing]);

  const onRefresh = () => {
    setList([]);
    setPage(1);
    setRefreshing(true);
    setLoading(true);
  };

  const getData = async (_page) => {
    const networking = new AppNetworking();
    let _params: any = {
      keyword,
      page: _page,
    };
    if (route.params.categoryId) {
      _params = {
        ..._params,
        category_id: route.params.categoryId,
      };
    }
    networking.init({
      url: API.SEARCH_COMMUNITY,
      params: _params,
    });
    const {data, status, message} = await networking.postToServer();
    setRefreshing(false);
    setLoading(false);
    setLoadMore(false);
    if (isSuccessResponse(status)) {
      setMaxPage(Number(data.last_page));
      setList(page === 1 ? data.data : [...list, ...data.data]);
    }
  };

  const onSearch = (_keyword: string) => {
    setKeyword(_keyword);
  };

  const goDetail = (item: any) => () => {
    navigation.navigate('CommunityDetail', {dataProps: item});
  };

  const getTitle = () => {
    if (route.params?.title) {
      return route.params.title;
    }
  };

  const handleLoadMore = async () => {
    if (!loadMore && page < maxPage) {
      getData(page + 1);
      setLoadMore(true);
      setPage(page + 1);
    }
  };

  const renderFooter = () => {
    if (!loadMore) return null;
    return <CustomText style={styles.textEmpty}>{'読み込み中...'}</CustomText>;
  };

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity onPress={goDetail(item)}>
        <View style={styles.item}>
          <FastImage source={{uri: item.image}} style={styles.image} />
          <View style={styles.viewInfo}>
            <CustomText style={styles.textItem}>{item?.title}</CustomText>
            <View style={styles.viewCount}>
              <UsersIcon />
              <CustomText style={styles.textCount}>
                {item?.number_of_members}
              </CustomText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <CustomText style={styles.textEmpty}>{'読み込み中...'}</CustomText>
      );
    }
    if (list && list.length > 0) {
      return (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          style={styles.list}
          numColumns={3}
          extraData={list}
          refreshing={refreshing}
          onRefresh={onRefresh}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
        />
      );
    }
    return <CustomText style={styles.textEmpty}>{'コミュニティがありません'}</CustomText>;
  };

  return (
    <>
      <HeaderScreen title={getTitle()} navigation={navigation} />
      <View style={styles.container}>
        <SearchComponent navigation={navigation} onSearch={onSearch} />
        {renderContent()}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
  },
  list: {
    marginTop: 20,
    paddingHorizontal: 4,
  },
  item: {
    marginHorizontal: 6,
    marginBottom: 30,
  },
  image: {
    width: (CONSTANTS.screenWidth - 44) / 3,
    height: 94,
    borderRadius: 14,
  },
  viewInfo: {
    marginTop: 5,
    width: 94,
  },
  textItem: {
    flexWrap: 'wrap',
    fontSize: 14,
    color: '#000000',
    fontWeight: '700',
    lineHeight: 20,
  },
  viewCount: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  textCount: {
    fontSize: 10,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 14,
    marginLeft: 10,
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ListCommunity;
