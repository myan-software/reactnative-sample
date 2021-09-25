import axios from 'axios';
import {clone, isUndefined, isEqual} from 'lodash';
import qs from 'qs';

// import {getLang, getCurrentLang} from '../language';
import {getAppText} from './langHelper';
import {consoleLogAPIHeader, consoleLog} from './logHelper';

export interface ApiResponseTypes {
  data: any;
  status?: number;
  empty: boolean;
  error: boolean;
  networkError: boolean;
  message: string | null;
}

export const initialResponse: ApiResponseTypes = {
  data: null,
  status: undefined,
  empty: false,
  error: false,
  networkError: false,
  message: null,
  // message_en: null,
};

type NetworkingProps = {
  url: string;
  params?: any;
  header?: any;
};

export const putToServer = async ({url, params, header}: NetworkingProps) => {
  // consoleLog(url, params);
  let apiParams = params;
  if (header) {
    axios.defaults.headers = header;
    consoleLogAPIHeader(axios.defaults.headers, 'headers');
    if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
      console.info(params);
      apiParams = qs.stringify(params);
    }
  }
  return axios
    .put(url, apiParams)
    .then((response) => {
      //handle response
      const apiResponse = clone(initialResponse);
      apiResponse.data = response.data;
      apiResponse.status = 1;
      // consoleLog('here?');
      return {data: apiResponse};
      // return response;
    })
    .catch((error) => handlerError(error));
};

export const postToServer = async ({url, params, header}: NetworkingProps) => {
  consoleLog(url, params);
  let apiParams = params;
  if (header) {
    axios.defaults.headers = header;
    consoleLogAPIHeader(axios.defaults.headers, 'headers');
    if (header['Content-Type'] === 'application/x-www-form-urlencoded') {
      console.info(params);
      apiParams = qs.stringify(params);
    }
  }
  return axios
    .post(url, apiParams)
    .then((response) => {
      const {status, data, result, description} = response.data;
      const apiResponse = clone(initialResponse);
      // consoleLog(response.data, 'responseData');
      if (Number(status) !== 1) {
        apiResponse.status = Number(status);
        apiResponse.error = true;
        apiResponse.message = description || data.message;
      } else {
        apiResponse.status = 1;
        apiResponse.error = false;
        apiResponse.data = data || result;
        apiResponse.message = description;
        2;
      }
      // consoleLog(apiResponse, 'response');

      // consoleLog(status, data);
      return {data: {...apiResponse, fetchResponse: response.data}};
    })
    .catch((error) => handlerError(error));
};

export const getFromServer = async ({url, params, header}: NetworkingProps) => {
  if (header) {
    axios.defaults.headers = header;
    consoleLogAPIHeader(axios.defaults.headers, 'headers');
  }
  const apiParams = {params: params || null};
  return axios
    .get(url, apiParams)
    .then((response) => {
      //handle response
      return response;
    })
    .catch((error) => handlerError(error));
};

async function handlerError(error: any) {
  consoleLog(error, 'error');
  const {response} = error;
  const apiResponse = clone(initialResponse);
  // consoleLog(apiResponse, 'apiResponse');
  if (isUndefined(response)) {
    return responseNetworkError();
  }
  consoleLog(response, 'error response');
  const {status, data} = response;
  if (isUndefined(status)) {
    apiResponse.error = true;
    apiResponse.message = getAppText().noResponseData;
    return {data: apiResponse};
  } else if (!isUndefined(data)) {
    if (status >= 500) {
      return responseServerError();
    }
    if (status >= 400) {
      apiResponse.status = status;
      apiResponse.error = true;
      const {data: responseData, errors: svErrors} = data;
      let message = data.message || '';
      if (message) {
        apiResponse.message = message;
      } else {
        apiResponse.data = responseData;
        // consoleLog(svErrors, 'svError');
        // consoleLog(find(svErrors), 'first');
        message = svErrors; //find(svErrors);
        apiResponse.message = message || getAppText().noResponseData;
      }
      return {data: apiResponse};
    }
    apiResponse.error = true;
    const message = data.message;
    apiResponse.message = message;
    return {data: apiResponse};
  }
  return responseNetworkError();
}

function responseNetworkError() {
  const apiResponse = clone(initialResponse);
  apiResponse.networkError = true;
  apiResponse.message = getAppText().networkError;
  return {data: apiResponse};
}

function responseServerError() {
  const apiResponse = clone(initialResponse);
  apiResponse.error = true;
  apiResponse.message = getAppText().noResponseData;
  return {data: apiResponse};
}

export const isSuccessResponse = (status?: number, successStatus: number = 1) =>
  isEqual(status, successStatus);

// export const axiosInstance = axios.create({
//   baseURL: '',
//   timeout: 5000,
//   headers: {
//     // Authorization: 'Bearer 14154151',
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });
