import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Ripple from 'react-native-material-ripple';
import CustomText from '../../components/CustomText';
import HeaderScreen from '../../components/HeaderScreen';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constant/color';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import layout from '../../constant/layout';
import services from 'src/network/services';
import {connect} from 'react-redux';
import handleStore from 'src/redux/handleStore';
import images from 'src/assets/images';
class MethodTerminate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    try {
      let rs = await services.getInfoCancelSubcription();
      this.setState({text: rs.result});
    } catch (error) {
      //console.log(error);
    }
  };
  cancel = async () => {
    try {
      //handleStore.showLoading();
      let rs = await services.cancelSubcription({user_id: this.props.user.id});
      this.props.navigation.goBack();
      // handleStore.showMessage({
      //   content: '解約されました',
      //   icon: images.iconTick,
      // });
      // handleStore.updateUser({
      //   expire_date: new Date(),
      // });
    } catch (error) {
      //handleStore.hideModal();
      console.log(error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <HeaderScreen title="解約方法" navigation={this.props.navigation} />
        <KeyboardAwareScrollView>
          <ScrollView style={styles.scrollView}>
            <CustomText>{this.state.text}</CustomText>
          </ScrollView>
        </KeyboardAwareScrollView>
        <LinearGradient
          colors={colors.linearGradient}
          start={{x: 0.12, y: 0.1}}
          end={{x: 0.17, y: 2.4}}
          locations={[0, 0.35, 0.9]}
          style={styles.linearCreate}>
          <Ripple style={styles.btCreate} onPress={this.cancel}>
            <CustomText style={styles.textCreate}>OK</CustomText>
          </Ripple>
        </LinearGradient>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingHorizontal: 12,
    paddingTop: 20,
  },
  lable: {
    marginVertical: 11,
  },
  input: {
    height: 48,
    padding: 11,
    borderRadius: 14,
    backgroundColor: '#F9F9F9',
  },
  inputBig: {
    minHeight: 80,
    padding: 11,
    borderRadius: 14,
    backgroundColor: '#F9F9F9',
    paddingTop: 14,
  },
  linearCreate: {
    height: 54,
    borderRadius: 14,
    marginTop: 20,
    position: 'absolute',
    zIndex: 1,
    bottom: getBottomSpace(),
    width: layout.window.width - 24,
    marginHorizontal: 12,
  },
  btCreate: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  textCreate: {
    color: '#fff',
    fontWeight: '700',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps)(MethodTerminate);
