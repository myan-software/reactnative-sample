import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Ripple from 'react-native-material-ripple';
import CustomText from '../../components/CustomText';
import HeaderScreen from '../../components/HeaderScreen';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constant/color';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import layout from '../../constant/layout';
import handleStore from '../../redux/handleStore';
import images from '../../assets/images';
import services from 'src/network/services';
import {connect} from 'react-redux';
class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name || '',
      email: props.user.email || '',
      user_id: props.user.id || '',
      content: '',
    };
  }
  creatQuestion = async () => {
    try {
      let {name, email, user_id, content} = this.state;
      if (!name || !email || !user_id || !content) {
        return handleStore.showMessage({
          content: '完全な情報を入力してください',
        });
      }
      handleStore.showLoading();
      let rs = await services.sendQuestion({name, email, user_id, content});
      handleStore.showMessage({
        icon: images.iconTick,
        title: 'お問い合わせありがとうございます。',
        content: '返信用メールアドレスへご返答させていただきますので、今しばらくお待ちください。',
        callBack: () => this.props.navigation.goBack(),
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let {name, email, user_id, content} = this.state;
    return (
      <View style={styles.container}>
        <HeaderScreen title="お問い合わせ" navigation={this.props.navigation} />
        <KeyboardAwareScrollView>
          <ScrollView style={styles.scrollView}>
            <CustomText style={styles.lable}>ユーザー名</CustomText>
            <TextInput
              style={styles.input}
              placeholder=""
              value={name}
              editable={false}
              onChangeText={(name) => this.setState({name})}
              placeholderTextColor="#828282"
            />
            <CustomText style={styles.lable}>返信用メールアドレス</CustomText>
            <TextInput
              style={styles.input}
              placeholder=""
              value={email}
              onChangeText={(email) => this.setState({email})}
              placeholderTextColor="#828282"
            />
            <CustomText style={styles.lable}>ユーザーID</CustomText>
            <TextInput
              style={styles.input}
              placeholder=""
              editable={false}
              value={user_id + ''}
              onChangeText={(user_id) => this.setState({user_id})}
              placeholderTextColor="#828282"
            />
            <CustomText style={styles.lable}>お問合せ内容</CustomText>
            <TextInput
              style={styles.inputBig}
              multiline
              placeholder=""
              onChangeText={(content) => this.setState({content})}
              placeholderTextColor="#828282"
            />
          </ScrollView>
        </KeyboardAwareScrollView>
        <LinearGradient
          colors={colors.linearGradient}
          start={{x: 0.12, y: 0.1}}
          end={{x: 0.17, y: 2.4}}
          locations={[0, 0.35, 0.9]}
          style={styles.linearCreate}>
          <Ripple style={styles.btCreate} onPress={this.creatQuestion}>
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
    color: 'black',
  },
  inputBig: {
    minHeight: 80,
    padding: 11,
    borderRadius: 14,
    backgroundColor: '#F9F9F9',
    paddingTop: 14,
  },
  linearCreate: {
    height: 57,
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
export default connect(mapStateToProps)(Question);
