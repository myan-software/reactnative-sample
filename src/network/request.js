import {Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import config from '../constant/config';
import handleStore from '../redux/handleStore';
const request = {
  get: async (url) => {
    if (!handleStore.getNetwork()) throw 'ネットワーク接続を確認してください';
    // console.log(
    //   `\n %c-----------------------------[ GET ]-------------------------------------- \n [` +
    //     url +
    //     ` ] \n `,
    //   'color:red;font-size:15px',
    //   headers,
    //   ' \n----------------------------------------------------------------------------- \n',
    // );
    let response = await fetch(url, {
      method: 'GET',
    });
    console.log('All Response GET', response);
    let rs = await response.json();
    // console.log(
    //   `\n %c-----------------------------[ RESPONSE GET ]------------------------------------ \n [` +
    //     url +
    //     ` ] \n `,
    //   'color:green;font-size:15px',
    //   'Data Post',
    //   `\n`,
    //   ' Respone  ',
    //   rs,
    //   ' \n----------------------------------------------------------------------------- \n',
    // );
    switch (response.status) {
      case 200:
        return rs;
      default:
        throw rs.message;
    }
  },
  post: async (url, dataPost = {}, optionHeader) => {
    if (!handleStore.getNetwork()) throw 'ネットワーク接続を確認してください';
    let data = {
      ...dataPost,
      device_id: DeviceInfo.getUniqueId(),
      access_token: handleStore.getToken(),
    };
    if (handleStore.getSecretToken()) {
      data.access_token_secret = handleStore.getSecretToken();
    }
    url = config.HOST + url;
    let headers = {
      'Content-Type': 'application/json',
      ...optionHeader,
    };
    // console.log(
    //   `\n %c-----------------------------[ POST ]-------------------------------------- \n [` +
    //     url +
    //     ` ] \n `,
    //   'color:red;font-size:15px',
    //   headers,
    //   data,
    //   ' \n----------------------------------------------------------------------------- \n',
    // );
    let response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    //console.log('All Response POST', response);
    let rs = await response.json();
    // console.log(
    //   `\n %c-----------------------------[ RESPONSE ]------------------------------------ \n [` +
    //     url +
    //     ` ] \n `,
    //   'color:green;font-size:15px',
    //   'Data Post',
    //   data,
    //   `\n`,
    //   ' Respone  ',
    //   rs,
    //   ' \n----------------------------------------------------------------------------- \n',
    // );

    switch (response.status) {
      case 200:
        return rs;
      default:
        throw rs.message;
    }
  },
};

export default request;
