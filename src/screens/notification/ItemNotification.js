import React, {Component} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FastImage from 'react-native-fast-image';
import Ripple from 'react-native-material-ripple';
import CustomText from '../../components/CustomText';
import colors from '../../constant/color';
import LinearGradient from 'react-native-linear-gradient';
import services from 'src/network/services';
import images from 'src/assets/images';
import {goToChatDetail, joinThreadGroup} from 'src/helper/MessageHelper';
import handleStore from 'src/redux/handleStore';
const USER_NEW_MESSAGE = 1;
const POST_NEW_MESSAGE = 2;
const COMMUNITY_NEW_MESSAGE = 3;
const NEW_REQUEST_TO_JOIN = 4;
const ACCEPT = 5;
const DISMISS_COMMUNITY = 6;
const DISMISS_GROUP = 7;
const NEW_MEMBER = 8;
const REJECT = 9;
const PENDING = 0;
const ACCEPTED = 1;
const REJECTED = 2;
const OPEN_CHAT = [
  USER_NEW_MESSAGE,
  POST_NEW_MESSAGE,
  COMMUNITY_NEW_MESSAGE,
  NEW_MEMBER,
  ACCEPT,
];
const SEE_DETAIL = [
  USER_NEW_MESSAGE,
  POST_NEW_MESSAGE,
  COMMUNITY_NEW_MESSAGE,
  NEW_REQUEST_TO_JOIN,
  ACCEPT,
];
export default class ItemNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: props.item.status || PENDING,
    };
  }
  onItem = () => {
    const {item} = this.props;
    if (OPEN_CHAT.includes(item.type)) {
      goToChatDetail(
        item.firebaseKey,
        this.props.navigation,
        (docRef) => {},
        (err) => {
          console.log(err);
        },
      );
      return;
    }
    if (item.type === NEW_REQUEST_TO_JOIN) {
      this.props.navigation.navigate('ListPostStatus', {index: 1});
    }
  };
  acceptUserToGroup = async () => {
    try {
      const {item} = this.props;
      let rs = await services.acceptToGroup({
        user_id: item.from_user_id,
        post_id: item.post_id,
      });
      this.setState({status: ACCEPTED});
      joinThreadGroup(
        item.firebaseKey,
        rs.user,
        () => {},
        (error) => {
          console.log(error);
        },
      );
    } catch (error) {
      handleStore.showMessage({content: error});
    }
  };
  rejectUserToGroup = async () => {
    try {
      const {item} = this.props;
      let rs = await services.cancelRequestToGroup({
        user_id: item.from_user_id,
        post_id: item.post_id,
      });
      this.setState({status: REJECTED});
    } catch (error) {
      handleStore.showMessage({content: error});
    }
  };
  renderAction() {
    const {item} = this.props;
    const {status} = this.state;
    if (item.type === NEW_REQUEST_TO_JOIN && status === PENDING) {
      return (
        <View style={styles.wrapBotton}>
          <LinearGradient
            colors={colors.linearGradient}
            start={{x: 0.1, y: 0.1}}
            end={{x: 0.2, y: 2}}
            locations={[0, 0.3, 0.8]}
            style={styles.linerBtAgree}>
            <Ripple style={styles.btAgree} onPress={this.acceptUserToGroup}>
              <CustomText style={styles.textAgree}>承認</CustomText>
            </Ripple>
          </LinearGradient>
          <Ripple style={styles.btDeny} onPress={this.rejectUserToGroup}>
            <CustomText style={styles.textDeny}>拒否</CustomText>
          </Ripple>
        </View>
      );
    }
    if (status === ACCEPTED) {
      return (
        <View style={styles.wrapBotton}>
          <LinearGradient
            colors={colors.linearGradient}
            start={{x: 0.1, y: 0.1}}
            end={{x: 0.2, y: 2}}
            locations={[0, 0.3, 0.8]}
            style={styles.linerBtAgree}>
            <View style={styles.btAgree}>
              <CustomText style={styles.textAgree}>承認しました</CustomText>
            </View>
          </LinearGradient>
        </View>
      );
    }
    if (status === REJECTED) {
      return (
        <View style={styles.wrapBotton}>
          <View style={styles.btDeny}>
            <CustomText style={styles.textDeny}>拒否しました</CustomText>
          </View>
        </View>
      );
    }
    return <View />;
  }
  render() {
    const {item} = this.props;
    const {status} = this.state;
    let textDetail = '';
    if (SEE_DETAIL.includes(item.type)) {
      textDetail = '詳細を見る';
    }

    return (
      <View style={styles.item}>
        <FastImage
          source={
            item.from_user_avatar
              ? {
                  uri: item.from_user_avatar,
                }
              : images.avatar
          }
          style={styles.avatar}
        />
        <View style={styles.right}>
          <CustomText numberOfLines={2} ellipsizeMode="tail">
            {/* <CustomText style={styles.title}>{item.name || ''}</CustomText> */}
            <CustomText>{item.content}</CustomText>
          </CustomText>
          <View style={styles.bottomRight}>
            {this.renderAction()}
            {textDetail && status === PENDING ? (
              <Ripple onPress={this.onItem}>
                <CustomText style={styles.textDetail}>
                  {textDetail}
                  <AntDesign name="right" size={16} />
                </CustomText>
              </Ripple>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  avatar: {
    width: '18%',
    aspectRatio: 1,
    borderRadius: 14,
    backgroundColor: '#c1bebe',
  },
  right: {
    paddingLeft: 18,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
  },
  bottomRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapBotton: {
    flexDirection: 'row',
  },
  btDeny: {
    height: 24,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.fontGray,
    borderRadius: 12,
    marginLeft: 10,
  },
  linerBtAgree: {
    borderRadius: 12,
  },
  btAgree: {
    height: 24,
    paddingHorizontal: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDeny: {
    color: '#fff',
    fontSize: 10,
  },
  textAgree: {
    color: '#fff',
    fontSize: 10,
  },
  textDetail: {
    fontSize: 12,
  },
});
