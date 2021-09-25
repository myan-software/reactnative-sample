import {AppContext} from '@vn.starlingTech/components/AppContext';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import CustomText from 'src/components/CustomText';
import ArrowRightIcon from '../../../../assets/svg/ArrowRightIcon';
import UsersIcon from '../../../../assets/svg/UsersIcon';

type Props = {
  navigation: any;
  type: number;
  keyword: string;
};

export const TYPE_COMMUNITY = {
  FAVORITE: 1,
  RECOMMEND: 2,
};

const ListComponent = (props: Props) => {
  const {navigation, type, keyword} = props;
  const context = useContext(AppContext);
  const user = context.user;
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onRefresh();
  }, [keyword]);

  const onRefresh = () => {
    setLoading(true);
    setData([]);
    getData();
  };

  const getData = async () => {
    const networking = new AppNetworking();
    networking.init({
      url:
        type === TYPE_COMMUNITY.FAVORITE
          ? API.GET_FAVORITE_COMMUNITIES
          : API.GET_RECOMMEND_COMMUNITIES,
      params: {
        user_id: user?.id,
        page: 1,
        keyword,
      },
    });
    const {data, status, message} = await networking.postToServer();
    setLoading(false);
    if (isSuccessResponse(status)) {
      setData(data.data);
    }
  };

  const goDetail = (item: any) => () => {
    navigation.navigate('CommunityDetail', {dataProps: item});
  };

  const onShowAll = () => {
    navigation.navigate('CommunityList', {title: getTitle()});
  };

  const getTitle = () => {
    switch (type) {
      case TYPE_COMMUNITY.FAVORITE:
        return '人気';
      case TYPE_COMMUNITY.RECOMMEND:
        return 'オススメ';
      default:
        return '';
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <TouchableOpacity onPress={goDetail(item)}>
        <View
          style={[styles.item, index === data.length - 1 && {marginRight: 10}]}>
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
    if (data && data.length > 0) {
      return (
        <>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.list}
          />
        </>
      );
    }
    return <CustomText style={styles.textEmpty}>{'コミュニティがありません'}</CustomText>;
  };

  return (
    <View style={styles.container}>
      <View style={styles.viewTitle}>
        <CustomText style={styles.title}>{getTitle()}</CustomText>
        {data && data.length > 0 ? (
          <TouchableOpacity onPress={onShowAll}>
            <View style={styles.buttonMore}>
              <CustomText style={styles.textButton}>
                {'すべてを見る'}
              </CustomText>
              <ArrowRightIcon />
            </View>
          </TouchableOpacity>
        ) : null}
      </View>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
  },
  buttonMore: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 16,
  },
  list: {
    marginTop: 10,
  },
  item: {
    marginLeft: 10,
  },
  image: {
    width: 94,
    aspectRatio:355/231,
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

export default React.memo(ListComponent);
