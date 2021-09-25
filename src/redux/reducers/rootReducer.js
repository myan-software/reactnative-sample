import {combineReducers} from 'redux';
import userReducer from './userReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
  userReducer,
  modalReducer,
});
export default rootReducer;
