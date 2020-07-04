import React, { useEffect } from "react";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../_actions/user_action";
import { withRouter } from "react-router-dom";

//specificComponent : Page Component
//option :
// null : 아무나 출입 가능
// true : 로그인한 유저 출입 가능
// false : 로그인한 유저 출입 불가
// adminRoute - true : 어드민만 들어갈 수 있음 , 안쓰면 기본값 null
export default function (SpecificComponent, option, adminRoute = null) {
  function AuthenticationCheck(props) {
    const dispatch = useDispatch();

    //auth 미들웨어로 요청 보내서 쿠키 이용해서 로그인했는지 안했는지 판단한 정보받아오기
    useEffect(() => {
      dispatch(auth()).then((response) => {
        console.log(response);

        //response (어스체크 한 정보)로 분기처리 해주기
        // 1. 로그인 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            //옵션이 true(로그인한 유저만 출입 가능한 페이지)로 접근했을때 login페이지로 이동 처리
            props.history.push("/login");
          }
        } else {
          //2. 로그인 한 상태
          //adminRoute 인데 isAdmin이 false인 사람이 접근할 때
          if (adminRoute && !response.payload.isAdmin) {
            props.history.push("/");
          } else {
            //로그인한 유저가 출입불가한 페이지 접근
            if (option === false) props.history.push("/");
          }
        }
      });

      // Axios.get('/api/users/atuh')
    }, []);
    return <SpecificComponent />;
  }
  return AuthenticationCheck;
}
