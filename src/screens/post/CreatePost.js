import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput, Platform} from 'react-native';
import {KeyboardAwareScrollView} from '@codler/react-native-keyboard-aware-scroll-view';
import HeaderApp from '../../components/HeaderApp';
import Ripple from 'react-native-material-ripple';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-datepicker';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import images from '../../assets/images';
import layout from '../../constant/layout';
import CustomText from '../../components/CustomText';
import colors from '../../constant/color';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import helper from '../../helper';
import {checkCharacters} from '../../helper/checkInput';
import services from '../../network/services';
import handleStore from '../../redux/handleStore';
import ImageCropPicker from 'react-native-image-crop-picker';
import firestore from '@react-native-firebase/firestore';
import {
  COLLECTION,
  createThreadGroup,
  TYPE_MESSAGE,
} from 'src/helper/MessageHelper';

class CreatePost extends Component {
  init = {
    imgTmp: '',
    thumbnail: '',
    title: '',
    msgTitle: '',
    content: '',
    msgContent: '',
    city_id: '',
    category_id: '',
    recruitment_number: '',
    msgCandidate: '',
    recruitment_date: '',
    from_age: '',
    msgFromAge: '',
    to_age: '',
    msgToAge: '',
    gender_id: '',
    nameDropdown: '',
  };
  constructor(props) {
    super(props);
    this.state = this.init;
  }
  validate = () => {
    try {
      let {
        thumbnail,
        title,
        msgTitle,
        content,
        msgContent,
        city_id,
        category_id,
        recruitment_number,
        msgCandidate,
        recruitment_date,
        from_age,
        msgFromAge,
        to_age,
        msgToAge,
        gender_id,
      } = this.state;
      if (
        !thumbnail ||
        !title ||
        !content ||
        !city_id ||
        !category_id ||
        !recruitment_number ||
        !recruitment_date ||
        !from_age ||
        !to_age ||
        !gender_id
      ) {
        return handleStore.showMessage({
          title: 'お知らせ',
          content:
            '入力されていない項目があるため、更新できません。\n各項目の内容をご確認ください。',
          nameClose: 'OK',
        });
      }
      if (msgTitle || msgContent || msgCandidate || msgFromAge || msgToAge) {
        return handleStore.showMessage({
          title: 'お知らせ',
          content: '入力内容に誤りがあります。\n内容を確認してください。',
          nameClose: 'OK',
        });
      }
      // ok => gọi hàm creat=>thành công=>  làm mới,
      // textCancer=> thì huỷ không làm gì
      handleStore.showComfirm({
        content: '入力した内容で作成します。\n\n　よろしいですか？',
        textOk: 'OK',
        textCancer: 'キャンセル',
        onOk: () => {
          this.createThreadPost();
        },
      });
    } catch (error) {
      handleStore.showMessage({content: error});
    }
  };
  createThreadPost = () => {
    handleStore.showLoading();
    createThreadGroup(
      this.props.user,
      TYPE_MESSAGE.GROUP,
      this.state.title.trim(),
      (docRef) => this.creatPost(docRef),
    );
  };
  creatPost = async (docRef) => {
    try {
      let {
        thumbnail,
        title,
        content,
        city_id,
        category_id,
        recruitment_number,
        recruitment_date,
        from_age,
        to_age,
        gender_id,
      } = this.state;
      let rs = await services.creatPost({
        thumbnail,
        title,
        content,
        city_id,
        category_id,
        recruitment_number: parseInt(recruitment_number),
        recruitment_date,
        from_age: parseInt(from_age),
        to_age: parseInt(to_age),
        gender_id,
        user_id: handleStore.getUser().id,
        firebaseKey: docRef.id,
      });
      handleStore.hideModal();
      this.setState(this.init);
      this.creatCollection(docRef, rs.data);
    } catch (error) {
      handleStore.showMessage({content: error});
      //console.log(error);
    }
  };
  creatCollection = (docRef, post) => {
    firestore()
      .collection(COLLECTION.MESSAGE_THREADS)
      .doc(docRef.id)
      .set({serverGroupId: post?.id}, {merge: true})
      .then(() => {
        firestore()
          .collection(COLLECTION.MESSAGE_THREADS)
          .doc(docRef.id)
          .get()
          .then((docRef2) => {
            this.props.navigation.navigate('Message');
            setTimeout(() => {
              this.props.navigation.navigate('MessageDetail', {
                dataProps: {
                  id: docRef.id,
                  ...docRef2.data(),
                },
              });
            }, 300);
          })
          .catch((error) => {
            //console.log('error update firebase', error);
          });
      })
      .catch((error) => {
        //console.log('error update thread', error);
      });
  };
  pickImage = () => {
    // aspectRatio: 355 / 120,
    ImageCropPicker.openPicker({
      // width: 355,
      // height: 120,
      // cropping: true,
      includeBase64: true,
    }).then((image) => {
      //console.log(image);
      this.setState({imgTmp: image.path, nameDropdown: ''});
      let base64 = `data:${image.mime};base64,` + image.data;
      this.uploadImage(base64);
    });
  };
  uploadImage = async (base64) => {
    try {
      let rs = await services.upImage({image: base64});
      this.setState({thumbnail: rs.result});
    } catch (error) {
      //console.log(error);
    }
  };
  render() {
    var {cities, categories, genders} = this.props;
    let {
      imgTmp,
      thumbnail,
      title,
      msgTitle,
      content,
      msgContent,
      city_id,
      category_id,
      recruitment_number,
      msgCandidate,
      recruitment_date,
      from_age,
      msgFromAge,
      to_age,
      msgToAge,
      gender_id,
      nameDropdown,
    } = this.state;
    return (
      <View style={styles.container}>
        <HeaderApp navigation={this.props.navigation} />
        <KeyboardAwareScrollView>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{paddingBottom: 100}}>
            <View style={styles.viewAvatar}>
              <FastImage
                resizeMode="cover"
                source={{uri: imgTmp}}
                style={{flex: 1}}
              />
              {!imgTmp && (
                <View style={styles.viewSize}>
                  <CustomText style={styles.txtSize}>355 x 231</CustomText>
                  <CustomText style={[styles.txtSize, {marginTop: 4}]}>
                    Pixel
                  </CustomText>
                </View>
              )}
              <Ripple style={styles.btCamera} onPress={this.pickImage}>
                <FastImage
                  source={images.iconCamera}
                  style={styles.iconCamera}
                />
              </Ripple>
            </View>
            <View>
              <CustomText style={styles.lable}>タイトル</CustomText>
              <TextInput
                style={styles.input}
                placeholder="タイトル"
                onFocus={() => this.setState({ nameDropdown: ''})} 
                value={title}
                onChangeText={(title) => this.setState({title, msgTitle: ''})}
                onEndEditing={(e) => {
                  let title = e.nativeEvent.text;
                  if (!title) return;
                  if (title.length > 20) {
                    return this.setState({msgTitle: '最大20文字'});
                  }
                  let check = checkCharacters(title);
                  if (!check.status) {
                    return this.setState({msgTitle: check.message});
                  }
                }}
                returnKeyType="done"
              />
              {msgTitle ? (
                <CustomText style={styles.warning}>{msgTitle}</CustomText>
              ) : null}
              <CustomText style={styles.lable}>活動内容</CustomText>
              <TextInput
                placeholder="活動内容"
                onFocus={() => this.setState({ nameDropdown: ''})} 
                multiline
                style={[styles.input, styles.inputBig]}
                value={content}
                onChangeText={(content) =>
                  this.setState({content, msgContent: ''})
                }
                onEndEditing={(e) => {
                  let content = e.nativeEvent.text;
                  if (!content) return;
                  if (content.length > 500) {
                    return this.setState({
                      msgContent: '500字以内で入力してください。',
                    });
                  }
                  let check = checkCharacters(content);
                  if (!check.status) {
                    return this.setState({msgContent: check.message});
                  }
                }}
              />
              {msgContent ? (
                <CustomText style={styles.warning}>{msgContent}</CustomText>
              ) : null}
              <View
                style={{
                  ...(Platform.OS !== 'android' && {
                    zIndex: 11,
                  }),
                }}>
                <CustomText style={styles.lable}>
                  活動場所 {helper.note('nơi hoạt động')}
                </CustomText>
                <DropDownPicker
                  items={cities}
                  style={styles.btDrop}
                  defaultValue={city_id || null}
                  dropDownStyle={styles.dropDownStyle}
                  placeholder=""
                  itemStyle={styles.itemSelect}
                  onChangeItem={(item) =>
                    this.setState({
                      city_id: item.value,
                    })
                  }
                  isVisible={nameDropdown === 'cities'}
                  onOpen={() =>
                    this.setState({
                      nameDropdown: 'cities',
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
                    zIndex: 10,
                  }),
                }}>
                <CustomText style={styles.lable}>
                  ジャンル {helper.note('thể loại')}
                </CustomText>
                <DropDownPicker
                  items={categories}
                  style={styles.btDrop}
                  defaultValue={category_id || null}
                  dropDownStyle={styles.dropDownStyle}
                  placeholder=""
                  itemStyle={styles.itemSelect}
                  onChangeItem={(item) =>
                    this.setState({
                      category_id: item.value,
                    })
                  }
                  isVisible={nameDropdown === 'categories'}
                  onOpen={() =>
                    this.setState({
                      nameDropdown: 'categories',
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
                    zIndex: 9,
                  }),
                }}>
                <CustomText style={styles.lable}>
                  募集期間 {helper.note('Thời gian tuyển dụng')}
                </CustomText>
                <View style={styles.viewTime}>
                  <View flex={1}>
                    <DatePicker
                      style={{width: '100%'}}
                      date={recruitment_date}
                      mode="date"
                      locale="ja"
                      minDate={new Date()}
                      showIcon={false}
                      androidMode="spinner"
                      placeholder=""
                      format="YYYY-MM-DD"
                      confirmBtnText="完了"
                      cancelBtnText="キャンセル"
                      customStyles={{
                        dateInput: {
                          backgroundColor: '#F9F9F9',
                          borderRadius: 14,
                          borderWidth: 0,
                          alignItems: 'flex-start',
                          paddingLeft: 10,
                        },
                        btnTextConfirm: {
                          color: colors.primary,
                        },
                        dateText: {
                          color: colors.fontBlack,
                        },
                        datePicker: {
                          justifyContent: 'center',
                        },
                      }}
                      onDateChange={(dateString, date) => {
                        this.setState({recruitment_date: dateString, nameDropdown: ''});
                      }}
                    />
                    {/* <DropDownPicker
                      items={dataSelect}
                      style={styles.btDrop}
                      dropDownStyle={styles.dropDownStyle}
                      placeholder="アイテムを一つ選べ"
                      itemStyle={styles.itemSelect}
                    /> */}
                  </View>
                  <CustomText style={styles.txtUntil}>
                    まで {helper.note('Cho đến khi')}
                  </CustomText>
                </View>
              </View>
              <View
                style={{
                  ...(Platform.OS !== 'android' && {
                    zIndex: 8,
                  }),
                }}>
                <CustomText style={styles.lable}>
                  募集人数 {helper.note('Số người nộp đơn')}
                </CustomText>
                <TextInput
                  style={styles.input}
                  onFocus={() => this.setState({ nameDropdown: ''})} 
                  value={recruitment_number?.toString()}
                  placeholder=""
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    this.setState({recruitment_number: text, msgCandidate: ''})
                  }
                  onEndEditing={(e) => {
                    let text = e.nativeEvent.text;
                    if (!text) return;
                    let number = parseInt(text);
                    if (!number)
                      return this.setState({
                        msgCandidate: '人数は整数でなければなりません',
                      });
                    if (number < 1 || number > 10)
                      return this.setState({
                        msgCandidate: '最大10人まで募集可能です。',
                      });
                  }}
                  returnKeyType="done"
                />
              </View>
              {msgCandidate ? (
                <CustomText style={styles.warning}>{msgCandidate}</CustomText>
              ) : null}
              <CustomText style={styles.lable}>年齢</CustomText>
              <View style={styles.wrapInputAge}>
                <View flex={1}>
                  <TextInput
                    style={[styles.input, styles.inputAge]}
                    value={from_age}
                    onFocus={() => this.setState({ nameDropdown: ''})} 
                    onChangeText={(from_age) =>
                      this.setState({from_age, msgFromAge: '', msgToAge: ''})
                    }
                    onEndEditing={(e) => {
                      let age = e.nativeEvent.text;
                      if (!age) return;
                      let ageNumber = parseInt(age);
                      if (!ageNumber)
                        return this.setState({
                          msgFromAge: '10歳から100歳までの間で入力してください',
                        });
                      if (ageNumber > 100 || ageNumber < 10)
                        return this.setState({
                          msgFromAge: '10歳から100歳までの間で入力してください',
                        });
                      if (ageNumber > parseInt(this.state.to_age)) {
                        return this.setState({
                          msgFromAge: '年齢に誤りがあります',
                        });
                      }
                    }}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                  {msgFromAge ? (
                    <CustomText style={styles.warning}>{msgFromAge}</CustomText>
                  ) : null}
                </View>
                <View style={styles.divider}>
                  <CustomText> - </CustomText>
                </View>
                <View flex={1}>
                  <TextInput
                    style={[styles.input, styles.inputAge]}
                    onFocus={() => this.setState({ nameDropdown: ''})} 
                    value={to_age}
                    onChangeText={(to_age) =>
                      this.setState({to_age, msgToAge: '', msgFromAge: ''})
                    }
                    onEndEditing={(e) => {
                      let age = e.nativeEvent.text;
                      if (!age) return;
                      let ageNumber = parseInt(age);
                      if (!ageNumber)
                        return this.setState({
                          msgToAge: '10歳から100歳までの間で入力してください',
                        });
                      if (ageNumber > 100 || ageNumber < 10)
                        return this.setState({
                          msgToAge: '10歳から100歳までの間で入力してください',
                        });
                      if (ageNumber < parseInt(this.state.from_age)) {
                        return this.setState({
                          msgToAge: '年齢に誤りがあります',
                        });
                      }
                    }}
                    keyboardType="numeric"
                    returnKeyType="done"
                  />
                  {msgToAge ? (
                    <CustomText style={styles.warning}>{msgToAge}</CustomText>
                  ) : null}
                </View>
              </View>
              <View
                style={{
                  ...(Platform.OS !== 'android' && {
                    zIndex: 7,
                  }),
                }}>
                <CustomText style={styles.lable}>
                  性別 {helper.note('giới tính')}
                </CustomText>
                <DropDownPicker
                  items={genders}
                  style={styles.btDrop}
                  defaultValue={gender_id || null}
                  dropDownStyle={styles.dropDownStyle}
                  placeholder="性別の選択"
                  itemStyle={styles.itemSelect}
                  onChangeItem={(item) =>
                    this.setState({
                      gender_id: item.value,
                    })
                  }
                  isVisible={nameDropdown === 'genders'}
                  onOpen={() =>
                    this.setState({
                      nameDropdown: 'genders',
                    })
                  }
                  onClose={() =>
                    this.setState({
                      nameDropdown: '',
                    })
                  }
                />
              </View>
              <LinearGradient
                colors={colors.linearGradient}
                start={{x: 0.12, y: 0.1}}
                end={{x: 0.17, y: 2.4}}
                locations={[0, 0.35, 0.9]}
                style={styles.linearCreate}>
                <Ripple style={styles.btCreate} onPress={this.validate}>
                  <CustomText style={styles.textCreate}>投稿</CustomText>
                </Ripple>
              </LinearGradient>
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
  scrollView: {
    padding: 10,
  },
  viewAvatar: {
    width: '100%',
    aspectRatio: 355 / 231,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
  },
  viewSize: {
    alignSelf: 'center',
    position: 'absolute',
    top: '43%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSize: {
    color: '#BDBDBD',
    fontWeight: 'bold',
  },
  btCamera: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    right: 10,
    backgroundColor: '#F2F2F2',
    padding: 3,
    borderRadius: 6,
    ...layout.shadow,
  },
  iconCamera: {
    width: 24,
    height: 24,
  },
  lable: {
    marginVertical: 11,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    minHeight: 48,
    padding: 11,
  },
  inputBig: {
    minHeight: 118,
    paddingTop: 11,
    textAlignVertical: 'top',
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
  viewTime: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtUntil: {
    marginLeft: 8,
  },
  wrapInputAge: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  inputAge: {
    // flex: 1,
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
  warning: {
    color: colors.primary,
    marginTop: 4,
    paddingLeft: 3,
  },
  divider: {
    width: 20,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
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
export default connect(mapStateToProps)(CreatePost);
