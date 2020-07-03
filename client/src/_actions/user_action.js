import axios from "axios";
import { LOGIN_USER } from "./types";

export function loginUser(dataTosubmit) {
  //서버에서 받은 데이터를 request에 저장
  const request = axios
    .post("/api/users/login", dataTosubmit)
    .then((response) => response.data);

  //리턴 시켜서 리듀서로 보내기
  return {
    type: LOGIN_USER,
    payload: request,
  };
}
