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

type Props = {
  visible: boolean;
  onCloseModal: () => void;
  navigation: any;
  title: string;
  serverGroupId: number | string;
  threadId: number | string;
  threadType: number | string;
  onRefreshList: () => void;
};

const PopupComponent = (props: Props) => {
  const {
    visible,
    onCloseModal,
    navigation,
    title,
    serverGroupId,
    threadId,
    threadType,
    onRefreshList,
  } = props;

  const _onAuthority = () => {
    navigation.navigate('MessageSelectMember', {
      title,
      isAuthority: true,
      serverGroupId,
      threadId,
      threadType,
    });
    onCloseModal();
  };

  const _onRemove = () => {
    navigation.navigate('MessageSelectMember', {
      title,
      isAuthority: false,
      serverGroupId,
      threadId,
      threadType,
      onRefreshList,
    });
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
              <TouchableOpacity onPress={_onAuthority} activeOpacity={1}>
                <View
                  style={[
                    styles.info,
                    {
                      borderTopLeftRadius: 14,
                      borderTopRightRadius: 14,
                      borderBottomColor: '#F2F2F2',
                      borderBottomWidth: 1,
                    },
                  ]}>
                  <CustomText style={styles.text}>{'権限移譲'}</CustomText>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={_onRemove} activeOpacity={1}>
                <View
                  style={[
                    styles.info,
                    {borderBottomLeftRadius: 14, borderBottomRightRadius: 14},
                  ]}>
                  <CustomText style={styles.text}>{'追放'}</CustomText>
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
