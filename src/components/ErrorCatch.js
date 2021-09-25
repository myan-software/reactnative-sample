import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import CustomText from './CustomText';
import HeaderScreen from './HeaderScreen';

export default class ErrorCatch extends Component {
  constructor(props) {
    super(props);
    this.state = {hasError: false};
  }
  render() {
    let {error, canBack = true, navigation} = this.props;
    return (
      <View style={styles.container}>
        {canBack ? <HeaderScreen navigation={navigation} title="Opps" /> : null}
        <View style={styles.content}>
          <Icon name="warning" type="AntDesign" style={styles.icon} />
          <CustomText style={styles.txtSorry}>
            エラー！ エラーが発生しました。{'\n'}
            しばらくしてからもう一度お試しください
          </CustomText>
          <CustomText style={styles.err}>
            {JSON.stringify(error?.message)}
          </CustomText>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: '#FF9800',
    marginTop: 8,
  },
  txtSorry: {
    paddingVertical: 4,
    fontSize: 16,
    fontWeight: '700',
    color: '#546E7A',
    textAlign: 'center',
  },
  err: {
    marginTop: 6,
  },
});
