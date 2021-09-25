import React, {Component} from 'react';
import {View, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import handleStore from '../redux/handleStore';
import CustomText from '../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../constant/color';
import layout from '../constant/layout';
import images from '../assets/images';
import FastImage from 'react-native-fast-image';

class Messagebox extends Component {
  hideUi = () => {
    handleStore.hideModal();
    this.props.callBack?.();
  };
  render() {
    let {contentMess, nameClose, icon, title} = this.props;
    if (this.props.nameUI !== 'message') {
      return null;
    }
    if (typeof contentMess === 'object') {
      if (contentMess.message) {
        contentMess = JSON.stringify(contentMess.message);
      } else {
        contentMess = JSON.stringify(contentMess);
      }
    }
    return (
      <View style={styles.container}>
        <Animatable.View
          animation="zoomIn"
          duration={600}
          iterationCount={1}
          direction="alternate"
          style={styles.content}>
          <FastImage
            source={icon || images.iconWarningCircle}
            style={styles.icon}
          />
          <ScrollView showsVerticalScrollIndicator={false}>
            <CustomText style={styles.title}>{title || ''}</CustomText>
            <CustomText style={styles.contentTxt}>
              {contentMess || ''}
            </CustomText>
          </ScrollView>
          <LinearGradient
            colors={colors.linearGradient}
            start={{x: 0.12, y: 0.1}}
            end={{x: 0.2, y: 2.5}}
            locations={[0, 0.3, 0.9]}
            style={styles.linearBt}>
            <TouchableOpacity onPress={this.hideUi} style={styles.bt}>
              <CustomText style={styles.txtClose}>
                {nameClose ? nameClose : 'OK'}
              </CustomText>
            </TouchableOpacity>
          </LinearGradient>
        </Animatable.View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contentMess: state.modalReducer.messageContent,
    title: state.modalReducer.messageTitle,
    nameUI: state.modalReducer.nameUI,
    callBack: state.modalReducer.funcMsg,
    nameClose: state.modalReducer.nameClose,
    icon: state.modalReducer.icon,
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
    backgroundColor: 'white',
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
    marginTop: 17,
  },
  icon: {
    width: 32,
    height: 32,
    alignSelf: 'center',
    marginTop: 20,
  },
  wrapBt: {
    marginTop: 20,
    justifyContent: 'center',
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
    width: '100%',
    height: 56,
    marginTop: 9,
  },
  title: {
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 17,
  },
});
export default connect(mapStateToProps)(Messagebox);
