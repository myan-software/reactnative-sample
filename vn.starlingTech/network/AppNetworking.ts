import {clone, isEmpty} from 'lodash';
import {Alert, Platform} from 'react-native';

import {ContextType} from '../components/AppContext';
import {getAppText} from '../helpers/langHelper';
import {consoleLog} from '../helpers/logHelper';
import {
  showFlashMessageError,
  showMessageError,
} from '../helpers/messageHelper';
import {
  ApiResponseTypes,
  postToServer,
  getFromServer,
  isSuccessResponse,
  initialResponse,
  putToServer,
} from '../helpers/networkingHelper';
import {getApiUrl} from './Server';

type ErrMsgType = 'MANUAL' | 'FLASH' | 'ALERT';

export type ApiRequestTypes = {
  url: string;
  header?: any;
  params?: any;
  context?: ContextType;
  showErrorType?: ErrMsgType;
  autoErrMessage?: boolean;
  onSuccessCallback?: (propsData: ApiResponseTypes) => void;
  onFailedCallback?: (propsData: ApiResponseTypes) => void;
};

type ServerHeaderType = {
  'Content-Type': string;
  'Application-Authorization'?: string;
  'X-AUTH-TOKEN'?: string;
  Accept?: string;
};

export const parseApiResponse = (pResponse: ApiResponseTypes) => {
  const response = clone(initialResponse);

  consoleLog(pResponse, 'pResponse');

  if (isEmpty(pResponse)) {
    response.error = true;
    response.message = getAppText().emptyResponseData;
    return response;
  }

  const {status, data, message, error} = pResponse;

  const pStatus = Number(status);

  response.status = pStatus;
  response.error = error || pStatus < 0;
  response.message = message;
  response.data = data;
  response.empty = isSuccessResponse(pStatus) && isEmpty(data);
  return {...response, fetchResponse: pResponse?.fetchResponse};
};

export default class AppNetworking {
  url: string | undefined;
  header: ServerHeaderType = {
    'Content-Type': 'application/json',
  };
  params: Record<string, unknown> | undefined;
  onSuccessCallback: ((data: ApiResponseTypes) => void) | undefined;
  onFailedCallback: ((data: ApiResponseTypes) => void) | undefined;
  apiKey: string | undefined;
  appContext: ContextType;
  showErrMsgType: ErrMsgType;
  autoErrMessage: boolean = true;

  init(props: ApiRequestTypes) {
    const {
      url,
      header,
      params,
      showErrorType,
      autoErrMessage,
      onSuccessCallback,
      onFailedCallback,
    } = props;
    this.url = url;
    this.header = {...this.header, ...header};
    const pParams = {
      request_from: Platform.OS === 'android' ? 1 : 2,
      // secret_key: 'secret_key-123456',
    };
    this.appContext = props.context;
    if (this.appContext && this.appContext.user) {
      pParams['jwt_key'] = this.appContext.user.token;
    }
    this.autoErrMessage = autoErrMessage !== undefined ? autoErrMessage : true;
    this.showErrMsgType = showErrorType || 'MANUAL';
    this.params = {...pParams, ...params};
    this.onSuccessCallback = onSuccessCallback;
    this.onFailedCallback = onFailedCallback;
  }

  async putToServer() {
    const data = {
      url: (this.url && getApiUrl(this.url)) || '',
      params: this.params,
      header: this.header,
    };

    return putToServer(data);
  }

  async postToServer() {
    const data = {
      url: (this.url && getApiUrl(this.url)) || '',
      params: JSON.stringify(this.params),
      header: this.header,
    };

    return postToServer(data).then(({data: responseData}) => {
      const response = parseApiResponse(responseData);
      if (this.autoErrMessage) {
        const {status, error, message} = response;
        if (status === 2) {
          Alert.alert(
            'Lỗi',
            'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại!',
            [
              {
                text: getAppText().ok,
                onPress: () => this.appContext?.signOut(),
              },
            ],
            {cancelable: false},
          );
        } else {
          if (error) {
            switch (this.showErrMsgType) {
              case 'ALERT':
                showMessageError(message);
                break;
              case 'FLASH':
                showFlashMessageError(message);
                break;
            }
          }
        }
      }
      return response;
    });

    // if (!this.onSuccessCallback && !this.onFailedCallback) {
    //   return postToServer(data);
    // } else {
    //   return postToServer(data).then(({ data: responseData }) => {
    //     const propsData = parseApiResponse(responseData);
    //     const { status } = propsData;
    //     if (isSuccessResponse(status)) {
    //       if (this.onSuccessCallback) {
    //         this.onSuccessCallback(propsData);
    //       }
    //     } else if (this.onFailedCallback) {
    //       this.onFailedCallback(propsData);
    //     }
    //     return { data: clone(initialResponse) };
    //   });
    // }
  }

  async getFromServer() {
    const data = {
      url: this.url ? getApiUrl(this.url) : '',
      params: this.params,
      header: this.header,
    };
    return getFromServer(data).then(({data}) => {
      const response = parseApiResponse(data);
      const {status, error, message} = response;
      if (status === 2) {
        Alert.alert(
          'Lỗi',
          'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại!',
          [
            {
              text: getAppText().ok,
              onPress: () => this.appContext?.signOut(),
            },
          ],
          {cancelable: false},
        );
      } else {
        if (error) {
          switch (this.showErrMsgType) {
            case 'ALERT':
              showMessageError(message);
              break;
            case 'FLASH':
              showFlashMessageError(message);
              break;
          }
        }
      }
      return response;
    });
    // consoleLog(data, 'getFromServer');
    // if (!this.onSuccessCallback && !this.onFailedCallback) {
    //   return getFromServer(data);
    // } else {
    //   return getFromServer(data).then(({ data: responseData }) => {
    //     const propsData = parseApiResponse(responseData);
    //     const { status } = propsData;
    //     if (isSuccessResponse(status)) {
    //       if (this.onSuccessCallback) {
    //         this.onSuccessCallback(propsData);
    //       }
    //     } else if (this.onFailedCallback) {
    //       this.onFailedCallback(propsData);
    //     }
    //     return { data: clone(initialResponse) };
    //   });
    // }
  }

  async uploadFiles() {
    const data = {
      url: this.url ? getApiUrl(this.url) : '',
      params: this.params,
      header: {
        ...this.header,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    };
    return postToServer(data);
  }

  responseHasError = (apiResponse: ApiResponseTypes, callback?: () => void) => {
    const status = Number(apiResponse.status);
    switch (status) {
      case 2:
        Alert.alert(
          'Lỗi',
          'Phiên làm việc đã hết hạn, vui lòng đăng nhập lại!',
          [
            {
              text: getAppText().ok,
              onPress: () => this.appContext?.signOut(),
            },
          ],
          {cancelable: false},
        );
    }
  };
}
