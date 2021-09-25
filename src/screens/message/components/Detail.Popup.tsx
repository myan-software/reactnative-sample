import React from 'react';
import {
  Modal,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {getStatusBarHeight, isIphoneX} from 'react-native-iphone-x-helper';
import CustomText from 'src/components/CustomText';
import {
  TYPE_MESSAGE, 
  FLAG
} from 'src/helper/MessageHelper';

type Props = {
  visible: boolean;
  isAdmin?: boolean;
  onCloseModal: () => void;
  navigation: any;
  title: string;
  onExit: () => void;
  onDeleteThread: () => void;
  onOffNotification: () => void;
  serverGroupId: number | string;
  threadId: number | string;
  threadName: string;
  threadType: number | string;
  notification: number | string;
};

const PopupComponent = (props: Props) => {
  const {
    visible,
    isAdmin = false,
    onCloseModal,
    navigation,
    title,
    onExit,
    onDeleteThread,
    onOffNotification,
    serverGroupId,
    threadId,
    threadName,
    threadType,
    notification,
  } = props;

  const onGetListUsers = () => {
    navigation.navigate('MessageListMembers', {
      title,
      isAdmin,
      serverGroupId,
      threadId,
      threadName,
      threadType,
      notification,
    });
    onCloseModal();
  };

  const _onExit = () => {
    onExit();
    onCloseModal();
  };

  const _onDeleteThread = () => {
    onDeleteThread();
    onCloseModal();
  };

  const _onOffNotification = () => {
    onOffNotification();
    onCloseModal();
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => {}}>
      <TouchableWithoutFeedback style={styles.container} onPress={onCloseModal}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={onCloseModal}>
            <View style={styles.content}>
              <TouchableOpacity onPress={onGetListUsers} activeOpacity={1}>
                <View
                  style={[
                    styles.info,
                    {
                      borderBottomColor: '#F2F2F2',
                      borderBottomWidth: 1,
                      borderTopLeftRadius: 14,
                      borderTopRightRadius: 14,
                    },
                  ]}>
                  <CustomText style={styles.text}>
                    {'メンバーリスト'}
                  </CustomText>
                </View>
              </TouchableOpacity>

              {!isAdmin ? (
                <TouchableOpacity onPress={_onExit} activeOpacity={1}>
                  <View
                    style={[
                      styles.info,
                      {borderBottomColor: '#F2F2F2', borderBottomWidth: 1},
                    ]}>
                    <CustomText style={styles.text}>{'脱退'}</CustomText>
                  </View>
                </TouchableOpacity>
              ) : null}
              {isAdmin ? (
                <TouchableOpacity onPress={_onDeleteThread} activeOpacity={1}>
                  <View
                    style={[
                      styles.info,
                      {borderBottomColor: '#F2F2F2', borderBottomWidth: 1},
                    ]}>
                    <CustomText style={styles.text}>{threadType === TYPE_MESSAGE.COMMUNITY ? 'コミュニティ' : 'グループ'}を解散する</CustomText>
                  </View>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity onPress={_onOffNotification} activeOpacity={1}>
                <View
                  style={[
                    styles.info,
                    {borderBottomLeftRadius: 14, borderBottomRightRadius: 14},
                  ]}>
                  <CustomText style={styles.text}>{notification == FLAG.NOTIFICATION_ON ? '通知OFF' : '通知ON'}</CustomText>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop:
      Platform.OS === 'ios'
        ? isIphoneX()
          ? getStatusBarHeight() + 70
          : getStatusBarHeight() + 50
        : getStatusBarHeight() + 25,
  },
  content: {
    borderRadius: 20,
    minWidth: 201,
    shadowColor: '#606470',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 2,
  },
  info: {
    backgroundColor: '#FFFFFF',
    minHeight: 44,
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  text: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
  },
});

export default React.memo(PopupComponent);
