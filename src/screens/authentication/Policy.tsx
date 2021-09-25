import React, {useCallback, useEffect, useState} from 'react';
import {RefreshControl} from 'react-native';
import HeaderScreen from 'src/components/HeaderScreen';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthParamList} from 'src/navigation/type';
import AppNetworking from '@vn.starlingTech/network/AppNetworking';
import {API} from '@vn.starlingTech/network/Server';
import {getUniqueId} from 'react-native-device-info';
import {isSuccessResponse} from '@vn.starlingTech/helpers/networkingHelper';
import {getAppText} from '@vn.starlingTech/helpers/langHelper';
import {Container, Content} from 'native-base';
import {ResponseContainer} from '@vn.starlingTech/components/NetworkingResponseContainer';
import AppText from '@vn.starlingTech/components/AppText';

//policy
export default ({navigation}: StackScreenProps<AuthParamList, 'Policy'>) => {
  //   const context = useContext(AppContext);
  const [processing, setProcessing] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [processingMessage, setProcessingMessage] = useState('');
  const [info, setInfo] = useState('');

  const getScreenData = useCallback(async () => {
    const appNetworking = new AppNetworking();
    appNetworking.init({
      //   context,
      url: API.POLICY,
      params: {device_id: getUniqueId()},
    });
    const {status, data, message} = await appNetworking.postToServer();
    if (isSuccessResponse(status)) {
      setInfo(data);
      setProcessingMessage('');
    } else {
      setProcessingMessage(message || getAppText().error);
    }
    setRefreshing(false);
    setProcessing(false);
    // consoleLog(data, 'data');
  }, []);

  useEffect(() => {
    getScreenData();
  }, [getScreenData]);

  function onRefresh() {
    setRefreshing(true);
    getScreenData();
  }

  function tryAgain() {
    setProcessing(true);
    getScreenData();
  }

  return (
    <Container>
      <HeaderScreen title={'利用規約'} navigation={navigation} />
      <Content
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{padding: 15}}>
        <ResponseContainer
          tryAgain={tryAgain}
          processing={processing}
          message={processingMessage}
          successComponent={processing ? null : <AppText>{info}</AppText>}
        />
      </Content>
    </Container>
  );
};
