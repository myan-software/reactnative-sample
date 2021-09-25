import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Icon} from 'native-base';
import HeaderScreen from './HeaderScreen';
import CustomText from './CustomText';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {hasError: true};
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    //console.log('componentDidCatch 11111', error, errorInfo);
    this.setState({error, errorInfo});
  }
  render() {
    let {hasError, error, errorInfo} = this.state;
    let {canBack = true, navigation} = this.props;
    if (hasError)
      return (
        <View style={styles.container}>
          {canBack ? (
            <HeaderScreen navigation={navigation} title="Opps" />
          ) : null}
          <View style={styles.content}>
            <Icon name="warning" type="AntDesign" style={styles.icon} />
            <CustomText style={styles.txtSorry}>
              エラー！ エラーが発生しました。
              しばらくしてからもう一度お試しください
            </CustomText>
            <CustomText>{JSON.stringify(error?.message)}</CustomText>
            <CustomText>
              {errorInfo?.componentStack?.substring(0, 500)}
            </CustomText>
          </View>
        </View>
      );
    return this.props.children;
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
  },
});
