import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';
import AppText from '../../../app/components/AppText';
import CONSTANTS from '../../config/Constant';
import colors from '../../config/colors';
import Styles from '../Styles';

type Props = {
  visible: boolean;
  date: string | null;
  minDate?: string;
  maxDate?: string;
  dateChanged: (_date: string) => void;
  onCancel: () => void;
};

const IS_ANDROID = Platform.OS === 'android';

export default (props: Props) => {
  const [isShow, setIsShow] = useState(props.visible);
  const [selectedDate, setSelectedDate] = useState(
    (props.date && new Date(props.date)) || new Date(),
  );

  const onChange = (event: any, pSelectedDate?: Date) => {
    if (pSelectedDate === undefined) {
      if (IS_ANDROID) {
        setIsShow(false);
        props.onCancel();
      }
    } else {
      setSelectedDate(pSelectedDate);
      if (IS_ANDROID) {
        setIsShow(false);
        props.dateChanged(moment(pSelectedDate).format('YYYY-MM-DD'));
      }
    }
  };

  const onFinish = () => {
    props.dateChanged(moment(selectedDate).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    setIsShow(props.visible);
  }, [props.visible]);

  return IS_ANDROID ? (
    (isShow && (
      <DateTimePicker
        value={selectedDate}
        mode={'date'}
        display="calendar"
        minimumDate={props.minDate ? new Date(props.minDate) : undefined}
        maximumDate={props.maxDate ? new Date(props.maxDate) : undefined}
        onChange={onChange}
      />
    )) ||
      null
  ) : (
    <Modal
      animationIn="slideInUp"
      animationOut="slideOutDown"
      coverScreen
      isVisible={isShow}
      hasBackdrop
      hideModalContentWhileAnimating
      deviceHeight={CONSTANTS.height}
      deviceWidth={CONSTANTS.width}
      onBackdropPress={props.onCancel}
      useNativeDriver={true}
      style={Styles.noMargin}>
      <View style={styles.iosPicker}>
        <View style={styles.iosActions}>
          <Pressable style={styles.iosBtn} onPress={props.onCancel}>
            <AppText style={styles.iosBtnTxt}>Cancel</AppText>
          </Pressable>
          <Pressable style={styles.iosBtn} onPress={onFinish}>
            <AppText style={{...styles.iosBtnTxt, ...styles.iosBtnOK}}>
              Done
            </AppText>
          </Pressable>
        </View>
        <DateTimePicker
          value={selectedDate}
          mode={'date'}
          minimumDate={props.minDate ? new Date(props.minDate) : undefined}
          maximumDate={props.maxDate ? new Date(props.maxDate) : undefined}
          display="spinner"
          onChange={onChange}
          onTouchCancel={props.onCancel}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  iosActions: {flexDirection: 'row', justifyContent: 'space-between'},
  iosBtn: {paddingHorizontal: 15, paddingVertical: 15},
  iosBtnOK: {color: colors.primary},
  iosBtnTxt: {color: 'red', fontSize: 18},
  iosPicker: {
    backgroundColor: '#FFF',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
  },
});
