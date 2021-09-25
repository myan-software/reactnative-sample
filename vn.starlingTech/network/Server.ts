import {isEmpty} from 'lodash';
import config from '../../config';

// const SERVER_TEST = true;

const BASE_URL = config.API_SERVER;

const VERSION = '/';
export const API = {
  BASE_URL,

  SIGN_IN: 'login',
  POLICY: 'getPolicy',
  GET_FAVORITE_COMMUNITIES: 'getFavoriteCommunities',
  GET_RECOMMEND_COMMUNITIES: 'getRecommendCommunities',
  DETAIL_COMMUNITY: 'detailCommunity',
  SEARCH_COMMUNITY: 'searchCommunity',
  GET_CATEGORIES: 'getCategories',
  CHECK_USER_TO_COMMUNITY_GROUP: 'checkUserToCommunityGroup',
  REQUEST_TO_COMMUNITY_GROUP: 'requestToCommunityGroup',
  UPLOAD_IMAGE: 'uploadImage',
  CREATE_COMMUNITY: 'createCommunity',
  POLICY: 'getPolicy',
  CHECK_HOST_GROUP: 'checkHostGroup',
  CHECK_HOST_COMMUNITY: 'checkHostCommunity',
  GET_MEMBER_COMMUNITY: 'getMemberCommunity',
  GET_FOLLOWS: 'getFollows',
  LEAVE_COMMUNITY_GROUP: 'leaveCommunityGroup',
  DELETE_COMMUNITY_GROUP: 'deleteCommunityGroup',
  DELETE_GROUP: 'deletePostGroup',
  ON_OFF_NOTIFICATION: 'onOffNotification',
  FOLLOW_USER: 'followUser',
  UNFOLLOW_USER: 'unfollowUser',
  CHANGE_HOST_COMMUNITY: 'changeHostCommunity',
  LEAVE_GROUP: 'leaveGroup',
  GET_MEMBER_GROUP: 'getMemberGroup',
  CHANGE_HOST_GROUP: 'changeHostGroup',
  GET_LIST_USER_CHAT: 'getListUserChat',
  GET_LIST_GROUP_CHAT: 'getListGroupChat',
  GET_LIST_COMMUNITY_CHAT: 'getListCommunityChat',
  GET_MESSAGES_BY_USER_ID: 'getMessagesByUserId',
  GET_MESSAGES_BY_GROUP_ID: 'getMessagesByPostId',
  GET_MESSAGES_BY_COMMUNITY_ID: 'getMessagesByCommunityId',
  CREATE_MESSAGE: 'createMessage',
  CREATE_POST_MESSAGE: 'createPostMessage',
  CREATE_COMMUNITY_MESSAGE: 'createCommunityMessage',
  DETAIL_USER: 'detailUser',

  UPDATE_PAYMENT: 'updatePayment',
};

export const getApiUrl = (apiStr: string) => `${BASE_URL}${apiStr}`;
export const getApiWebviewUrl = (apiStr: string) => BASE_URL + apiStr;

export const getWebViewUrl = (webviewStr: string) =>
  BASE_URL + VERSION + webviewStr;

export const getImgPath = (imgUrl: string, hostUrl?: string) => {
  if (isEmpty(imgUrl)) {
    return '';
  }
  if (imgUrl.includes('http') || imgUrl.includes('https')) {
    return imgUrl;
  }
  let newImgUrl = imgUrl;
  if (imgUrl.charAt(0) === '/') {
    newImgUrl = imgUrl.substring(1);
  }
  return `${hostUrl || BASE_URL}${newImgUrl}`;
};

export const getImgSource = (imgUrl: string, hostUrl?: string) => {
  const imageUri = getImgPath(imgUrl, hostUrl);
  return (imageUri && {uri: imageUri}) || {};
};
