import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import Ripper from 'react-native-material-ripple';
import images from '../../assets/images';
import CustomText from '../../components/CustomText';
import HeaderApp from '../../components/HeaderApp';
import HeaderScreen from '../../components/HeaderScreen';
import services from '../../network/services';
import handleStore from '../../redux/handleStore';
import ErrorBoundary from '../../components/ErrorBoundary';
import ErrorCatch from '../../components/ErrorCatch';
import helper from 'src/helper';
import {AppContext} from '@vn.starlingTech/components/AppContext';
class Account extends Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {};
  }
  goEditProfile = () => this.props.navigation.navigate('EditProfile');
  goAddUser = () =>
    this.props.navigation.navigate('ListUserAction', {
      type: 'followed',
      title: 'フォローリスト',
    });
  goRequestUser = () =>
    this.props.navigation.navigate('ListUserAction', {
      type: 'followMe',
      title: 'フォロワーリスト',
    });
  goBlockUser = () => this.props.navigation.navigate('ListUserBlock');
  goListPosted = () => this.props.navigation.navigate('ListPosted');
  goListLike = () => this.props.navigation.navigate('Favorites');
  goListJoined = () => this.props.navigation.navigate('ListPostJoin');
  goListPostStatus = () => this.props.navigation.navigate('ListPostStatus');
  goTerminate = () => this.props.navigation.navigate('Terminate');
  goQuestion = () => this.props.navigation.navigate('Question');
  goRulesUse = () => this.props.navigation.navigate('RulesUse');
  signOut = () => {
    handleStore.showComfirm({
      content: 'ログアウトしますか？',
      textCancer: 'キャンセル',
      textOk: 'ログアウト',
      onOk: () => {
        this.context.signOut();
        this.props.route.params.dispatchApp({type: 'SIGN_OUT'});
        handleStore.signOut();
      },
      icon: images.iconLogout,
    });
  };
  render() {
    let {user, navigation} = this.props;
    try {
      return (
        <ErrorBoundary canback navigation={navigation}>
          <View style={styles.container}>
            <HeaderScreen title="マイページ" navigation={this.props.navigation} />
            <ScrollView contentContainerStyle={styles.scrollView}>
              <View style={styles.wrap}>
                <View style={styles.wrapAvatar}>
                  <FastImage
                    source={
                      user.avatar
                        ? {
                            uri: user.avatar,
                          }
                        : images.avatar
                    }
                    style={styles.imageAvatar}
                  />
                </View>
                <View>
                  <CustomText style={styles.txtName}>
                    {user.name || ' '}
                  </CustomText>
                  <Ripper style={styles.btEdit} onPress={this.goEditProfile}>
                    <FastImage source={images.iconEdit} style={styles.icon} />
                  </Ripper>
                </View>
                <View height={4} />
                <Ripper style={styles.item} onPress={this.goAddUser}>
                  <FastImage source={images.iconAddUser} style={styles.icon} />
                  <CustomText style={styles.textItem}>
                    フォローリスト {helper.note(' follow list)')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.goRequestUser}>
                  <FastImage source={images.icon2User} style={styles.icon} />
                  <CustomText style={styles.textItem}>
                    フォロワーリスト {helper.note('follower list')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.goBlockUser}>
                  <FastImage
                    source={images.iconShieldFail}
                    style={styles.icon}
                  />
                  <CustomText style={styles.textItem}>
                    ブロックリスト {helper.note('block list)')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.goListPosted}>
                  <FastImage source={images.iconDocument} style={styles.icon} />
                  <CustomText style={styles.textItem}>
                    投稿リスト {helper.note('my posted')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.goListLike}>
                  <FastImage source={images.iconBookmac} style={styles.icon} />
                  <CustomText style={styles.textItem}>
                    お気に入りリスト {helper.note('List post favorite')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.goListJoined}>
                  <FastImage source={images.iconFolder} style={styles.icon} />
                  <CustomText style={styles.textItem}>
                    加入グループリスト{' '}
                    {helper.note('danh sách nhóm đã đăng ký ')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.goListPostStatus}>
                  <FastImage source={images.iconLogin} style={styles.icon} />
                  <CustomText style={styles.textItem}>
                    申請 / 応募状況{' '}
                    {helper.note('list tình trạng yêu cầu/ ứng tuyển')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.goQuestion}>
                  <FastImage source={images.iconQuestion} style={styles.icon} />
                  <CustomText style={styles.textItem}>
                    お問い合わせ {helper.note('question')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.goTerminate}>
                  <FastImage
                    source={images.iconTimeCircle}
                    style={styles.icon}
                  />
                  <CustomText style={styles.textItem}>
                    ご利用状況 {helper.note('Tình trạng sử dụng')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.goRulesUse}>
                  <FastImage source={images.iconPaper} style={styles.icon} />
                  <CustomText style={styles.textItem}>
                    利用規約 {helper.note('Terms of service')}
                  </CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
                <Ripper style={styles.item} onPress={this.signOut}>
                  <FastImage source={images.iconLogout} style={styles.icon} />
                  <CustomText style={styles.textItem}>ログアウト</CustomText>
                  <FastImage
                    source={images.iconArrowLeft}
                    style={styles.icon}
                  />
                </Ripper>
              </View>
            </ScrollView>
          </View>
        </ErrorBoundary>
      );
    } catch (error) {
      return <ErrorCatch error={error} canBack navigation={navigation} />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    paddingBottom: 100,
  },
  wrapAvatar: {
    width: 112,
    height: 112,
    borderRadius: 56,
    overflow: 'hidden',
    alignSelf: 'center',
    marginTop: 32,
    marginBottom: 10,
  },
  imageAvatar: {
    width: 112,
    aspectRatio: 1,
  },
  wrap: {
    paddingHorizontal: 10,
  },
  txtName: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btEdit: {
    position: 'absolute',
    zIndex: 1,
    right: 0,
    top: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
  item: {
    flexDirection: 'row',
    height: 48,
    marginTop: 11,
    paddingTop: 13,
    paddingBottom: 9,
    paddingLeft: 11,
    paddingRight: 22,
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    overflow: 'hidden',
  },
  textItem: {
    marginRight: 20,
    marginLeft: 10,
    flex: 1,
    lineHeight: 23,
  },
});
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});
export default connect(mapStateToProps)(Account);
