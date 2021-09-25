import CONSTANTS from '@vn.starlingTech/config/Constant';
import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from 'src/components/CustomText';
import InfoCircleIcon from '../../../../assets/svg/InfoCircleIcon';

type Props = {
  visible: boolean;
  textConfirm: string;
  onCloseModal: () => void;
  onConfirm: () => void;
};

const PopupConfirm = (props: Props) => {
  const {visible, textConfirm, onCloseModal, onConfirm} = props;

  const _onConfirm = () => {
    onConfirm();
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
              <View style={styles.info}>
                <InfoCircleIcon />
                <CustomText style={styles.textConfirm}>
                  {textConfirm}
                </CustomText>
              </View>
              <View style={styles.viewButton}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={onCloseModal}
                  style={styles.touchable}>
                  <View
                    style={[
                      styles.button,
                      {borderBottomLeftRadius: 14, backgroundColor: '#4F4F4F'},
                    ]}>
                    <CustomText style={styles.textButton}>
                      {'キャンセル'}
                    </CustomText>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={_onConfirm}
                  style={styles.touchable}>
                  <LinearGradient
                    start={{x: 0.01, y: 0}}
                    end={{x: 0.2, y: 1.55}}
                    colors={['#833AB4', '#FD1D1D', '#FCB045']}
                    style={[styles.button, {borderBottomRightRadius: 14}]}>
                    <CustomText style={styles.textButton}>{'OK'}</CustomText>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    borderRadius: 20,
    width: CONSTANTS.width * 0.8,
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
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  textConfirm: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  touchable: {
    flex: 1,
  },
  button: {
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 20,
  },
});

export default React.memo(PopupConfirm);
