import firestore from '@react-native-firebase/firestore';
import {AppContext} from '@vn.starlingTech/components/AppContext';
import { consoleLog } from '@vn.starlingTech/helpers/logHelper';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import CustomText from 'src/components/CustomText';
import HeaderScreen from 'src/components/HeaderScreen';
import {
  COLLECTION,
  FIELD,
  removeUserFromThread,
  deleteThreadGroup,
  TYPE_MESSAGE,
  FLAG,
} from 'src/helper/MessageHelper';
import MoreIcon from '../../../assets/svg/MoreIcon';
import InputComponent from './components/Detail.Input';
import ItemComponent from './components/Detail.Item';
import PopupComponent from './components/Detail.Popup';
import PopupConfirm from './components/ListMembers.PopupConfirm';

type Props = {
  navigation: any;
  route: any;
};

const Detail = (props: Props) => {
  const {navigation, route} = props;
  const {dataProps} = route.params;
  const context = useContext(AppContext);
  const user = context.user;
  const [showListMembers, setShowListMembers] = useState(false);
  const [visiblePopupConfirm, setVisiblePopupConfirm] = useState<boolean>(
    false,
  );
  const [visibleDelPopupConfirm, setVisibleDelPopupConfirm] = useState<boolean>(
    false,
  );
  const [visibleOnOffNotificationPopupConfirm, setVisibleOnOffNotificationPopupConfirm] = useState<boolean>(
    false,
  );
  const [textConfirm, setTextConfirm] = useState<string>('');
  const [enableTextInput, setEnableTextInput] = useState<boolean>(true);
  const [isBlockedByMe, setIsBlockedByMe] = useState<boolean>(true);
  const [checkStatus, setCheckStatus] = useState<boolean>(false);

  const MESSAGE_LIMIT = 20;
  const [oldChats, setOldChats] = useState<any>([]);
  const [recentChats, setRecentChats] = useState<any>([]);
  const [moreChatsAvailable, setMoreChatsAvailable] = useState<boolean>(true);
  const [showSetting, setShowSetting] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(true);

  const [statisticsRoomId, setStatisticsRoomId] = useState<any>();

  useEffect(() => {
    const unsubscribeListener = firestore()
      .collection(COLLECTION.MESSAGE_THREADS)
      .doc(dataProps.id)
      .collection(COLLECTION.MESSAGES)
      .orderBy(FIELD.CREATED_AT, 'desc')
      .limit(MESSAGE_LIMIT)
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data: any = {
            id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          return data;
        });

        // merge recentChats & chats
        if (recentChats.length > 0) {
          const newRecentChats = [];
          for (let i = 0; i < messages.length; i++) {
            if (messages[i].id === recentChats[0].id) {
              break;
            }
            newRecentChats.push(messages[i]);
          }
          setRecentChats([...newRecentChats, ...recentChats]);
        } else {
          setRecentChats(messages);
          if (messages.length < MESSAGE_LIMIT) {
            setMoreChatsAvailable(false);
          }
        }

        // danh dau da doc
        if (dataProps?.seenBy) {
          let newSeenBy = [...dataProps?.seenBy, user?.id];
          newSeenBy = [...new Set(newSeenBy)];
          firestore()
            .collection(COLLECTION.MESSAGE_THREADS)
            .doc(dataProps.id)
            .set(
              {
                seenBy: newSeenBy,
              },
              {merge: true},
            );
        }
      });

    return () => unsubscribeListener();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkShowSetting();
    });

    return unsubscribe;
  }, [navigation]);

  const checkShowSetting = () => {
    firestore()
      .collection(COLLECTION.MESSAGE_THREADS)
      .doc(dataProps.id)
      .get()
      .then((docRef: any) => {
        const data: any = docRef.data();
        statisticsMessagesChat({
          ...data,
          id: docRef.id,
        });
        if (data?.type !== TYPE_MESSAGE.USER) {
          checkHost(data.type, data?.serverGroupId);
          setShowSetting(true);
        }
      })
      .catch((error: any) => {});
  };

  const statisticsMessagesChat = async (dataDoc: any) => {
    const networking = new AppNetworking();
    let url = '';
    let params: any = {
      firebaseKey: dataDoc.id,
    };
    switch (dataDoc.type) {
      case TYPE_MESSAGE.USER:
        url = API.GET_MESSAGES_BY_USER_ID;
        params = {
          ...params,
          user1_id: dataDoc.users.filter(
            (_user: any) => _user.toString() === user?.id.toString(),
          )[0],
          user2_id: dataDoc.users.filter(
            (_user: any) => _user.toString() !== user?.id.toString(),
          )[0],
        };
        break;
      case TYPE_MESSAGE.GROUP:
        url = API.GET_MESSAGES_BY_GROUP_ID;
        params = {
          user_id: user?.id.toString(),
          post_id: dataDoc.serverGroupId,
        };
        break;
      case TYPE_MESSAGE.COMMUNITY:
        url = API.GET_MESSAGES_BY_COMMUNITY_ID;
        params = {
          user_id: user?.id.toString(),
          community_id: dataDoc.serverGroupId,
        };
        break;
      default:
        break;
    }
    networking.init({
      url: url,
      params: params,
    });
    const response = await networking.postToServer();
    if (isSuccessResponse(response.status)) {
      //check block user
      setEnableTextInput(!response.fetchResponse?.isBlocked);
      setCheckStatus(true);
      //check block by me
      setIsBlockedByMe(response.fetchResponse?.isBlockedByMe);
      if (response?.fetchResponse && response?.fetchResponse?.chatroom_id) {
        setStatisticsRoomId(response.fetchResponse.chatroom_id);
      }
    }
  };

  const statisticsCreateMessage = async (text: string, docRef2 : string) => {
    if (!statisticsRoomId) {
      return;
    }
    const networking = new AppNetworking();
    let url = '';
    switch (dataProps?.type) {
      case TYPE_MESSAGE.USER:
        url = API.CREATE_MESSAGE;
        break;
      case TYPE_MESSAGE.GROUP:
        url = API.CREATE_POST_MESSAGE;
        break;
      case TYPE_MESSAGE.COMMUNITY:
        url = API.CREATE_COMMUNITY_MESSAGE;
        break;
      default:
        break;
    }
    networking.init({
      url: url,
      params: {
        chatroom_id: statisticsRoomId,
        user_id: user?.id,
        message: text,
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (!isSuccessResponse(status)) {
      text = message;
    }  

    await firestore()
    .collection(COLLECTION.MESSAGE_THREADS)
    .doc(dataProps.id)
    .set(
      {
        latestMessage: {
          text,
          createdAt: new Date().getTime(),
        },
        seenBy: [user?.id],
      },
      {merge: true},
    )
    .then(() => {
      firestore()
        .collection(COLLECTION.MESSAGE_THREADS)
        .doc(dataProps.id)
        .collection(COLLECTION.MESSAGES)
        .doc(docRef2.id)
        .set(
          {
            text: text,
            seenBy: [user?.id],
          },
          {merge: true},
        )
    });
  };

  const checkHost = async (type: number, id: string | number) => {
    let params: any = {
      user_id: user?.id,
    };
    if (type === TYPE_MESSAGE.GROUP) {
      params = {
        ...params,
        post_id: id,
      };
    }
    if (type === TYPE_MESSAGE.COMMUNITY) {
      params = {
        ...params,
        community_id: id,
      };
    }
    const networking = new AppNetworking();
    networking.init({
      url:
        type === TYPE_MESSAGE.GROUP
          ? API.CHECK_HOST_GROUP
          : API.CHECK_HOST_COMMUNITY,
      params,
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      if (data !== 1) {
        setIsAdmin(false);
      }
    }
  };

  const onChatListEndReached = () => {
    if (!moreChatsAvailable) {
      return;
    }
    let startAfter;
    if (oldChats.length > 0) {
      startAfter = oldChats[oldChats.length - 1].createdAt;
    } else if (recentChats.length > 0) {
      startAfter = recentChats[recentChats.length - 1].createdAt;
    } else {
      setMoreChatsAvailable(false);
      return;
    }

    // query data using cursor
    firestore()
      .collection(COLLECTION.MESSAGE_THREADS)
      .doc(dataProps.id)
      .collection(COLLECTION.MESSAGES)
      .orderBy(FIELD.CREATED_AT, 'desc')
      .startAfter(startAfter)
      .limit(MESSAGE_LIMIT)
      .get()
      .then((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data: any = {
            id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          return data;
        });

        if (messages.length === 0) {
          setMoreChatsAvailable(false);
        } else {
          setOldChats([...oldChats, ...messages]);
        }
      });
  };

  const onSend = (_text: string) => {
    const text = _text.trim();
    if (!text) {
      return;
    }
    firestore()
      .collection(COLLECTION.MESSAGE_THREADS)
      .doc(dataProps.id)
      .collection(COLLECTION.MESSAGES)
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          id: user?.id,
          name: user?.name,
          avatar: user?.avatar,
        },
      })
      .then((docRef2: any) => {
        statisticsCreateMessage(text, docRef2);
      });
  };

  const onShowListMembers = (type: boolean) => () => {
    setShowListMembers(type);
  };

  const onExit = () => {
    setVisiblePopupConfirm(true);
    setTextConfirm(`${dataProps?.name}を脱退しますか？`);
  };

  const onDeleteThread = () => {
    setVisibleDelPopupConfirm(true);
    setTextConfirm(`${dataProps?.name}を解散しますか？`);
  };

  const onOffNotification = () => {
    setVisibleOnOffNotificationPopupConfirm(true);
    let textName = dataProps?.type === TYPE_MESSAGE.COMMUNITY 
      ? 'コミュニティ' : 'グループ';

    let textOnOff = dataProps?.notification == null || dataProps?.notification == FLAG.NOTIFICATION_ON ? 'OFF' : 'ON'
    setTextConfirm(`${dataProps?.name}の通知を${textOnOff}にします。\n\nよろしいですか？`);
  };
  
  const onShowPopupConfirm = (_visible: boolean) => () => {
    setVisiblePopupConfirm(_visible);
  };

  const onShowDelPopupConfirm = (_visible: boolean) => () => {
    setVisibleDelPopupConfirm(_visible);
  };

  const onShowOnOffNotificationPopupConfirm = (_visible: boolean) => () => {
    setVisibleOnOffNotificationPopupConfirm(_visible);
  };

  const onLeaveThread = async () => {
    if (isAdmin) {
      return;
    }
    const networking = new AppNetworking();
    let params: any = {
      user_id: user?.id.toString(),
    };
    if (dataProps?.type === TYPE_MESSAGE.COMMUNITY) {
      params = {
        ...params,
        community_id: dataProps?.serverGroupId,
      };
    }
    if (dataProps?.type === TYPE_MESSAGE.GROUP) {
      params = {
        ...params,
        post_id: dataProps?.serverGroupId,
      };
    }
    networking.init({
      url:
        dataProps?.type === TYPE_MESSAGE.COMMUNITY
          ? API.LEAVE_COMMUNITY_GROUP
          : API.LEAVE_GROUP,
      params,
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      removeUserFromThread(dataProps?.id, user, false, () => {
        navigation.navigate('Message');
      });
    }
  };
  
  const _onDeleteThread = async () => {
    if (!isAdmin) {
      return;
    }
    const networking = new AppNetworking();
    let params: any = {
      user_id: user?.id.toString(),
    };
    if (dataProps?.type === TYPE_MESSAGE.COMMUNITY) {
      params = {
        ...params,
        community_id: dataProps?.serverGroupId,
      };
    }
    if (dataProps?.type === TYPE_MESSAGE.GROUP) {
      params = {
        ...params,
        post_id: dataProps?.serverGroupId,
      };
    }
    networking.init({
      url:
        dataProps?.type === TYPE_MESSAGE.COMMUNITY
          ? API.DELETE_COMMUNITY_GROUP
          : API.DELETE_GROUP,
      params,
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      deleteThreadGroup(dataProps?.id, () => {
        navigation.navigate('Message');
      });
    }
  };
  
  const _onShowOnOffNotificationPopupConfirm = async () => {
    const networking = new AppNetworking();
    let params: any = {
      user_id: user?.id.toString(),
      firebaseKey: dataProps?.id,
    };
    if (dataProps?.type === TYPE_MESSAGE.COMMUNITY) {
      params = {
        ...params,
        community_id: dataProps?.serverGroupId,
      };
    }
    if (dataProps?.type === TYPE_MESSAGE.GROUP) {
      params = {
        ...params,
        post_id: dataProps?.serverGroupId,
      };
    }

    if (dataProps?.type === TYPE_MESSAGE.USER) {
      params = {
        ...params,
      };
    }
    console.log(params);
    networking.init({
      url: API.ON_OFF_NOTIFICATION,
      params,
    });
    const {status, data} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      console.log(data.notification);
      await firestore()
          .collection(COLLECTION.MESSAGE_THREADS)
          .doc(dataProps.id)
          .set(
            {
              notification: data.notification,
            },
            {merge: true},
          )
          .then(() => {
            firestore()
              .collection(COLLECTION.MESSAGE_THREADS)
              .doc(dataProps.id)
              .get()
              .then((docRef2) => {
                setTimeout(() => {
                  navigation.navigate('MessageDetail', {
                    dataProps: {
                      id: dataProps.id,
                      ...docRef2.data(),
                    },
                  });
                }, 300);
              })
              .catch((error) => {
                console.log('error update firebase', error);
              });
          });
    }
  };

  const getItemByIndex = (index: number) => {
    return [...recentChats, ...oldChats][index];
  };

  const renderLoadMore = () => {
    return moreChatsAvailable ? (
      <CustomText style={styles.textEmpty}>{'読み込み中...'}</CustomText>
    ) : null;
  };

  const renderItem = ({item, index}: any) => {
    return (
      <ItemComponent
        item={item}
        previousItem={getItemByIndex(index - 1)}
        nextItem={getItemByIndex(index + 1)}
        navigation={navigation}
      />
    );
  };

  return (
    <>
      <View style={styles.container}>
        {showSetting ? (
          <HeaderScreen
            title={dataProps?.name}
            navigation={navigation}
            RightComponent={
              <TouchableOpacity
                onPress={onShowListMembers(!showListMembers)}
                hitSlop={styles.hitSlop}>
                <View style={styles.iconHeaderRight}>
                  <MoreIcon />
                </View>
              </TouchableOpacity>
            }
          />
        ) : (
          <HeaderScreen title={dataProps?.name} navigation={navigation} />
        )}
        <FlatList
          data={[...recentChats, ...oldChats]}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.list}
          inverted
          contentContainerStyle={styles.content}
          onEndReached={onChatListEndReached}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderLoadMore}
        />
        {checkStatus ? (
          <InputComponent onSend={onSend} editable={enableTextInput} byMe={isBlockedByMe} />
        ) : null}
        <PopupComponent
          visible={showListMembers}
          onCloseModal={onShowListMembers(false)}
          navigation={navigation}
          title={dataProps?.name}
          isAdmin={isAdmin}
          onExit={onExit}
          onDeleteThread={onDeleteThread}
          onOffNotification={onOffNotification}
          serverGroupId={dataProps?.serverGroupId}
          threadId={dataProps?.id}
          threadName={dataProps?.name}
          threadType={dataProps?.type}
          notification={dataProps?.notification != null ? dataProps?.notification : FLAG.NOTIFICATION_ON}
        />
        <PopupConfirm
          visible={visiblePopupConfirm}
          textConfirm={textConfirm}
          onCloseModal={onShowPopupConfirm(false)}
          onConfirm={onLeaveThread}
        />
        <PopupConfirm
          visible={visibleDelPopupConfirm}
          textConfirm={textConfirm}
          onCloseModal={onShowDelPopupConfirm(false)}
          onConfirm={_onDeleteThread}
        />
        <PopupConfirm
          visible={visibleOnOffNotificationPopupConfirm}
          textConfirm={textConfirm}
          onCloseModal={onShowOnOffNotificationPopupConfirm(false)}
          onConfirm={_onShowOnOffNotificationPopupConfirm}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingBottom: getBottomSpace(),
  },
  iconHeaderRight: {
    marginRight: 10,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  list: {
    backgroundColor: '#FFFFFF',
    // paddingHorizontal: 10,
  },
  input: {
    backgroundColor: '#FFFFFF',
    paddingBottom: getBottomSpace(),
    paddingHorizontal: 10,
  },
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Detail;
