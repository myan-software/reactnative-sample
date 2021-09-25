import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Share,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import Ripple from 'react-native-material-ripple';
import DropDownPicker from 'react-native-dropdown-picker';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import layout from '../../constant/layout';
import {connect} from 'react-redux';
import CustomText from '../../components/CustomText';
import colors from '../../constant/color';
import LinearGradient from 'react-native-linear-gradient';
import HeaderScreen from '../../components/HeaderScreen';
import CustomInput from '../../components/CustomInput';
import moment from 'moment';
import services from '../../network/services';
import helper from '../../helper';
import handleStore from '../../redux/handleStore';
import ErrorBoundary from 'src/components/ErrorBoundary';
import ErrorCatch from 'src/components/ErrorCatch';
import {removeUserFromThread} from 'src/helper/MessageHelper';
import Hyperlink from 'react-native-hyperlink';
class DetailPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      status: null,
      numberContent: 1,
    };
  }
  componentDidMount() {
    this.getDetail();
    this.getStatus();
  }
  async getDetail() {
    try {
      let {id} = this.props.route.params;
      let rs = await services.getDetailPost({id});
      this.setState({data: rs.data});
    } catch (error) {
      //console.log(error);
    }
  }
  async getStatus() {
    try {
      let {id} = this.props.route.params;
      let rs = await services.checkUserToGroup({
        user_id: this.props.user.id,
        post_id: id,
      });
      this.setState({status: rs.result});
    } catch (error) {
      //console.log(error);
    }
  }
  onPost = async () => {
    try {
      let {id} = this.props.route.params;
      let rs;
      if (this.state.data?.user_id === this.props.user.id) {
        handleStore.showLoading();
        rs = await services.deletePost({
          user_id: this.props.user.id,
          post_id: id,
        });
        handleStore.hideModal();
        handleStore.showMessage({content: '投稿は削除されました'});
        this.props.navigation.goBack();
        return;
      }
      switch (this.state.status) {
        case -1:
          handleStore.showLoading();
          rs = await services.requestToGroup({
            user_id: this.props.user.id,
            post_id: id,
          });
          handleStore.hideModal();
          handleStore.showMessage({
            content: rs.message || 'request ok',
            icon: images.iconTick,
          });
          this.setState({status: 0});
          break;
        case 0:
          handleStore.showLoading();
          rs = await services.cancelRequestToGroup({
            user_id: this.props.user.id,
            post_id: id,
          });
          handleStore.hideModal();

          rs.message && handleStore.showMessage({content: rs.message});
          this.setState({status: -1});
          break;
        case 1:
          handleStore.showLoading();
          rs = await services.leaveGroup({
            user_id: this.props.user.id,
            post_id: id,
          });
          handleStore.hideModal();

          rs.message && handleStore.showMessage({content: rs.message});

          if (rs.status == '1') {
            removeUserFromThread(
              this.state.data.firebaseKey,
              this.props.user,
              false,
              () => {},
            );
          }

          this.setState({status: -1});
          break;
        case 2:
          break;
        default:
          break;
      }
    } catch (error) {
      handleStore.showMessage({content: error});
      //console.log(error);
    }
  };
  share = async () => {
    try {
      const result = await Share.share({
        title: this.state.data.title,
        message: this.state.data.content,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //console.log(error);
    }
  };
  toggleFavorite = async () => {
    try {
      let {id} = this.props.route.params;
      let {data} = this.state;
      let {favorites} = this.props;
      if (!favorites[id]?.like) {
        let add = await services.addFavorite({
          post_id: id,
          user_id: this.props.user.id,
        });
        handleStore.updateFavorite({
          [id]: {
            like: true,
            count: add.count,
          },
        });
      } else {
        let remove = await services.deleteFavorite({
          post_id: id,
          user_id: this.props.user.id,
        });
        handleStore.updateFavorite({
          [id]: {
            like: false,
            count: remove.count,
          },
        });
      }
    } catch (error) {
      //console.log(error);
    }
  };
  textPost() {
    if (this.state.data?.user_id === this.props.user.id) {
      return '削除' + helper.note(' xoá ');
    }
    switch (this.state.status) {
      case null:
        return '...';
      case -1: //user not in group
        return '加入申請' + helper.note(' yêu cầu ');
      case 0: //user await accept
        return '加入申請キャンセル' + helper.note(' huỷ yêu cầu');
      case 1: //user  in group
        return '脱退' + helper.note(' rời nhóm');
      case 2: // user block in group
        return 'not clear';
      default:
        return '';
    }
  }
  render() {
    try {
      let {id} = this.props.route.params;
      let {data, numberContent} = this.state;
      let {cities, genders, favorites, categories} = this.props;
      let nameCity = '';
      cities.map((item) => {
        if (item.id == data?.city_id) nameCity = item.name;
      });
      let category = '';
      categories.map((item) => {
        if (item.id == data?.category_id) category = item.name;
      });
      let sex = '';
      genders.map((item) => {
        if (item.id === data?.gender_id) sex = item.name;
      });
      let textPost = this.textPost();
      let count = '';
      if (data) {
        let candidate_number = data.candidate_number || '0';
        let recruitment_number = data.recruitment_number || '0';
        count = candidate_number + '/' + recruitment_number;
      }
      return (
        <ErrorBoundary navigation={this.props.navigation}>
          <View style={styles.container}>
            <HeaderScreen
              navigation={this.props.navigation}
              title={data?.title || ''}
              RightComponent={
                data?.user_id === this.props.user.id ? (
                  <Ripple
                    style={styles.btEdit}
                    onPress={() =>
                      this.props.navigation.navigate('EditPost', {
                        data,
                        refresh: () => this.getDetail(),
                      })
                    }>
                    <FastImage
                      source={images.iconEditWhite}
                      style={styles.icon}
                    />
                  </Ripple>
                ) : null
              }
            />
            <KeyboardAwareScrollView>
              <ScrollView
                style={styles.scrollView}
                contentContainerStyle={{paddingBottom: 100}}>
                <View style={styles.viewThumb}>
                  {data ? (
                    <FastImage
                      resizeMode="cover"
                      source={{uri: data.thumbnail}}
                      style={{flex: 1}}
                    />
                  ) : null}
                </View>
                <View style={styles.wrapTitle}>
                  <CustomText style={styles.titleBig}>
                    {data?.title || ''}
                  </CustomText>
                  <View style={styles.titleRight}>
                    <Ripple
                      style={[
                        styles.btIcon,
                        {flexDirection: 'row', alignItems: 'center'},
                      ]}
                      onPress={this.toggleFavorite}>
                      <CustomText>
                        {favorites[id]?.count
                          ? favorites[id]?.count
                          : data?.like}
                      </CustomText>
                      <FastImage
                        source={
                          favorites[id]?.like
                            ? images.iconBookmacActive
                            : images.iconBookmac
                        }
                        style={styles.icon}
                      />
                    </Ripple>
                    <Ripple style={styles.btIcon} onPress={this.share}>
                      <FastImage
                        source={images.iconShare}
                        style={styles.icon}
                      />
                    </Ripple>
                  </View>
                </View>
                <View style={styles.viewUser}>
                  <TouchableOpacity
                    style={styles.wrapUser}
                    onPress={() => {
                      this.props.navigation.navigate('DetailUser', {
                        user: data?.users,
                      });
                    }}>
                    <View style={styles.avatar}>
                      <FastImage
                        source={
                          data?.users
                            ? {uri: data?.users?.avatar}
                            : images.avatar
                        }
                        style={{
                          flex: 1,
                        }}
                      />
                    </View>
                    <CustomText style={styles.name}>
                      {data?.users?.name}
                    </CustomText>
                  </TouchableOpacity>
                </View>

                <View style={styles.wrapDetail}>
                  <View style={styles.itemDetail}>
                    <FastImage
                      source={images.iconTimeCircle}
                      style={styles.icon}
                    />
                    <CustomText style={styles.lableItem}>募集期間</CustomText>
                    <CustomText style={styles.textItem}>
                      {moment(data?.recruitment_date).format('LL')}
                    </CustomText>
                  </View>
                  <View style={styles.itemDetail}>
                    <FastImage source={images.icon3User} style={styles.icon} />
                    <CustomText style={styles.lableItem}>人数</CustomText>
                    <CustomText style={styles.textItem}>{count}</CustomText>
                  </View>
                  <View style={styles.itemDetail}>
                    <FastImage
                      source={images.iconLocation}
                      style={styles.icon}
                    />
                    <CustomText style={styles.lableItem}>活動場所</CustomText>
                    <CustomText style={styles.textItem}>{nameCity}</CustomText>
                  </View>
                </View>
                <View style={styles.wrapDetail}>
                  <View style={styles.itemStyle2}>
                    <FastImage source={images.iconCake} style={styles.icon} />
                    <CustomText>
                      {'    '}
                      年齢: {data?.from_age}歳~{data?.to_age}歳
                    </CustomText>
                  </View>
                  <View width={20} />
                  <View style={styles.itemStyle2}>
                    <FastImage source={images.iconSex} style={styles.icon} />
                    <CustomText>
                      {'    '}
                      性別: {sex}
                    </CustomText>
                  </View>
                </View>
                <View style={styles.wrapDetail}>
                  <View style={[styles.titleCategory]}>
                    <CustomText>ジャンル</CustomText>
                  </View>  
                  <View style={{width: '3%'}} />
                  <View style={[styles.itemStyle2, styles.itemStyle3]}>
                    <CustomText>{category}</CustomText>
                  </View>
                </View>
                <View style={[styles.ml10, styles.mt10]}> 
                  <CustomText style={styles.lable}>活動内容</CustomText>
                  <CustomText
                    numberOfLines={numberContent}
                    ellipsizeMode="tail">
                    {data?.content}
                  </CustomText>
                  {data?.content?.length > 59 && numberContent ? (
                    <TouchableOpacity
                      style={styles.btSeeAll}
                      onPress={() => this.setState({numberContent: null})}>
                      <CustomText>詳細を見る</CustomText>
                      <FastImage source={images.iconDown} style={styles.icon} />
                    </TouchableOpacity>
                  ) : null}
                  <LinearGradient
                    colors={colors.linearGradient}
                    start={{x: 0.12, y: 0.1}}
                    end={{x: 0.17, y: 2.4}}
                    locations={[0, 0.35, 0.9]}
                    style={styles.linearCreate}>
                    <Ripple style={styles.btCreate} onPress={this.onPost}>
                      <CustomText style={styles.textCreate}>
                        {textPost}
                      </CustomText>
                    </Ripple>
                  </LinearGradient>
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          </View>
        </ErrorBoundary>
      );
    } catch (error) {
      return <ErrorCatch error={error} navigation={this.props.navigation} />;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btEdit: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
    paddingLeft: 10,
  },
  wrapTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 9,
    borderBottomWidth: 1,
    borderColor: colors.border,
    alignItems: 'flex-start',
  },
  titleRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleBig: {
    fontSize: 17,
    fontWeight: '700',
    flex: 1,
    width: 60,
  },
  btIcon: {
    paddingLeft: 10,
  },
  textDate: {
    paddingLeft: 4,
  },
  mt10:{
    marginTop: 10
  },
  icon: {
    width: 24,
    height: 24,
  },
  scrollView: {
    padding: 10,
  },
  viewThumb: {
    width: '100%',
    aspectRatio: 355 / 231,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  lable: {
    marginVertical: 11,
  },
  subText: {
    textAlign: 'right',
    marginTop: 4,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    minHeight: 48,
    padding: 11,
  },

  linearCreate: {
    height: 57,
    borderRadius: 14,
    marginTop: 20,
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
  viewUser: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  wrapUser: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    paddingBottom: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginRight: 6,
  },
  name: {
    paddingLeft: 10,
    fontWeight: '700',
  },
  // news desgin
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
  ml10: {
    marginLeft: 10
  },
  lableItem: {
    color: '#828282',
    marginTop: 4,
    marginBottom: 8,
    fontSize: 12,
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
  btSeeAll: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
});

const mapStateToProps = (state) => {
  return {
    cities: state.userReducer.cities,
    genders: state.userReducer.genders,
    user: state.userReducer.user,
    favorites: state.userReducer.favorites,
    categories: state.userReducer.categories,
  };
};
export default connect(mapStateToProps)(DetailPost);
