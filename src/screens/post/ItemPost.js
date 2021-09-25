import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableOpacity, Share} from 'react-native';
import CustomText from '../../components/CustomText';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';
import images from '../../assets/images';
import colors from '../../constant/color';
import services from 'src/network/services';
import handleStore from 'src/redux/handleStore';
class ItemPost extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  share = async (item) => {
    try {
      const result = await Share.share({
        title: item.title,
        message: item.content,
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
      console.log(error);
    }
  };
  toggleFavorite = async () => {
    try {
      let {item, favorites, user} = this.props;
      if (!favorites[item.id]?.like) {
        let add = await services.addFavorite({
          post_id: item.id,
          user_id: user.id,
        });
        handleStore.updateFavorite({
          [item.id]: {
            like: true,
            count: add.count,
          },
        });
      } else {
        let remove = await services.deleteFavorite({
          post_id: item.id,
          user_id: user.id,
        });
        handleStore.updateFavorite({
          [item.id]: {
            like: false,
            count: remove.count,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let {item, favorites} = this.props;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          this.props.navigation.navigate('DetailPost', {id: item.id});
        }}>
        <FastImage
          source={{
            uri: item.thumbnail,
          }}
          style={styles.image}
        />
        <View style={styles.right}>
          <View>
            <CustomText style={styles.title}>{item.title}</CustomText>
            <CustomText
              ellipsizeMode="tail"
              numberOfLines={3}
              style={styles.detail}>
              {item.content}
            </CustomText>
          </View>
          <View style={styles.bottomRight}>
            <View>
              <View style={styles.viewPerson}>
                <CustomText style={styles.txtPerson}>人数</CustomText>
                <CustomText style={styles.numberPerson}>
                  {item.candidate_number || 0}/{item.recruitment_number || 0}
                </CustomText>
              </View>
            </View>
            <View style={styles.viewTag}>
              <TouchableOpacity
                style={styles.btTag}
                onPress={this.toggleFavorite}>
                <CustomText style={styles.textLike}>
                  {favorites[item.id]?.count
                    ? favorites[item.id]?.count
                    : (favorites[item.id]?.count === 0 ? '' : item.like) || ''}
                </CustomText>
                <FastImage
                  source={
                    favorites[item.id]?.like
                      ? images.iconBookmacActive
                      : images.iconBookmac
                  }
                  style={styles.icon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.share(item)}>
                <FastImage source={images.iconShare} style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  image: {
    width: '33%',
    aspectRatio: 335 / 231,
    borderRadius: 14,
    backgroundColor: colors.blur,
  },
  right: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
  },
  detail: {
    marginTop: 6,
    lineHeight: 16.34,
    color: colors.fontGray,
    fontSize: 12,
  },
  bottomRight: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  viewPerson: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  txtPerson: {
    fontSize: 10,
  },
  numberPerson: {
    marginLeft: 6,
    fontSize: 10,
    fontWeight: '700',
  },
  viewTag: {
    flexDirection: 'row',
    marginTop: 4,
  },
  btTag: {
    marginRight: 10,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textLike: {
    // position: 'absolute',
    // left: -12,
    // bottom: 0,
    bottom: -2,
    marginRight: 3,
  },
  icon: {
    width: 24,
    aspectRatio: 1,
  },
});
const mapStateToProps = (state) => {
  return {
    favorites: state.userReducer.favorites,
    user: state.userReducer.user,
  };
};
export default connect(mapStateToProps)(ItemPost);
