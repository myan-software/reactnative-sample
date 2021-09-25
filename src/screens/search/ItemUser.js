import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity, Share} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import images from '../../assets/images';
import CustomText from '../../components/CustomText';
import colors from '../../constant/color';
import {connect} from 'react-redux';
import services from 'src/network/services';
import handleStore from 'src/redux/handleStore';
class ItemUser extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggleFollow = async () => {
    try {
      let {user, item, follows} = this.props;
      if (!follows[item.id]) {
        await services.followUser({
          user_id: user.id,
          follow_user_id: item.id,
        });
        handleStore.updateFollows({[item.id]: true});
      } else {
        await services.unfollowUser({
          user_id: user.id,
          follow_user_id: item.id,
        });
        handleStore.updateFollows({[item.id]: false});
      }
    } catch (error) {
      handleStore.showMessage({content: error});
    }
  };
  share = async () => {
    try {
      let {item, follows} = this.props;
      const result = await Share.share({
        title: item.name,
        message: item.description || item.name,
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
  render() {
    let {item, follows, cities, genders, categories} = this.props;
    let citiName = '';
    cities.map((i) => {
      if (i.id === item.city_id) citiName = i.name;
    });

    let genderName = '指定無し';
    genders.map((i) => {
      if (i.id === item.gender) genderName = i.name;
    });

    let categoryName = '';
    categories.map((i) => {
      if (i.id === item.category_id) categoryName = i.name;
    });

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          this.props.navigation.navigate('DetailUser', {user: item})
        }>
        <View>
          <View style={styles.wrapAvatar}>
            <FastImage
              source={{
                uri: item.avatar,
              }}
              style={styles.imageAvatar}
            />
          </View>
          <LinearGradient
            colors={colors.linearGradient}
            start={{x: 0.12, y: 0.1}}
            end={{x: 0.35, y: 2}}
            locations={[0, 0.3, 0.9]}
            style={styles.linearFollow}>
            <Ripple style={styles.btFollow} onPress={this.toggleFollow}>
              <CustomText style={styles.txtFollow}>
                {follows[item.id] ? '解除' : 'フォロー'}
              </CustomText>
            </Ripple>
          </LinearGradient>
        </View>
        <View style={styles.right}>
          <View>
            <CustomText style={styles.txtName}>{item.name}</CustomText>
            <CustomText
              numberOfLines={2}
              ellipsizeMode="tail"
              style={styles.txtDetail}>
              {item.description}
            </CustomText>
          </View>
          <View style={styles.bottomRight} >
            <View style={styles.viewShare}>
              {genderName ? (
                <View style={styles.btGender}>
                  <CustomText style={styles.txtFollow}>{genderName}</CustomText>
                </View>
              ) : null}
              {categoryName ? (
                <View style={styles.btExperience}>
                  <CustomText style={styles.txtFollow}>{categoryName}</CustomText>
                </View>
              ) : null}
            </View>
            <Ripple style={styles.btShare} onPress={this.share}>
              <FastImage source={images.iconShare} style={styles.iconShare} />
            </Ripple>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  wrapAvatar: {
    width: 65,
    height: 65,
    borderRadius: 35,
    overflow: 'hidden',
    backgroundColor: colors.blur,
  },
  imageAvatar: {
    width: 65,
    aspectRatio: 1,
  },
  linearFollow: {
    borderRadius: 14,
    marginTop: 4,
    height: 24,
  },
  btFollow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtFollow: {
    fontSize: 10,
    color: '#fff',
  },
  right: {
    flex: 1,
    justifyContent: 'space-between',
    paddingLeft: 18,
  },
  txtName: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  txtDetail: {
    fontSize: 12,
  },
  bottomRight: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewShare: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
  btExperience: {
    backgroundColor: '#FCB045',
    height: 24,
    borderRadius: 14,
    paddingHorizontal: 13,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btGender: {
    backgroundColor: '#AA59C1',
    height: 24,
    borderRadius: 14, 
    paddingHorizontal: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btShare: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  iconShare: {width: 24, height: 24},
});
const mapStateToProps = (state) => ({
  follows: state.userReducer.follows,
  user: state.userReducer.user,
  cities: state.userReducer.cities,
  genders: state.userReducer.genders,
  categories: state.userReducer.categories,
});
export default connect(mapStateToProps)(ItemUser);
