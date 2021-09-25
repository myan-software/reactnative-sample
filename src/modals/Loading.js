import React, {Component} from 'react';
import {TouchableOpacity, Dimensions, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {connect} from 'react-redux';
import Image from 'react-native-fast-image';
import images from '../assets/images';
import handleStore from '../redux/handleStore';
const {width, height} = Dimensions.get('screen');
class Loading extends Component {
  hideLoading = () => handleStore.hideModal();

  render() {
    if (this.props.nameUI !== 'loading') return null;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={this.hideLoading}
        style={styles.container}>
        <LottieView
          ref="loading"
          style={styles.lottie}
          source={require('../assets/json/loading.json')}
          loop
          autoPlay
          speed={0.8}
        />
        <View style={styles.wrapImg}>
          <Image source={images.logoLoad} style={styles.img} />
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height,
    width,
    backgroundColor: 'rgba(1,1,1,0.6)',
    position: 'absolute',
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 108,
    height: 108,
    alignSelf: 'center',
  },
  wrapImg: {
    position: 'absolute',
    zIndex: 1,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 3,
  },
  img: {
    width: 50,
    height: 50,
  },
});

const mapStateToProps = (state) => {
  return {
    nameUI: state.modalReducer.nameUI,
  };
};
export default connect(mapStateToProps)(Loading);
