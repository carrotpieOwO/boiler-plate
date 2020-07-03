import { combineReducers } from "redux";
import user from "./user_reducer";
// 여러가지 리듀서를 합친 루트리듀서

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
