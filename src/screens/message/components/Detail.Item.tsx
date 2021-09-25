import {AppContext} from '@vn.starlingTech/components/AppContext';
import CONSTANTS from '@vn.starlingTech/config/Constant';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import moment from 'moment';
import React, {useContext, useState} from 'react';
import {Linking, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Hyperlink from 'react-native-hyperlink';
import images from 'src/assets/images';
import CustomText from 'src/components/CustomText';
import TailIcon from '../../../../assets/svg/TailIcon';
import TailIconColor from '../../../../assets/svg/TailIconColor';

type Props = {
  item: any;
  previousItem: any;
  nextItem: any;
  navigation: any;
};

const ItemComponent = (props: Props) => {
  const {item, previousItem, nextItem, navigation} = props;
  const context = useContext(AppContext);
  const user = context.user;
  const [showTime, setShowTime] = useState<boolean>(false);

  const checkLastMessage = () => {
    if (!previousItem) {
      return true;
    }
    if (!nextItem) {
      if (previousItem && item?.user?.id === previousItem?.user?.id) {
        return false;
      }
      return true;
    }
    if (previousItem && nextItem) {
      if (previousItem?.user?.id !== item?.user?.id) {
        return true;
      }
      return false;
    }
    return false;
  };

  const onPressMessage = () => {
    setShowTime(!showTime);
  };

  const formatTime = (time: any) => {
    return moment(time).fromNow();
  };

  const onPressLink = async (url: any, text: any) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  };

  const gotoAccountProfile = async () => {
    const networking = new AppNetworking();
    networking.init({
      url: API.DETAIL_USER,
      params: {
        user_id: item?.user?.id,
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      navigation.navigate('DetailUser', {user: data});
    }
  };

  const renderAvatar = () => {
    if (checkLastMessage()) {
      return (
        <TouchableOpacity onPress={gotoAccountProfile}>
          <FastImage
            source={
              item?.user?.avatar ? {uri: item.user.avatar} : images.avatar
            }
            style={styles.avatar}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.avatar} />;
  };

  const renderTime = () => {
    if (showTime) {
      return (
        <CustomText style={styles.textTime}>
          {formatTime(item?.createdAt)}
        </CustomText>
      );
    }
    if (checkLastMessage()) {
      return (
        <CustomText style={styles.textTime}>
          {formatTime(item?.createdAt)}
        </CustomText>
      );
    }
    return null;
  };

  const renderTail = () => {
    // you
    if (item?.user?.id.toString() === user?.id.toString()) {
      if (checkLastMessage()) {
        return (
          <View style={[styles.iconTail, {right: -5}]}>
            <TailIconColor />
          </View>
        );
      }
      return null;
    }

    // another
    if (checkLastMessage()) {
      return (
        <View style={[styles.iconTail, {left: -5}]}>
          <TailIcon />
        </View>
      );
    }
    return null;
  };

  // message system
  if (item?.systemMessage) {
    return <CustomText style={styles.textAddUser}>{item.text}</CustomText>;
  }

  // message from you
  if (item?.user?.id.toString() === user?.id.toString()) {
    return (
      <View style={{alignItems: 'flex-end', marginRight: 10}}>
        <TouchableOpacity activeOpacity={1} onPress={onPressMessage}>
          <View style={[styles.message, {backgroundColor: '#833AB4'}]}>
            <Hyperlink onPress={onPressLink} linkStyle={styles.textLink}>
              <CustomText style={[styles.textMessage, {color: '#FFFFFF'}]}>
                {item?.text}
              </CustomText>
            </Hyperlink>
            {renderTail()}
          </View>
        </TouchableOpacity>
        {renderTime()}
      </View>
    );
  }

  // message from another
  return (
    <View style={{marginLeft: 10}}>
      <View style={styles.item}>
        {renderAvatar()}
        <TouchableOpacity activeOpacity={1} onPress={onPressMessage}>
          <View style={[styles.message, {backgroundColor: '#F2F2F2'}]}>
            <Hyperlink onPress={onPressLink} linkStyle={styles.textLink}>
              <CustomText style={styles.textMessage}>{item?.text}</CustomText>
            </Hyperlink>
            {renderTail()}
          </View>
        </TouchableOpacity>
      </View>
      {renderTime()}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    marginRight: 12,
  },
  message: {
    borderRadius: 15,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginTop: 6,
    maxWidth: CONSTANTS.width - 140,
  },
  textTime: {
    fontSize: 10,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 13.62,
    marginLeft: 60,
  },
  textMessage: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 23.15,
  },
  textAddUser: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 16.34,
    textAlign: 'center',
    marginTop: 15,
  },
  iconTail: {
    position: 'absolute',
    bottom: 0,
  },
  textLink: {
    color: '#2980b9',
  },
});

export default React.memo(ItemComponent);
