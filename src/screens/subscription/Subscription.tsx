import {AppProcessingButton} from '@vn.starlingTech/components/AppButton';
import {AppContext} from '@vn.starlingTech/components/AppContext';
import AppText from '@vn.starlingTech/components/AppText';
import CONSTANTS from '@vn.starlingTech/config/Constant';
import settings from '@vn.starlingTech/config/settings';
import {getAppText} from '@vn.starlingTech/helpers/langHelper';
import {consoleLog} from '@vn.starlingTech/helpers/logHelper';
import {showMessageError} from '@vn.starlingTech/helpers/messageHelper';
import {size} from 'lodash';
import {Spinner} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RNIap from 'react-native-iap';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from 'src/components/CustomText';
import HeaderScreen from 'src/components/HeaderScreen';
import LogoIcon from '../../../assets/svg/LogoIcon';

type Props = {
  navigation: any;
  route: any;
};

// const productId = '1MONTH';

// const productIds = Platform.select({
//   ios: ['63f4c5c058ff4e7e8d680ab46b793f16'],
//   android: ['com.example.coins100'],
// });

// const productIds = Platform.OS === 'ios' ? ['25022021'] : [''];

// const subSkus = Platform.OS === 'ios' ? ['1559058290'] : [''];
const subSkuArr = [
  CONSTANTS.IS_IOS
    ? CONSTANTS.purchase.PRODUCT_ID
    : CONSTANTS.purchase.PRODUCT_ID.toLowerCase(),
];

const Subscription = (props: Props) => {
  const {navigation, route} = props;
  const context = useContext(AppContext);

  consoleLog(context.user, 'contextUser');

  const [hasProduct, setHasProduct] = useState(false);
  const [processing, setProcessing] = useState(false);

  // const {
  //   connected,
  //   products,
  //   subscriptions,
  //   getProducts,
  //   getSubscriptions,
  //   finishTransaction,
  //   currentPurchase,
  //   currentPurchaseError,
  // } = useIAP();

  useEffect(() => {
    // getProducts(productIds);
    getSubscriptions();
  }, []);

  const getSubscriptions = async () => {
    try {
      const result = await RNIap.initConnection();
      consoleLog(result, 'result');
      const products = await RNIap.getSubscriptions(subSkuArr);
      if (size(products)) {
        setHasProduct(true);
      } else {
        showMessageError(getAppText().noIAPProductId);
      }
      consoleLog('Products', products);
    } catch (err) {
      showMessageError(err);
      consoleLog('error', err);
      // console.warn(err.code, err.message);
    }
  };

  const requestSubscription = async () => {
    setProcessing(true);
    try {
      const response = await RNIap.requestSubscription(subSkuArr[0]);
      navigation.goBack();
      consoleLog(response, 'data');
    } catch (err) {
      Alert.alert(err.message);
    }
    setProcessing(false);
    return null;
  };

  useEffect(() => {
    // getSubscriptions();
    // const purchaseUpdateSubscription = purchaseUpdatedListener(
    //   async (purchase: InAppPurchase | SubscriptionPurchase) => {
    //     consoleLog(purchase, 'purchase');
    //     const receipt = purchase.transactionReceipt;
    //     if (receipt) {
    //       try {
    //         const networking = new AppNetworking();
    //         networking.init({
    //           showErrorType: 'ALERT',
    //           url: API.UPDATE_PAYMENT,
    //           params: {
    //             user_id: context.user?.id,
    //             product_id: productId,
    //             trans_id:
    //               Platform.OS === 'ios'
    //                 ? purchase.transactionId
    //                 : purchase.purchaseToken,
    //             platform: Platform.OS,
    //           },
    //         });
    //         const {status, data} = await networking.postToServer();
    //         if (isSuccessResponse(status)) {
    //         }
    //         const ackResult = await finishTransaction(purchase, false);
    //         // if (Platform.OS === 'ios') {
    //         //   finishTransactionIOS(purchase.transactionId);
    //         // } else if (Platform.OS === 'android') {
    //         //   // If consumable (can be purchased again)
    //         //   consumePurchaseAndroid(purchase.purchaseToken);
    //         //   // If not consumable
    //         //   acknowledgePurchaseAndroid(purchase.purchaseToken);
    //         // }
    //         // const ackResult = await finishTransaction(purchase);
    //         // consoleLog(ackResult, 'ackResult');
    //       } catch (ackErr) {
    //         consoleLog('ackErr', ackErr);
    //       }
    //       consoleLog(receipt, 'receipt');
    //     }
    //   },
    // );
    // const purchaseErrorSubscription = purchaseErrorListener(
    //   (error: PurchaseError) => {
    //     consoleLog('purchaseErrorListener', error);
    //     Alert.alert(getAppText().errorTitle, error.message);
    //   },
    // );
    // return () => {
    //   purchaseUpdateSubscription;
    //   purchaseErrorSubscription;
    // };
  }, []);

  // useEffect(() => {
  //   const checkCurrentPurchase = async (purchase?: Purchase): Promise<void> => {
  //     if (purchase) {
  //       const receipt = purchase.transactionReceipt;
  //       if (receipt)
  //         try {
  //           const ackResult = await finishTransaction(purchase);
  //           console.log('ackResult', ackResult);
  //         } catch (ackErr) {
  //           console.warn('ackErr', ackErr);
  //         }
  //     }
  //   };
  //   checkCurrentPurchase(currentPurchase);
  // }, [currentPurchase, finishTransaction]);

  // const purchase = (item: Purchase): void => {
  //   if (item.type === 'iap') requestPurchase(item.productId);
  //   else requestSubscription(item.productId);
  // };

  // const onPress = () => {
  //   context.setSubscription(true);
  //   if (route && route.params && route.params.fromTabMessage) {
  //     navigation.navigate('Message');
  //     return;
  //   }
  //   navigation.goBack();
  // };

  return (
    <>
      <HeaderScreen title={'????????????????????????'} navigation={navigation} />
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
          {/* <AppText>{settings.versionDev}</AppText> */}
          <View style={styles.logo}>
            <LogoIcon />
          </View>
          <CustomText
            style={[styles.text, {textAlign: 'center', marginTop: 10}]}>
            {
              '??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????'
            }
          </CustomText>
          <CustomText style={[styles.text, {marginTop: 30}]}>
            {`?????????????????????????????????????????????????????????????????????????????????????????????${'\n'}???????????????????????????????????????????????????????????????????????????????????????????????????

1. ??????????????????????????????
2. ???????????????????????????
3. ?????????????????????
4. ?????????????????????????????????
5. ???????????????????????????`}
          </CustomText>
        </ScrollView>
        <CustomText style={[styles.text, {fontSize: 12}]}>
          {`* ??????980????????????????????????3????????????????????????????????????
* ?????????????????????????????????????????????????????????????????????????????????
* ???????????????????????????????????????????????????????????????????????????????????????`}
        </CustomText>
        {hasProduct ? (
          <AppProcessingButton
            onPress={requestSubscription}
            disabled={processing}
            width={CONSTANTS.screenWidth - 32}
            style={{height: 57, marginTop: 10}}>
            <LinearGradient
              start={{x: 0.01, y: 0}}
              end={{x: 0.1, y: 2.7}}
              colors={['#833AB4', '#FD1D1D', '#FCB045']}
              style={styles.button}>
              {processing ? (
                <Spinner size="small" color="#FFF" />
              ) : (
                <CustomText style={styles.textButton}>
                  {'????????????????????????'}
                </CustomText>
              )}
            </LinearGradient>
          </AppProcessingButton>
        ) : null}
        {/* <Pressable onPress={requestSubscription}>
          <LinearGradient
            start={{x: 0.01, y: 0}}
            end={{x: 0.1, y: 2.7}}
            colors={['#833AB4', '#FD1D1D', '#FCB045']}
            style={styles.button}>
            <CustomText style={styles.textButton}>
              {'????????????????????????'}
            </CustomText>
          </LinearGradient>
        </Pressable> */}
      </View>
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
  button: {
    height: 57,
    width: CONSTANTS.width - 32,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: getBottomSpace(),
    // marginTop: 10,
  },
  textButton: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '700',
    lineHeight: 20,
  },
  logo: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    lineHeight: 20,
  },
});

export default Subscription;
