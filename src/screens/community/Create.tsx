import firestore from '@react-native-firebase/firestore';
import {AppContext} from '@vn.starlingTech/components/AppContext';
import CONSTANTS from '@vn.starlingTech/config/Constant';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ScrollView} from 'react-native-gesture-handler';
import ImageCropPicker from 'react-native-image-crop-picker';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import images from 'src/assets/images';
import CustomInput from 'src/components/CustomInput';
import CustomText from 'src/components/CustomText';
import HeaderScreen from 'src/components/HeaderScreen';
import {
  COLLECTION,
  createThreadGroup,
  goToChatDetail,
  deleteThreadGroup,
  TYPE_MESSAGE,
} from 'src/helper/MessageHelper';
import ArrowDownIcon from '../../../assets/svg/ArrowDownIcon';
import ArrowUpIcon from '../../../assets/svg/ArrowUpIcon';
import layout from '../../constant/layout';
import PopupConfirm from './components/Create.PopupConfirm';
import PopupWarning from './components/Create.PopupWarning';

type Props = {
  navigation: any;
};

const Create = (props: Props) => {
  const {navigation} = props;
  const context = useContext(AppContext);
  const user = context.user;
  const [base64Image, setBase64Image] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [localImage, setLocalImage] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);
  const [listCategories, setListCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>();
  const [showWaring, setShowWarning] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getListCategories();
  }, []);

  const getListCategories = async () => {
    const networking = new AppNetworking();
    networking.init({
      url: API.GET_CATEGORIES,
      params: {},
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      setListCategories(data);
      setSelectedCategory(data[0]);
    }
  };

  const checkSubsciption = () => {
    navigation.navigate('Subscription');
  };

  const pickImage = () => {
    ImageCropPicker.openPicker({
      includeBase64: true,
    }).then((image: any) => {
      setLocalImage(image.path);
      setBase64Image(`data:${image.mime};base64,${image.data}`);
    });
  };

  const uploadImage = async () => {
    setLoading(true);
    const networking = new AppNetworking();
    networking.init({
      url: API.UPLOAD_IMAGE,
      params: {
        image: base64Image,
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      onCreateFirestoreDocument(data);
    } else {
      setLoading(false);
    }
  };

  const onChangeTitle = (_title: string) => {
    setTitle(_title);
  };

  const onChangeContent = (_text: string) => {
    setContent(_text);
  };

  const offShowList = () => {
    setShowList(false);
  };

  const onShowList = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowList(!showList);
  };

  const onSelectCategory = (item: any) => () => {
    setSelectedCategory(item);
    onShowList();
  };

  const onShowErrorMessage = () => {
    setShowErrorMessage(!showErrorMessage);
  };

  const onShowWarning = () => {
    setShowWarning(!showWaring);
  };

  const onShowConfirm = () => {
    setShowConfirm(!showConfirm);
  };

  const checkForm = () => {
    if (!context.user?.subscription) {
      checkSubsciption();
      return;
    }
    if (
      !base64Image.trim() ||
      !title.trim() ||
      !content.trim() ||
      !selectedCategory
    ) {
      onShowWarning();
      return;
    }
    onShowConfirm();
  };

  const onCreateFirestoreDocument = (uriImage: string) => {
    createThreadGroup(
      user,
      TYPE_MESSAGE.COMMUNITY,
      title.trim(),
      (docRef: any) => {
        onCreate(docRef.id, uriImage);
      },
      () => {
        setLoading(false);
      },
    );
  };

  const onCreate = async (docId: string, uriImage: string) => {
    const networking = new AppNetworking();
    networking.init({
      url: API.CREATE_COMMUNITY,
      params: {
        image: uriImage,
        title: title,
        content: content,
        user_id: user?.id,
        category_id: selectedCategory.id,
        firebaseKey: docId,
      },
    });
    const {data, status, message} = await networking.postToServer();
    setLoading(false);
    if (isSuccessResponse(status)) {
      firestore()
        .collection(COLLECTION.MESSAGE_THREADS)
        .doc(docId)
        .set({serverGroupId: data?.id}, {merge: true})
        .then(() => {
          goToChatDetail(docId, navigation);
        })
        .catch((error: any) => {
          console.log('error update thread', error);
        });
    }　else {
        setShowErrorMessage(!showErrorMessage);
        setErrorMessage(message);
        //delete thead
        console.log('delete thread', docId);
        deleteThreadGroup(docId);
    }
  };

  return (
    <>
      <HeaderScreen title={'コミュニテイ作成'} navigation={navigation} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
           <View style={styles.viewAvatar}>
              <FastImage
                resizeMode="cover"
                source={{uri: localImage}}
                style={{flex: 1}}
              />
            {!localImage&& <View style={styles.viewSize}>
                <CustomText style={styles.txtSize}>355 x 231</CustomText>
                <CustomText style={[styles.txtSize, {marginTop: 4}]}>
                  Pixel
                </CustomText>
              </View>}
              <Ripple style={styles.buttonCamera} onPress={pickImage}>
                <FastImage source={images.iconCamera} style={styles.iconCamera} />
              </Ripple>
            </View>
          <CustomText style={[styles.title, {marginTop: 20}]}>
            {'タイトル'}
          </CustomText>
          <View style={styles.viewInputTitle}>
            <CustomInput
              placeholder={''}
              placeholderTextColor={'#828282'}
              style={styles.inputTitle}
              maxLength={20}
              onFocus={offShowList} 
              onChangeText={onChangeTitle}
            />
          </View>
          <View style={styles.viewContent}>
            <CustomText style={styles.title}>{'説明'}</CustomText>
            <CustomText style={styles.text}>
              {`${content.length}/500`}
            </CustomText>
          </View>
          <View style={styles.viewInputContent}>
            <CustomInput
              value={content}
              placeholder={''}
              placeholderTextColor={'#828282'}
              style={styles.inputContent}
              multiline
              onFocus={offShowList}
              onChangeText={onChangeContent}
              maxLength={500}
            />
          </View>
          <CustomText style={[styles.title, {marginTop: 10}]}>
            {'ジャンル'}
          </CustomText>
          <View style={styles.viewSelect}>
            <TouchableOpacity
              style={[styles.viewRow, {marginTop: 0}]}
              onPress={onShowList}
              activeOpacity={1}>
              <CustomText style={styles.title}>
                {selectedCategory ? selectedCategory.name : ''}
              </CustomText>
              {showList ? <ArrowUpIcon /> : <ArrowDownIcon />}
            </TouchableOpacity>
            {showList && listCategories.length > 0 ? (
              <FlatList
                data={listCategories}
                renderItem={({item, index}: any) => (
                  <TouchableOpacity
                    onPress={onSelectCategory(item)}
                    activeOpacity={1}>
                    <CustomText style={[styles.text, {marginVertical: 5}]}>
                      {item?.name}
                    </CustomText>
                  </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.listCategories}
                scrollEnabled={false}
              />
            ) : null}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={checkForm}
          style={{paddingTop: 10, marginBottom: getBottomSpace()}}>
          <LinearGradient
            start={{x: 0.01, y: 0}}
            end={{x: 0.1, y: 2.7}}
            colors={['#833AB4', '#FD1D1D', '#FCB045']}
            style={styles.button}>
            <CustomText style={styles.textButton}>{'作成'}</CustomText>
          </LinearGradient>
        </TouchableOpacity>
        {loading && (
          <View
            style={{
              width: CONSTANTS.width,
              height: CONSTANTS.height,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              position: 'absolute',
            }}>
            <ActivityIndicator size="large" color={'red'} />
          </View>
        )}
      </View>
      <PopupWarning
        visible={showErrorMessage}
        textConfirm={errorMessage}
        onCloseModal={onShowErrorMessage}
      />
      <PopupWarning
        visible={showWaring}
        textConfirm={
          '入力されていない項目があるため、コミュニティを作成できません。各項目の内容をご確認ください。'
        }
        onCloseModal={onShowWarning}
      />
      <PopupConfirm
        visible={showConfirm}
        textConfirm={'入力した内容でコミュニティを作成します。\n\nよろしいですか？'}
        onCloseModal={onShowConfirm}
        onConfirm={uploadImage}
      />
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    paddingBottom: 10,
  },
  image: {
    marginTop: 10,
    borderRadius: 14,
    height: 120,
    width: '100%',
    backgroundColor: '#F2F2F2',
  },
  title: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
  },
  viewInputTitle: {
    height: 56,
    width: '100%',
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    borderRadius: 14,
    paddingHorizontal: 11,
    marginTop: 10,
  },
  inputTitle: {
    height: 36,
  },
  viewContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  text: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
  },
  viewInputContent: {
    height: 118,
    borderRadius: 14,
    backgroundColor: '#F9F9F9',
    marginTop: 10,
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  inputContent: {
    height: '100%',
    textAlignVertical: 'top',
    width: '100%',
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    height: 48,
    backgroundColor: '#F9F9F9',
    marginTop: 10,
    padding: 10,
  },
  button: {
    height: 57,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 20,
  },
  buttonCamera: {
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
  listCategories: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  viewSelect: {
    marginTop: 10,
    borderRadius: 14,
    backgroundColor: '#F9F9F9',
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
    viewAvatar: {
    width: '100%',
    aspectRatio: 355 / 231,
    backgroundColor: '#F2F2F2',
    borderRadius: 14,
    marginBottom: 10,
    overflow: 'hidden',
    marginTop:12
  },
});

export default Create;
