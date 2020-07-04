import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
      break;

    case REGISTER_USER:
      return { ...state, registerSuccess: action.payload };
      break;

    case AUTH_USER:
      //node.js 에서 유저정보를 넘겨주기 때문에 userData로 명명
      return { ...state, userData: action.payload };
      break;

    default:
      return state;
  }
}
