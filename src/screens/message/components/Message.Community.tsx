import firestore from '@react-native-firebase/firestore';
import {AppContext} from '@vn.starlingTech/components/AppContext';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import moment from 'moment';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import images from 'src/assets/images';
import CustomText from 'src/components/CustomText';
import {COLLECTION, FIELD, TYPE_MESSAGE} from 'src/helper/MessageHelper';
import ArrowRightIcon from '../../../../assets/svg/ArrowRightIcon';

type Props = {
  navigation: any;
};

const CommunityComponent = (props: Props) => {
  const {navigation} = props;
  const context = useContext(AppContext);
  const user = context.user;

  const [threads, setThreads] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const query = firestore()
      .collection(COLLECTION.MESSAGE_THREADS)
      .where(FIELD.TYPE, '==', TYPE_MESSAGE.COMMUNITY)
      .where(FIELD.USERS, 'array-contains', user?.id.toString());

    const listener = query.onSnapshot((querySnapshot) => {
      let threads = querySnapshot.docs.map((snapshot: any) => {
        return {
          id: snapshot.id,
          ...snapshot.data(),
        };
      });

      if (threads.length > 0) {
        const arrayHaveLatestMessage: any = [];
        const arrayNotHaveLatestMessage: any = [];
        threads.forEach((value: any) => {
          if (value.latestMessage) {
            arrayHaveLatestMessage.push(value);
          } else {
            arrayNotHaveLatestMessage.push(value);
          }
        });
        arrayHaveLatestMessage.sort((a: any, b: any) =>
          a.latestMessage?.createdAt < b.latestMessage?.createdAt ? 1 : -1,
        );
        arrayNotHaveLatestMessage.sort((a: any, b: any) =>
          a?.createdAt < b?.createdAt ? 1 : -1,
        );
        threads = [...arrayHaveLatestMessage, ...arrayNotHaveLatestMessage];
      }

      setThreads(threads);

      if (loading) {
        setLoading(false);
      }
    });
    return () => listener();
  }, []);

  useEffect(() => {
    statisticsListGroupChat();
  }, []);

  const statisticsListGroupChat = async () => {
    const networking = new AppNetworking();
    networking.init({
      url: API.GET_LIST_COMMUNITY_CHAT,
      params: {
        user_id: user?.id,
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
    }
  };

  const onPress = (item: any) => () => {
    navigation.navigate('MessageDetail', {
      dataProps: item,
    });
  };

  const getStyleUnread = (item: any) => {
    if (item?.seenBy) {
      if (!item.seenBy.includes(user?.id)) {
        return '700';
      }
      return '400';
    }
    return '400';
  };

  const getAvatarUser = (item: any, index?: number) => {
    if (item?.avatars) {
      let yourAvatar = '';
      let anotherAvatar: any = [];
      item.avatars.forEach((element: any) => {
        if (element.user === user?.id.toString()) {
          yourAvatar = element.avatar;
        } else {
          anotherAvatar.push(element);
        }
      });
      if (!index) {
        return yourAvatar;
      }
      if (anotherAvatar.length > 0 && anotherAvatar.length > index - 1) {
        return anotherAvatar[index - 1].avatar;
      }
    }
    return '';
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity onPress={onPress(item)}>
        <View style={styles.item}>
          <View style={styles.avatar}>
            <FastImage
              source={
                getAvatarUser(item, 1)
                  ? {uri: getAvatarUser(item, 1)}
                  : images.avatar
              }
              style={styles.imageAvatar}
            />
            <FastImage
              source={
                getAvatarUser(item) ? {uri: getAvatarUser(item)} : images.avatar
              }
              style={[
                styles.imageAvatar,
                {position: 'absolute', right: 0, bottom: 0},
              ]}
            />
          </View>
          <View style={styles.info}>
            <View style={styles.infoLeft}>
              <CustomText
                style={[styles.textName, {fontWeight: getStyleUnread(item)}]}>
                {item.name}
              </CustomText>
              <CustomText
                style={[styles.textContent, {fontWeight: getStyleUnread(item)}]}
                numberOfLines={2}>
                {item?.latestMessage?.text}
              </CustomText>
            </View>
            <View style={styles.infoRight}>
              <ArrowRightIcon />
              {item?.latestMessage?.createdAt ? (
                <CustomText style={styles.textTime}>
                  {moment(item.latestMessage.createdAt).fromNow()}
                </CustomText>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <CustomText style={styles.textEmpty}>{'読み込み中...'}</CustomText>;
  }

  if (threads.length > 0) {
    return (
      <>
        <FlatList
          data={threads}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.list}
        />
      </>
    );
  }

  return <CustomText style={styles.textEmpty}>{'データなし'}</CustomText>;
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    marginRight: 20,
  },
  imageAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  info: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLeft: {
    flex: 1,
    marginRight: 5,
  },
  textName: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '700',
    lineHeight: 23.15,
  },
  textContent: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 2,
  },
  infoRight: {
    alignItems: 'flex-end',
  },
  textTime: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default React.memo(CommunityComponent);
