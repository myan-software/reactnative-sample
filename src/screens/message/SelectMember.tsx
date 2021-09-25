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
import ChooseIcon from '../../../assets/svg/ChooseIcon';
import ChooseLightIcon from '../../../assets/svg/ChooseLightIcon';
import PopupConfirm from './components/ListMembers.PopupConfirm';

type Props = {
  navigation: any;
  route: any;
};

const SelectMember = (props: Props) => {
  const {navigation, route} = props;
  const {
    isAuthority = false,
    serverGroupId,
    threadId,
    threadType,
    onRefreshList,
  } = route.params;
  const context = useContext(AppContext);
  const user = context.user;

  const [visiblePopupConfirm, setVisiblePopupConfirm] = useState<boolean>(
    false,
  );
  const [textConfirm, setTextConfirm] = useState<string>('');
  const [userChecked, setUserChecked] = useState<any>();

  const [list, setList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getListMembers();
  }, []);

  const onRefresh = () => {
    setTextConfirm('');
    setUserChecked(null);
    setList([]);
    setLoading(true);
    getListMembers();
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
      data.forEach((_user: any) => {
        if (_user?.id.toString() !== user?.id.toString()) {
          array.push(_user);
        }
      });

      array = array.filter((_user: any) => _user?.active === 1);

      setList(array);
    }
  };

  const onChangeHost = async () => {
    const networking = new AppNetworking();
    let params: any = {
      from_host_id: user?.id,
      to_user_id: userChecked?.id,
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
          ? API.CHANGE_HOST_COMMUNITY
          : API.CHANGE_HOST_GROUP,
      params,
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      if (route.params?.onLeaveThread) {
        route.params.onLeaveThread();
      }
      navigation.navigate('Message');
    }
  };

  const onRemoveUser = async () => {
    const networking = new AppNetworking();
    let params: any = {
      user_id: userChecked?.id,
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
      removeUserFromThread(threadId, userChecked, true, () => {
        onRefresh();
        onRefreshList();
      });
    }
  };

  const onShowPopupConfirm = (_visiblePopup: boolean) => () => {
    setVisiblePopupConfirm(_visiblePopup);
  };

  const onChooseUser = (_item: any) => () => {
    setUserChecked(_item);
  };

  const onPressButton = () => {
    setVisiblePopupConfirm(true);
    setTextConfirm(
      isAuthority
        ? `${userChecked?.name} に権限を移譲しますか？`
        : `${userChecked?.name} を追放しますか？`,
    );
  };

  const gotoAccountProfile = (_user: any) => async () => {
    const networking = new AppNetworking();
    networking.init({
      url: API.DETAIL_USER,
      params: {
        user_id: _user?.id,
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      navigation.navigate('DetailUser', {user: data});
    }
  };

  const renderCheckbox = (_item: any) => {
    const isCheckedUser = userChecked?.id.toString() === _item?.id.toString();

    return (
      <TouchableOpacity
        onPress={onChooseUser(_item)}
        style={styles.iconCheckbox}>
        {isCheckedUser ? <ChooseIcon /> : <ChooseLightIcon />}
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}: any) => {
    return (
      <View style={styles.viewItem}>
        {renderCheckbox(item)}
        <View style={styles.item}>
          <TouchableOpacity onPress={gotoAccountProfile(item)}>
            <FastImage
              source={item?.avatar ? {uri: item.avatar} : images.avatar}
              style={styles.avatar}
            />
          </TouchableOpacity>
          <View style={styles.info}>
            <CustomText style={styles.textName}>{item?.name}</CustomText>
            <CustomText style={styles.textContent}>{'User'}</CustomText>
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

  const renderButton = () => {
    if (!userChecked) {
      return null;
    }
    return (
      <View style={styles.viewButton}>
        <TouchableOpacity onPress={onPressButton}>
          <LinearGradient
            start={{x: 0.01, y: 0}}
            end={{x: 0.1, y: 2.7}}
            colors={['#833AB4', '#FD1D1D', '#FCB045']}
            style={styles.buttonAuthority}>
            {isAuthority ? (
              <CustomText style={styles.textButtonAuthority}>
                {'権限移譲'}
              </CustomText>
            ) : (
              <CustomText style={styles.textButtonAuthority}>
                {'追放'}
              </CustomText>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderScreen
          title={
            isAuthority
              ? `${'権限移譲'} ${route?.params?.title}`
              : `${'追放'} ${route?.params?.title}`
          }
          navigation={navigation}
        />
        {renderContent()}
        {renderButton()}
        <PopupConfirm
          visible={visiblePopupConfirm}
          textConfirm={textConfirm}
          onCloseModal={onShowPopupConfirm(false)}
          onConfirm={isAuthority ? onChangeHost : onRemoveUser}
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
  hitSlop: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
  iconCheckbox: {
    marginRight: 10,
  },
  viewButton: {
    paddingHorizontal: 10,
  },
  buttonAuthority: {
    height: 57,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  textButtonAuthority: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '400',
    lineHeight: 20,
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 10,
  },
});

export default SelectMember;
