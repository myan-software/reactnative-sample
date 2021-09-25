import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Ripple from 'react-native-material-ripple';
import CustomText from '../../components/CustomText';
import HeaderScreen from '../../components/HeaderScreen';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constant/color';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import layout from '../../constant/layout';
import handleStore from '../../redux/handleStore';
import images from '../../assets/images';
import FastImage from 'react-native-fast-image';

export default class UseContent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <HeaderScreen
          title="コンテンツの利用"
          navigation={this.props.navigation}
        />
        <KeyboardAwareScrollView>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{paddingBottom: 120}}>
            <FastImage source={images.logoText} style={styles.logo} />
            <CustomText style={styles.txtCenter}>
              質の高いサービスを提供するにあたり、「冷やかし」や「モラルの無い行為」を防ぐため、利用制限を行っております。
            </CustomText>
            <CustomText>{`コンテンツの利用には、本サービスへの加入をお願いしております。
　└　加入していただくことにより、以下のコンテンツが利用可能となります。

1. メッセージ機能の利用
2. グループの新規作成
3. グループの加入
4. コミュニティの新規作成
5. コミュニティの加入`}</CustomText>
            <CustomText
              style={
                styles.rules
              }>{`* 月額980円のコンテンツを3日間無料で体験できます。
* 無料体験期間中に解約した場合、月額料金は発生しません。
* 無料期間を過ぎると翌日が属する月から月額料金が発生します。`}</CustomText>
          </ScrollView>
        </KeyboardAwareScrollView>
        <LinearGradient
          colors={colors.linearGradient}
          start={{x: 0.12, y: 0.1}}
          end={{x: 0.17, y: 2.4}}
          locations={[0, 0.35, 0.9]}
          style={styles.linearCreate}>
          <Ripple style={styles.btCreate} onPress={this.creatQuestion}>
            <CustomText style={styles.textCreate}>無料体験を始める</CustomText>
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
  logo: {
    alignSelf: 'center',
    width: '65%',
    aspectRatio: 589 / 298,
    marginTop: 12,
    marginBottom: 10,
  },
  txtCenter: {
    textAlign: 'center',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  rules: {
    marginTop:
      layout.screen.height -
      (getStatusBarHeight() +
        80 +
        115 +
        12 +
        10 +
        60 +
        20 +
        200 +
        120 +
        getBottomSpace() +
        24),
    fontSize: 12,
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
