import * as actionTypes from './actionTypes';

import store from './store';
export default handleStore = {
  getStore: () => store,
  setToken: (token, secretToken) => {
    store.dispatch({type: actionTypes.SET_TOKEN, token, secretToken});
  },
  signOut: () => {
    store.dispatch({type: actionTypes.SIGN_OUT});
  },
  setTypeLogin: (typeLogin) => {
    store.dispatch({type: actionTypes.SET_TYPE_LOGIN, typeLogin});
  },
  showLoading: () => {
    store.dispatch({type: actionTypes.SHOW_LOADING});
  },
  hideModal: () => {
    store.dispatch({type: actionTypes.HIDE_MODAL});
  },
  showMessage: ({icon, title, content, callBack, nameClose}) => {
    store.dispatch({
      type: actionTypes.SHOW_MESSAGE,
      content: content,
      icon,
      funcMsg: callBack,
      nameClose,
      title,
    });
  },
  showComfirm: ({
    icon,
    content,
    textOk,
    textCancer,
    onOk,
    onCancer,
    confirmImgUrl,
  }) => {
    store.dispatch({
      type: 'SHOW_CONFIRM',
      icon,
      content,
      textOk,
      textCancer,
      onOk,
      onCancer,
      confirmImgUrl,
    });
  },
  getNetwork: () => {
    return store.getState().userReducer.network;
  },
  getToken: () => {
    return store.getState().userReducer.token;
  },
  getSecretToken: () => {
    return store.getState().userReducer.secretToken;
  },
  getToken: () => {
    return store.getState().userReducer.token;
  },
  getUser: () => {
    return store.getState().userReducer.user;
  },
  setCities: (cities) => {
    store.dispatch({type: actionTypes.SET_CITIES, cities});
  },
  setCategories: (categories) => {
    store.dispatch({type: actionTypes.SET_CATEGORIES, categories});
  },
  setGender: (genders) => {
    store.dispatch({type: actionTypes.SET_GENDERS, genders});
  },
  setUser: (user) => {
    store.dispatch({type: actionTypes.SET_USER, user});
  },
  updateUser: (user) => {
    store.dispatch({type: actionTypes.UPDATE_USER, user});
  },
  setFollows: (follows) => {
    store.dispatch({type: actionTypes.SET_FOLLOWS, follows});
  },
  updateFollows: (follow) => {
    store.dispatch({type: actionTypes.UPDATE_FOLLOWS, follow});
  },
  setFavorites: (favorites) => {
    store.dispatch({type: actionTypes.SET_FAVORITES, favorites});
  },
  updateFavorite: (favorite) => {
    store.dispatch({type: actionTypes.UPDATE_FAVORITES, favorite});
  },
};
