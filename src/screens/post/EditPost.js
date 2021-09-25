import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInput} from 'react-native';
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
import HeaderScreen from '../../components/HeaderScreen';
class EditPost extends Component {
  constructor(props) {
    super(props);
    var {data} = props?.route?.params || {};
    this.state = {
      imgTmp: data?.thumbnail || '',
      thumbnail: data?.thumbnail || '',
      title: data?.title || '',
      msgTitle: data?.msgTitle || '',
      content: data?.content || '',
      msgContent: data?.msgContent || '',
      city_id: data?.city_id || '',
      category_id: data?.category_id || '',
      recruitment_number: data?.recruitment_number || '',
      msgCandidate: data?.msgCandidate || '',
      recruitment_date: data?.recruitment_date || '',
      from_age: data?.from_age || '',
      msgFromAge: data?.msgFromAge || '',
      to_age: data?.to_age || '',
      msgToAge: data?.msgToAge || '',
      gender_id: data?.gender_id || '',
      id: data?.id || '',
    };
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
        id,
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
            '入力されていない項目があるため、更新できません。各項目の内容をご確認ください。',
          nameClose: 'OK',
        });
      }
      if (msgTitle || msgContent || msgCandidate || msgFromAge || msgToAge) {
        return handleStore.showMessage({
          title: 'お知らせ',
          content: '無効なコンテンツ、もう一度確認してください',
          nameClose: 'OK',
        });
      }
      // ok => gọi hàm creat=>thành công=>  làm mới,
      // textCancer=> thì huỷ không làm gì
      handleStore.showComfirm({
        content: '入力した内容で更新します。\n\n　よろしいですか？',
        textOk: 'OK',
        textCancer: 'キャンセル',
        onOk: () => {
          this.updatePost();
        },
      });
    } catch (error) {
      handleStore.showMessage({content: error});
    }
  };
  updatePost = async () => {
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
        id,
      } = this.state;
      handleStore.showLoading();
      let rs = await services.updatePost({
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
        user_id: this.props.user.id,
        id,
      });
      handleStore.hideModal();
      // handleStore.showMessage({content: rs.massage || 'update post ok'});
      this.props?.route?.params?.refresh?.();
      this.props.navigation.goBack();
    } catch (error) {
      //console.log(error);
    }
  };
  pickImage = () => {
    // aspectRatio: 355 / 120,
    ImageCropPicker.openPicker({
      // width: 355,
      // height: 120,
      // cropping: true,
      includeBase64: true,
    }).then((image) => {
     // console.log(image);
      this.setState({imgTmp: image.path});
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
    } = this.state;
    return (
      <View style={styles.container}>
        <HeaderScreen navigation={this.props.navigation} title={title || ''} />
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
              />
              {msgTitle ? (
                <CustomText style={styles.warning}>{msgTitle}</CustomText>
              ) : null}
              <CustomText style={styles.lable}>活動内容</CustomText>
              <TextInput
                placeholder="活動内容"
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
                    return this.setState({msgContent: '500字以内で入力してください。'});
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
              <View zIndex={11}>
                <CustomText style={styles.lable}>
                  活動場所 {helper.note('nơi hoạt động')}
                </CustomText>
                <DropDownPicker
                  items={cities}
                  defaultValue={city_id}
                  style={styles.btDrop}
                  dropDownStyle={styles.dropDownStyle}
                  placeholder=""
                  itemStyle={styles.itemSelect}
                  onChangeItem={(item) =>
                    this.setState({
                      city_id: item.value,
                    })
                  }
                />
              </View>
              <View zIndex={10}>
                <CustomText style={styles.lable}>
                  ジャンル {helper.note('thể loại')}
                </CustomText>
                <DropDownPicker
                  items={categories}
                  defaultValue={category_id}
                  style={styles.btDrop}
                  dropDownStyle={styles.dropDownStyle}
                  placeholder=""
                  itemStyle={styles.itemSelect}
                  onChangeItem={(item) =>
                    this.setState({
                      category_id: item.value,
                    })
                  }
                />
              </View>
              <View zIndex={9}>
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
                        this.setState({recruitment_date: dateString});
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
                  <CustomText style={styles.txtUntil}>まで</CustomText>
                </View>
              </View>
              <View zIndex={8}>
                <CustomText style={styles.lable}>
                  募集人数 {helper.note('Số người nộp đơn')}
                </CustomText>
                <TextInput
                  style={styles.input}
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
                    value={from_age?.toString() || ''}
                    onChangeText={(from_age) =>
                      this.setState({from_age, msgFromAge: ''})
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
                    }}
                    keyboardType="numeric"
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
                    value={to_age?.toString() || ''}
                    onChangeText={(to_age) =>
                      this.setState({to_age, msgToAge: ''})
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
                    }}
                    keyboardType="numeric"
                  />
                  {msgToAge ? (
                    <CustomText style={styles.warning}>{msgToAge}</CustomText>
                  ) : null}
                </View>
              </View>
              <View zIndex={7}>
                <CustomText style={styles.lable}>
                  性別 {helper.note('giới tính')}
                </CustomText>
                <DropDownPicker
                  items={genders}
                  defaultValue={gender_id}
                  style={styles.btDrop}
                  dropDownStyle={styles.dropDownStyle}
                  placeholder="性別の選択"
                  itemStyle={styles.itemSelect}
                  onChangeItem={(item) =>
                    this.setState({
                      gender_id: item.value,
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
                  <CustomText style={styles.textCreate}>
                    編集{helper.note('chỉnh sửa')}
                  </CustomText>
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
    aspectRatio: 355 / 120,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
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
export default connect(mapStateToProps)(EditPost);
