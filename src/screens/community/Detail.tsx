import {AppContext} from '@vn.starlingTech/components/AppContext';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import React, {useContext, useEffect, useState} from 'react';
import {Linking, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from 'src/components/CustomText';
import HeaderScreen from 'src/components/HeaderScreen';
import {goToChatDetail, joinThreadGroup} from 'src/helper/MessageHelper';
import UsersLightIcon from '../../../assets/svg/UsersLightIcon';
import Hyperlink from 'react-native-hyperlink';
import {useSelector} from 'react-redux';
type Props = {
  navigation: any;
  route: any;
};

const Detail = (props: Props) => {
  const {navigation, route} = props;
  const dataProps = route.params.dataProps;
  const context = useContext(AppContext);
  const user = context.user;
  const [detail, setDetail] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusUser, setStatusUser] = useState<number>(0);
  const categories = useSelector((state) => state.userReducer.categories);

  useEffect(() => {
    getData();
    checkUserToCommunity();
  }, []);

  const getData = async () => {
    const networking = new AppNetworking();
    networking.init({
      url: API.DETAIL_COMMUNITY,
      params: {
        id: dataProps?.id,
      },
    });
    const {data, status, message} = await networking.postToServer();
    setLoading(false);
    if (isSuccessResponse(status)) {
      setDetail(data);
    }
  };

  const checkUserToCommunity = async () => {
    const networking = new AppNetworking();
    networking.init({
      url: API.CHECK_USER_TO_COMMUNITY_GROUP,
      params: {
        community_id: dataProps?.id,
        user_id: user?.id,
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      setStatusUser(data);
    }
  };

  const onPress = async () => {
    if (!context.user?.subscription) {
      checkSubsciption();
      return;
    }

    /**
     * 0: not approved
     * 1: approved
     * -1: not requested
     */
    if (statusUser === 1) {
      return;
    }

    //TODO join and navigate to detail chat community
    const networking = new AppNetworking();
    networking.init({
      url: API.REQUEST_TO_COMMUNITY_GROUP,
      params: {
        community_id: dataProps?.id,
        user_id: user?.id,
      },
    });
    const {data, status, message} = await networking.postToServer();
    if (isSuccessResponse(status)) {
      joinThreadGroup(detail.firebaseKey, user, () => {
        goToChatDetail(detail.firebaseKey, navigation);
      });
    }
  };

  const checkSubsciption = () => {
    navigation.navigate('Subscription');
  };

  const renderText = () => {
    /**
     * 0: not approved
     * 1: approved
     * -1: not requested
     */
    switch (statusUser) {
      case 0:
        return '';
      case 1:
        return '加入済み';
      case -1:
        return '加入';
      default:
        return '';
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <CustomText style={styles.textEmpty}>{'読み込み中...'}</CustomText>
      );
    }
    if (detail) {
      const category = categories.filter(
        (item) => item.id === detail.category_id,
      )?.[0]?.name;
      return (
        <>
          <ScrollView showsVerticalScrollIndicator={false}>
            <FastImage source={{uri: detail.image}} style={styles.image} />
            <View style={styles.viewTitle}>
              <CustomText style={styles.title}>
                {detail && detail?.title ? detail.title : dataProps?.title}
              </CustomText>
              <View style={styles.viewCount}>
                <UsersLightIcon />
                <CustomText style={[styles.text, {marginLeft: 10}]}>
                  {detail?.number_of_members}
                </CustomText>
              </View>
            </View>
            <View style={styles.wrapDetail}>
              <View style={[styles.titleCategory]}>
                <CustomText>ジャンル</CustomText>
              </View>  
              <View style={{width: '3%'}} />
              <View style={[styles.itemStyle2]}>
                <CustomText>{category}</CustomText>
              </View>
            </View>
            <CustomText style={{marginTop: 20, marginLeft: 10}}>説明</CustomText>
            <Hyperlink
                onPress={(url) => Linking.openURL(url)}
                linkStyle={{color: '#2980b9'}}>
                <CustomText  style={[styles.text, {marginTop: 12, marginLeft: 10}]}>{detail?.content}</CustomText>
            </Hyperlink>
          </ScrollView>
          {renderText() ? (
            <TouchableOpacity
              activeOpacity={statusUser === 1 ? 1 : 0}
              onPress={onPress}>
              <LinearGradient
                start={{x: 0.01, y: 0}}
                end={{x: 0.1, y: 2.7}}
                colors={['#833AB4', '#FD1D1D', '#FCB045']}
                style={styles.button}>
                <CustomText style={styles.textButton}>
                  {renderText()}
                </CustomText>
              </LinearGradient>
            </TouchableOpacity>
          ) : null}
        </>
      );
    }
    return (
      <CustomText style={styles.textEmpty}>
        {'コミュニティがありません'}
      </CustomText>
    );
  };

  return (
    <>
      <HeaderScreen
        title={detail && detail?.title ? detail.title : dataProps?.title}
        navigation={navigation}
      />
      <View style={styles.content}>{renderContent()}</View>
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
    width: '100%',
    aspectRatio: 355 / 231,
  },
  viewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontSize: 17,
    color: '#000000',
    fontWeight: '700',
    lineHeight: 23,
  },
  viewCount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
  },
  button: {
    height: 57,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getBottomSpace(),
  },
  titleCategory: {
    width: '31.5%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ml10: {
    marginLeft: 10
  },
  mt10:{
    marginTop: 10
  },
  textButton: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 20,
  },
  textEmpty: {
    textAlign: 'center',
    marginTop: 10,
  },
  wrapDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  itemStyle2: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 14,
    height: 36,
    alignItems: 'center',
    paddingHorizontal: 20,
    flex: 1,
    justifyContent: 'center',
  },
});

export default Detail;
