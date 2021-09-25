import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import handleStore from '../redux/handleStore';
import CustomText from '../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constant/color';
import layout from '../constant/layout';
import images from '../assets/images';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';

class Confirm extends Component {
  ok = () => {
    handleStore.hideModal();
    this.props.btnOK?.();
  };
  cancer = () => {
    handleStore.hideModal();
    this.props.btnHuy?.();
  };
  render() {
    let {titlebntHuy, titlebntOK, contentConf, icon, nameUI} = this.props;
    if (nameUI !== 'comfirmBox') {
      return null;
    }
    return (
      <View style={styles.container}>
        <Animatable.View
          animation="zoomIn"
          duration={600}
          iterationCount={1}
          direction="alternate"
          style={styles.content}>
          <View style={styles.viewContent}>
            <FastImage
              source={icon || images.iconWarningCircle}
              style={styles.icon}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
              <CustomText style={styles.contentTxt}>
                {contentConf || ''}
              </CustomText>
            </ScrollView>
          </View>
          <View style={styles.wrapBt}>
            <LinearGradient
              colors={['#4F4F4F', '#4F4F4F', '#4F4F4F']}
              start={{x: 0.12, y: 0.1}}
              end={{x: 0.2, y: 2.5}}
              locations={[0, 0.3, 0.9]}
              style={styles.linearBt}>
              <Ripple onPress={this.cancer} style={styles.bt}>
                <CustomText style={styles.txtClose}>
                  {titlebntHuy || 'キャンセル'}
                </CustomText>
              </Ripple>
            </LinearGradient>
            <LinearGradient
              colors={colors.linearGradient}
              start={{x: 0.12, y: 0.1}}
              end={{x: 0.2, y: 2.5}}
              locations={[0, 0.3, 0.9]}
              style={styles.linearBt}>
              <Ripple onPress={this.ok} style={styles.bt}>
                <CustomText style={styles.txtClose}>
                  {titlebntOK || 'OK'}
                </CustomText>
              </Ripple>
            </LinearGradient>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

mapStateToProps = (state) => {
  return {
    contentConf: state.modalReducer.confirmContent,
    icon: state.modalReducer.icon,
    btnHuy: state.modalReducer.onConfirmCancel,
    btnOK: state.modalReducer.onConfirmOk,
    titlebntHuy: state.modalReducer.confirmCancelText,
    titlebntOK: state.modalReducer.confirmOkText,
    nameUI: state.modalReducer.nameUI,
  };
};
const styles = StyleSheet.create({
  container: {
    width: layout.screen.width,
    height: layout.screen.height,
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  content: {
    width: '76%',
    borderRadius: 14,
    maxHeight: layout.screen.height * 0.7,
    overflow: 'hidden',
  },
  contentTxt: {
    fontSize: 15,
    alignSelf: 'center',
    textAlign: 'center',
    width: '90%',
    lineHeight: 20,
    paddingBottom: 12,
  },
  icon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginVertical: 20,
  },
  bt: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  txtClose: {
    fontWeight: '700',
    color: '#fff',
  },
  linearBt: {
    flex: 1,
    height: 54,
  },
  viewContent: {
    backgroundColor: '#fff',
    paddingBottom: 12,
  },
  wrapBt: {
    flexDirection: 'row',
  },
});
export default connect(mapStateToProps)(Confirm);
