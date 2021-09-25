import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Ripple from 'react-native-material-ripple';
import CustomText from '../../components/CustomText';
import HeaderScreen from '../../components/HeaderScreen';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constant/color';
import layout from '../../constant/layout';
import moment from 'moment';
import {connect} from 'react-redux';
class Terminate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let {expire_date} = this.props.user;
    let year = moment(expire_date).get('year');
    let month = moment(expire_date).get('month') + 1;
    let day = moment(expire_date).get('day');
    let isCancel = false;
    let today = moment();
    if (!expire_date || (expire_date && today.diff(moment(expire_date))) > 0) {
      isCancel = true;
    }
    return (
      <View style={styles.container}>
        <HeaderScreen title="ご利用状況" navigation={this.props.navigation} />
        <FlatList
          data={new Array(1).fill('')}
          renderItem={({item, index}) => (
            <View style={styles.item}>
              <CustomText style={styles.title}>トライアルパッケージ</CustomText>
              <View style={styles.line} />
              <CustomText>サブスクリプション</CustomText>
              <CustomText>
                {isCancel ? '解約済み: ' : ''}{' '}
                {expire_date ? `${year}年${month}月${day}日` : ''}
                までご利用可能
              </CustomText>
              {!isCancel ? (
                <LinearGradient
                  colors={colors.linearGradient}
                  start={{x: 0.12, y: 0.1}}
                  end={{x: 0.2, y: 4}}
                  locations={[0, 0.35, 0.9]}
                  style={styles.linearBt}>
                  <Ripple
                    style={styles.bt}
                    onPress={() =>
                      this.props.navigation.navigate('MethodTeminate')
                    }>
                    <CustomText style={styles.txtBt}>
                      解約方法はこちら
                    </CustomText>
                  </Ripple>
                </LinearGradient>
              ) : null}
            </View>
          )}
          keyExtractor={(item, index) => 'item' + index}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    width: layout.screen.width - 20,
    alignSelf: 'center',
    borderRadius: 14,
    backgroundColor: '#F2F2F2',
    padding: 10,
    marginTop: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#fff',
    marginTop: 8,
    marginBottom: 12,
  },
  linearBt: {
    width: '100%',
    height: 32,
    borderRadius: 14,
    marginTop: 18,
    marginBottom: 5,
  },
  bt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtBt: {
    color: '#fff',
  },
});
const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps)(Terminate);
