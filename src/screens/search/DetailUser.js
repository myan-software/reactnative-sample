import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Linking,
  TouchableOpacity,
} from 'react-native';
import HeaderScreen from '../../components/HeaderScreen';
import * as Animatable from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomText from '../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constant/color';
import Ripple from 'react-native-material-ripple';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {connect} from 'react-redux';
import layout from '../../constant/layout';
import handleStore from '../../redux/handleStore';
import services from '../../network/services';
import Hyperlink from 'react-native-hyperlink';
import {joinThreadUser} from 'src/helper/MessageHelper';
import images from 'src/assets/images';
import moment from 'moment';
class DetailUser extends Component {
  constructor(props) {
    super(props);
    let {user} = props.route.params;
    this.state = {
      showOption: false,
      follow: props.follows[user.id] ?? false,
    };
  }
  toggleOption = () => this.setState({showOption: !this.state.showOption});
  blockUser = async () => {
    try {
      this.toggleOption();
      let {user} = this.props.route.params;
      handleStore.showLoading();
      let rs = await services.blockUser({
        user_id: this.props.user.id,
        block_user_id: user.id,
      });
      handleStore.showMessage({
        content: rs.message || 'block user ok',
      });
    } catch (error) {
      handleStore.showMessage({content: error});
    }
  };
  report = () => {
    this.toggleOption();
    this.props.navigation.navigate('Question');
  };
  toggleFollow = async () => {
    try {
      let {follow} = this.state;
      let {user} = this.props.route.params;
      this.setState({follow: !follow});
      if (follow === false) {
        await services.followUser({
          user_id: this.props.user.id,
          follow_user_id: user.id,
        });
        handleStore.updateFollows({[user.id]: true});
      } else {
        await services.unfollowUser({
          user_id: this.props.user.id,
          follow_user_id: user.id,
        });
        handleStore.updateFollows({[user.id]: false});
      }
    } catch (error) {
      handleStore.showMessage({content: error});
    }
  };
  render() {
    let {showOption, follow} = this.state;
    let {user} = this.props.route.params;
    let {cities, genders, categories} = this.props;
    let gender = '',
      city = '',
      category = '';
    if (user.city_id) {
      city = cities.filter((item) => item.id === user.city_id)?.[0]?.name;
    }
    if (user.gender) {
      gender = genders.filter((item) => item.id === user.gender)?.[0]?.name;
    }
    if (user.category_id) {
      category = categories.filter((item) => item.id === user.gender)?.[0]
        ?.name;
    }
    return (
      <View style={styles.container}>
        <HeaderScreen
          title={user.name || ''}
          RightComponent={
            user.id != this.props.user.id ? (
              <Ripple style={styles.btOption} onPress={this.toggleOption}>
                <MaterialIcon name="dots-horizontal" size={24} />
              </Ripple>
            ) : null
          }
          navigation={this.props.navigation}
        />
        {showOption && (
          <TouchableOpacity
            onPress={this.toggleOption}
            activeOpacity={1}
            style={styles.btBackgroundOption}>
            <Animatable.View
              animation="fadeInRight"
              duration={500}
              style={styles.viewOption}>
              <TouchableOpacity activeOpacity={1} onPress={this.blockUser}>
                <LinearGradient
                  colors={colors.linearGradient}
                  start={{x: 0.32, y: 0.1}}
                  end={{x: 0.4, y: 2}}
                  locations={[0, 0.3, 0.7]}
                  style={styles.linearHeaderOption}>
                  <CustomText style={{color: '#fff'}}>ブロック</CustomText>
                </LinearGradient>
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.btReport}
                  onPress={this.report}>
                  <CustomText>通報</CustomText>
                </TouchableOpacity>
              </TouchableOpacity>
            </Animatable.View>
          </TouchableOpacity>
        )}
        <KeyboardAwareScrollView>
          <ScrollView style={{paddingHorizontal: 10}}>
            <View style={styles.wrapAvatar}>
              <FastImage
                source={{
                  uri: user.avatar || '',
                }}
                style={styles.imageAvatar}
              />
            </View>
            <View style={styles.viewTitle}>
              <CustomText style={styles.name}>{user.name}</CustomText>
              <Ripple
                style={styles.btChat}
                onPress={() => {
                  joinThreadUser(this.props.user, user, this.props.navigation);
                }}>
                <AntDesign name="message1" size={23} />
              </Ripple>
              <LinearGradient
                colors={colors.linearGradient}
                start={{x: 0.12, y: 0.1}}
                end={{x: 0.3, y: 2}}
                locations={[0, 0.3, 0.9]}
                style={styles.linearFollow}>
                <Ripple style={styles.btFollow} onPress={this.toggleFollow}>
                  <CustomText style={styles.textFollow}>
                    {follow ? '解除' : 'フォロー'}
                  </CustomText>
                </Ripple>
              </LinearGradient>
            </View>
            <View style={styles.wrapDetail}>
              <View style={styles.itemDetail}>
                <FastImage source={images.iconCake} style={styles.icon} />
                <CustomText style={styles.lableItem}>年齢</CustomText>
                <CustomText style={styles.textItem}>{user.age}</CustomText>
              </View>
              <View style={styles.itemDetail}>
                <FastImage source={images.iconSex} style={styles.icon} />
                <CustomText style={styles.lableItem}>性別</CustomText>
                <CustomText style={styles.textItem}>{gender}</CustomText>
              </View>
              <View style={styles.itemDetail}>
                <FastImage source={images.iconLocation} style={styles.icon} />
                <CustomText style={styles.lableItem}>活動場所</CustomText>
                <CustomText style={styles.textItem}>{city}</CustomText>
              </View>
            </View>
            <View>
              <View style={styles.wrapDetail}>
                <View style={[styles.titleCategory]}>
                  <CustomText>ジャンル</CustomText>
                </View>  
                <View style={{width: '3%'}} />
                <View style={[styles.itemStyle2, styles.itemStyle3]}>
                  <CustomText>{category}</CustomText>
                </View>
              </View>
            </View>
            <View style={styles.ml10}>  
              <CustomText style={styles.lable, styles.mt20}>自己紹介文</CustomText>
              <Hyperlink
                onPress={(url) => Linking.openURL(url)}
                linkStyle={{color: '#2980b9'}}>
                <CustomText style={styles.mt10}>{user.description}</CustomText>
              </Hyperlink>
              <CustomText style={styles.lable, styles.mt20}>Youtube</CustomText>
              <Hyperlink
                onPress={(url) => Linking.openURL(url)}
                linkStyle={{color: '#2980b9'}}>
                <CustomText style={styles.mt10}>{user.facebook_url}</CustomText>
              </Hyperlink>
              <CustomText style={styles.lable}>Instagram</CustomText>
              <Hyperlink
                onPress={(url) => Linking.openURL(url)}
                linkStyle={{color: '#2980b9'}}>
                <CustomText style={styles.mt10}>{user.instagram_url}</CustomText>
              </Hyperlink>
              <CustomText style={styles.lable}>Twitter</CustomText>
              <Hyperlink
                onPress={(url) => Linking.openURL(url)}
                linkStyle={{color: '#2980b9'}}>
                <CustomText style={styles.mt10}>{user.twitter_url}</CustomText>
              </Hyperlink>
            </View>  
          </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mt20: {
    marginTop: 20
  },
  mt10: {
    marginTop: 10
  },
  ml10: {
    marginLeft: 10
  },
  wrapAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 10,
    marginBottom: 20,
  },
  imageAvatar: {
    width: 120,
    aspectRatio: 1,
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    paddingBottom: 8,
    marginBottom: 6,
  },
  name: {
    fontWeight: '700',
    flex: 1,
  },
  btChat: {
    width: 40,
  },
  linearFollow: {
    borderRadius: 12,
  },
  btFollow: {
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  textFollow: {
    color: '#fff',
    fontSize: 10,
  },
  lable: {
    marginTop: 10,
  },
  btBackgroundOption: {
    position: 'absolute',
    width: layout.screen.width,
    height: layout.screen.height,
    zIndex: 100,
    top: 0,
    right: 0,
  },
  viewOption: {
    position: 'absolute',
    width: 172,
    height: 88,
    backgroundColor: '#fff',
    borderRadius: 14,
    right: 10,
    top: 60 + getStatusBarHeight(),
    zIndex: 1,
    overflow: 'hidden',
  },
  btOption: {
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  linearHeaderOption: {
    height: 44,
    width: 172,
    justifyContent: 'center',
    paddingLeft: 24,
  },
  btReport: {
    justifyContent: 'center',
    height: 44,
    paddingLeft: 24,
  },

  //
  wrapDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  itemDetail: {
    width: '31.5%',
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    paddingVertical: 12,
  },
  titleCategory: {
    width: '31.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lableItem: {
    color: '#828282',
    marginTop: 4,
    marginBottom: 8,
    fontSize: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  itemStyle2: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    height: 48,
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
  },
  itemStyle3: {
    justifyContent: 'center',
    height: 36,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    cities: state.userReducer.cities,
    genders: state.userReducer.genders,
    follows: state.userReducer.follows,
    categories: state.userReducer.categories,
  };
};
export default connect(mapStateToProps)(DetailUser);
