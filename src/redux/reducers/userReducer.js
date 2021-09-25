import * as actionTypes from '../actionTypes';
const init = {
  token: '',
  user: {},
  cities: [],
  categories: [],
  genders: [],
  follows: {},
  favorites: {},
  network: true,
  typeLogin: '',
  secretToken: '',
};

const userReducer = (state = init, action) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {...state, token: action.token, secretToken: action.secretToken};
    case actionTypes.SET_TYPE_LOGIN:
      return {...state, typeLogin: action.typeLogin};
    case actionTypes.SIGN_OUT:
      return init;
    case actionTypes.SET_USER:
      return {...state, user: action.user};
    case actionTypes.UPDATE_USER:
      return {...state, user: {...state.user, ...action.user}};
    case actionTypes.SET_CITIES:
      return {...state, cities: action.cities};
    case actionTypes.SET_CATEGORIES:
      return {...state, categories: action.categories};
    case actionTypes.SET_GENDERS:
      return {...state, genders: action.genders};
    case actionTypes.SET_NETWORK:
      return {...state, network: action.network};
    case actionTypes.SET_FOLLOWS:
      return {...state, follows: action.follows};
    case actionTypes.UPDATE_FOLLOWS:
      return {...state, follows: {...state.follows, ...action.follow}};
    case actionTypes.SET_FAVORITES:
      return {...state, favorites: action.favorites};
    case actionTypes.UPDATE_FAVORITES:
      return {...state, favorites: {...state.favorites, ...action.favorite}};
    default:
      return state;
  }
};
export default userReducer;
