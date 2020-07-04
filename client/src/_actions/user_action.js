import axios from "axios";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

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

export function registerUser(dataTosubmit) {
  //서버에서 받은 데이터를 request에 저장
  const request = axios
    .post("/api/users/register", dataTosubmit)
    .then((response) => response.data);

  //리턴 시켜서 리듀서로 보내기
  return {
    type: REGISTER_USER,
    payload: request,
  };
}

export function auth() {
  //서버에서 받은 데이터를 request에 저장
  const request = axios
    //get 메소드 이므로 body 부분은 필요없음
    .get("/api/users/auth")
    .then((response) => response.data);

  //리턴 시켜서 리듀서로 보내기
  return {
    type: AUTH_USER,
    payload: request,
  };
}
