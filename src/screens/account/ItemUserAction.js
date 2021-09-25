import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../../components/CustomText';
import colors from '../../constant/color';
import services from 'src/network/services';
import images from 'src/assets/images';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
export default class ItemUserAction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: true,
    };
  }
  toggle = async () => {
    try {
      const {item} = this.props;
      const {follow} = this.state;
      var rs;
      if (follow) {
        rs = await services.unfollowUser({
          user_id: item.user_id,
          follow_user_id: item.follow_user_id,
        });
      } else {
        rs = await services.followUser({
          user_id: item.user_id,
          follow_user_id: item.follow_user_id,
        });
      }
      this.setState({follow: !follow});
    } catch (error) {}
  };
  render() {
    const {item} = this.props;
    const {follow} = this.state;
    return (
      <View style={styles.item}>
        <TouchableOpacity
          style={styles.overAvatar}
          onPress={() =>
            this.props.navigation.navigate('DetailUser', {user: item})
          }>
          <FastImage
            source={
              item.avatar
                ? {
                    uri: item.avatar,
                  }
                : images.avatar
            }
            style={styles.imgAvatar}
          />
        </TouchableOpacity>
        <View style={styles.center}>
          <CustomText style={styles.name}>{item.name}</CustomText>
          {/* <CustomText style={styles.subName}>{item.email}</CustomText> */}
        </View>
        <View style={styles.right}>
          <LinearGradient
            colors={colors.linearGradient}
            start={{x: 0.13, y: 0.1}}
            end={{x: 0.3, y: 2.45}}
            locations={[0, 0.4, 0.9]}
            style={styles.linerBt}>
            <Ripple style={styles.bt} onPress={this.toggle}>
              <CustomText style={styles.txtButton}>
                {follow ? '解除' : 'フォロー'}
              </CustomText>
            </Ripple>
          </LinearGradient>
          {/* <CustomText style={styles.txtSubButton}>
            {moment(item.created_at).get('month') + 1}に加入した{' '}
          </CustomText> */}
        </View>
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
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  overAvatar: {
    width: 45,
    height: 45,
    overflow: 'hidden',
    borderRadius: 25,
  },
  imgAvatar: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  center: {
    flex: 1,
    paddingLeft: 20,
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: '700',
    fontSize: 17,
  },
  subName: {
    fontSize: 12,
    color: '#828282',
  },
  linerBt: {
    width: 112,
    height: 24,
    borderRadius: 12,
  },
  bt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtButton: {
    fontSize: 10,
    color: '#fff',
  },
  txtSubButton: {
    fontSize: 12,
    color: '#828282',
    marginTop: 2,
    textAlign: 'right',
    paddingRight: 2,
  },
  txtLoad: {
    textAlign: 'center',
    marginTop: 12,
  },
});
