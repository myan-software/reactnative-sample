import {AppContext} from '@vn.starlingTech/components/AppContext';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import React, {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import images from 'src/assets/images';
import CustomText from 'src/components/CustomText';
import HeaderScreen from 'src/components/HeaderScreen';
import {removeUserFromThread, TYPE_MESSAGE} from 'src/helper/MessageHelper';
import MoreIcon from '../../../assets/svg/MoreIcon';
import PopupComponent from './components/ListMembers.Popup';
import PopupConfirm from './components/ListMembers.PopupConfirm';

type Props = {
  navigation: any;
  route: any;
};

const ListMembers = (props: Props) => {
  const {navigation, route} = props;
  const {serverGroupId, threadId, threadName, threadType} = route.params;
  const context = useContext(AppContext);
  const user = context.user;

  const TYPE_BUTTON = {
    YOUR_ACCOUNT: 1,
    FOLLOWED: 2,
    NOT_FOLLOW: 3,
  };

  const [visiblePopup, setVisiblePopup] = useState<boolean>(false);
  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visiblePopupConfirm, setVisiblePopupConfirm] = useState<boolean>(
    false,
  );
  const [textConfirm, setTextConfirm] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkHost();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getListMembers();
  }, []);

  const onRefresh = () => {
    setList([]);
    setLoading(true);
    getListMembers();
  };

  const checkHost = async () => {
    let params: any = {
      user_id: user?.id,
    };
    if (threadType === TYPE_MESSAGE.GROUP) {
      params = {
        ...params,
        post_id: serverGroupId,
      };
    }
    if (threadType === TYPE_MESSAGE.COMMUNITY) {
      params = {
        ...params,
        community_id: serverGroupId,
      };
    }
    const networking = new AppNetworking();
    networking.init({
      url:
        threadType === TYPE_MESSAGE.GROUP
          ? API.CHECK_HOST_GROUP
          : API.CHECK_HOST_COMMUNITY,
      params,
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      if (data === 1) {
        setIsAdmin(true);
      }
    }
  };

  const getListMembers = async () => {
    const networking = new AppNetworking();
    let params: any = {};
    if (threadType === TYPE_MESSAGE.COMMUNITY) {
      params = {
        ...params,
        community_id: serverGroupId,
      };
    }
    if (threadType === TYPE_MESSAGE.GROUP) {
      params = {
        ...params,
        post_id: serverGroupId,
      };
    }
    networking.init({
      url:
        threadType === TYPE_MESSAGE.COMMUNITY
          ? API.GET_MEMBER_COMMUNITY
          : API.GET_MEMBER_GROUP,
      params,
    });
    const {data, status, message} = await networking.postToServer();
    setLoading(false);
    if (isSuccessResponse(status)) {
      let array: any = [];
      let _dataYour;
      data.forEach((_user: any) => {
        if (_user?.id.toString() === user?.id.toString()) {
          _dataYour = _user;
        } else {
          array.push(_user);
        }
      });

      if (_dataYour) {
        array = [_dataYour, ...array];
      }

      array = array.filter((_user: any) => _user?.active === 1);

      setList(array);
      getListFollows(array);
    }
  };

  const getListFollows = async (_listUsers: any) => {
    const networking = new AppNetworking();
    networking.init({
      url: API.GET_FOLLOWS,
      params: {
        user_id: user?.id,
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      let array: any = [];
      _listUsers.forEach((_user: any) => {
        if (_user?.id.toString() === user?.id.toString()) {
          array.push({..._user, checkRenderButton: TYPE_BUTTON.YOUR_ACCOUNT});
        } else {
          const check = data.some(
            (element: any) => _user?.id.toString() === element?.id.toString(),
          );
          if (check) {
            array.push({..._user, checkRenderButton: TYPE_BUTTON.FOLLOWED});
          } else {
            array.push({..._user, checkRenderButton: TYPE_BUTTON.NOT_FOLLOW});
          }
        }
      });
      setList(array);
    }
  };

  const onShowPopup = (_visiblePopup: boolean) => () => {
    setVisiblePopup(_visiblePopup);
  };

  const onExit = () => {
    setVisiblePopupConfirm(true);
    setTextConfirm(`${threadName} を脱退しますか？`);
  };

  const onShowPopupConfirm = (_visible: boolean) => () => {
    setVisiblePopupConfirm(_visible);
  };

  const gotoAccountProfile = (user: any) => async () => {
    const networking = new AppNetworking();
    networking.init({
      url: API.DETAIL_USER,
      params: {
        user_id: user?.id,
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      navigation.navigate('DetailUser', {user: data});
    }
  };

  const onLeaveThread = (_isAdmin: boolean = true) => async () => {
    // neu la host thi doi host cho nguoi khac roi roi nhom
    if (_isAdmin) {
      navigation.navigate('MessageSelectMember', {
        title: route?.params?.title,
        isAuthority: true,
        serverGroupId,
        threadId,
        threadType,
        onLeaveThread: onLeaveThread(false),
      });
      return;
    }

    const networking = new AppNetworking();
    let params: any = {
      user_id: user?.id.toString(),
    };
    if (threadType === TYPE_MESSAGE.COMMUNITY) {
      params = {
        ...params,
        community_id: serverGroupId,
      };
    }
    if (threadType === TYPE_MESSAGE.GROUP) {
      params = {
        ...params,
        post_id: serverGroupId,
      };
    }
    networking.init({
      url:
        threadType === TYPE_MESSAGE.COMMUNITY
          ? API.LEAVE_COMMUNITY_GROUP
          : API.LEAVE_GROUP,
      params,
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      removeUserFromThread(threadId, user, false, () => {
        navigation.navigate('Message');
      });
    }
  };

  const onUnfollowUser = async (_user: any) => {
    const networking = new AppNetworking();
    networking.init({
      url: API.UNFOLLOW_USER,
      params: {
        user_id: user?.id.toString(),
        follow_user_id: _user?.id.toString(),
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      getListFollows(list);
    }
  };

  const onFollowUser = async (_user: any) => {
    const networking = new AppNetworking();
    networking.init({
      url: API.FOLLOW_USER,
      params: {
        user_id: user?.id.toString(),
        follow_user_id: _user?.id.toString(),
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      getListFollows(list);
    }
  };

  const onPressButton = (type: number, _user: any) => () => {
    switch (type) {
      case TYPE_BUTTON.YOUR_ACCOUNT:
        onExit();
        return;
      case TYPE_BUTTON.FOLLOWED:
        onUnfollowUser(_user);
        return;
      case TYPE_BUTTON.NOT_FOLLOW:
        onFollowUser(_user);
        return;
      default:
        return;
    }
  };

  const renderButton = (_item: any) => {
    switch (_item?.checkRenderButton) {
      case TYPE_BUTTON.YOUR_ACCOUNT:
        return (
          <View style={styles.infoRight}>
            <TouchableOpacity
              onPress={onPressButton(TYPE_BUTTON.YOUR_ACCOUNT, _item)}>
              <LinearGradient
                start={{x: 0.01, y: 0}}
                end={{x: 0.1, y: 1.9}}
                colors={['#833AB4', '#FD1D1D', '#FCB045']}
                style={styles.button}>
                <CustomText style={styles.textButton}>{'脱退'}</CustomText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
      case TYPE_BUTTON.FOLLOWED:
        return (
          <View style={styles.infoRight}>
            <TouchableOpacity
              onPress={onPressButton(TYPE_BUTTON.FOLLOWED, _item)}>
              <LinearGradient
                start={{x: 0.01, y: 0}}
                end={{x: 0.1, y: 1.9}}
                colors={['#833AB4', '#FD1D1D', '#FCB045']}
                style={styles.button}>
                <CustomText style={styles.textButton}>{'解除'}</CustomText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
      case TYPE_BUTTON.NOT_FOLLOW:
        return (
          <View style={styles.infoRight}>
            <TouchableOpacity
              onPress={onPressButton(TYPE_BUTTON.NOT_FOLLOW, _item)}>
              <LinearGradient
                start={{x: 0.01, y: 0}}
                end={{x: 0.1, y: 1.9}}
                colors={['#833AB4', '#FD1D1D', '#FCB045']}
                style={styles.button}>
                <CustomText style={styles.textButton}>{'フォロー'}</CustomText>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.viewItem}>
        <View style={styles.item}>
          <TouchableOpacity onPress={gotoAccountProfile(item)}>
            <FastImage
              source={item?.avatar ? {uri: item.avatar} : images.avatar}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.info}>
            <View style={styles.infoLeft}>
              <CustomText style={styles.textName}>{item?.name}</CustomText>
              <CustomText style={styles.textContent}>
                {item?.id.toString() === user?.id.toString()
                  ? 'My account'
                  : 'User'}
              </CustomText>
            </View>
            {renderButton(item)}
          </View>
        </View>
      </View>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <CustomText style={styles.textEmpty}>{'読み込み中...'}</CustomText>
      );
    }
    if (list.length > 0) {
      return (
        <FlatList
          data={list}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          style={styles.list}
          extraData={list}
        />
      );
    }
    return (
      <CustomText style={styles.textEmpty}>{'メンバーがいません'}</CustomText>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {isAdmin ? (
          <HeaderScreen
            title={route?.params?.title}
            navigation={navigation}
            RightComponent={
              <TouchableOpacity
                onPress={onShowPopup(true)}
                hitSlop={styles.hitSlop}>
                <View style={styles.iconHeaderRight}>
                  <MoreIcon />
                </View>
              </TouchableOpacity>
            }
          />
        ) : (
          <HeaderScreen title={route?.params?.title} navigation={navigation} />
        )}
        {renderContent()}
        <PopupComponent
          visible={visiblePopup}
          onCloseModal={onShowPopup(false)}
          navigation={navigation}
          title={route?.params?.title}
          serverGroupId={serverGroupId}
          threadId={threadId}
          threadType={threadType}
          onRefreshList={onRefresh}
        />
        <PopupConfirm
          visible={visiblePopupConfirm}
          textConfirm={textConfirm}
          onCloseModal={onShowPopupConfirm(false)}
          onConfirm={onLeaveThread(isAdmin)}
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
  list: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
  },
  viewItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    marginRight: 20,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 14,
    height: 24,
    width: 112,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: '400',
    lineHeight: 13.62,
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

export default ListMembers;
