import * as actionTypes from '../actionTypes';

let inititalState = {
  // change all variable show modal = one name
  nameUI: '',
  qrcode: '',
  messageTitle: '',
  messageContent: '',
  funcMsg: () => {},
  icon: null,
  // confirm box
  confirmContent: '',
  onConfirmOk: () => {},
  onConfirmCancel: () => {},
  confirmCancelText: '',
  confirmOkText: '',
  confirmImgUrl: '',
  nameClose: '',
};
const modalReducer = (state = inititalState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_LOADING:
      return Object.assign({}, state, {nameUI: 'loading'});
    case actionTypes.SHOW_MESSAGE:
      return Object.assign({}, state, {
        nameUI: 'message',
        icon: action.icon,
        messageTitle: action.title,
        messageContent: action.content,
        funcMsg: action.funcMsg,
        nameClose: action.nameClose,
      });
    case actionTypes.SHOW_CONFIRM:
      return Object.assign({}, state, {
        icon: action.icon,
        confirmContent: action.content,
        onConfirmOk: action.onOk,
        onConfirmCancel: action.onCancer,
        confirmOkText: action.textOk,
        confirmCancelText: action.textCancer,
        nameUI: 'comfirmBox',
      });
    case actionTypes.HIDE_MODAL:
      return {...state, nameUI: ''};
    default:
      return state;
  }
};
export default modalReducer;
