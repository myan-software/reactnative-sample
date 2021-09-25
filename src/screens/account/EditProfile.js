import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput, Platform} from 'react-native';
import HeaderScreen from '../../components/HeaderScreen';
import FastImage from 'react-native-fast-image';
import {connect} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomText from '../../components/CustomText';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../../constant/color';
import Ripple from 'react-native-material-ripple';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import layout from '../../constant/layout';
import images from '../../assets/images';
import {checkCharacters} from '../../helper/checkInput';
import helper from '../../helper';
import services from '../../network/services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import handleStore from '../../redux/handleStore';
import ImageCropPicker from 'react-native-image-crop-picker';
import ErrorBoundary from '../../components/ErrorBoundary';
import ErrorCatch from '../../components/ErrorCatch';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.user.name,
      msgName: '',
      avatar: props.user.avatar,
      avatarUpload: props.user.avatar,
      description: props.user.description || '',
      msgDescription: '',
      age: props.user.age || '',
      msgAge: '',
      gender: props.user.gender,
      city_id: props.user.city_id,
      category_id: props.user.category_id,
      facebook_url: props.user.facebook_url,
      instagram_url: props.user.instagram_url,
      twitter_url: props.user.twitter_url,
      nameDropdown: '',
    };
  }
  update = async () => {
    try {
      let {
        name,
        msgName,
        avatar,
        description,
        msgDescription,
        age,
        msgAge,
        gender,
        city_id,
        category_id,
        facebook_url,
        instagram_url,
        twitter_url,
      } = this.state;
      if (
        !name ||
        msgName ||
        !description ||
        msgDescription ||
        !age ||
        msgAge
      ) {
        return handleStore.showMessage({
          content: 'すべての有効な情報を入力してください',
          title: '通知',
        });
      }
      handleStore.showLoading();
      let rs = await services.updateProfile({
        name,
        avatar,
        description,
        age,
        gender,
        city_id,
        category_id,
        facebook_url,
        instagram_url,
        twitter_url,
        id: this.props.user.id,
      });
      handleStore.hideModal();
      handleStore.updateUser({
        name,
        avatar,
        description,
        age,
        gender,
        city_id,
        category_id,
        facebook_url,
        instagram_url,
        twitter_url,
      });
      this.props.navigation.goBack();
    } catch (error) {
      //console.log('error updating profile user ==>', error);
      handleStore.showMessage({content: error});
    }
  };
  pickImage = () => {
    ImageCropPicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
      cropperCircleOverlay: true,
      includeBase64: true,
    }).then((image) => {
      //console.log(image);
      let base64 = `data:${image.mime};base64,` + image.data;
      this.uploadImage(base64);
    });
  };
  uploadImage = async (base64) => {
    try {
      let rs = await services.upImage({image: base64});
      this.setState({avatar: rs.result});
    } catch (error) {
      //console.log(error);
    }
  };
  render() {
    var {cities, categories, genders, navigation} = this.props;
    var {
      name,
      msgName,
      avatar,
      description,
      msgDescription,
      age,
      msgAge,
      gender,
      city_id,
      category_id,
      facebook_url,
      instagram_url,
      twitter_url,
      nameDropdown,
    } = this.state;
    try {
      return (
        <ErrorBoundary canback navigation={navigation}>
          <View style={styles.container}>
            <HeaderScreen
              title="プロフィール編集"
              navigation={this.props.navigation}
            />
            <KeyboardAwareScrollView>
              <ScrollView
                style={{paddingHorizontal: 10}}
                contentContainerStyle={{paddingBottom: getBottomSpace() + 20}}>
                <View style={styles.wrapAvatar}>
                  <View style={styles.overAvatar}>
                    <FastImage
                      source={
                        avatar
                          ? {
                              uri: avatar,
                            }
                          : images.avatar
                      }
                      style={styles.imageAvatar}
                    />
                  </View>
                  <Ripple style={styles.btCamera} onPress={this.pickImage}>
                    <FastImage source={images.iconCamera} style={styles.icon} />
                  </Ripple>
                </View>
                <CustomText style={styles.name}>{name || ' '}</CustomText>
                <View>
                  <CustomText style={styles.lable}>ユーザー名</CustomText>
                  <TextInput
                    onFocus={() => this.setState({ nameDropdown: ''})} 
                    style={[styles.inputIntro, styles.input]}
                    placeholder=""
                    placeholderTextColor="#828282"
                    value={name}
                    onChangeText={(name) => this.setState({name, msgName: ''})}
                    onEndEditing={(e) => {
                      let name = e.nativeEvent.text;
                      if (!name) return;
                      if (name.length > 10) {
                        return this.setState({msgName: '10字以内で入力してください。'});
                      }
                      let check = checkCharacters(name);
                      if (!check.status) {
                        return this.setState({msgName: check.message});
                      }
                    }}
                  />
                  {msgName ? (
                    <CustomText style={styles.warning}>{msgName}</CustomText>
                  ) : null}
                  <CustomText style={styles.lable}>自己紹介文</CustomText>
                  <TextInput
                    onFocus={() => this.setState({ nameDropdown: ''})} 
                    multiline
                    style={styles.inputIntro}
                    placeholder=""
                    placeholderTextColor="#828282"
                    value={description}
                    onChangeText={(description) =>
                      this.setState({description, msgDescription: ''})
                    }
                    onEndEditing={(e) => {
                      let description = e.nativeEvent.text;
                      if (!description) return;
                      if (description.length > 500) {
                        return this.setState({msgDescription: '500字以内で入力してください。'});
                      }
                      let check = checkCharacters(description);
                      if (!check.status) {
                        return this.setState({msgDescription: check.message});
                      }
                    }}
                  />
                  {msgDescription ? (
                    <CustomText style={styles.warning}>
                      {msgDescription}
                    </CustomText>
                  ) : null}
                  <CustomText style={styles.lable}>年齢</CustomText>
                  <TextInput
                    onFocus={() => this.setState({ nameDropdown: ''})} 
                    style={[styles.inputIntro, styles.input]}
                    keyboardType="numeric"
                    placeholder=""
                    placeholderTextColor="#828282"
                    value={age + ''}
                    onChangeText={(age) => this.setState({age, msgAge: ''})}
                    onEndEditing={(e) => {
                      let age = e.nativeEvent.text;
                      if (!age) return;
                      let ageNumber = parseInt(age);
                      if (!ageNumber)
                        return this.setState({
                          msgAge: '10歳から100歳までの間で入力してください',
                        });
                      if (ageNumber > 100 || ageNumber < 10)
                        return this.setState({
                          msgAge: '10歳から100歳までの間で入力してください',
                        });
                    }}
                  />
                  {msgAge ? (
                    <CustomText style={styles.warning}>{msgAge}</CustomText>
                  ) : null}
                  <View
                    style={{
                      ...(Platform.OS !== 'android' && {
                        zIndex: 4,
                      }),
                    }}>
                    <CustomText style={styles.lable}>
                      性別 {helper.note('giới tính')}
                    </CustomText>
                    <DropDownPicker
                      items={genders.filter(data => data.value < 4)}
                      defaultValue={gender}
                      style={styles.btDrop}
                      dropDownStyle={[styles.dropDownStyle]}
                      placeholder="選んでください"
                      itemStyle={styles.itemSelect}
                      onChangeItem={(item) =>
                        this.setState({
                          gender: item.value,
                        })
                      }
                      isVisible={nameDropdown === 'sex'}
                      onOpen={() =>
                        this.setState({
                          nameDropdown: 'sex',
                        })
                      }
                      onClose={() =>
                        this.setState({
                          nameDropdown: '',
                        })
                      }
                    />
                  </View>
                  <View
                    style={{
                      ...(Platform.OS !== 'android' && {
                        zIndex: 3,
                      }),
                    }}>
                    <CustomText style={styles.lable}>
                      活動場所 {helper.note('nơi hoạt động')}
                    </CustomText>
                    <DropDownPicker
                      items={cities}
                      defaultValue={city_id}
                      style={styles.btDrop}
                      dropDownStyle={styles.dropDownStyle}
                      placeholder="選んでください"
                      itemStyle={styles.itemSelect}
                      onChangeItem={(item) =>
                        this.setState({
                          city_id: item.value,
                        })
                      }
                      isVisible={nameDropdown === 'address'}
                      onOpen={() =>
                        this.setState({
                          nameDropdown: 'address',
                        })
                      }
                      onClose={() =>
                        this.setState({
                          nameDropdown: '',
                        })
                      }
                    />
                  </View>
                  <View
                    style={{
                      ...(Platform.OS !== 'android' && {
                        zIndex: 2,
                      }),
                    }}>
                    <CustomText style={styles.lable}>
                      希望ジャンル {helper.note('thể loại mong muốn')}
                    </CustomText>
                    <DropDownPicker
                      items={categories}
                      defaultValue={category_id}
                      style={styles.btDrop}
                      dropDownStyle={styles.dropDownStyle}
                      placeholder="選んでください"
                      itemStyle={styles.itemSelect}
                      onChangeItem={(item) =>
                        this.setState({
                          category_id: item.value,
                        })
                      }
                      isVisible={nameDropdown === 'cate'}
                      onOpen={() =>
                        this.setState({
                          nameDropdown: 'cate',
                        })
                      }
                      onClose={() =>
                        this.setState({
                          nameDropdown: '',
                        })
                      }
                    />
                  </View>
                  <CustomText style={styles.lable}>Youtube</CustomText>
                  <TextInput
                    onFocus={() => this.setState({ nameDropdown: ''})} 
                    style={[styles.inputIntro, styles.input]}
                    placeholder=""
                    placeholderTextColor="#828282"
                    value={facebook_url}
                    onChangeText={(facebook_url) => this.setState({facebook_url, msgName: ''})}
                  />
                  <CustomText style={styles.lable}>Instagram</CustomText>
                  <TextInput
                    onFocus={() => this.setState({ nameDropdown: ''})} 
                    style={[styles.inputIntro, styles.input]}
                    placeholder=""
                    placeholderTextColor="#828282"
                    value={instagram_url}
                    onChangeText={(instagram_url) => this.setState({instagram_url, msgName: ''})}
                  />
                  <CustomText style={styles.lable}>Twitter</CustomText>
                  <TextInput
                    onFocus={() => this.setState({ nameDropdown: ''})} 
                    style={[styles.inputIntro, styles.input]}
                    placeholder=""
                    placeholderTextColor="#828282"
                    value={twitter_url}
                    onChangeText={(twitter_url) => this.setState({twitter_url, msgName: ''})}
                  />
                  <View height={70} />
                  <LinearGradient
                    colors={colors.linearGradient}
                    start={{x: 0.12, y: 0.1}}
                    end={{x: 0.17, y: 2.4}}
                    locations={[0, 0.35, 0.9]}
                    style={styles.linearUpdate}>
                    <Ripple style={styles.btUpdate} onPress={this.update}>
                      <CustomText style={styles.txtUpdate}>更新</CustomText>
                    </Ripple>
                  </LinearGradient>
                </View>
              </ScrollView>
            </KeyboardAwareScrollView>
          </View>
        </ErrorBoundary>
      );
    } catch (error) {
      return <ErrorCatch navigation={navigation} canback />;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  overAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    overflow: 'hidden',
    alignSelf: 'center',
  },
  imageAvatar: {
    width: 120,
    aspectRatio: 1,
  },
  name: {
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
  },

  lable: {
    marginVertical: 11,
  },
  inputIntro: {
    backgroundColor: '#F9F9F9',
    minHeight: 112,
    borderRadius: 14,
    textAlignVertical: 'top',
    padding: 11,
    paddingTop: 11,
  },
  input: {
    minHeight: 48,
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
  btCamera: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    right: -10,
    backgroundColor: '#F2F2F2',
    padding: 3,
    borderRadius: 6,
    ...layout.shadow,
  },
  icon: {
    width: 24,
    height: 24,
  },
  wrapAvatar: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginVertical: 10,
  },
  btDrop: {
    height: 48,
    backgroundColor: '#F9F9F9',
    borderWidth: 0,
    paddingHorizontal: 7,
    borderTopRightRadius: 14,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
  },
  dropDownStyle: {
    backgroundColor: '#F9F9F9',
    borderWidth: 0,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  itemSelect: {
    justifyContent: 'flex-start',
  },
  linearUpdate: {
    height: 57,
    borderRadius: 14,
    marginTop: 20,
  },
  btUpdate: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  txtUpdate: {
    color: '#fff',
    fontWeight: '700',
  },
  warning: {
    color: colors.primary,
    marginTop: 4,
    paddingLeft: 3,
  },
});

const mapStateToProps = (state) => {
  let cities = state.userReducer.cities.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  let categories = state.userReducer.categories.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  let genders = state.userReducer.genders.map((item) => ({
    label: item.name,
    value: item.id,
  }));
  return {
    user: state.userReducer.user,
    cities,
    categories,
    genders,
  };
};
export default connect(mapStateToProps)(EditProfile);
